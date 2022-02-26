/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} MessageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    /**
     * Uses MessageModel to retrieve all message documents the user received
     * from messages collection
     * @param {string} uid Primary key of user who received the messages
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .exec();
    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * @param {string} uid Primary key of user who sent the messages
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .exec();
    /**
     * Inserts message instance into the database
     * @param {string} uid Primary key of user who sent the messages
     * @param {string} uid Primary key of user who received the messages
     * @returns Promise To be notified when message is inserted into the database
     */
    userSendMessage = async (uid: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from: uid, to: uid2});
    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message that should be deleted 
     * @returns Promise To be notified when message is removed from the database
     */
    userDeleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}