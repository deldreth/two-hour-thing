# Local state management with Apollo

What was a simple interview test quickly became a study in local state management with Apollo. Originally this application consisteted of very simple routes and a few basic state updates. Out of personal necessity to  understand GraphQL/Apollo I decided to focus state management there.

Apollo only deals with client state in this application. There's no actual graphql service that it is connecting to (hence all the `@client` queries). 

There are a handful of HOCs that wrap react-apollo's graphql function to provide some quick recomposable queries and mutations.

# Todos
- [x] Query book state
- [ ] Add book mutation
- [ ] UI: Animate opening state of book
- [ ] Stdize usage of newish Query/Mutation components where applicable

# Get it up and running
```
yarn
yarn start
```

Navigate to `http://localhost:8000`.

# Schema generation

The app uses apollo-codegen to generate types from schema and queries. These aren't updated automatically but can be rebuilt with `yarn gen-types`. The command will build a json schema from schema.graph and then traverse the `src` directory for any gql tags.
