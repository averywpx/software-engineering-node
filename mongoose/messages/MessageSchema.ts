/**
 * @file Implements mongoose schema for messages
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";
/**
 * @typedef Message Represents messages
 * @property {string} message message been sent
 * @property {User} to User who received the message
 * @property {User} from User who sent the message
 * @property {Date} sendOn the date message sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sendOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;