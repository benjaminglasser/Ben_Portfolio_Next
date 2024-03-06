function ImageGrid({ images }) {
  return (
    <div className="mx-auto my-8 md:my-12 md:w-3/5">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "items-start" : "items-end"
            }`}
          >
            <img
              src={image.url}
              alt={image.caption}
              loading="lazy"
              className="max-w-xs shadow-lg"
            />
            <p className="text-center mt-2">{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
