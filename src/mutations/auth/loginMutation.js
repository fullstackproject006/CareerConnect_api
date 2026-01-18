import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import db from '../../../models/index.js';
import bcrypt from "bcrypt";
import { generateAccessToken } from "../../jwtAuth/jwt.js";
import UserRequestType from "../../types/userRequestType.js";

const { User, Profile } = db;

const loginMutation = {
    login : {
        type: UserRequestType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            userType: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (_, { email, password, userType }) => {
            const results = await db.sequelize.query(
                `SELECT 
                    p.password,
                    u.id,
                    p.name,
                    u.gender
                FROM users u
                INNER JOIN users_profile p 
                ON p.profileId = u.id
                WHERE u.email = :email AND u.userType = :userType`,
                {
                    replacements: { email, userType },
                    type: db.Sequelize.QueryTypes.SELECT,
                    plain: true
                }
            );

            console.log("Login results:", results);

            if (!results) {
                return {
                    "status": 400,
                    "errorMessage": "User does not exist"
                }
            }
            const passwordMatch = await bcrypt.compare(password, results.password);

            if (!passwordMatch) {
                return {
                    "status": 400,
                    "errorMessage": "Invalid password"
                }
            }

            const token = await generateAccessToken({ id: results.id , email: email, userType: userType });

            return {
                status: 200,
                errorMessage: null,
                result: {
                    id: results.id,
                    name: results.name,
                    email: email,
                    gender: results.gender,
                    userType: userType,
                    auth: token
                }
            }
        }
    }
}

export default loginMutation;