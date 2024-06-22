import { Request, Response } from "express";
import { Content, GoogleGenerativeAI, Part} from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new GoogleGenerativeAI(process.env.API_KEY as string);

const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({model: modelId});

const conversationContext:[string, string][] = [];
const currentMessages:Content[] = [];

export const generateResponse = async (req: Request, res: Response) => {
    try{
        const {prompt} = req.body;

        for (const [inputText, responseText] of conversationContext){
            currentMessages.push({ role: "user", parts: [{text: inputText}]});
            currentMessages.push({ role: "model", parts: [{text: responseText}] });
        }

        const chat = model.startChat({
            history: currentMessages, 
            generationConfig: {
                maxOutputTokens: 100
            }
        });


        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const responseText = response.text();

        conversationContext.push([prompt, responseText]);

        res.send({response: responseText});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}