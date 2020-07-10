const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        age: Int!
        skills: [Skill]
        posts : [Post]
    }

    type Post {
        id: ID!
        title: String
        content: String
    }

    type Skill {
        name: String
        proficiency: Int
    }

    type Query {
        allUsers: [User!]!
        allPosts: [Post!]!
        user(id : ID, name : String): User
        post(id : ID, title : String): Post
    }
`;

users = [{
    name: 'Abrar Hayat', age: 26, id: '##$#$%REFDDFDSF', skills: [{ name: 'Java', proficiency: 10 }, { name: 'Python', proficiency: 8 }], userPosts: [{ id: '#$%$%$%$dse' },
    { id: '#$%$%$4545%$dse' }]
}, { name: 'Christopher Williams', age: 30, id: '##$#$%REFDDFDSdfdfF', skills: [{ name: 'Kotlin', proficiency: 10 }, { name: 'Python', proficiency: 8 }], userPosts: [{ id: '#$%$%$%$dse$#$' }] },
{ name: 'Henry Burger', age: 35, id: '%$%$FDSGFGDFG', skills: [{ name: 'Kotlin', proficiency: 10 }, { name: 'Python', proficiency: 8 }], userPosts: [{ id: 'DFDF#$#$#$#' }] }]

posts = [{ title: 'QraphQL', content: 'Demo for graphql', id: '#$%$%$%$dse' }, { title: 'Apollo Server', content: 'Demo for Apollo Server', id: '#$%$%$4545%$dse' },
{ title: 'Test Post1', content: 'Demo for Post1', id: '#$%$%$%$dse$#$' }, { title: 'Test Post2', content: 'Demo For Post2', id: 'DFDF#$#$#$#' }]

function getUser(id, name) {
    return users.find(user => user.id === id || user.name === name);
}

function getPost(id, title) {
    return posts.find(post => post.id === id || post.title === title)
}

function getAllPostsFromUser(userId) {
    user = getUser(userId);
    currentUserPostIds = user.userPosts;
    finalPostList = [];
    for (post of currentUserPostIds) {
        finalPostList.push(getPost(post.id))
    }
    return finalPostList;
}

const resolvers = {
    Query: {
        allUsers: () => users,
        allPosts: () => posts,
        user: (root, args, context, info) => getUser(args.id, args.name),
        post: (root, args, context, info) => getPost(args.id, args.title)
    },

    User: {
        posts: (root, args, context, info) => {
            return getAllPostsFromUser(root.id)
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`)
});



