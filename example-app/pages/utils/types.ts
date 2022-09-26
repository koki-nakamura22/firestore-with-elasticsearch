import { MouseEventHandler } from "react";

export type ButtonPropsType = {
  caption: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  id?: string;
  className?: string;
};
