import { RoleEnum } from "../../../../../application/common/enums/roleEnum";
import { User } from "../../../../../application/domain/user";

export const UserSeed = () => {
  const user: User = {
    username: "test",
    email: "test@example.com",
    password: "hashedpassword",
    role: RoleEnum.ADMIN,
    imageUrl: "https://example.com/avatar.png",
    locked: false,
  };
  return user;
};
