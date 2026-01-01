import {
  GraphQLSchema as schemaType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from "graphql";

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
    addUser: {
      type: StringType,
      args: {
        name: { type: StringType },
      },
      resolve: (_, { name }) => name,
    },
  }),
});

export const schema = new schemaType({
  query: Query,
  mutation: Mutation,
});
