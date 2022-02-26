/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} FollowDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    
    /**
     * Uses FollowModel to retrieve all following users documents from follows collection
     * @param {string} uid Primary key of user who follows other users
     * @returns Promise To be notified when the following users are retrieved from
     * database
     */
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followedBy: uid})
            .populate("user")
            .exec();
    /**
     * Uses FollowModel to retrieve all followers documents from follows collection
     * @param {string} uid Primary key of user who is followed by other users
     * @returns Promise To be notified when the followers are retrieved from
     * database
     */
    findAllFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({user: uid})
            .populate("followedBy")
            .exec();
    /**
     * Inserts follow instance into the database
     * @param {string} uid Primary key of user who follows the other user
     * @param {string} uid2 Primary key of user that is followed
     * @returns Promise To be notified when follow object is inserted into the database
     */
    userFollowsUser = async (uid: string, uid2: string): Promise<any> =>
        FollowModel.create({user: uid2, followedBy: uid});
    /**
     * Removes follow relationship between two users from the database.
     * @param {string} uid Primary key of user 
     * @param {string} uid2 Primary key of the other user
     * @returns Promise To be notified when follow object is removed from the database
     */
    userUnfollowsUser = async (uid: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({tuser: uid2, followedBy: uid});

    // countfollowers = async (uid: string): Promise<Number> =>
    //     FollowModel
    //         .countDocuments({followedBy: uid});

    //     MessageModel.find(id).minDate()
}