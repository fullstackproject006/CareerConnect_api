import {
  GraphQLSchema as schemaType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from "graphql";
import registerMutation from "./mutations/auth/createUserMutation.js";
import loginMutation from "./mutations/auth/loginMutation.js";

const Query = new ObjectType({
  name: "Query",
  fields: () => ({
    hello: {
      type: StringType,
      resolve: () => "hello world",
    },
  }),
});

const Mutation = new ObjectType({
  name: "Mutation",
  fields: () => ({
    ...registerMutation,
    ...loginMutation
  }),
});

export const schema = new schemaType({
  query: Query,
  mutation: Mutation,
});
