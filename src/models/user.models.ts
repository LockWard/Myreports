import { conn } from '../database/connection'
import { RowDataPacket, ResultSetHeader } from 'mysql2'
import bcrypt from 'bcrypt'

export const hashPassword = async (user_password: string): Promise<string> => {

        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(user_password, salt);
}

export const comparePassword = async (user_password: string, user_password_received: string): Promise<boolean> => {

        return bcrypt.compare(user_password, user_password_received)
}

export const getAllUsers = async () => {

        const [result] = await conn.execute('SELECT * FROM user ORDER BY user_name ASC')
        return result
}

export const getUserId = async (user_id?: string) => {

        const [result] = await conn.execute<RowDataPacket[]>('SELECT * FROM user WHERE user_id = ?', [user_id])
        return result
}

export const getUserEmail = async (user_email: string) => {

        const [result] = await conn.execute<RowDataPacket[]>('SELECT * FROM user WHERE user_email = ?', [user_email])
        return result
}
// This function is used by normal user to register in the platform.
export const postUser = async (user_name: string, user_email: string, user_password: string, department_name: string) => {

        const [result] = await conn.execute<ResultSetHeader>('INSERT INTO user (user_name, user_email, user_password, department_id) VALUES (?, ?, ?, (SELECT department_id FROM department WHERE department_name = ?))', [user_name, user_email, user_password, department_name])
        return result
}
// This function is used by normal user to updated their information in the platform.
export const putUser = async (user_name: string, user_email: string, user_password: string, user_id?: string) => {

        await conn.execute('UPDATE user SET user_name = ?, user_email = ?, user_password = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?', [user_name, user_email, user_password, user_id])
}
// This post user is the one used by admin and the moderators.
export const postUserByAdmin = async (user_name: string, user_email: string, user_password: string, department_name: string, role_name: string) => {

        const [result] = await conn.execute<ResultSetHeader>('INSERT INTO user (user_name, user_email, user_password, department_id, role_id) VALUES (?, ?, ?, (SELECT department_id FROM department WHERE department_name = ?), (SELECT role_id FROM role WHERE role_name = ?))', [user_name, user_email, user_password, department_name, role_name])
        return result
}
// This post user is the one used by admin and the moderators.
export const putUserByAdmin = async (user_name: string, user_email: string, user_password: string, user_status: boolean, department_name: string, role_id?: string, user_id?: string) => {

        await conn.execute('UPDATE user SET user_name = ?, user_email = ?, user_password = ?, user_status = ?, department_name = (SELECT department_id FROM department WHERE department_name = ?), role_id = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?', [user_name, user_email, user_password, user_status, department_name, role_id, user_id])
}

export const deleteUser = async (user_id?: string) => {

        await conn.execute('UPDATE user SET user_status = false WHERE user_id = ?', [user_id])
}

/* export const deleteUser = async (user_id?: string) => {
        // Execute the SQL SELECT query
        await conn.execute('DELETE FROM user WHERE user_id = ?', [user_id])
} */