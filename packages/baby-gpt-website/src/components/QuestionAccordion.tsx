import React from "react";
import AccordionItem from "./AccordionItem";
import { TopQuestionsProps } from "../types/types";

export default function QuestionAccordion(props: TopQuestionsProps) {
  return (
    <section className="my-5">
      <h2>Top Q&A for selected keywords:</h2>
      <div className="accordion" id="accordionExample">
        {props.questions.map((entry, index) => (
          <AccordionItem
            key={index}
            index={index}
            role={props.role}
            age={props.age}
            question={entry}
          />
        ))}
      </div>
    </section>
  );
}
