import { ApolloServer } from 'apollo-server-micro'
import { gql } from 'graphql-tag'
import pool from '../../lib/db'
import bcrypt from 'bcryptjs'

const typeDefs = gql`

  type User {
    id: ID!
    full_name: String!
    email: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    user_id: Int!
    created_at: String!
    due_date: String
  }

  type Query {
    users: [User]
    tasks(user_id: Int!): [Task]
  }

  type Mutation {
    signup(full_name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User

    createTask(title: String!, description: String, due_date: String, user_id: Int!): Task
    updateTask(id: Int!, title: String, description: String, status: String, due_date: String): Task
    deleteTask(id: Int!): String
  }
`

const resolvers = {

  Query: {
    users: async () => {
      const result = await pool.query(
        'SELECT id, full_name, email FROM users'
      )
      return result.rows
    },

    tasks: async (_, { user_id }) => {
      const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at DESC',
        [user_id]
      )
      return result.rows
    }
  },

  Mutation: {

    signup: async (_, { full_name, email, password }) => {
      const existing = await pool.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
      )

      if (existing.rows.length > 0) {
        throw new Error('User already exists.')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const result = await pool.query(
        `INSERT INTO users (full_name, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, full_name, email`,
        [full_name, email, hashedPassword]
      )

      return result.rows[0]
    },

    login: async (_, { email, password }) => {
      const result = await pool.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
      )

      if (result.rows.length === 0) {
        throw new Error('User not found')
      }

      const user = result.rows[0]
      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Invalid password')
      }

      return {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    },

    createTask: async (_, { title, description, due_date, user_id }) => {
      const result = await pool.query(
        `INSERT INTO tasks (title, description, due_date, status, user_id)
         VALUES ($1, $2, $3, 'pending', $4)
         RETURNING *`,
        [title, description, due_date, user_id]
      )
      return result.rows[0]
    },

    updateTask: async (_, { id, title, description, status, due_date }) => {
      const result = await pool.query(
        `UPDATE tasks
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             status = COALESCE($3, status),
             due_date = COALESCE($4, due_date)
         WHERE id=$5
         RETURNING *`,
        [title, description, status, due_date, id]
      )
      return result.rows[0]
    },

    deleteTask: async (_, { id }) => {
      await pool.query('DELETE FROM tasks WHERE id=$1', [id])
      return "Task deleted successfully"
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
const startServer = server.start()

export default async function handler(req, res) {
  await startServer
  const handle = server.createHandler({ path: '/api/graphql' })
  return handle(req, res)
}

export const config = {
  api: { bodyParser: false }
}