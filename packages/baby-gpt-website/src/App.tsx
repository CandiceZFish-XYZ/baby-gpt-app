import React, { useState, useEffect } from "react";

import Keywords from "./components/Keywords";
import TopQns from "./components/TopQns";

import { GetDelay, MockRole, MockKeywords, MockQns } from "./utility/MockAPI";

const ROLES = ["Founder", "CTO", "Builder", "CFO"];

// data & loading for next section!
type ApiResult<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function App() {
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );

  const [toggleKeywords, setToggleKeywords] = useState<boolean | undefined>(
    undefined
  );

  const [keywords, setKeywords] = useState<ApiResult<string[]>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const [qa, setQa] = useState<ApiResult<string[]>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const callMockAPI = async (func: Function) => {
    let delay = GetDelay();
    console.log("Loading...takes 1-4s");
    const res = await func(delay);
    console.log("Data loaded in ", delay, "s.");
    return res;
  };

  const onRoleClick = async (r: string): Promise<void> => {
    if (!selectedRole || r !== selectedRole) {
      setSelectedRole(r);
      setToggleKeywords(true);
      return;
    }

    //toggle
    if (!toggleKeywords) {
      setToggleKeywords(true);
    } else {
      setToggleKeywords((prev) => !prev);
    }
  };

  const fetchKeywords = async () => {
    try {
      const kwords = await callMockAPI(MockKeywords);
      setKeywords({
        data: kwords,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      setKeywords({
        data: undefined,
        loading: false,
        error: err,
      });
      console.error("API Error:", err);
    }
  };

  useEffect(() => {
    if (selectedRole === undefined) {
      return;
    }

    // reset keywords and questions
    setKeywords({
      data: undefined,
      loading: true,
      error: undefined,
    });
    setQa({
      data: undefined,
      loading: false,
      error: undefined,
    });
    fetchKeywords();
  }, [selectedRole]);

  return (
    <div className="m-5">
      <header>
        <h1>Welcome</h1>
      </header>
      <main>
        <section className="my-5">
          <h2>Choose one role to begin</h2>
          {ROLES.map((r, index) => (
            <button
              key={index}
              className="m-1 btn btn-primary"
              type="button"
              onClick={() => onRoleClick(r)}
            >
              {r}
            </button>
          ))}
        </section>
        {keywords.loading && <Loading section="keywords" />}
        {selectedRole && toggleKeywords && keywords.data && (
          <Keywords role={selectedRole} keywords={keywords} />
        )}
        {/* <TopQns /> */}
      </main>
    </div>
  );
}

const Loading = ({ section }) => {
  return <p>Loading for seciton {section}...(takes 1-4 s)</p>;
};
