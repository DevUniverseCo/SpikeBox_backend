import { RoleEnum } from "../../../shared/common/enums/roleEnum";
import { User } from "../domain";

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
