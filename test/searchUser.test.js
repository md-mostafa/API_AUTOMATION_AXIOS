import chai from 'chai';
import axios from 'axios';
import configData from '../config/env.json' assert { type : "json" };
import { getRandomUser, saveToken } from '../utils/utils.js';


describe("Search User", () => {
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


    it("Search user by invalid phone", async () => {
        const response = await axios.get(`${configData.baseUrl}/user/search/phonenumber/1111`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            })
            .catch((err) => err.response.data.message);
        chai.expect(response).contains("User not found");


    });


    it("Search user by valid phone", async () => {
        var user = getRandomUser("Customer");
        var phone_number = user.phone_number;
        const response = await axios.get(`${configData.baseUrl}/user/search/phonenumber/${phone_number}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data.error.message);

        chai.expect(response.message).contains("User found");

    });
});