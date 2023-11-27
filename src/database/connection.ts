import mysql from 'mysql2/promise'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '../config/config'

export const conn = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
})

conn.getConnection()
    .then(connection => {
    console.log('Connected to MySQL database')
    connection.release()
})
    .catch(error => {
    console.error('Error connecting to MySQL:', error)
})