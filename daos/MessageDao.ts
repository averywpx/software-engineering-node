import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    findAllMessagesSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .exec();
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .exec();
    userSendMessage = async (uid: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from: uid, to: uid2});

    userDeleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}