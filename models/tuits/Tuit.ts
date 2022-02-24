import User from "../users/User";
import Tag from "./Tag"
import Topics from "./Topic";

export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: User | null = null;
}

