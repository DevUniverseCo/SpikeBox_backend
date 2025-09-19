import { Base } from "../../shared/common/base/domain";
import { RoleEnum } from "../../shared/common/enums/roleEnum";

export type CreateUser = {
  username: string;
  email: string;
  password: string;
  role: RoleEnum;
  imageUrl?: string;
};

export type User = Base & CreateUser;
export type UpdateUser = Partial<CreateUser>;
