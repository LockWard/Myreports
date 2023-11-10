import { Request, Response } from 'express'
import * as reportModels from '../models/report.models'
import * as userModels from '../models/user.models'

export const getAllReports = async (_req: Request, res: Response): Promise<Response | any> => {
    try {
        const result = await reportModels.getReports()
        return res.status(200).json(result)
    } catch (error) {
        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getAllReportsActives = async (_req: Request, res: Response): Promise<Response | any> => {
    try {
        const result = await reportModels.getReports()
        const row = result[0]
        return res.status(200).json(row.report_status === false)
    } catch (error) {
        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getAllReportsCompleted = async (_req: Request, res: Response): Promise<Response | any> => {
    try {
        const result = await reportModels.getReports()
        const row = result[0]
        return res.status(200).json(row.report_done === true)
    } catch (error) {
        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getAllReportsByUser = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    try {
        const result = await reportModels.getAllReportsByUser(id)
        return res.status(200).json(result)
    } catch (error) {
        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getReportId = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    try {
        const result = await reportModels.getReportId(id)
        if (!result.length) {
            return res.status(404).json({ error: `Report ${id} not found` })
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.error('Error fetching report:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const postReport = async (req: Request, res: Response): Promise<Response | any> => {
    const { report_description, report_priority, user_email } = req.body
    try {
        const result = await userModels.getUserEmail(user_email)
        if (!result.length) {
            return res.status(404).json({ error: `Email '${user_email}' not found` })
        } 
        await reportModels.postReport(report_description, report_priority, user_email)
        return res.status(200).json({ message: `Report created by '${user_email}'` })
    } catch (error) {
        console.error('Error creating report:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const putReport = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    const { report_description, report_priority, report_status } = req.body
    try {
        const result = await reportModels.getReportId(id)
        if (!result.length) {
            return res.status(404).json({ message: `Report ${id} not found` })
        }
        await reportModels.putReport(report_description, report_priority, report_status, id)
        return res.status(201).json({ message: `Report ${id} updated successfully` })
    } catch (error) {
        console.error('Error updating report:', error);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const deleteReport = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
        try {
            const result = await reportModels.getReportId(id)
            if (!result.length) {
                return res.status(404).json({ message: `Report ${id} not found` })
            }
        await reportModels.deleteReport(id)
        return res.status(201).json({ message: `Report ${id} deleted successfully` })
    } catch (error) {
        console.error('Error deleting report:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
