import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../config/config'
import * as userModels from '../models/user.models'
import { comparePassword, hashPassword } from '../models/user.models'

// there are 24 hours in seconds
const maxAge = 86400

function createToken(id?: string) {
return jwt.sign({ id }, jwtSecret, {
        expiresIn: maxAge
    })
}
// Create user
export const signUp = async (req: Request, res: Response): Promise<Response | any> => {
    const { user_name, user_email, user_password, department_name, role_name } = req.body
    try {
        const hashedPassword = await hashPassword(user_password)

        const result = await userModels.getUserEmail(user_email)
        if (result.length) {
            return res.status(400).json({ error: 'This Email is already used'})
        } 
        else {
            const result = await userModels.postUser(user_name, user_email, hashedPassword, department_name, role_name)

            /* const result = await userModels.getUserEmail(user_email)
            const user = result[0] */

            return res.status(200).json({ message: `User '${user_name}' created ` + createToken(result.insertId as unknown as string)})
        }
        
    } catch (error) {
        console.error('Error creating user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
// Login
export const signIn = async (req: Request, res: Response): Promise<Response | any> => {
    const { user_email, user_password } = req.body
    try {
        if(!user_email || !user_password){
            return res.status(400).json({ error: 'Please. Send your email or password'})
        }

        const result = await userModels.getUserEmail(user_email)
        const user = result[0]
        if (!result.length) {
            return res.status(404).json({ error: `User '${user_email}' not found` })
        }

        if (user.user_status == false || user.user_status == 0) {
            return res.status(404).json({ message: 'This accout is disabled. Please comnunicated with the administrator.'})
        }

        const passwordMatch = await comparePassword(user_password, user.user_password)
        if(!passwordMatch){
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        else {
            return res.status(200).json({ msg: 'Login successful ' + createToken(user.user_id) });
        }
    } catch (error) {
        console.error('Error fetching user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
// Logout
export const signOut = async (_req: Request, res: Response): Promise<Response | any> => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}