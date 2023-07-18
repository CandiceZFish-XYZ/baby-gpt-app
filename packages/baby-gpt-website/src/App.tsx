import React, { useState, useEffect } from "react";

import * as Constants from "./constants/Constants";
import { ApiResult } from "./types/types";

import AgeGroup from "./components/AgeGroup";
import Keywords from "./components/Keywords";
import TopQuestions from "./components/TopQuestions";
import { getQuestions } from "./api/get-questions";
import { getKeywords } from "./api/get-keyword";

export default function App() {
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );

  const [toggleAgeGroup, setToggleAgeGroup] = useState<boolean | undefined>(
    undefined
  );
  const [selectedAgeGroupIndex, setSelectedAgeGroupIndex] = useState<
    number | undefined
  >(undefined);

  const [toggleKeywords, setToggleKeywords] = useState<boolean | undefined>(
    undefined
  );
  const [keywords, setKeywords] = useState<ApiResult<string[]>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const [selectedKeywords, setSelectedKeywords] = useState<
    Set<string> | undefined
  >([]);

  const [questions, setQuestions] = useState<ApiResult<string[]>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const onRoleClick = (r: string): void => {
    if (!selectedRole || r !== selectedRole) {
      setSelectedRole(r);
      setToggleAgeGroup(true);
      // reset rest
      setSelectedAgeGroupIndex(undefined);
      setKeywords({
        data: undefined,
        loading: false,
        error: undefined,
      });
      setSelectedKeywords(undefined);
      setQuestions({
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

  const onAgeGroupClick = (ag: number): void => {
    if (!selectedAgeGroupIndex || ag !== selectedAgeGroupIndex) {
      setSelectedAgeGroupIndex(ag);
      setToggleKeywords(true);
      // reset rest
      setKeywords({
        data: undefined,
        loading: true,
        error: undefined,
      });
      setSelectedKeywords(undefined);
      setQuestions({
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

  useEffect(() => {
    const fetchKeywords = async () => {
      if (selectedAgeGroupIndex === undefined) {
        return;
      }

      try {
        const kwords = await getKeywords({
          role: selectedRole,
          age: Constants.AGE_GROUPS[selectedAgeGroupIndex],
        });
        console.log("Returned from API: ", kwords);
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
      }
    };
    fetchKeywords();
  }, [selectedAgeGroupIndex]);

  const onKeywordClick = (kword) => {
    setSelectedKeywords((prev) => {
      if (prev === undefined) {
        return new Set([kword]);
      }

      const curr = new Set(prev);
      if (prev.has(kword)) {
        curr.delete(kword);
      } else {
        curr.add(kword);
      }

      return curr;
    });
  };

  const onGetQuestions = async () => {
    console.log("Calling Questions API...");

    //reset
    setQuestions({
      data: undefined,
      loading: true,
      error: undefined,
    });

    try {
      const qns = await getQuestions({
        role: selectedRole,
        age: Constants.AGE_GROUPS[selectedAgeGroupIndex],
        keywords: selectedKeywords,
      });

      console.log("From API: ", qns);
      console.log("QNS 0: ", qns[0]);

      setQuestions({
        data: qns,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      setQuestions({
        data: undefined,
        loading: false,
        error: err,
      });
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
          {Constants.ROLES.map((r, index) => {
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
              selectedAgeGroupIndex={selectedAgeGroupIndex}
              onAgeGroupClick={onAgeGroupClick}
            />
          )}
        </section>
        <section>
          {keywords.loading && <Loading section="keywords" />}
          {selectedAgeGroupIndex && toggleKeywords && keywords.data && (
            <Keywords
              role={selectedRole}
              selectedAgeGroupIndex={selectedAgeGroupIndex}
              keywords={keywords}
              selectedKeywords={selectedKeywords}
              onKeywordClick={onKeywordClick}
              onGetQuestions={onGetQuestions}
            />
          )}
        </section>
        <section>
          {questions.loading && <Loading section="Questions" />}
          {selectedKeywords && questions.data && (
            <TopQuestions questionList={questions.data} />
          )}
        </section>
      </main>
    </div>
  );
}

const Loading = ({ section }) => {
  return <p>Loading for seciton {section}...(takes 1-4 s)</p>;
};
