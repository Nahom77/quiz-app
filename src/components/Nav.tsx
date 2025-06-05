// --titlesWhite: #f1f2f6;
// --backgroundDark: #313e51;
// --btnColorDark: #3c4d67;
// --purple: #a629f6;
// --otherTextsDark: #5f6676;
// --otherTextsDark2: #c5b2c7;
import { useState } from "react";

interface Quiz {
  icon: string;
  title: string;
}
interface Props {
  quizzes: Quiz;
  selectedTitle: string;
}

const Nav = ({ quizzes, selectedTitle }: Props) => {
  const [isChecked, setChecked] = useState(false);

  function handleCheckBox() {
    setChecked(!isChecked);
  }

  return (
    <div className="mx-auto mt-4 flex w-[90%] items-center justify-between">
      {selectedTitle ? (
        <>
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-amber-50 p-1">
              <img src={quizzes.icon} alt="" />
            </div>
            <h2 className="text-xl font-semibold text-amber-50">
              {quizzes.title}
            </h2>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="ml-[auto] flex space-x-2.5">
        <img src="quiz-app/icon-sun-light.svg" alt="" />
        <label className="relative h-[34px] w-[60px]">
          <input
            //Controlling the state of checkbox to toggle for the theme
            checked={isChecked}
            onChange={handleCheckBox}
            type="checkbox"
            className={`h-0 w-0 opacity-0`}
          />
          <span
            // For switching between the themes
            className={`${
              isChecked ? "bg-[#a629f6] before:translate-x-[25px]" : ""
            } absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-4xl bg-[#77757577] before:absolute before:bottom-[4px] before:left-[4px] before:h-[26px] before:w-[26px] before:rounded-[50px] before:bg-amber-50 before:duration-[0.4s]`}
          ></span>
        </label>
        <img src="quiz-app/icon-moon-light.svg" alt="" />
      </div>
    </div>
  );
};

export default Nav;
