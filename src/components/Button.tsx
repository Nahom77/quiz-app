import React, { useState, type PropsWithChildren, type ReactNode } from "react";

interface Props {
  children: ReactNode | string;
  submittedAns: string;
  index: number;

  getOptionsContent: (e: MouseEvent, index: number) => void;
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
      onClick={(e) => {
        getOptionsContent(e.target.lastChild.textContent, index);
      }}
      className={`mb-4 w-[100%] cursor-pointer rounded-xl bg-[#3c4d67] text-xl font-semibold text-amber-50 hover:brightness-110 active:translate-0.5`}
    >
      {children}
    </button>
  );
};

export default Button;
