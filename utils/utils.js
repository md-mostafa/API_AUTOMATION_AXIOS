import userData from '../testdata/users.json' assert {type : "json"};
import configData from '../config/env.json' assert { type : "json" };
import fs from 'fs';
import { generateNumber } from './randomUtils.js';

const ENV_FILE_PATH ='config/env.json';
const USERS_FILE_PATH = 'testdata/users.json';

export function saveUserToJson(user){
    userData.push(user)
   
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(userData));
}


export function saveToken(token){
    configData.token = token;
    fs.writeFileSync(ENV_FILE_PATH, JSON.stringify(configData));

}


export function getRandomUser(role, balance){

    while(true){
        let randomNumber = generateNumber(0, userData.length);
        let randomUser = userData[randomNumber];
        if(randomUser.role == role && !balance){
            return randomUser;
        }

        if(randomUser.role == role && balance && randomUser.balance && randomUser.balance > 0){
            return randomUser;
            
        }
    }
}



export function getTwoCustomersFromFile(){
    while(true){
        let customer1 = getRandomUser("Customer", false);
        let customer2 = getRandomUser("Customer", false);

        if(customer1.phone_number !== customer2.phone_number){
            return [customer1, customer2]
        }
    }
}


export function updateUser(newUser){
    userData.forEach((user) => {
        if(user.id == newUser.id){
            user = newUser;
            fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(userData));
            return;
        }
    });
}