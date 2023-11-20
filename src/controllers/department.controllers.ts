import { Request, Response } from 'express'
import * as departmentModels from '../models/department.models'

export const getAllDepartments = async (_req: Request, res: Response): Promise<Response | any> => {
    try {

        const result = await departmentModels.getAllDepartments()
        return res.status(200).json(result)

    } catch (error) {

        console.error('Error fetching departments:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getDepartmentId = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    try {

        const result = await departmentModels.getDepartmentId(id)
        if (!result.length) {
            return res.status(404).json({ error: `Department ${id} not found` })
        } else {
            return res.status(200).json(result)
        }
        
    } catch (error) {

        console.error('Error fetching department:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const postDepartment = async (req: Request, res: Response) => {
    const { department_name } = req.body
    try {

        await departmentModels.postDepartment(department_name)
        return res.status(200).json({ message: `Department '${department_name}' created` })

    } catch (error) {

        console.error('Error creating department:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const putDepartment = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    const { department_name, department_status } = req.body
    try {

        const result = await departmentModels.getDepartmentId(id)
        if (!result.length) {
            return res.status(404).json({ message: `Department '${department_name}' not found` })
        }

        await departmentModels.putDepartment(department_name, department_status, id)
        return res.status(201).json({ message: `Department '${department_name}' updated successfully` })

    } catch (error) {

        console.error('Error updating department:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const deleteDepartment = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    try {

        const result = await departmentModels.getDepartmentId(id)
        if (!result.length) {
            return res.status(404).json({ message: `Department ${id} not found` })
        }

        await departmentModels.deleteDepartment(id)
        return res.status(201).json({ message: `Department ${id} deleted successfully` })

    } catch (error) {

        console.error('Error deleting department:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

/* export const deleteDepartment = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    try {
        const result = await departmentModels.getDepartmentId(id)
        if (!result.length) {
            return res.status(404).json({ message: `Department ${id} not found` })
        }
        await departmentModels.deleteDepartment(id)
        res.status(201).json({ message: `Department ${id} deleted successfully` })
    } catch (error) {
        console.error('Error deleting department:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
} */