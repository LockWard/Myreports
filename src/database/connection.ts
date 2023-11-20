import mysql from 'mysql2/promise'

export const conn = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ||'admin',
    database: process.env.DB_NAME ||'myreport',
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