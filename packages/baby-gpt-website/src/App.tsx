import React, { useState, useEffect } from "react";

import Keywords from "./components/Keywords";
import TopQns from "./components/TopQns";

import { GetDelay, MockRole, MockKeywords, MockQns } from "./utility/MockAPI";

const ROLES = ["Founder", "CTO", "Builder", "CFO"];

type ApiResult<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

export default function App() {
  const [role, setRole] = useState<ApiResult<string>>({
    data: undefined,
    loading: false,
    error: undefined,
  });
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );

  const onRoleClick = async (r: string): Promise<void> => {
    if (!role.data || (selectedRole && r !== selectedRole) || role.data !== r) {
      setRole((prev) => ({ ...prev, loading: true }));
      await callMockAPI(MockRole);
      // where is error??
      setRole((prev) => ({
        ...prev,
        data: r,
        loading: false,
        error: undefined,
      }));
      setSelectedRole(r);
      return;
    }

    //toggle
    if (selectedRole) {
      setSelectedRole(undefined);
    } else {
      setSelectedRole(r);
    }
  };

  const callMockAPI = async (func: Function) => {
    let delay = GetDelay();
    console.log("Loading...takes 1-4s");
    const res = await func(delay);
    console.log("Data loaded in ", delay, "s.");
    return res;
  };

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

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const kwords = await callMockAPI(MockKeywords);
        setKeywords(kwords);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    // reset keywords and questions
    setKeywords({
      data: undefined,
      loading: false,
      error: undefined,
    });
    setQa({
      data: undefined,
      loading: false,
      error: undefined,
    });
    // 1. const keywords = await getKeywords(role)
    // 2. setKeywords(keywords)
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
        {role.loading && <Loading />}
        {!role.loading && selectedRole && role.data && (
          <Keywords role={selectedRole} keywords={keywords} />
        )}
        {/* <TopQns /> */}
      </main>
    </div>
  );
}

const Loading = () => {
  return <p>Loading...(takes 1-4 s)</p>;
};
