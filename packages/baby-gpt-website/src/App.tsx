import React, { useState, useEffect } from "react";

import AgeGroup from "./components/AgeGroup";
import Keywords from "./components/Keywords";
import TopQAs from "./components/TopQAs";
import { getQuestions } from "./api/get-qas";

const DEV_API = "http://localhost:8081";

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

type AgeRange = {
  id: number;
  label: string;
  fromAge: number;
  toAge: number;
};

// const AG: string[] = [
//   "newborn",
//   "3 m - 1 yr",
//   "1 yr - 3 yr",
//   "3 yr - 5 yr",
//   "5 yr - 12 yr",
//   "12 yr - 14 yr",
//   "14 yr - 16 yr",
//   "16 yr - 18 yr",];

const ageGroups: AgeRange[] = [
  { id: 0, label: "newborn", fromAge: 0, toAge: 3 },
  { id: 1, label: "3 m - 1 yr", fromAge: 3, toAge: 12 },
  { id: 2, label: "1 yr - 3 yr", fromAge: 12, toAge: 36 },
  { id: 3, label: "3 yr - 5 yr", fromAge: 36, toAge: 60 },
  { id: 4, label: "5 yr - 12 yr", fromAge: 60, toAge: 144 },
  { id: 5, label: "12 yr - 14 yr", fromAge: 144, toAge: 168 },
  { id: 6, label: "14 yr - 16 yr", fromAge: 168, toAge: 192 },
  { id: 7, label: "16 yr - 18 yr", fromAge: 192, toAge: 216 },
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
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<number | undefined>(
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

  const onAgeGroupClick = (ag: number): void => {
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
    console.log("Calling keywords API...");

    const queryStringParams = {
      role: selectedRole,
      age: [
        ageGroups[selectedAgeGroup].fromAge,
        ageGroups[selectedAgeGroup].toAge,
      ],
    };
    const queryString = formatQueryString(queryStringParams);
    try {
      let res = await fetch(`${DEV_API}/api/keywords?${queryString}`);
      let jres = await res.json();
      let jk = jres.message.keywords;
      console.log(jk);
      setKeywords({
        data: jk,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      setKeywords({
        data: undefined,
        loading: false,
        error: err,
      });
      console.log("Keywords API Error: ", err);
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
    console.log("Calling QA API...");

    //reset
    setQas({
      data: undefined,
      loading: true,
      error: undefined,
    });

    try {
      const questions = await getQuestions({
        role: selectedRole,
        age: [
          ageGroups[selectedAgeGroup].fromAge,
          ageGroups[selectedAgeGroup].toAge,
        ],
        keywords: selectedKeywords,
      });

      console.log(questions);

      setQas({
        data: questions,
        loading: false,
        error: undefined,
      });
    } catch (error) {
      setQas({
        data: undefined,
        loading: false,
        error: error,
      });
    }
  };

  const [testHelloWorld, setTestHelloWorld] = useState("NA");
  const [testKeywords, setTestKeywords] = useState(["NA"]);

  const formatQueryString = (paramObject) => {
    return Object.entries(paramObject)
      .flatMap(([key, values]) =>
        Array.isArray(values)
          ? values.map(
              (value) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
          : `${encodeURIComponent(key)}=${encodeURIComponent(values)}`
      )
      .join("&");
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
              ageGroups={ageGroups}
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
