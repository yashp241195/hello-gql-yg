const UserTypes = `

    type Query{
        hello:String
    }

    type Mutation{
        add:String
    }

    type Subscription{
        countdown(from: Int!): Int!
    }

`
const UserResolver = {

    Query:{
        hello:()=>"Hello World"
    },
    Mutation:{
        add:()=>"Hey"
    },
    Subscription:{
        countdown:{
            subscribe:async function* (_, { from }) {
                for (let i = from; i >= 0; i--) {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  yield { countdown: i }
                }
              }
        }
    }


}


export {UserTypes,UserResolver}
