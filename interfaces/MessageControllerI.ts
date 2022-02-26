/**
 * @file Declares API for Message related data access object methods
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllMessagesSentToUser (req: Request, res: Response): void;
    findAllMessagesSentByUser (req: Request, res: Response): void;
    userSendMessage (req: Request, res: Response): void;
    userDeleteMessage (req: Request, res: Response): void;
};