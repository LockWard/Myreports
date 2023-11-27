import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";

import { JWT_SECRET } from '../config/config'
import * as userModels from '../models/user.models'

export function verifyAccessToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                return reject(err)
            }
            return resolve(<JwtPayload>payload)
        })
    })
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {

    let token = req.headers['x-access-token'] as string
    if (!token) return res.status(403).json({ message: "No token provided" })

    try {

        /* <JwtPayload>verifyAccessToken(token).then(payload => {
            console.log("auth: ", payload); // this log ->  { id: 77, iat: 1593603153, exp: 1596195153 }
            console.log("user id: ", payload.id); // this log -> 77
            const user = userModels.getUserId(payload.id)
            if (!user) return res.status(400).json({ message: "No user found" })
            return payload
        })  */

        const decoded = await verifyAccessToken(token)
        
        const user = await userModels.getUserId(decoded.id)
        if (!user) return res.status(400).json({ message: "No user found" })

        return next()
    } catch (error) {

        return res.status(401).json({ message: "Unauthorized" })

    }
}

export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers['x-access-token'] as string
        if (!token) return res.status(403).json({ message: "No token provided" })
        
        const decoded = await verifyAccessToken(token)
        
        const user = await userModels.getUserId(decoded.id)
        const result = user[0]

        if(result.role_id == 2 || result.role_id == 1){
            return next()
        }

        return res.status(403).json({ message: "Require moderator role" })

    } catch (error) {

        return res.status(500).send({ message: error })

    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers['x-access-token'] as string
        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = await verifyAccessToken(token)
        
        const user = await userModels.getUserId(decoded.id)
        const result = user[0]

        if(result.role_id == 1){
            return next()
        }

        return res.status(403).json({ message: "Require admin role" })

    } catch (error) {

        return res.status(500).send({ message: error })

    }
}