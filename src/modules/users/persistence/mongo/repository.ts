import { IBaseRepository } from "../../../../shared/common/base/repository";
import { CreateUser, UpdateUser, User } from "../../domain";
import { UserMongoMapper } from "../mappers";
import { UserModel } from "./model";

export class UserMongoRepository implements IBaseRepository<User, CreateUser> {
  private mapper = new UserMongoMapper();

  async create(userData: CreateUser): Promise<User> {
    const mongoData = this.mapper.toCreateDatabase({
      ...userData,
      locked: false,
    });

    const document = await UserModel.create(mongoData);
    return this.mapper.toDomain(document.toObject());
  }

  async findById(id: string): Promise<User | undefined> {
    const document = await UserModel.findById(id).lean();
    return document ? this.mapper.toDomain(document) : undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const document = await UserModel.findOne({ email }).lean();
    return document ? this.mapper.toDomain(document) : undefined;
  }

  async update(id: string, userData: CreateUser): Promise<User | undefined> {
    const mongoData = this.mapper.toDatabase({
      id,
      ...userData,
      locked: false, // default values for required fields
    } as User);

    const document = await UserModel.findByIdAndUpdate(id, mongoData, {
      new: true,
      runValidators: true,
    }).lean();

    return document ? this.mapper.toDomain(document) : undefined;
  }

  async delete(id: string): Promise<User | undefined> {
    const document = await UserModel.findByIdAndDelete(id).lean();
    return document ? this.mapper.toDomain(document) : undefined;
  }

  // Additional method for convenience
  async updatePartial(
    id: string,
    userData: UpdateUser
  ): Promise<User | undefined> {
    const mongoData = this.mapper.toDatabase({
      id,
      ...userData,
    } as User);

    const document = await UserModel.findByIdAndUpdate(id, mongoData, {
      new: true,
      runValidators: true,
    }).lean();

    return document ? this.mapper.toDomain(document) : undefined;
  }

  async createMany(usersData: CreateUser[]): Promise<User[]> {
    const mongoDataArray = usersData.map((userData) =>
      this.mapper.toCreateDatabase({
        ...userData,
        locked: false,
      })
    );

    const documents = await UserModel.insertMany(mongoDataArray);
    return documents.map((doc) => this.mapper.toDomain(doc.toObject()));
  }

  async findAll(): Promise<User[]> {
    const documents = await UserModel.find().lean();
    return documents.map((doc) => this.mapper.toDomain(doc));
  }
}
