import { makeExecutableSchema } from '@graphql-tools/schema'
import {UserTypes, UserResolver} from './graphql/schemas/user.js'


let mergedTypeDefs = [
    UserTypes,
]

let mergedResolvers = [
    UserResolver,
]

export const schema = makeExecutableSchema({
 resolvers: mergedResolvers,
 typeDefs: mergedTypeDefs
})
