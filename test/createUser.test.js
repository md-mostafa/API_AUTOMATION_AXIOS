import chai from 'chai';
import axios from 'axios';
import configData from '../config/env.json' assert { type : "json" };
import { createRandomUser, getEmail, getName, getPhone} from "../utils/randomUtils.js";
import { saveUserToJson, saveToken, getRandomUser } from '../utils/utils.js';


describe("User Creation", () => {
    before(async () => {
        const response = await axios.post(`${configData.baseUrl}/user/login`,
            {
                "email": "salman@roadtocareer.net",
                "password": "1234"
            },
            {
                "Content-Type": "application/json"
            }).then((res) => res.data);

        saveToken(response.token);
    });

    it("Admin can not create user with existing user data", async () => {
        var randomUser = getRandomUser("Customer");
        var name = randomUser.name;
        var email = randomUser.email;
        var phone_number = randomUser.phone_number;
        var password = randomUser.phone_number;
        var nid = "12345789"
        var role = "Customer";

        const response = await axios.post(`${configData.baseUrl}/user/create`,
        {
            "name": name,
            "email": email,
            "password": password,
            "phone_number": phone_number,
            "nid": nid,
            "role": role
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": configData.token,
                "X-AUTH-SECRET-KEY": configData.secretKey
            }
        }).then((res) => res.data)
        .catch((err) => err);

        chai.expect(response.message).contains("User already exists");


    });

    it("Admin can create customer", async () => {
        var name = getName();
        var email = getEmail();
        var phone_number = getPhone();
        var password = "1234";
        var nid = "12345789"
        var role = "Customer";
        var id;

        const response = await axios.post(`${configData.baseUrl}/user/create`,
            {
                "name": name,
                "email": email,
                "password": password,
                "phone_number": phone_number,
                "nid": nid,
                "role": role
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err);

        chai.expect(response.message).contains("User created");
        id = response.user.id;
        saveUserToJson(createRandomUser(id, name, email, password, phone_number, nid, role));

    });

    it("Admin can create agent", async () => {
        var name = getName();
        var email = getEmail();
        var phone_number = getPhone();
        var password = "1234";
        var nid = "12345789"
        var role = "Agent";
        var id;

        const response = await axios.post(`${configData.baseUrl}/user/create`,
            {
                "name": name,
                "email": email,
                "password": password,
                "phone_number": phone_number,
                "nid": nid,
                "role": role
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err);

        chai.expect(response.message).contains("User created");
        id = response.user.id;
        saveUserToJson(createRandomUser(id, name, email, password, phone_number, nid, role));


    });

});