import { Request, Response } from "express";
import {clerkClient} from "../index"

export const updateUser = async(req: Request, res: Response): Promise<void> => {
const {userId} = req.params
const userData = req.body

try {
    await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
            userType: userData.publicMetadata.settings,
            settings: userData.publicMetadata.settings
        }
    })

    res.status(200).json({message: "User updated successfully"})
} catch (error) {
    res.status(500).json({message: "Error updating user", error})
}


}