import React from "react";

export default function TopQuestions({ questionList, onGetAnswer, answer }) {
  return (
    <section className="my-5">
      <h2>Top Q&A for selected keywords:</h2>
      <div className="accordion" id="accordionExample">
        {questionList.map((entry, index) => (
          <AccordionItem
            key={index}
            entry={entry}
            index={index}
            onGetAnswer={onGetAnswer}
            answer={answer}
          />
        ))}
      </div>
    </section>
  );
}

const AccordionItem = ({ key, entry, index, onGetAnswer, answer }) => {
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
          onClick={() => {
            onGetAnswer(entry);
          }}
        >
          {entry}
        </button>
      </h2>
      <div
        id={index}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          {answer.loading && <p>Loading...</p>}
          {answer.data && <p>{answer.data}</p>}
        </div>
      </div>
    </div>
  );
};
