import LandingPage from "./LandingPage";
import Options from "./Options";
import { useState } from "react";
import Questions from "./Questions";

interface Props {
  quizzes: string[];
}

const MainContent = ({ quizzes }: Props) => {
  const [selectedTitle, setSelectedTitle] = useState("");

  function handleRenderQuestions(title: string) {
    setSelectedTitle(title);
    console.log(title);
  }

  return (
    <div className="mx-auto mt-10 flex w-[90%] flex-wrap">
      {selectedTitle ? (
        <>
          <Questions quizzes={quizzes} selectedTitle={selectedTitle} />
          <Options
            quizzes={quizzes}
            selectedTitle={selectedTitle}
            renderQuestions={handleRenderQuestions}
          />
        </>
      ) : (
        <>
          <LandingPage />{" "}
          <Options quizzes={quizzes} renderQuestions={handleRenderQuestions} />
        </>
      )}
    </div>
  );
};

export default MainContent;
