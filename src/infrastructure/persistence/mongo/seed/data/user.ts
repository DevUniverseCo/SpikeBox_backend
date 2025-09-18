import { RoleEnum } from "../../../../../application/common/enums/roleEnum";
import { User } from "../../../../../application/entities/user";

export const UserSeed = () => {
  const user: User = {
    username: "test",
    email: "test@example.com",
    password: "hashedpassword",
    role: RoleEnum.ADMIN,
    locked: false,
  };
  return user;
};
