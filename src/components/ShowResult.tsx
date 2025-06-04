import React from "react";

interface Props {
  quizzes: string[];
  corrAnsewers: number;
  nextQuestion: (num: number) => void;
  countCorrectAns: (num: number) => void;
  handleOptionsContent: (num: string) => void;
}

const ShowResult = ({
  quizzes,
  corrAnsewers,
  nextQuestion,
  countCorrectAns,
  handleOptionsContent,
}: Props) => {
  return (
    <div className="mx-auto mt-7 w-[90%] sm:w-[70%]">
      <h1 className="mb-7 text-5xl text-amber-50">
        Quiz completed <br />
        <span className="font-semibold"> You scored...</span>
      </h1>
      <div className="mb-7 flex h-[40%] flex-col items-center justify-around rounded-2xl bg-[#3c4d67] p-7">
        <div className="flex items-center space-x-4">
          <div className="rounded-lg bg-amber-50 p-1">
            <img src={quizzes?.icon} alt="" />
          </div>
          <h2 className="text-xl font-semibold text-amber-50">
            {quizzes?.title}
          </h2>
        </div>
        <h1 className="my-4.5 text-9xl font-bold text-amber-50">
          {corrAnsewers}
        </h1>
        <p className="text-lg text-[#98a2bb] italic">out of 10</p>
      </div>
      <button
        onClick={() => {
          nextQuestion(0);
          countCorrectAns(0);
          handleOptionsContent("");
        }}
        className="mb-4 w-[100%] cursor-pointer items-center space-x-4 rounded-xl bg-[#a629f6] p-3.5 text-xl font-semibold text-amber-50 hover:brightness-110 active:translate-0.5"
      >
        Play Again
      </button>
    </div>
  );
};

export default ShowResult;
