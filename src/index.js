const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const http = require('http');

// Type definitions for GraphQL schema
const typeDefs = gql`
  type Person {
    id: ID!
    name: String!
    number: String!
  }

  type Query {
    personCount: Int!
    allPeople: [Person]!
    allPersons(phone: String): [Person]!
  }

  type Mutation {
    addPerson(name: String!, phone: String!): Person
  }
`;

// Mock data
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: '1'
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: '2'
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234343',
    id: '3'
  }
];

// Resolvers
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPeople: () => persons,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons;
      }
      return persons.filter(p =>
        p.number.toLowerCase().includes(args.phone.toLowerCase())
      );
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      const person = {
        name: args.name,
        number: args.phone,
        id: Math.floor(Math.random() * 10000)
      };
      persons = persons.concat(person);
      return person;
    }
  }
};

// Apollo Server configuration
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Express app
const app = express();
server.applyMiddleware({ app });

// HTTP server
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});