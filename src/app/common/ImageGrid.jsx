import Image from "next/image";

function ImageGrid({ images }) {
  return (
    <div className="my-8 md:my-12 px-5 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-10">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full flex flex-col justify-center items-start"
          >
            <Image
              src={img.url}
              alt={img.caption}
              width={img.width || 500} // Use image-specific width, defaulting to 500 if not provided
              height={img.height || 300} // Use image-specific height, defaulting to 300 if not provided
              layout="responsive"
              objectFit="cover" // Adjust as needed
            />
            <p className="text-center mt-2">{img.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
