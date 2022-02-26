/**
 * @file Declares bookmark Data Access Object managing data storage
 */
import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    findAllBookmarkedTuits (uid: string): Promise<Bookmark[]>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
};