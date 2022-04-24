import { User } from "./user";

export interface Message {
  id: string;
  text: string;
  createdAt: Date;
  author: User;
}
