import React from 'react';
import { History } from "history";
import { ErrorState } from "types";

export interface ErrorContext {
    errors?: ErrorState;
    raiseError: (error: Error) => void;
    history: History;
}

export const ErrorStateContext = React.createContext<ErrorContext>(null);

export default function useErrorState() {
  return React.useContext<ErrorContext>(ErrorStateContext);
}