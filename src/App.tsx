import { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./components/LandingPage";
// import MainContent from "./components/MainContent";
import Nav from "./components/Nav";
import Options from "./components/Options";
import Questions from "./components/Questions";
import ShowResult from "./components/ShowResult";

function App() {
  const [quizzess, setQuizzes] = useState([]);
  const { quizzes } = quizzess;

  useEffect(() => {
    axios.get("quiz-app/data.json").then((res) => {
      setQuizzes(res.data);
    });
  }, []);

  const [selectedTitle, setSelectedTitle] = useState("");
  let [nextQue, setNextQue] = useState(0);
  let [corrAns, setCorrAns] = useState(0);
  // let [questionsCount, setQuestionsCount] = useState(0);

  // To store the correct ansewer received from 'Options'
  function countCorrectAns(ans) {
    setCorrAns(ans);
  }

  // To increase the count received from 'Options' Next button
  function nextQuestion(count) {
    setNextQue(count);
  }

  // Selecting type of question based on selected title
  function Question(quiz, title) {
    if (title) {
      const [{ questions }] = quiz.filter((el) => {
        return el.title === title;
      });
      return questions;
    }
  }
  const myQuestions = Question(quizzes, selectedTitle); // Calling the above function

  //
  function filterQuestion(quiz, title) {
    if (title) {
      const [myQuiz] = quiz.filter((el) => el.title === title);

      return myQuiz;
    }
  }
  const myQuizzes = filterQuestion(quizzes, selectedTitle);

  // accepting text content of button (the title)
  function handleOptionsContent(title: string) {
    setSelectedTitle(title);
  }

  return (
    <div>
      <Nav quizzes={myQuizzes} selectedTitle={selectedTitle} />

      {nextQue === 10 && (
        <ShowResult
          quizzes={myQuizzes}
          nextQuestion={nextQuestion}
          countCorrectAns={countCorrectAns}
          handleOptionsContent={handleOptionsContent}
          corrAnsewers={corrAns}
        />
      )}

      <div className="mx-auto mt-10 flex w-[90%] flex-wrap gap-5.5">
        {/* If there is selected title render questions otherwise render landing page */}
        {selectedTitle ? (
          <>
            <Questions
              question={myQuestions}
              quizzes={quizzes}
              nextQue={nextQue}
              selectedTitle={selectedTitle}
            />
            <Options
              question={myQuestions}
              quizzes={quizzes}
              selectedTitle={selectedTitle}
              nextQuestion={nextQuestion}
              getOptionsContent={handleOptionsContent}
              countCorrectAns={countCorrectAns}
            />
          </>
        ) : (
          <>
            <LandingPage />{" "}
            <Options
              quizzes={quizzes}
              getOptionsContent={handleOptionsContent}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
