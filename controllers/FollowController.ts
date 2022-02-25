/**
 * @file Controller RESTful Web service API for follows resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class FollowController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/follows to retrieve all the tuits followd by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/follows to retrieve all users that followd a tuit
  *     </li>
  *     <li>POST /api/users/:uid/follows/:tid to record that a user follows a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/unfollows/:tid to record that a user
  *     no londer follows a tuit</li>
  * </ul>
  * @property {FollowDao} FollowDao Singleton DAO implementing follows CRUD operations
  * @property {FollowController} FollowController Singleton controller implementing
  * RESTful Web service API
  */
 export default class FollowController implements FollowControllerI {
     private static followDao: FollowDao = FollowDao.getInstance();
     private static followController: FollowController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): FollowController => {
         if(FollowController.followController === null) {
             FollowController.followController = new FollowController();
             app.get("/api/users/:uid/following", FollowController.followController.findAllFollowing);
             app.get("/api/users/:uid/follower", FollowController.followController.findAllFollower);
             app.post("/api/users/:uid/follows/:uid2", FollowController.followController.userFollowsUser);
             app.delete("/api/users/:uid/unfollows/:uid2", FollowController.followController.userUnfollowsUser);
         }
         return FollowController.followController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that followd a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the followd tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
      findAllFollowing = (req: Request, res: Response) =>
         FollowController.followDao.findAllFollowing(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * Retrieves all tuits followd by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user followd the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were followd
      */
      findAllFollower = (req: Request, res: Response) =>
         FollowController.followDao.findAllFollower(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being followd
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new follows that was inserted in the
      * database
      */
      userFollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userFollowsUser(req.params.uid, req.params.uid2)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unliking
      * the tuit and the tuit being unfollowd
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follow was successful or not
      */
      userUnfollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.uid2)
             .then(status => res.send(status));
 };