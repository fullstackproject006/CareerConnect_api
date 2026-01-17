import {
  GraphQLInt,
  GraphQLString
} from "graphql";

import db from '../../models/index.js';
import UserRequestType from "../types/userRequestType.js";
import { generateAccessToken } from "../jwtAuth/jwt.js";
const { User, Profile } = db;

const registerMutation = {
  register: {
    type: UserRequestType,
    args: {
      name: { type: GraphQLString },
      password: { type: GraphQLString },
      email: { type: GraphQLString },
      gender: { type: GraphQLString },
      userType: { type: GraphQLInt },
    },
    resolve: async (_, { name, password, email, gender, userType }) => {

        const existingUser = await User.findOne({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return {
                "status": 400,
                "errorMessage": "User already exists"
            }
        }

        const user = await User.create({
            email: email,
            gender: gender,
            userType: userType,
        });

        await Profile.create({
            name: name,
            password: password,
            profileId: user.id ?? ""
        });
        const token = await generateAccessToken({ id: user.id, email: email, userType: userType });
        return {
            status: 200,
            errorMessage: null,
            result: {
                id: user.id,
                name,
                email,
                gender,
                userType,
                auth: token
            }
        };
    },
  },
};

export default registerMutation;
