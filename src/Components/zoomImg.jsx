import { useRef } from "react";

export default function ZoomImage({ src }) {
  const imgRef = useRef();

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div
      className="overflow-hidden w-full max-w-[600px] h-[400px] mx-auto border rounded shadow-lg"
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Zoom"
        className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-150"
      />
    </div>
  );
}