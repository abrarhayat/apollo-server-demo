const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        age: Int!
    }

    type Query {
        allUsers: [User!]!
    }
`;

users = [{name: 'Abrar', age : 26}, {name: 'Test', age : 30}]

const resolvers = {
    Query : {
        allUsers : () => users
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Server started at $(url)`)
});



