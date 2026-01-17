import {
  GraphQLSchema as schemaType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from "graphql";
import registerMutation from "./mutations/register.mutation.js";

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
    ...registerMutation
  }),
});

export const schema = new schemaType({
  query: Query,
  mutation: Mutation,
});
