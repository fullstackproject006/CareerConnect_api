import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from "graphql";
import UserType from "./userType.js";

const UserRequestType = new GraphQLObjectType({
  name: "UserRequest",
  fields: () => ({
    status: { type: GraphQLInt },
    errorMessage: { type: GraphQLString },
    result: { type: UserType }
  }),
});

export default UserRequestType;
