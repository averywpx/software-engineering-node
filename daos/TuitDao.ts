/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    /**
     * Retrieves all tuits from the database and returns an array of tuits.
     * body formatted as JSON arrays containing the tuit objects
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Retrieves all tuits from the database for a particular user and returns
     * an array of tuits.
     * @param {string} uid Users who created tuits
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Find the user who sent this tuit
     * @param {string} tid a tuit sent by the user
     * @returns Promise To be notified when the user is retrieved from
     * database
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("postedBy")
            .exec();
    /**
     * Inserts tuit instance into the database
     * @param {string} uid Primary key of user who create tuit
     * @param {Tuit} tid tuit body to be inserted
     * @returns Promise To be notified when message is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});
    /**
     * Update a tuit
     * @param {string} uid Primary key of user who created tuit
     * @param {Tuit} tuit Primary key of the tuit
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});
    
    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});

    
    
}

