import { conn } from '../database/connection'
import { RowDataPacket } from 'mysql2'

export const getAllDepartments = async () => {

    const [result] = await conn.execute('SELECT * FROM department ORDER BY department_id ASC')
    return result
}

export const getDepartmentId = async (department_id?: string) => {

    const [result] = await conn.execute<RowDataPacket[]>('SELECT * FROM department WHERE department_id = ?', [department_id])
    return result
}

export const getDepartmentName = async (department_name: string) => {

    const [result] = await conn.execute<RowDataPacket[]>('SELECT * FROM department WHERE department_name = ?', [department_name])
    return result
}

export const postDepartment = async (department_name: string) => {

    await conn.execute('INSERT INTO department (department_name) VALUES (?)',[department_name])
}

export const putDepartment = async (department_name: string, department_id?: string) => {

    await conn.execute('UPDATE department SET department_name = ?, updated_at = CURRENT_TIMESTAMP WHERE department_id = ?', [department_name, department_id])
}

export const deleteDepartment = async (department_status: boolean, department_id?: string) => {

    await conn.execute('UPDATE department SET department_status = ? WHERE department_id = ?', [department_status, department_id])
}

/* export const deleteDepartment = async (department_id?: string) => {
    // Execute the SQL SELECT query
    await conn.execute<RowDataPacket[]>('DELETE FROM department WHERE department_id = ?', [department_id])
} */