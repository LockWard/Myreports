import mysql from 'mysql2/promise'

export const conn = mysql.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD ||'admin',
    database: process.env.DB ||'myreport',
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