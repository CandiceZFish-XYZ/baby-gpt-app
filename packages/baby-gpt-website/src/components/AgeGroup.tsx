import React from "react";
import { AGE_GROUPS } from "../constants/constants";

export default function AgeGroup({ selectedAgeGroupIndex, onAgeGroupClick }) {
  return (
    <section className="my-5">
      <p>Choose the age group of your child</p>
      <div>
        {AGE_GROUPS.map((ag, index: number) => {
          const isSelectedAG = selectedAgeGroupIndex === index;
          return (
            <label
              key={index}
              className={
                isSelectedAG
                  ? "m-1 btn btn-primary"
                  : "m-1 btn btn-outline-primary"
              }
              onClick={() => {
                onAgeGroupClick(index);
              }}
            >
              {ag}
            </label>
          );
        })}
      </div>
    </section>
  );
}
