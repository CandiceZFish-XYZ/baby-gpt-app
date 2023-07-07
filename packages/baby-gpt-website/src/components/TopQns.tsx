import React from "react";

export default function TopQns() {
  const qa = [
    {
      qns: "Question 1 blablabla",
      ans: "Ans 1 o style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also wort",
    },
    {
      qns: "Question 2 blablabla",
      ans: "Ans 2 oting that just about any HTML can go within the .accordion-body, though the transition does limi",
    },
    {
      qns: "Question 3 blablabla",
      ans: "Ans 3 blabhile the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the labla",
    },
  ];

  return (
    <section className="my-5">
      <h2>Top Q&A for your business</h2>
      <div className="accordion" id="accordionExample">
        {qa.map((entry, index) => (
          <AccordionItem key={index} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
}

const AccordionItem = ({ entry, index }) => {
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
          {entry["qns"]}
        </button>
      </h2>
      <div
        id={index}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{entry["ans"]}</div>
      </div>
    </div>
  );
};
