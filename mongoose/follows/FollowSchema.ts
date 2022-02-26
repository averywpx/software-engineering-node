/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";
/**
 * @typedef Follow Represents follows
 * @property {ObjectId[]} user The user that is followed
 * @property {ObjectId[]} followedBy User who follows another user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    followedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;