import React, { useState } from "react";
import { ApiResult, AccordionItemProps } from "../types/types";
import { getAnswer } from "../api/get-answer";
import Loading from "./Loading";

export default function AccordionItem(props: AccordionItemProps) {
  const [answer, setAnswer] = useState<ApiResult<string>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const onGetAnswer = async () => {
    if (answer.data !== undefined) {
      return;
    }

    //reset
    setAnswer({
      data: undefined,
      loading: true,
      error: undefined,
    });

    props.scrollToBottom();

    try {
      const ans = await getAnswer({
        role: props.role,
        age: props.age,
        question: props.question,
      });

      setAnswer({
        data: ans.answer,
        loading: false,
        error: undefined,
      });
      props.scrollToBottom();
    } catch (err) {
      setAnswer({
        data: undefined,
        loading: false,
        error: err,
      });
    }
  };

  let id = "#" + props.index;
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={id}
          aria-expanded="false"
          aria-controls={props.index}
          onClick={onGetAnswer}
        >
          {props.question}
        </button>
      </h2>
      <div
        id={props.index}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body text-start">
          {answer.loading && <Loading />}
          {answer.data && <p>{answer.data}</p>}
        </div>
      </div>
    </div>
  );
}
