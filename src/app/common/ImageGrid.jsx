import ImageWithLoader from "./ImageWithLoader";

function ImageGrid({ images }) {
  return (
    <div className="my-8 md:my-12 px-5 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-10">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full flex flex-col justify-center items-start"
          >
            <ImageWithLoader
              src={img.url}
              alt={img.caption || `Project image ${index + 1}`}
              width={img.width || 500}
              height={img.height || 300}
              className="w-full h-auto"
              unoptimized={typeof img.url === 'string' && img.url.endsWith('.gif')}
            />
            {img.caption && <p className="text-center mt-2">{img.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
