import donenv from 'dotenv'
import { PoolClient, Pool } from 'pg'

donenv.config()

// Create a new pool instance
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
})

// Function to get a client from the pool
async function getClient(): Promise<PoolClient> {
  try {
    const client = await pool.connect()
    console.log('PG connected')
    return client
  } catch (error: any) {
    console.error(`Error getting client from pool: ${error.message}`)
    throw error
  }
}

// Function to release a client back to the pool
function releaseClient(client: PoolClient) {
  try {
    client.release()
    console.log('PG disconnected')
  } catch (error: any) {
    console.error(`Error releasing client: ${error.message}`)
  }
}

// Function to execute a query and return the result
export async function query(sql: string, values?: any[]) {
  // Get a client from the pool
  const client = await getClient()

  try {
    // Execute the query
    const result = await client.query(sql, values)
    // Return the rows from the result
    return result.rows
  } catch (error: any) {
    console.error(`Error executing query: ${error.message}`)
    throw error
  } finally {
    // Release the client back to the pool
    releaseClient(client)
  }
}

// Function to execute a command and return the number of rows affected
export async function command(sql: string, values?: any[]) {
  // Get a client from the pool
  const client = await getClient()

  try {
    // Execute the command
    const result = await client.query(sql, values)
    // Return the number of rows affected
    return result.rowCount
  } catch (error: any) {
    console.error(`Error executing command: ${error.message}`)
    throw error
  } finally {
    // Release the client back to the pool
    releaseClient(client)
  }
}
