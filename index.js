const { ApolloServer, gql } = require('apollo-server');
var utils = require('./utils');
//console.log(utils)

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
        allUsers(olderThan: Int = -1): [User!]!
        allPosts: [Post!]!
        user(id : ID, name : String): User
        post(id : ID, title : String): Post
    }
`;

users = utils.readDataFromJSON('data/users.json');
posts = utils.readDataFromJSON('data/posts.json');

function getUser(id, name) {
    return users.find(user => user.id === id || user.name === name);
}

function getPost(id, title) {
    return posts.find(post => post.id === id || post.title === title)
}

function getAllUsersByAge(olderThan) {
    allUsers = [];
    users.forEach((user) => {
        if (user.age > olderThan) {
            allUsers.push(user);
        }
    })
    return allUsers;
}

function getAllPostsFromUser(userId) {
    user = getUser(userId);
    currentUserPostIds = user.userPostsIds;
    allPostInfo = new Array();
    currentUserPostIds.forEach((post) => {
        allPostInfo.push(getPost(post.id));
    })
    return allPostInfo;
}

const resolvers = {
    Query: {
        allUsers: (root, args, context, info) => getAllUsersByAge(args.olderThan),
        allPosts: () => posts,
        user: (root, args, context, info) => getUser(args.id, args.name, args.olderThan),
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