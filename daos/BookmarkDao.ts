/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */

import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} BookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    
    private constructor() {}
    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * @param {string} uid Primary key of user who bookmarks the tuit 
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarkedTuits = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkdBy: uid})
            .populate("tuit")
            .exec();
    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Primary key of user who bookmarks the tuit
     * @param {string} tid Primary key of tuit that is bookmarked
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});
    /**
     * Removes bookmark from the database.
     * @param {string} uid Primary key of user 
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
}