/**
 * @file Declares Follow data type representing relationship between
 * users and tuits, as in user follows a tuit
 */

 import User from "../users/User";
 
 /**
  * @typedef Follow Represents follows relationship between a user and a tuit,
  * as in a user follows a tuit
  * @property {User} user Tuit being followd
  * @property {User} followdBy User liking the tuit
  */
 
 export default interface Follow {
     user: User,
     followedBy: User
 };