import { Request, Response } from 'express'
import MessageModel from "./models/message";

export const getMessages = async (req: Request, res: Response) => {
    try{
        const messages = await MessageModel.find({});
        res.status(200).json(messages);
    }
    catch(error)
    {
        res.status(500).json(error);
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try{
        const {from, content} = req.body;
        
        const newMessage = new MessageModel({
            from,
            content
        });

        await newMessage.save();
        res.status(200).json(newMessage);
    }
    catch(error)
    {
        res.status(500).json(error);   
    }
}