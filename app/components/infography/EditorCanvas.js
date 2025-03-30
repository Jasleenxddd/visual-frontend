import React, { useRef, useState } from "react";

const EditorCanvas = ({
  backgroundImage,
  selectedElement,
  setSelectedElement,
  imageWidth,
  imageHeight,
  heading,
  subHeadings,
  contents,
}) => {
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragElement, setDragElement] = useState(null);
  const [positions, setPositions] = useState({
    heading: { top: 30, left: 20 },
    subHeadings: subHeadings.map((_, index) => ({
      top: 180 + index * 180,
      left: 20,
    })),
    contents: contents.map((_, index) => ({
      top: 220 + index * 180,
      left: 20,
    })),
  });
  const canvasStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: imageWidth / 2,
    height: imageHeight / 2,
    marginTop: "40vh",
    position: "relative",
    backgroundRepeat: "no-repeat",
  };

  const getAlignmentStyle = (textAlign) => {
    switch (textAlign) {
      case "center":
        return {
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "right":
        return {
          right: "20px",
          left: "auto",
          transform: "none",
        };
      case "left":
      default:
        return {
          left: "20px",
          transform: "none",
        };
    }
  };
  
  const headingStyle = {
    position: "absolute",
    fontSize: `${heading.size}px`,
    fontFamily: heading.font,
    color: heading.color,
    fontWeight: heading.fontWeight,
    fontStyle: heading.fontStyle,
    textAlign: heading.textAlign,
    top: "30px",
    ...getAlignmentStyle(heading.textAlign),
    cursor: "move",

  };
  
  const subHeadingStyle = (index) => ({
    position: "absolute",
    fontSize: `${subHeadings[index]?.size || 24}px`,
    fontFamily: subHeadings[index]?.font || "Arial",
    color: subHeadings[index]?.color || "#000",
    fontWeight: subHeadings[index]?.fontWeight || "normal",
    fontStyle: subHeadings[index]?.fontStyle || "normal",
    textAlign: subHeadings[index]?.textAlign || "left",
    top: `${180 + index * 180}px`,
    ...getAlignmentStyle(subHeadings[index]?.textAlign),
    cursor: "move",

  });
  
  const contentStyle = (index) => ({
    position: "absolute",
    fontSize: `${contents[index]?.size || 16}px`,
    fontFamily: contents[index]?.font || "Arial",
    color: contents[index]?.color || "#000",
    fontWeight: contents[index]?.fontWeight || "normal",
    fontStyle: contents[index]?.fontStyle || "normal",
    textAlign: contents[index]?.textAlign || "left",
    top: `${220 + index * 180}px`,
    ...getAlignmentStyle(contents[index]?.textAlign),
    cursor: "move",

  });
  

  const handleElementClick = (elementName) => {
    setSelectedElement(elementName);
  };
  const startDrag = (e, elementType, index = null) => {
    setDragging(true);
    setDragElement({ type: elementType, index });
  };

  const handleMouseMove = (e) => {
    if (!dragging || !dragElement) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newPositions = { ...positions };

    if (dragElement.type === "heading") {
      newPositions.heading = {
        top: e.clientY - canvasRect.top - 20,
        left: e.clientX - canvasRect.left - 50,
      };
    } else if (dragElement.type === "subHeading") {
      newPositions.subHeadings[dragElement.index] = {
        top: e.clientY - canvasRect.top - 20,
        left: e.clientX - canvasRect.left - 50,
      };
    } else if (dragElement.type === "content") {
      newPositions.contents[dragElement.index] = {
        top: e.clientY - canvasRect.top - 20,
        left: e.clientX - canvasRect.left - 50,
      };
    }
    setPositions(newPositions);
  };

  const endDrag = () => {
    setDragging(false);
    setDragElement(null);
  };


  return (
    <div className="text-black p-8 mt-14 pt-16 h-screen fixed top-0 right-0 w-3/4 overflow-auto flex items-center justify-center"
    onMouseMove={handleMouseMove}
    onMouseUp={endDrag}

    >
      {backgroundImage && (
        <div ref={canvasRef} style={canvasStyle}>
          {heading && (
            <div
              style={headingStyle}
              onClick={() => handleElementClick("heading")}
              onMouseDown={(e) => startDrag(e, "heading")}

            >
              <h1>{heading.text}</h1>
            </div>
          )}
          {subHeadings.map((subHeading, index) => (
            <div
              key={`subHeading${index}`}
              style={subHeadingStyle(index)}
              onClick={() => handleElementClick(`subHeading${index}`)}
              onMouseDown={(e) => startDrag(e, "subHeading", index)}

            >
              <h2>{subHeading.text}</h2>
            </div>
          ))}
          {contents.map((content, index) => (
            <div
              key={`content${index}`}
              style={contentStyle(index)}
              onClick={() => handleElementClick(`content${index}`)}
              onMouseDown={(e) => startDrag(e, "content", index)}

            >
              <p>{content.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;
