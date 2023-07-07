import React from "react";

export default function Keywords({ role, keywords }) {
  console.log("keywords: ", keywords);
  return (
    <section className="my-5">
      <p>Pick top 3 keyword for consideration as a {role}</p>
      <label className="m-1 btn btn-secondary">Keyword-1</label>
      <label className="m-1 btn btn-secondary">Keyword-2</label>
      {/* {keywords &&
        keywords.map((kword: string, index: number) => (
          <label key={index} className="m-1 btn btn-secondary">
            {kword}
          </label>
        ))} */}
    </section>
  );
}
