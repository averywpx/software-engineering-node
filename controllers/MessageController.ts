/**
 * @file Controller RESTful Web service API for messages resource
 */
 import {Express, Request, Response} from "express";
 import MessageDao from "../daos/MessageDao";
 import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/messages/Message";
 
 /**
  * @class TuitController Implements RESTful Web service API for messages resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/received to retrieve all the messages received by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/sent to retrieve all messages that sent by a user
  *     </li>
  *     <li>POST /api/users/:uid/messages/:uid2 to record that a user messages another user
  *     </li>
  *     <li>DELETE /api/messages/:mid to record that user dilet a message</li>
  * </ul>
  * @property {MessageDao} MessageDao Singleton DAO implementing messages CRUD operations
  * @property {MessageController} MessageController Singleton controller implementing
  * RESTful Web service API
  */
 export default class MessageController implements MessageControllerI {
     private static messageDao: MessageDao = MessageDao.getInstance();
     private static messageController: MessageController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): MessageController => {
         if(MessageController.messageController === null) {
             MessageController.messageController = new MessageController();
             app.get("/api/users/:uid/received", MessageController.messageController.findAllMessagesSentToUser);
             app.get("/api/users/:uid/sent", MessageController.messageController.findAllMessagesSentByUser);
             app.post("/api/users/:uid/messages/:uid2", MessageController.messageController.userSendMessage);
             app.delete("/api/messages/:mid", MessageController.messageController.userDeleteMessage);
         }
         return MessageController.messageController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all messages that user received from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
      findAllMessagesSentToUser = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesSentToUser(req.params.uid)
             .then(messages => res.json(messages));
 
     /**
      * Retrieves all messages sent by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user who sent the message
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects that were messaged
      */
      findAllMessagesSentByUser = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
             .then(messages => res.json(messages));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uids representing the user who sent messages and recieved
      * messages.
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new messages that was inserted in the
      * database
      */
      userSendMessage = (req: Request, res: Response) =>
         MessageController.messageDao.userSendMessage(req.params.uid, req.params.uid2, req.body)
             .then((messages: Message) => res.json(messages));

 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters mid representing the message needed to be deleted
      * @param {Response} res Represents response to client, including status
      * on whether deleting the message was successful or not
      */
      userDeleteMessage = (req: Request, res: Response) =>
         MessageController.messageDao.userDeleteMessage(req.params.mid)
             .then(status => res.send(status));
 };