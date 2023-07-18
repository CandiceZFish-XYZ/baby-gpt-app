import React from "react";
import { AGE_GROUPS } from "../constants/Constants";

export default function Keywords({
  role,
  selectedAgeGroupIndex,
  keywords,
  selectedKeywords,
  onKeywordClick,
  onGetQuestions,
}) {
  return (
    <section className="my-5">
      <p>
        Pick the keyword that is most concerned as a caring {role} for a child
        of age {AGE_GROUPS[selectedAgeGroupIndex]} old.
      </p>
      <div>
        {keywords.data.map((kword: string, index: number) => {
          const isSelectedKword: boolean = selectedKeywords
            ? selectedKeywords.has(kword)
            : false;
          return (
            <label
              key={index}
              className={
                isSelectedKword
                  ? "m-1 btn btn-secondary"
                  : "m-1 btn btn-outline-secondary"
              }
              onClick={() => {
                onKeywordClick(kword);
              }}
            >
              {kword}
            </label>
          );
        })}
      </div>
      {selectedKeywords && (
        <button className="m-1 btn btn-info" onClick={onGetQuestions}>
          Continue
        </button>
      )}
    </section>
  );
}
