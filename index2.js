const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Sample data
const posts = [
  {
    id: '1',
    title: 'GraphQL vs REST',
    author: 'Sushanth',
    comments: [
      { text: 'Great post!', user: 'User A' },
      { text: 'Very helpful', user: 'User B' }
    ]
  }
];

// GraphQL schema
const typeDefs = gql`
  type Comment {
    text: String
    user: String
  }

  type Post {
    id: ID!
    title: String
    author: String
    comments: [Comment]
  }

  type Query {
    post(id: ID!): Post
    posts: [Post]
  }

  type Mutation {
    addPost(title: String!, author: String!): Post
    addComment(postId: ID!, text: String!, user: String!): Post
  }
`;


// Resolvers
const { v4: uuidv4 } = require('uuid');

const resolvers = {
  Query: {
    post: (_, { id }) => posts.find(post => post.id === id),
    posts: () => posts,
  },
  Mutation: {
    addPost: (_, { title, author }) => {
      const newPost = {
        id: uuidv4(),
        title,
        author,
        comments: []
      };
      posts.push(newPost);
      return newPost;
    },
    addComment: (_, { postId, text, user }) => {
      const post = posts.find(p => p.id === postId);
      if (!post) throw new Error('Post not found');
      const newComment = { text, user };
      post.comments.push(newComment);
      return post;
    }
  }
};


async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
