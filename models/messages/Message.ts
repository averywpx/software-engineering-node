/**
 * @file Declares Message data type representing relationship between
 * users, as in user messages another user
 */

 import User from "../users/User";
 
 /**
  * @typedef Message Represents messages relationship between users,
  * as in a user messages another user
  * @property {string} message message been sent
  * @property {User} to User who received the message
  * @property {User} from User who sent the message
  * @property {Date} sendOn the date message sent
  */
 
 export default class Message {
     private message: string = '';
     private to: User | null = null;
     private from: User | null = null;
     private sendOn: Date = new Date()
 };