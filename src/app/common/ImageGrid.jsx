function ImageGrid({ images }) {
  return (
    <div className="mx-auto my-8 md:my-12 md:w-3/5">
      {images.map((image, index) => (
        <div
          key={index}
          className={`flex ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          } mb-4`}
          //   style={{ marginTop: `${index * 0.03}rem` }} // Incremental offset
        >
          <div className="flex flex-col items-start">
            <img src={image.url} alt={image.caption} className="max-w-lg" />{" "}
            {/* Adjust max-w-xs for smaller images */}
            <h2 className="mt-2">{image.title}</h2>
            <p className="mt-2">{image.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
