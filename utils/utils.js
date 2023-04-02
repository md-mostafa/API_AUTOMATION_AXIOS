import userData from '../users.json' assert {type : "json"};
import configData from '../env.json' assert { type : "json" };
import fs from 'fs';
import { generateNumber } from './randomUtils.js';

export function saveUserToJson(user){
    userData.push(user)
   
    fs.writeFileSync('users.json', JSON.stringify(userData));
    console.log("Saved to user.json!!");
}


export function saveToken(token){
    configData.token = token;
    fs.writeFileSync('env.json', JSON.stringify(configData));
    console.log("Saved to config file");

}

export function getRandomUserFromFile(){
    var randomNumber = generateNumber(0, userData.length);
    return userData[randomNumber]

}