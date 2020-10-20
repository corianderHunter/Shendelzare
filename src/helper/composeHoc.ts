import { ComponentType } from "react";

export type HOCDecorator = <C extends ComponentType>(target: C) => C;

export const composeHoc = <T>(C: React.FC<T>, ...decorators: HOCDecorator[]): React.FC<T> => {
  return decorators.reduce((s, v) => v(s) as React.FC, C);
};
