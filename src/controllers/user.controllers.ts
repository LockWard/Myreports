import { Request, Response } from 'express'
import { hashPassword } from '../models/user.models'
import * as userModels from '../models/user.models'

export const getAllUsers = async (_req: Request, res: Response): Promise<Response | any> => {
    try {

        const result = await userModels.getAllUsers()
        return res.status(200).json(result)

    } catch (error) {

        console.error('Error fetching users:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getUserId = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    try {

        const result = await userModels.getUserId(id)
        if (!result.length) {
            return res.status(404).json({ error: `User ${id} not found` })
        } else {
            return res.status(200).json(result);
        }

    } catch (error) {

        console.error('Error fetching user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const postUserByAdmin = async (req: Request, res: Response): Promise<Response | any> => {
    const { user_name, user_email, user_password, department_name, role_name } = req.body
    try {
        
        const result = await userModels.getUserEmail(user_email)
        if(result.length) {
            return res.status(400).json({ error: 'This Email is already used'})
        }
        
        const hashedPassword = await hashPassword(user_password)
        await userModels.postUserByAdmin(user_name, user_email, hashedPassword, department_name, role_name)
        return res.status(200).json({ message: `User '${user_name}' created`})
        
    } catch (error) {

        console.error('Error creating user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const putUserByAdmin = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    const { user_name, user_email, user_password, user_status, department_name, role_id } = req.body
    try {

        const result = await userModels.getUserId(id)
        if (!result.length) {
            return res.status(404).json({ message: `User ${id} not found` })
        }

        const hashedPassword = await hashPassword(user_password);
        await userModels.putUserByAdmin(user_name, user_email, hashedPassword, user_status, department_name, role_id, id)
        return res.status(201).json({ message: `User '${user_name}' updated successfully` })

    } catch (error) {

        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    try {

        const result = await userModels.getUserId(id)
        if (!result.length) {
            return res.status(404).json({ message: `User ${id} not found` })
        }

        await userModels.deleteUser(id)
        return res.status(201).json({ message: `User ${id} deleted OR disabled successfully` })

    } catch (error) {

        console.error('Error deleting user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

/* export const deleteUser = async (req: Request, res: Response): Promise<Response | any> => {
    const { id } = req.params
    try {
        const result = await userModels.getUserId(id)
        if (!result.length) {
            return res.status(404).json({ message: `User ${id} not found` })
        }
        await userModels.deleteUser(id)
        res.status(201).json({ message: `User ${id} deleted successfully` })
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
} */