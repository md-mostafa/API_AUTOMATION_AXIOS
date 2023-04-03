import { createRandomUser, generateNumber, getEmail, getName, getPhone} from "./utils/randomUtils.js";
import { getRandomUser, getTwoCustomersFromFile, saveUserToJson } from './utils/utils.js';
import userData from './testdata/users.json' assert {type : "json"};
import configData from '../env.json' assert { type : "json" };
import fs from 'fs';


function getRandomUserFromFile(){
    var randomNumber = generateNumber(0, userData.length);
    return userData[randomNumber]

}

let x = getRandomUser("Customer", true);
console.log(x);



