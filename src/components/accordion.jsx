"use client";

import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Accordion = ({ title, info }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white border rounded-lg">
      <header
        onClick={() => setExpanded(!expanded)}
        className="p-2  flex justify-between items-center cursor-pointer select-none"
      >
        <h4 className="font-medium ">{title}</h4>
        <button className="btn">
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {expanded && <div className="p-2">{info}</div>}
    </article>
  );
};

export default Accordion;
