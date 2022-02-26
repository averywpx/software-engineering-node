/**
 * @file Declares Follow data type representing relationship between
 * users and another user, as in user follows another user
 */

 import User from "../users/User";
 
 /**
  * @typedef Follow Represents follow relationship between a user and another user,
  * as in a user follows another user
  * @property {User} user User being followed
  * @property {User} followdBy User who follows another user
  */
 
 export default interface Follow {
     user: User,
     followedBy: User
 };