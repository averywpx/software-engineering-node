/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";
/**
 * @typedef Bookmark Represents bookmarks
 * @property {ObjectId[]} tuit The tuit that is bookmarked
 * @property {ObjectId[]} bookmarkedBy User who bookmarks tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;