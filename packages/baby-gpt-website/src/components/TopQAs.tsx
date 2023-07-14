import React from "react";

export default function TopQAs({ qaList }) {
  return (
    <section className="my-5">
      <h2>Top Q&A for selected keywords:</h2>
      <div className="accordion" id="accordionExample">
        {qaList.map((entry, index) => (
          <AccordionItem key={index} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
}

const AccordionItem = ({ key, entry, index }) => {
  let id = "#" + index;
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={id}
          aria-expanded="false"
          aria-controls={index}
        >
          {entry["question"]}
        </button>
      </h2>
      <div
        id={index}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{entry["answer"]}</div>
      </div>
    </div>
  );
};
