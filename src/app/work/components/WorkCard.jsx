"use client";
import Image from "next/image";
import { IMAGES } from "@/app/assets/images";
import { useRouter } from "next/navigation";

const WorkCard = () => {
  const router = useRouter();

  return (
    <div
      className="hover:border-b cursor-pointer pb-1"
      onClick={() => router.push("/work-detail")}
    >
      <Image src={IMAGES.STEMPORT} alt="stemport gif" className="thumbnail" />
      <div className="flex justify-between font-light text-xs border-b-mute border-b py-2">
        <div>Role: UX/UI Designer</div>
        <div>Time: Spring 2023</div>
      </div>
      <h1 className="text-3xl font-sprat py-2">The Spatial Age</h1>
      <h2 className="font-sprat text-lg pb-1">
        How spatialization is redefining our reality, memory, and experience
      </h2>
      <p className="text-xs text-mute">
        Tool: Unity, Blender, Unreal Engine, Instant-ngp
      </p>
    </div>
  );
};

export default WorkCard;
