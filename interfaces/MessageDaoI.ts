import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesSentToUser (uid: string): Promise<Message[]>;
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    userSendMessage (uid: string, uid2: string, message: Message): Promise<Message>;
    userDeleteMessage (mid: string): Promise<Message>;
};