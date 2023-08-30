import React, { useState } from "react";
import DisplayContent from "../displayContent/displayContent";
import "../displayContent/displayContent.css";

const TableCell = ({ content }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <td
        className="display-content"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {hover ? <DisplayContent content={content} /> : content}
      </td>
    </>
  );
};

export default TableCell;
