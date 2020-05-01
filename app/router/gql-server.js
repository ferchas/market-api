import config from 'config';
import { ApolloServer } from 'apollo-server-express';
import schema from '../schema';

const gqlServer = (app) => {
  // ============================================================
  // Declare application Config for apollo
  const server = new ApolloServer({...schema});

  server.applyMiddleware({ app, path: config.get('app.path-qql') }); 
};

export default gqlServer;
