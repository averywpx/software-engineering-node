/**
 * @file Declares API for Follows related data access object methods
 */
import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    findAllFollowing (uid: string): Promise<Follow[]>;
    findAllFollower (uid: string): Promise<Follow[]>;
    userUnfollowsUser (uid: string, uid2: string): Promise<any>;
    userFollowsUser (uid: string, uid2: string): Promise<Follow>;
    // countfollowers (uid: string): Promise<Number>;
};