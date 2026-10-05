"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;
  uniform sampler2D uVideo;
  uniform vec2 uResolution;
  uniform vec2 uVideoSize;
  uniform float uCell;
  uniform float uEntrance;
  uniform vec4 uRipples[4];

  void main() {
    if (uEntrance < 1.0) {
      float pitch = uCell;
      vec2 block = floor(gl_FragCoord.xy / pitch);
      vec2 middle = (block + 0.5) * pitch;
      float scale = max(uResolution.x / uVideoSize.x, uResolution.y / uVideoSize.y);
      vec2 crop = uResolution / (uVideoSize * scale);
      vec2 uv = (middle / uResolution - 0.5) * crop + 0.5;
      float luma = dot(texture2D(uVideo, uv).rgb, vec3(0.299, 0.587, 0.114));
      float radius = (0.1 + 0.45 * smoothstep(0.15, 0.95, luma)) * pitch;
      float dotMask = 1.0 - smoothstep(radius - 0.75, radius + 0.75, distance(gl_FragCoord.xy, middle));
      float seed = fract(sin(dot(block, vec2(127.1, 311.7))) * 43758.5453);
      float reveal = smoothstep(0.0, 1.0, uEntrance);
      if (seed < reveal) discard;
      gl_FragColor = vec4(vec3(luma * dotMask), 1.0);
      return;
    }
    vec2 cell = floor(gl_FragCoord.xy / uCell);
    vec2 center = (cell + 0.5) * uCell;
    vec2 topCell = vec2(cell.x, floor((uResolution.y - gl_FragCoord.y) / uCell));
    float seed = fract(sin(dot(topCell, vec2(127.1, 311.7))) * 43758.5453);
    float opacity = 0.0;
    for (int i = 0; i < 4; i++) {
      vec4 ripple = uRipples[i];
      float progress = ripple.z;
      if (progress < 0.0 || progress >= 1.0) continue;
      vec2 origin = vec2(ripple.x, 1.0 - ripple.y) * uResolution;
      float spread = (28.0 + 82.0 * progress) * (uCell / 4.5);
      float falloff = 1.0 - smoothstep(spread * 0.25, spread, distance(center, origin));
      float survival = step(progress * 0.85, seed);
      opacity = max(opacity, 0.14 * falloff * survival * (1.0 - progress));
    }
    if (opacity <= 0.0) discard;

    float scale = max(uResolution.x / uVideoSize.x, uResolution.y / uVideoSize.y);
    vec2 crop = uResolution / (uVideoSize * scale);
    vec2 uv = (center / uResolution - 0.5) * crop + 0.5;
    vec3 source = texture2D(uVideo, uv).rgb;
    float luma = dot(source, vec3(0.299, 0.587, 0.114));
    float shade = clamp((1.0 - luma - 0.15) / 0.8, 0.0, 1.0);
    float radius = (0.1 + 0.45 * shade * shade * (3.0 - 2.0 * shade)) * uCell;
    float ink = 1.0 - smoothstep(radius - 0.75, radius + 0.75, distance(gl_FragCoord.xy, center));
    gl_FragColor = vec4(vec3(0.7), opacity * ink);
  }
`;

const HeroHalftone = ({ videoRef, rippleRef, loaded, onEntranceComplete }) => {
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);
  const loadedRef = useRef(loaded);
  const completionRef = useRef(onEntranceComplete);
  completionRef.current = onEntranceComplete;

  useEffect(() => {
    loadedRef.current = loaded;
    if (loaded) controlsRef.current?.enter();
  }, [loaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl || !video) {
      console.warn("Hero halftone skipped: video or WebGL rendering is unavailable.");
      canvas.style.visibility = "hidden";
      return;
    }

    const shaders = [];
    const program = gl.createProgram();
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("Hero halftone shader could not compile:", gl.getShaderInfoLog(shader));
        return false;
      }
      gl.attachShader(program, shader);
      return true;
    };
    const deleteProgram = () => {
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
    };
    if (!compile(gl.VERTEX_SHADER, VERTEX) || !compile(gl.FRAGMENT_SHADER, FRAGMENT)) {
      canvas.style.visibility = "hidden";
      deleteProgram();
      return;
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Hero halftone shader could not link:", gl.getProgramInfoLog(program));
      deleteProgram();
      canvas.style.visibility = "hidden";
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const uniforms = Object.fromEntries(
      ["uVideo", "uResolution", "uVideoSize", "uCell", "uEntrance", "uRipples[0]"]
        .map((name) => [name, gl.getUniformLocation(program, name)])
    );
    gl.uniform1i(uniforms.uVideo, 0);
    gl.clearColor(0, 0, 0, 0);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let failed = false;
    let ripples = [];
    let lastTime = null;
    let entrance = 0;
    let entranceStarted = false;
    let completed = false;
    const finishEntrance = () => {
      if (completed) return;
      completed = true;
      completionRef.current?.();
    };

    const clear = () => gl.clear(gl.COLOR_BUFFER_BIT);
    const draw = (now) => {
      frame = 0;
      if (!visible || failed) return;
      const delta = lastTime === null ? 0 : now - lastTime;
      lastTime = now;
      if (entranceStarted) entrance = Math.min(1, entrance + delta / 1000);
      ripples.forEach((ripple) => { ripple.age += delta; });
      ripples = ripples.filter((ripple) => ripple.age < ripple.duration);
      if (!ripples.length && entrance === 1) {
        clear();
        canvas.style.backgroundColor = "transparent";
        canvas.dataset.entrance = "complete";
        finishEntrance();
        lastTime = null;
        return;
      }
      if (video.readyState >= 2 && video.videoWidth && video.videoHeight) {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        gl.viewport(0, 0, width, height);
        try {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
        } catch (error) {
          failed = true;
          clear();
          canvas.style.visibility = "hidden";
          console.warn("Hero halftone skipped: the video frame could not be sampled.", error);
          return;
        }
        gl.uniform2f(uniforms.uResolution, width, height);
        gl.uniform2f(uniforms.uVideoSize, video.videoWidth, video.videoHeight);
        gl.uniform1f(uniforms.uCell, 4.5 * dpr);
        gl.uniform1f(uniforms.uEntrance, entrance);
        canvas.dataset.entrance = entrance < 1 ? "resolving" : "complete";
        if (entrance === 1) finishEntrance();
        const values = new Float32Array(16);
        for (let i = 0; i < 4; i++) {
          const ripple = ripples[i];
          values.set(ripple
            ? [ripple.x, ripple.y, ripple.age / ripple.duration, 0]
            : [0, 0, -1, 0], i * 4);
        }
        gl.uniform4fv(uniforms["uRipples[0]"], values);
        clear();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      frame = requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!frame && visible && !failed && (ripples.length || entranceStarted && entrance < 1)) {
        frame = requestAnimationFrame(draw);
      }
    };
    const enter = () => {
      if (entranceStarted) return;
      entranceStarted = true;
      canvas.style.backgroundColor = "transparent";
      if (motion.matches) {
        entrance = 1;
        canvas.style.backgroundColor = "transparent";
        canvas.dataset.entrance = "complete";
        finishEntrance();
        clear();
      } else schedule();
    };
    controlsRef.current = { enter };
    if (loadedRef.current) enter();
    const send = ({ x, y }) => {
      if (failed || motion.matches) return;
      ripples.push({
        x, y, age: 0,
        duration: 1000,
      });
      ripples = ripples.slice(-4);
      if (lastTime === null && visible) lastTime = performance.now();
      schedule();
    };
    const motionChange = () => {
      if (!motion.matches) return;
      ripples = [];
      entrance = 1;
      canvas.style.backgroundColor = "transparent";
      canvas.dataset.entrance = "complete";
      if (entranceStarted) finishEntrance();
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = null;
      clear();
    };
    const contextLost = (event) => {
      event.preventDefault();
      failed = true;
      cancelAnimationFrame(frame);
      canvas.style.visibility = "hidden";
      console.warn("Hero halftone skipped: the WebGL context was lost.");
    };
    rippleRef.current = { send };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      lastTime = null;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(canvas);
    motion.addEventListener("change", motionChange);
    canvas.addEventListener("webglcontextlost", contextLost);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", motionChange);
      canvas.removeEventListener("webglcontextlost", contextLost);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      deleteProgram();
      rippleRef.current = null;
      controlsRef.current = null;
    };
  }, [videoRef, rippleRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ backgroundColor: "#000000" }}
      data-entrance="waiting"
      aria-hidden="true"
    />
  );
};

export default HeroHalftone;
