/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} DislikeDao Private single instance of LikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}
    /**
     * Uses DislikeModel to retrieve all user documents from dislikes collection
     * @param {string} tid Primary key of tuit that is disliked by a user
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();
    /**
     * Uses DislikeModel to retrieve all tuit documents from dislikes collection
     * @param {string} uid Primary key of user who dislikes the tuit
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
        findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();
    /**
     * Inserts dislike instance into the database
     * @param {string} uid Primary key of user who dislikes the tuit
     * @param {string} tid Primary key of tuit that is disliked
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});
    /**
     * find specific user that dislike a specific tuit
     * @param uid Primary key of user who unlikes the tuit
     * @param tid rimary key of tuit that is disliked
     * @returns Promise To be notified when the tuit is retrieved from
     * database
     */
        findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    /**
     * Removes dislike from the database.
     * @param {string} uid Primary key of user who unlikes the tuit
     * @param {string} tid Primary key of tuit that is disliked
     * @returns Promise To be notified when dislike is removed from the database
     */
    userCancelDislike = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    /**
     * Count number of users dislike thid tuit
     * @param tid Primary key of tuit that is disliked
     * @returns Promise To be notified when the count is retrieved from
     * database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}