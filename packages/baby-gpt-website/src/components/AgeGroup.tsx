import React from "react";

export default function AgeGroup({
  ageGroups,
  selectedAgeGroup,
  onAgeGroupClick,
}) {
  return (
    <section className="my-5">
      <p>Choose the age group of your child</p>
      <div>
        {ageGroups.map((ag, index: number) => {
          const isSelectedAG = selectedAgeGroup === ag.id;
          return (
            <label
              key={index}
              className={
                isSelectedAG
                  ? "m-1 btn btn-primary"
                  : "m-1 btn btn-outline-primary"
              }
              onClick={() => {
                onAgeGroupClick(ag.id);
              }}
            >
              {ag.label}
            </label>
          );
        })}
      </div>
    </section>
  );
}
