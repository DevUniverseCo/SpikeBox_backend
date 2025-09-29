import { Base } from "../../domain";
import { GenericMongoMapper } from "./mongoMapper";
import { GenericPostgresMapper } from "./postgresMapper";

export class MapperFactory {
  static createMongoMapper<Domain extends Base>(): GenericMongoMapper<Domain> {
    return new GenericMongoMapper<Domain>();
  }

  static createPostgresMapper<
    Domain extends Base
  >(): GenericPostgresMapper<Domain> {
    return new GenericPostgresMapper<Domain>();
  }
}
