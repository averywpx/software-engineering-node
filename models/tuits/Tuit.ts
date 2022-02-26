import User from "../users/User";
import Tag from "./Tag"
import Topics from "./Topic";


 /**
  * @typedef Tuit Represents a Tuit
  * @property {Tuit} tuit Tuit being created
  * @property {Date} postedOn Date the tuit is posted
  * @property {User} postedBy User posted the tuit
  */
export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: User | null = null;
}

