import { useState } from "react";
import Button from "./Button";

interface Quiz {
  icon: string;
  title: string;
}
interface Question {
  question: string;
  answer: string;
  options: string[];
}
interface Props {
  quizzes: Quiz[];
  selectedTitle: string;
  question: Question[];
  nextQuestion: (count: Number) => void;
  getOptionsContent: (title: string) => void;
  countCorrectAns: (ans: number) => void;
}

const Options = ({
  quizzes,
  selectedTitle,
  question,
  getOptionsContent,
  nextQuestion,
  countCorrectAns,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  let [questionsCount, setQuestionsCount] = useState(0);
  const [receivedAns, setReceivedAns] = useState("");
  const [submittedAns, setSubmittedAns] = useState("");
  let [correctAns, setCorrectAns] = useState(0);
  const [isCorrect, setIsCorrect] = useState("");

  const choiceLetters = ["A", "B", "C", "D"];

  // receiving the text content from the button
  function HandleGetAnswers(ans = "", index) {
    setReceivedAns(ans);
    setSelectedIndex(Number(index));
  }

  // If the user selects the wrong answer to show him the right answer
  const showCorrectAnsAfterSubmit = function (el) {
    if (!submittedAns) return;

    return question[questionsCount]?.answer === el
      ? "border-3 border-green-500"
      : "";
  };

  // To show the user what he chooses is right or wrong
  function showCorrectAns(i) {
    if (isCorrect === "correct" && i === selectedIndex) {
      return "border-green-500 border-3";
    } else if (isCorrect === "wrong" && i === selectedIndex) {
      return "border-red-500 border-3";
    }
  }

  // When the user submits the answer
  function handleCheckCorrectness() {
    if (receivedAns) {
      if (question[questionsCount]?.answer === receivedAns) {
        setCorrectAns((correctAns += 1));
        setIsCorrect("correct");
        // showCorrectAns();
      } else {
        setIsCorrect("wrong");
      }
    }
    setSubmittedAns(receivedAns);
  }

  function handlerenderNext() {
    setQuestionsCount((questionsCount += 1));
    setSelectedIndex(-1);
    setReceivedAns("");
    setSubmittedAns("");
    setIsCorrect("");

    nextQuestion(questionsCount);
    countCorrectAns(correctAns);
  }

  return (
    <div className="flex-[1_1_320px]">
      {/* If there is selected title question options will be rendered other wise landing page options will be rendered */}
      {quizzes &&
        (selectedTitle ? (
          <>
            {/* Mapping each options in the button component */}
            {question[questionsCount]?.options.map((el, i) => (
              <Button
                key={i}
                index={i}
                getOptionsContent={HandleGetAnswers}
                submittedAns={submittedAns}
              >
                <div
                  className={`${showCorrectAns(i)} ${showCorrectAnsAfterSubmit(el)} ${selectedIndex === i ? "border-2 border-[#a629f6]" : ""} flex w-[100%] items-center space-x-4 rounded-xl p-2.5`}
                >
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-amber-50">
                    <h1 className="text-2xl text-black">{choiceLetters[i]}</h1>
                  </div>
                  <h1 className="text-start">{el}</h1>
                </div>
              </Button>
            ))}

            {questionsCount < 10 &&
              (submittedAns ? (
                <button
                  onClick={handlerenderNext}
                  className="mb-4 w-[100%] cursor-pointer items-center space-x-4 rounded-xl bg-[#a629f6] p-3.5 text-xl font-semibold text-amber-50 hover:brightness-110 active:translate-0.5"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleCheckCorrectness}
                  className="mb-4 w-[100%] cursor-pointer items-center space-x-4 rounded-xl bg-[#a629f6] p-3.5 text-xl font-semibold text-amber-50 hover:brightness-110 active:translate-0.5"
                >
                  Submit Answer
                </button>
              ))}
          </>
        ) : (
          quizzes.map((el, i) => (
            <Button
              key={el.title}
              index={i}
              submittedAns={submittedAns}
              getOptionsContent={getOptionsContent}
            >
              <div
                className={`flex w-[100%] items-center space-x-4 rounded-xl p-2.5`}
              >
                <div className="rounded-lg bg-amber-50 p-1">
                  {<img src={el.icon} alt="" />}
                </div>
                <h1>{el.title}</h1>
              </div>
            </Button>
          ))
        ))}
    </div>
  );
};

export default Options;
