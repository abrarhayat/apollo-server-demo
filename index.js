const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        age: Int!
    }

    type Post {
        id: ID!
        title: String
        content: String
    }

    type Query {
        allUsers: [User!]!,
        allPosts: [Post!]!
    }
`;

users = [{name: 'Abrar', age : 26, id : '##$#$%REFDDFDSF'}, {name: 'Test', age : 30, id : '##$#$%REFDDFDSdfdfF'}]
posts = [{title: 'Test Post', content: 'Test Post Description', id : '#$%$%$%$dse'}]

const resolvers = {
    Query : {
        allUsers : () => users,
        allPosts : () => posts
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`)
});



