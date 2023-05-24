import { useContext } from "react";
import { DateContext } from "../context/DateContext";

export const useDateContext = () => {
  const context = useContext(DateContext);
  return context;
};
