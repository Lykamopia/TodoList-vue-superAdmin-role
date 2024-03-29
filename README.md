# Todo List

A simple Todo List application built with Vue.js and GraphQL.

## Features

- Add, update, and delete todos
- Mark todos as completed
- Filter todos by status (completed/incomplete)
- Filter todos by category or tag
- Search todos by title or description

## Technologies Used

- Vue.js
- GraphQL
- Apollo Client
- Tailwind CSS
- Pinia (State Management)
- Hasura

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)

### Installation

1. Clone the repository:

   ```shell
    git clone https://github.com/Lykamopia/TodoList-vue-superAdmin-role.git
2. change directory

   ```shell
   cd todo-list
3. install all dependencies 
 
   ```shell
   npm install
4. Configure the GraphQL endpoint
   Open the 
   
   ```shell
   src/apollo/ApolloClient.js
   ```
   Update the GRAPHQL_ENDPOINT variable with the URL of your GraphQL server.
5. Serve(run) the project

   ```shell
   npm run dev
   
6. Open your browser and visit http://localhost:5173 to view the Todo List application.

