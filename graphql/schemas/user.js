import { createPubSub } from "graphql-yoga"

const pubSub = createPubSub()


const UserTypes = `

    type Query{
        hello:String
    }

    type Mutation{
        add:String
        sendMessage(msg:String):String
    }

    type Subscription{
        countdown(from: Int!): Int!
        getMessage:String
    }

`
const UserResolver = {

    Query:{
        hello:()=>"Hello World"
    },
    Mutation:{
        add:()=>"Hey",
        sendMessage:(parents,args,{})=>{
            const {msg} = args
            pubSub.publish('randomNumber', msg+""+Math.random())
            return msg
        }
    },
    Subscription:{
        countdown:{
            subscribe:async function* (_, { from }) {
                for (let i = from; i >= 0; i--) {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  yield { countdown: i }
                }
              }
        },
        getMessage:{
            subscribe: () => pubSub.subscribe('randomNumber'),
            resolve: (payload) => payload
        }
    }


}


export {UserTypes,UserResolver}
