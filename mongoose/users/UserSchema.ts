/**
  * @typedef User Represents a User
  * @property {string} username the username of the user
  * @property {string} password the password of the user
  * @property {string} firstName the first name of the user
  * @property {string} lastName the last name of the user
  * @property {string} email the email of the user
  * @property {string} profilePhoto the profile of the user
  * @property {string} headerImage the headshot of the user
  * @property {string} biography the biograpy of the user
  * @property {Date} dateOfBirth the DOB of the user
  * @property {AccountType} accountType the account type of the user
  * @property {MaritalStatus} maritalStatus the marital status of the user
  * @property {Location} location the location of the user
  */
import mongoose from "mongoose";
import User from "../../models/users/User";
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
}, {collection: "users"});

export default UserSchema;