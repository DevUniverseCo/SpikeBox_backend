import { RoleEnum } from "../common/enums/roleEnum";
import { Base } from "./base";

export type CreateUser = {
  username: string;
  email: string;
  password: string;
  role: RoleEnum;
};

export type User = Base & CreateUser;

export type UpdateUser = Partial<CreateUser>;
