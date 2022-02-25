
/**
 * @file Server file
 */
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from './controllers/LikeController';
import FollowController from './controllers/FollowController';
import mongoose from "mongoose";
import BookmarkController from './controllers/BookmarkController';
import MessageController from './controllers/MessageController';


// connect to the database
// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://software-engineering-node:software-engineering-node@cluster0.hgyuv.mongodb.net/tuiter-db?retryWrites=true&w=majority`;
// const connectionString = `mongodb://localhost:27017/tuiter-db`;
mongoose.connect(connectionString);

// create RESTful Web service API
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followsController = FollowController.getInstance(app);
const bookmarksController = BookmarkController.getInstance(app);
const messagesController = MessageController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
 