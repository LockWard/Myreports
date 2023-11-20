import { conn } from '../database/connection'
import { RowDataPacket } from 'mysql2'

export const getAllReports = async () => {

        const [result] = await conn.execute<RowDataPacket[]>('SELECT * FROM report ORDER BY created_at ASC')
        return result
}

export const getReportId = async (report_id?: string) => {

        const [result] = await conn.execute<RowDataPacket[]>('SELECT * FROM report WHERE report_id = ?', [report_id])
        return result
}
// This is the information show by all users.
export const getAllReportsByUser = async (user_id?: string) => {

        const [result] = await conn.execute<RowDataPacket[]>('SELECT * FROM report WHERE user_id = ?', [user_id])
        return result
}

export const postReport = async (report_description: string, report_priority: string, user_email: string) => {

        await conn.execute('INSERT INTO report (report_description, report_priority, user_id) SELECT ?, ?, user_id FROM user WHERE user_email = ?', [report_description, report_priority, user_email])
}

export const putReport = async (report_description: string, report_priority: string, report_id: string) => {

        await conn.execute('UPDATE report SET report_description = ?, report_priority = ?, updated_at = CURRENT_TIMESTAMP WHERE report_id = ?', [report_description, report_priority, report_id])
}

export const putReportToggleByAdmin = async (report_done: boolean, report_id: string) => {

        await conn.execute('UPDATE report SET report_done = ? updated_at = CURRENT_TIMESTAMP WHERE report_id = ?', [report_done, report_id])
}

export const deleteReport = async (report_id?: string) => {

        await conn.execute('DELETE FROM report WHERE report_id = ?', [report_id])
}

/* export const deleteReport = async (report_id?: string) => {

        await conn.execute('UPDATE report SET report_status = false WHERE report_id = ?', [report_id])
} */