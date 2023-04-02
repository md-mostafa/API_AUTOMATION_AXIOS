import { faker } from '@faker-js/faker';



export function getName(){
    return faker.name.fullName();
}

export function getEmail(){
    return faker.internet.email().toLowerCase();
}

export function generateNumber(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
};

export function getPhone(){
    var _phone_number = "015012" + generateNumber(10000, 99999);
    return _phone_number;

}

export function createRandomUser(id, name, email, password, phone_number, nid, role){
    var newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        nid: nid,
        role: role
    }
    
    return newUser;
}




