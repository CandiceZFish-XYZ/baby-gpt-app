import React, { useState, useEffect } from "react";

import AgeGroup from "./components/AgeGroup";
import Keywords from "./components/Keywords";
import TopQAs from "./components/TopQAs";

import { GetDelay, MockKeywords, MockQAs } from "./utility/MockAPI";

const ROLES = [
  "Dad",
  "Mom",
  "Grandma",
  "Grandpa",
  "Big sister",
  "Big brother",
  "Younger sister",
  "Younger brother",
  "Care-giver",
  "Teacher (educational)",
];
// more:  "Great Grandma", "Great Grandpa", "Uncle", "Auntie"

const AG: string[] = [
  "newborn",
  "3 m - 1 yr",
  "1 yr - 3 yr",
  "3 yr - 5 yr",
  "5 yr - 12 yr",
  "12 yr - 14 yr",
  "14 yr - 16 yr",
  "16 yr - 18 yr",
];

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

  const [toggleAgeGroup, setToggleAgeGroup] = useState<boolean | undefined>(
    undefined
  );
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | undefined>(
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

  const [qas, setQas] = useState<ApiResult<string[]>>({
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

  const onRoleClick = (r: string): void => {
    if (!selectedRole || r !== selectedRole) {
      setSelectedRole(r);
      setToggleAgeGroup(true);
      // reset rest
      setSelectedAgeGroup(undefined);
      setKeywords({
        data: undefined,
        loading: false,
        error: undefined,
      });
      setSelectedKeywords([]);
      setQas({
        data: undefined,
        loading: false,
        error: undefined,
      });
      return;
    }

    //toggle
    if (!toggleAgeGroup) {
      setToggleAgeGroup(true);
    } else {
      setToggleAgeGroup((prev) => !prev);
    }
  };

  const onAgeGroupClick = (ag: string): void => {
    if (!selectedAgeGroup || ag !== selectedAgeGroup) {
      setSelectedAgeGroup(ag);
      setToggleKeywords(true);
      // reset rest
      setKeywords({
        data: undefined,
        loading: true,
        error: undefined,
      });
      setSelectedKeywords([]);
      setQas({
        data: undefined,
        loading: false,
        error: undefined,
      });
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
      const res = await callMockAPI(MockKeywords);
      setKeywords({
        data: res,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      setKeywords({
        data: undefined,
        loading: false,
        error: err,
      });
      console.error("Keywords API Error:", err);
    }
  };

  useEffect(() => {
    if (selectedAgeGroup === undefined) {
      return;
    }

    fetchKeywords();
  }, [selectedAgeGroup]);

  const onKeywordClick = (kword) => {
    if (!selectedKeywords.includes(kword)) {
      setSelectedKeywords((prev) => [...prev, kword]);
      console.log("Selected keyword: ", kword);
    } else {
      setSelectedKeywords((prev) => prev.filter((word) => word !== kword));
      console.log("Un-selected keyword: ", kword);
    }
  };

  const fetchQAs = async () => {
    //reset
    setQas({
      data: undefined,
      loading: true,
      error: undefined,
    });

    //fetch
    try {
      const res = await callMockAPI(MockQAs);
      setQas({
        data: res,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      setQas({
        data: undefined,
        loading: false,
        error: err,
      });
      console.error("QA API Error:", err);
    }
  };

  return (
    <div className="m-5">
      <header>
        <h1>Welcome</h1>
      </header>
      <main>
        <section className="my-5">
          <h2>Choose your role to begin</h2>
          {ROLES.map((r, index) => {
            const isSelectedRole = selectedRole === r;
            return (
              <button
                key={index}
                className={
                  isSelectedRole
                    ? "m-1 btn btn-primary"
                    : "m-1 btn btn-outline-primary"
                }
                type="button"
                onClick={() => onRoleClick(r)}
              >
                {r}
              </button>
            );
          })}
        </section>
        <section>
          {selectedRole && toggleAgeGroup && (
            <AgeGroup
              ageGroups={AG}
              selectedAgeGroup={selectedAgeGroup}
              onAgeGroupClick={onAgeGroupClick}
            />
          )}
        </section>
        <section>
          {keywords.loading && <Loading section="keywords" />}
          {selectedAgeGroup && toggleKeywords && keywords.data && (
            <Keywords
              role={selectedRole}
              selectedAgeGroup={selectedAgeGroup}
              keywords={keywords}
              selectedKeywords={selectedKeywords}
              onKeywordClick={onKeywordClick}
              fetchQAs={fetchQAs}
            />
          )}
        </section>
        <section>
          {qas.loading && <Loading section="QAs" />}
          {selectedKeywords.length > 0 && qas.data && (
            <TopQAs qaList={qas.data} />
          )}
        </section>
      </main>
    </div>
  );
}

const Loading = ({ section }) => {
  return <p>Loading for seciton {section}...(takes 1-4 s)</p>;
};
