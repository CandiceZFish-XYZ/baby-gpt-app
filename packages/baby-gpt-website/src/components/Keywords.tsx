import React from "react";

export default function Keywords({
  role,
  selectedAgeGroup,
  ageGroups,
  keywords,
  selectedKeywords,
  onKeywordClick,
  fetchQAs,
}) {
  return (
    <section className="my-5">
      <p>
        Pick top 3 keyword for consideration as a {role} for age{" "}
        {ageGroups[selectedAgeGroup].label}
      </p>
      <div>
        {keywords.data.map((kword: string, index: number) => {
          const isSelectedKword = selectedKeywords.includes(kword);
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
      {selectedKeywords.length > 0 && (
        <button className="m-1 btn btn-info" onClick={fetchQAs}>
          Continue
        </button>
      )}
    </section>
  );
}
