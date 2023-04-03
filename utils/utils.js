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

export function getRandomAgentFromFile(){
    while(true){
        let randomNumber = generateNumber(0, userData.length);
        let randomUser = userData[randomNumber];
        if(randomUser.role == "Agent"){
            return randomUser;
        }
    }
}

export function getRandomCustomerFromFile(){
    while(true){
        let randomNumber = generateNumber(0, userData.length);
        let randomUser = userData[randomNumber];
        if(randomUser.role == "Customer"){
            return randomUser;
        }
    }
}

export function getTwoCustomersFromFile(){
    while(true){
        let customer1 = getRandomCustomerFromFile();
        let customer2 = getRandomCustomerFromFile();

        if(customer1.phone_number !== customer2.phone_number){
            return [customer1, customer2]
        }
    }
}


export function updateUser(newUser){
    userData.forEach((user) => {
        if(user.id == newUser.id){
            user = newUser;
            fs.writeFileSync('users.json', JSON.stringify(userData));
            console.log("Updated to user data");
            return;
        }
    });
}