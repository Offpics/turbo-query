import { UserEntity } from "./User";

export type PostEntity = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};
