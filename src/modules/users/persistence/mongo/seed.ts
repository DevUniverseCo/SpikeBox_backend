import { RoleEnum } from "../../../../shared/common/enums/roleEnum";
import { CreateUser } from "../../domain";

export const UserSeed = () => {
  const user: CreateUser = {
    username: "test",
    email: "test@example.com",
    password: "hashedpassword",
    role: RoleEnum.ADMIN,
    imageUrl: "https://example.com/avatar.png",
  };
  return user;
};
