import { createRandomUser, generateNumber, getEmail, getName, getPhone} from "./utils/randomUtils.js";
import { getTwoCustomersFromFile, saveUserToJson } from './utils/utils.js';
import userData from './users.json' assert {type : "json"};
import configData from '../env.json' assert { type : "json" };
import fs from 'fs';


function getRandomUserFromFile(){
    var randomNumber = generateNumber(0, userData.length);
    return userData[randomNumber]

}

let x = getTwoCustomersFromFile();
console.log(x[0])
console.log(x[1])



