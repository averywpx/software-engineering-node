/**
 * @file Declares Message data type representing relationship between
 * users and tuits, as in user messages a tuit
 */

 import User from "../users/User";
 
 /**
  * @typedef Message Represents messages relationship between a user and a tuit,
  * as in a user messages a tuit
  * @property {Tuit} tuit Tuit being messaged
  * @property {User} messagedBy User liking the tuit
  */
 
 export default class Message {
     private message: string = '';
     private to: User | null = null;
     private from: User | null = null;
     private sendOn: Date = new Date()
 };