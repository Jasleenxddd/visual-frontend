import React, { useState, useEffect } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import Left from '../../images/align-left 1.png';
import Right from '../../images/right.png';
import Center from '../../images/align-center-horizontal 1.png';
import Image from "next/image";
const fontOptions = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Lucida Console",
  "Comic Sans MS",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Raleway",
  "Poppins",
  "Merriweather",
  "Source Sans Pro",
  "Nunito",
  "Ubuntu",
  "Playfair Display",
];

const Sidebar = ({
  selectedElement,
  heading,
  setHeading,
  subHeadings,
  setSubHeadings,
  contents,
  setContents,
}) => {
  const [styles, setStyles] = useState({});
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  

  useEffect(() => {
    if (selectedElement === "heading") {
      setStyles({ ...heading });
    } else if (selectedElement?.startsWith("subHeading")) {
      const index = parseInt(selectedElement.replace("subHeading", ""));
      setStyles({ ...subHeadings[index] });
    } else if (selectedElement?.startsWith("content")) {
      const index = parseInt(selectedElement.replace("content", ""));
      setStyles({ ...contents[index] });
    }
  }, [selectedElement, heading, subHeadings, contents]);

  const handleStyleChange = (style, value) => {
    setStyles((prevStyles) => ({ ...prevStyles, [style]: value }));

    if (selectedElement === "heading") {
      setHeading((prevHeading) => ({ ...prevHeading, [style]: value }));
    } else if (selectedElement.startsWith("subHeading")) {
      const index = parseInt(selectedElement.replace("subHeading", ""));
      const updatedSubHeadings = [...subHeadings];
      updatedSubHeadings[index] = { ...updatedSubHeadings[index], [style]: value };
      setSubHeadings(updatedSubHeadings);
    } else if (selectedElement.startsWith("content")) {
      const index = parseInt(selectedElement.replace("content", ""));
      const updatedContents = [...contents];
      updatedContents[index] = { ...updatedContents[index], [style]: value };
      setContents(updatedContents);
    }
  };

  const [activeAlignment, setActiveAlignment] = useState("");

  // Alignment Handler
  const handleAlignmentChange = (alignment) => {
    const newAlignment = activeAlignment === alignment ? "" : alignment;
    setActiveAlignment(newAlignment);
    handleStyleChange("textAlign", newAlignment || "left"); // Default to 'left' if no alignment is selected
  };

  const toggleStyle = (style) => {
    const newState = { ...activeStyles, [style]: !activeStyles[style] };
    setActiveStyles(newState);
    handleStyleChange(
      style === "bold" ? "fontWeight" : style === "italic" ? "fontStyle" : "textDecoration",
      newState[style] ? style : "normal"
    );
  };

  return (
    <div className="w-80 bg-white text-black p-6 h-screen overflow-y-auto border-r border-gray-200 shadow-lg">
      {selectedElement && (
        <>
          {/* Section Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Text</h2>

          {/* Text Alignment */}
          <div className="mb-4 flex items-center space-x-4">
  <p className="text-sm font-medium text-gray-700">Align:</p>
  <div className="flex space-x-2">
    {[{ align: "left", img: Left }, { align: "center", img: Center }, { align: "right", img: Right }].map(
      ({ align, img }) => (
        <button
          key={align}
          onClick={() => handleAlignmentChange(align)}
          className={`p-2 rounded-md hover:bg-gray-100 ${
            activeAlignment === align ? "bg-gray-300" : "bg-white"
          }`}
        >
          <Image src={img} alt={align} width={18} height={18} className="h-5 w-5" />
        </button>
      )
    )}
  </div>
</div>


          {/* Text Editor */}
<div className="mb-4">
  <p className="text-sm font-medium text-gray-700 mb-2">Edit Text</p>
  <textarea
    value={styles.text}
    onChange={(e) => handleStyleChange("text", e.target.value)}
    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none text-sm shadow-md"
    placeholder="Double click on text to edit"
    rows="3"
  />
</div>

{/* Font Selector */}
<select
  value={styles.font}
  onChange={(e) => handleStyleChange("font", e.target.value)}
  className="w-full mb-2 p-3 border border-gray-200 rounded-lg bg-white text-sm shadow-md"
>
  {fontOptions.map((font) => (
    <option key={font} value={font}>
      {font}
    </option>
  ))}
</select>

{/* Font Size & Weight */}
<div className="flex items-center space-x-2 mb-2">
  <select
    value={styles.fontWeight || "Medium"}
    onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
    className="w-1/2 p-3 border border-gray-200 rounded-lg bg-white text-sm shadow-md"
  >
    <option value="Normal">Normal</option>
    <option value="Medium">Medium</option>
    <option value="Bold">Bold</option>
  </select>

  <div className="flex items-center border border-gray-200 rounded-lg shadow-md bg-white">
    <button
      onClick={() => handleStyleChange("size", Math.max((styles.size || 16) - 1, 8))}
      className="px-4 py-3 text-sm"
    >
      -
    </button>
    <input
      type="number"
      value={styles.size || 16}
      onChange={(e) => handleStyleChange("size", e.target.value)}
      className="w-12 text-center border-l border-r border-gray-200 text-sm bg-white"
    />
    <button
      onClick={() => handleStyleChange("size", (styles.size || 16) + 1)}
      className="px-4 py-3 text-sm"
    >
      +
    </button>
  </div>
</div>

{/* Other Controls */}
<div className="flex items-center space-x-1 w-2/3 mb-4 border border-gray-200 rounded-lg shadow-md bg-white p-1">
  <button
    onClick={() => toggleStyle("bold")}
    className={`p-2 rounded-md hover:bg-gray-100 flex items-center justify-center w-10 h-10 ${
      activeStyles.bold ? "bg-gray-300" : "bg-white"
    }`}
  >
    <Bold size={18} />
  </button>
  <button
    onClick={() => toggleStyle("italic")}
    className={`p-2 rounded-md hover:bg-gray-100 flex items-center justify-center w-10 h-10 ${
      activeStyles.italic ? "bg-gray-300" : "bg-white"
    }`}
  >
    <Italic size={18} />
  </button>
  <button
    onClick={() => toggleStyle("underline")}
    className={`p-2 rounded-md hover:bg-gray-100 flex items-center justify-center w-10 h-10 ${
      activeStyles.underline ? "bg-gray-300" : "bg-white"
    }`}
  >
    <Underline size={18} />
  </button>
</div>



        </>
      )}
    </div>
  );
};

export default Sidebar;
