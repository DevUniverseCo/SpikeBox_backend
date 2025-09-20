import { Type } from "@sinclair/typebox";

import { BaseSchema } from "../../../../shared/common/base/http/schema/_index";
import {
  DataResponseArrayType,
  DataResponseSingleType,
} from "../../../../shared/common/base/http/schema/bodies";

// -------------------- DTOs --------------------

// DTO per creazione Post
export const CreatePostDto = Type.Object({
  title: Type.String(),
  content: Type.Optional(Type.String()),
  image: Type.Optional(Type.String({ format: "uri" })),
  author: Type.String(), // ObjectId come stringa
  tags: Type.Optional(Type.Array(Type.String())),
  publishedAt: Type.Optional(Type.String({ format: "date-time" })),
});

// DTO per aggiornamento Post (PATCH)
export const UpdatePostDto = Type.Partial(CreatePostDto);

// DTO combinato per risposte, estende BaseSchema
export const PostDto = Type.Intersect([BaseSchema.Bodies.Base, CreatePostDto]);

// -------------------- Response wrapper --------------------
export const ResponseSingleDto = DataResponseSingleType(PostDto);
export const ResponseArrayDto = DataResponseArrayType(PostDto);

// -------------------- Schema CRUD pronto per le rotte --------------------

const ErrorResponses = {
  404: BaseSchema.Errors.ApiErrorResponse,
  500: BaseSchema.Errors.ApiErrorResponse,
};

export const PostSchema = {
  get: {
    params: BaseSchema.Params.Id,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  getAll: {
    response: { 200: ResponseArrayDto, ...ErrorResponses },
  },
  post: {
    body: CreatePostDto,
    response: { 201: ResponseSingleDto, ...ErrorResponses },
  },
  patch: {
    params: BaseSchema.Params.Id,
    body: UpdatePostDto,
    response: { 200: ResponseSingleDto, ...ErrorResponses },
  },
  delete: {
    params: BaseSchema.Params.Id,
    response: { 200: Type.Boolean(), ...ErrorResponses },
  },
};
