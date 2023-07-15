import React, { useState, useEffect } from "react";

import AgeGroup from "./components/AgeGroup";
import Keywords from "./components/Keywords";
import TopQuestions from "./components/TopQuestions";
import { getQuestions } from "./api/get-questions";
import { getKeywords } from "./api/get-keyword";

// TODO: Move to constants
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

const ageGroups: string[] = [
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

  // TODO: Change to Set
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

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
      setSelectedKeywords([]);
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
      setSelectedKeywords([]);
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
          age: ageGroups[selectedAgeGroupIndex],
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
      if (!prev.includes(kword)) {
        console.log("Selected keyword: ", kword);
        return [...prev, kword];
      } else {
        console.log("Un-selected keyword: ", kword);
        return prev.filter((word) => word !== kword);
      }
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
        age: ageGroups[selectedAgeGroupIndex],
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
              ageGroups={ageGroups}
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
              ageGroups={ageGroups}
              keywords={keywords}
              selectedKeywords={selectedKeywords}
              onKeywordClick={onKeywordClick}
              onGetQuestions={onGetQuestions}
            />
          )}
        </section>
        <section>
          {questions.loading && <Loading section="Questions" />}
          {selectedKeywords.length > 0 && questions.data && (
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
