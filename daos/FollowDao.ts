import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import FollowModel from "../mongoose/follows/FollowModel";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followedBy: uid})
            .populate("user")
            .exec();
    findAllFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({user: uid})
            .populate("followedBy")
            .exec();
    userFollowsUser = async (uid: string, uid2: string): Promise<any> =>
        FollowModel.create({user: uid2, followedBy: uid});
    userUnfollowsUser = async (uid: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({tuser: uid2, followedBy: uid});

    // countfollowers = async (uid: string): Promise<Number> =>
    //     FollowModel
    //         .countDocuments({followedBy: uid});

    //     MessageModel.find(id).minDate()
}