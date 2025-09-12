import { Type } from "@sinclair/typebox";
import { Pagination } from "../commons/queries";

export const PlayersQuery = Type.Partial(
  Type.Intersect([
    Pagination,
    Type.Object({
      sort: Type.Array(
        Type.Union([
          Type.TemplateLiteral("${createdAt}"),
          Type.TemplateLiteral("${createdAt}.${asc|desc}"),
        ]),
        { default: ["createdAt.asc"] }
      ),
    }),
  ])
);
