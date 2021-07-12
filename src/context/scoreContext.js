import { createContext } from "react";


export const ScoreContext = createContext(null);

export const timeContext = createContext({time: Date.now()});

