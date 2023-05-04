import { FC, ReactNode } from "react";

export const CardWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <article className="bg-white rounded-md shadow-sm">{children}</article>
  );
};
