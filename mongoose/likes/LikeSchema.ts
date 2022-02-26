/**
 * @file Implements mongoose schema for likes
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";
/**
 * @typedef Like Represents likes
 * @property {ObjectId[]} tuit The tuit that is likeed
 * @property {ObjectId[]} likeedBy User who likes tuit
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;