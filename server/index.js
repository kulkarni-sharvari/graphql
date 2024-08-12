const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { default: axios } = require("axios")

async function startServer() {
  const app = express()

  const server = new ApolloServer({
    typeDefs: `
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }

            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                userId: ID!
                user: User
            }
     
            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id:ID!):User
            }
     
        `,
    resolvers: {
      Todo: {
        user: (todo) => axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
          .then(({ data }) => data)
      },

      Query: {
        getTodos: () => axios.get("https://jsonplaceholder.typicode.com/todos")
          .then(({ data }) => data),

        getAllUsers: () => axios.get("https://jsonplaceholder.typicode.com/users")
          .then(({ data }) => data),

        getUser: (parent, { id }) => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then(({ data }) => data)
      },
    },
  });

  app.use(bodyParser.json())
  app.use(cors())

  await server.start()

  app.use('/graphql', expressMiddleware(server))
  app.listen(8000, () => console.log("Serevr Started at PORT 8000"));

}

startServer()