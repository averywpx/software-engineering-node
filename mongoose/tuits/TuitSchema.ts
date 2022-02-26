import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
  * @typedef Tuit Represents a Tuit
  * @property {Tuit} tuit Tuit being created
  * @property {Date} postedOn Date the tuit is posted
  * @property {User} postedBy User posted the tuit
  */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;