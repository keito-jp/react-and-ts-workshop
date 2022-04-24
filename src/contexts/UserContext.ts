import { createContext, useContext } from "react";
import { User } from "../models/user";

export const UserContext = createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}
