# ✨Node.js API with PostgreSQL ✨

This API provides the following features:

- To create and list all vendors
- To create and list all buyers
- To list, create, edit and delete appointments with the details
- to find all appointments for a specific day

### Prerequisites

- Node.js
- PostgreSQL

### Installation

- Clone the repository
- Install the dependencies: npm install
- Create a PostgreSQL database and update the database configuration
- Set variables (PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT, PORT) in env file
- Run the database migrations: npm run migrate:up

### File structure

- routes: defines the API endpoints and their corresponding controllers
- infra: contains database connection and query functions
- repository: abstracts the data access layer and provides an interface for the controllers to interact with the database
- entity: defines the structure of the database entities
- domain: contains business logic and validation rules
- controller: handles the request and response, and communicates with the repository and domain layers

### Run the API

```sh
npm start
```

### Testing

To run the tests:

```sh
npm test
```
