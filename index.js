const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    context: ({ req }) => ({ req, pubsub }) //pass vars to context for use in resolvers
});


mongoose
    .connect(MONGODB, { useNewUrlParser: true})
    .then(() => {
        console.log('Mongodb connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`server running at ${(res.url)}`)
    })
    .catch(err => {
        console.error(error)
    })
