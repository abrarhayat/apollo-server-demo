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
        allUsers: [User!]!
        allPosts: [Post!]!
        user(id : ID, name : String): User
        post(id : ID, title : String): Post
    }
`;

users = [{ name: 'Abrar Hayat', age: 26, id: '##$#$%REFDDFDSF' }, { name: 'Christopher Williams', age: 30, id: '##$#$%REFDDFDSdfdfF' }, 
{ name: 'Henry Burger', age: 35, id: '%$%$FDSGFGDFG' }]
posts = [{ title: 'QraphQL', content: 'Demo for graphql', id: '#$%$%$%$dse'}, { title: 'Apollo Server', content: 'Demo for Apollo Server', id: '#$%$%$4545%$dse'}]

function getUser(id, name) {
    return users.find(user => user.id === id || user.name === name);
}

function getPost(id, title) {
    return posts.find(post => post.id === id || post.title === title)
}

const resolvers = {
    Query: {
        allUsers: () => users,
        allPosts: () => posts,
        user: (root, args, context, info) => getUser(args.id, args.name),
        post: (root, args, context, info) => getPost(args.id, args.title)
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`)
});



