import the express and apolloserver

post array with objects params(id,title,author,comments(object)params(text,user))

typedefs
type comment
type post
type query
type mutation

creating resolvers
query
mutation

starting te server


to test :
query {
  posts {
    title
    author
    comments {
      text
      user
    }
  }
}

# mutation {
#   addPost(title: "New Blog", author: "Sushanth") {
#     id
#     title
#     author
#   }
# }



# mutation {
#   addComment(postId: "40068b90-cd29-41a3-847b-06834c0fc176", text: "Nice read!", user: "User C") {
#     id
#     title
#     comments {
#       text
#       user
#     }
#   }
# }

