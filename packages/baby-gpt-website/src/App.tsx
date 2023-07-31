import React, { useState, useEffect, useRef } from "react";

import { ApiResult } from "./types/types";

import AgeGroup from "./components/AgeGroup";
import Keywords from "./components/Keywords";
import QuestionAccordion from "./components/QuestionAccordion";
import { getKeywords } from "./api/get-keyword";
import { getQuestions } from "./api/get-questions";
import { AGE_GROUPS, ROLES } from "./constants/constants";
import Loading from "./components/Loading";

export default function App() {
  const bottomRef = useRef(null);
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

      scrollToBottom();
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
      scrollToBottom();
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
          age: AGE_GROUPS[selectedAgeGroupIndex],
        });

        setKeywords({
          data: kwords.keywords,
          loading: false,
          error: undefined,
        });

        scrollToBottom();
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
    //reset => TODO make a reset function
    setQuestions({
      data: undefined,
      loading: true,
      error: undefined,
    });
    scrollToBottom();

    try {
      const qns = await getQuestions({
        role: selectedRole,
        age: AGE_GROUPS[selectedAgeGroupIndex],
        keywords: selectedKeywords,
      });

      setQuestions({
        data: qns.questions,
        loading: false,
        error: undefined,
      });

      scrollToBottom();
    } catch (err) {
      setQuestions({
        data: undefined,
        loading: false,
        error: err,
      });
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="container my-5 col-lg-8 text-center">
      <div>
        <i className="bi bi-github"></i>
      </div>
      <header className="">
        <h1>Welcome to BabyGPT</h1>
        <h4>Baby FAQs powered by OpenAI GPT</h4>
      </header>
      <main className="my-5">
        <section>
          <h2>Choose your role to begin</h2>
          <div className="container col-lg-8">
            <div className=" d-flex flex-wrap justify-content-center">
              {ROLES.map((r, index) => {
                const isSelectedRole = selectedRole === r;
                return (
                  <button
                    key={index}
                    className={
                      isSelectedRole
                        ? "m-2 btn btn-primary"
                        : "m-2 btn btn-outline-primary "
                    }
                    type="button"
                    onClick={() => onRoleClick(r)}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
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
          {selectedAgeGroupIndex !== undefined &&
            toggleKeywords &&
            keywords.data && (
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
          {questions.loading && <Loading />}
          {selectedKeywords && questions.data && (
            <QuestionAccordion
              questions={questions.data}
              role={selectedRole}
              age={AGE_GROUPS[selectedAgeGroupIndex]}
              scrollToBottom={scrollToBottom}
            />
          )}
        </section>
      </main>
      <div ref={bottomRef}></div>
    </div>
  );
}
