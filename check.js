import { createRandomUser, generateNumber, getEmail, getName, getPhone} from "./utils/randomUtils.js";
import { saveUserToJson } from './utils/utils.js';
import userData from './users.json' assert {type : "json"};
import configData from '../env.json' assert { type : "json" };
import fs from 'fs';


function getRandomUserFromFile(){
    var randomNumber = generateNumber(0, userData.length);
    return userData[randomNumber]

}

getRandomUserFromFile();



