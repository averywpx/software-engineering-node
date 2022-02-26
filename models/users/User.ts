import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";


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
export default interface User {
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
};

