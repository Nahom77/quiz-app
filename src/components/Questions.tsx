interface Question {
  question: string;
}

interface Props {
  question: Question[];
  nextQue: number;
}

const Questions = ({ question, nextQue }: Props) => {
  return (
    <div className="mb-9 flex-[1_1_320px]">
      {nextQue < 10 && (
        <p className="mb-5 text-[#98a2bb] italic">
          Question {Number(nextQue) + 1} of 10
        </p>
      )}
      <h1 className="mb-4 text-2xl text-amber-50">
        {question[Number(nextQue)]?.question}
      </h1>
    </div>
  );
};

export default Questions;
