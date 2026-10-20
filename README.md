# PARTE 7 — Full Stack Open

GraphQL con Apollo Server.

## Estructura

```
PARTE7/
└── src/
    └── index.js             # Apollo Server + Express con schema y resolvers
├── package.json
└── README.md
```

## Schema GraphQL

### Types

- **Person:** id, name, number
- **Query:**
  - `personCount`: número total de personas
  - `allPeople`: lista completa de personas
  - `allPersons(filter por phone)`: filtra por número de teléfono
- **Mutation:**
  - `addPerson(name, phone): Person` — añade una nueva persona

### Queries ejemplo

```graphql
query {
  personCount
  allPeople {
    name
    number
  }
}
```

### Mutations ejemplo

```graphql
mutation {
  addPerson(name: "Matti T", phone: "040-123456") {
    name
    number
  }
}
```

## Servidor

El servidor se inicia con `npm start` y estará disponible en:
- **HTTP:** http://localhost:4000
- **GraphQL endpoint:** http://localhost:4000/graphql

## Referencia oficial

https://fullstackopen.com/es/part7/graphql