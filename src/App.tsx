import { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./components/LandingPage";
// import MainContent from "./components/MainContent";
import Nav from "./components/Nav";
import Options from "./components/Options";
import Questions from "./components/Questions";
import ShowResult from "./components/ShowResult";

// /////////////////////////////////////////////////////////
//  If you need run this app locally change               //
//    entry of this app on './data.json'                  //
//     into 'quiz-app/data.json'                          //
// /////////////////////////////////////////////////////////

function App() {
  const [quizzess, setQuizzes] = useState({ quizzes: [] });
  const { quizzes } = quizzess;

  useEffect(() => {
    axios.get(`./data.json`).then((res) => {
      setQuizzes(res.data);
    });
  }, []);

  const [selectedTitle, setSelectedTitle] = useState("");
  const [nextQue, setNextQue] = useState(0);
  const [corrAns, setCorrAns] = useState(0);
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
            <Questions question={myQuestions} nextQue={nextQue} />
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
              question={myQuestions}
              selectedTitle={selectedTitle}
              quizzes={quizzes}
              nextQuestion={nextQuestion}
              getOptionsContent={handleOptionsContent}
              countCorrectAns={countCorrectAns}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
