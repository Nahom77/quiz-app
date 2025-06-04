import { type ReactNode } from "react";

interface Props {
  children: ReactNode | string;
  submittedAns: string;
  index: number;
  getOptionsContent: (content: string, index: number) => void;
}

const Button = ({
  children,
  index,
  submittedAns,
  getOptionsContent,
}: Props) => {
  return (
    <button
      disabled={Boolean(submittedAns)}
      // Deepseek and chatgpt code
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget; // Better to use currentTarget for React events
        // Type assertion for lastChild since TypeScript doesn't know its type
        const lastChild = target.lastChild.lastChild as HTMLElement;
        getOptionsContent(lastChild.textContent || "", index);
      }}
      className={`mb-4 w-[100%] cursor-pointer rounded-xl bg-[#3c4d67] text-xl font-semibold text-amber-50 hover:brightness-110 active:translate-0.5`}
    >
      {children}
    </button>
  );
};

export default Button;
