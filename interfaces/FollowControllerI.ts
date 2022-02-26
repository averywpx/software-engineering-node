/**
 * @file Declares API for Follow related data access object methods
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllFollowing (req: Request, res: Response): void;
    findAllFollower (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
};