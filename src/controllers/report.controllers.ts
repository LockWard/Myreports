import { Request, Response } from 'express'
import * as reportModels from '../models/report.models'
import * as userModels from '../models/user.models'
import { verifyAccessToken } from '../middlewares/authjwt'

export const getAllReports = async (_req: Request, res: Response): Promise<Response | any> => {
    try {

        const result = await reportModels.getAllReports()
        return res.status(200).json(result)

    } catch (error) {

        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getAllReportsActives = async (_req: Request, res: Response): Promise<Response | any> => {
    try {

        const result = await reportModels.getAllReports()
        return res.status(200).json(result.filter(function(report) { return !report.report_done == true }))

    } catch (error) {

        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getAllReportsCompleted = async (_req: Request, res: Response): Promise<Response | any> => {
    try {

        const result = await reportModels.getAllReports()
        return res.status(200).json(result.filter(function(report) { return !report.report_done == false }))

    } catch (error) {

        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
        
    }
}

export const getAllReportsByUser = async (req: Request, res: Response): Promise<Response | any> => {
    try {

        let token = req.headers['x-access-token'] as string
        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = await verifyAccessToken(token)
        
        const result = await reportModels.getAllReportsByUser(decoded.id)
        return res.status(200).json(result)

    } catch (error) {

        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getAllReportsActivesByUser = async (req: Request, res: Response): Promise<Response | any> => {
    try {

        let token = req.headers['x-access-token'] as string
        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = await verifyAccessToken(token)
        
        const result = await reportModels.getAllReportsByUser(decoded.id)
        return res.status(200).json(result.filter(function(report) { return !report.report_done == false }))

    } catch (error) {

        console.error('Error fetching reports:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getAllReportsCompletedByUser = async (req: Request, res: Response): Promise<Response | any> => {
    try {

        let token = req.headers['x-access-token'] as string
        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = await verifyAccessToken(token)
        
        const result = await reportModels.getAllReportsByUser(decoded.id)
        return res.status(200).json(result.filter(function(report) { return !report.report_done == true }))

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
    const { report_description, report_priority } = req.body
    try {

        const result = await reportModels.getReportId(id)
        if (!result.length) {
            return res.status(404).json({ message: `Report ${id} not found` })
        }

        await reportModels.putReport(report_description, report_priority, id)
        return res.status(201).json({ message: `Report ${id} updated successfully` })

    } catch (error) {

        console.error('Error updating report:', error);
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const putReportToggleByAdmin = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    const { report_done } = req.body
    try {

        const result = await reportModels.getReportId(id)
        if (!result.length) {
            return res.status(404).json({ message: `Report ${id} not found` })
        }

        await reportModels.putReportToggleByAdmin(report_done !== undefined ? true : false, id)
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
