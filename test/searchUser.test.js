import chai from 'chai';
import axios from 'axios';
import jsonData from '../env.json' assert { type: "json" };
import { createRandomUser, getEmail, getName, getPhone } from "../utils/randomUtils.js";
import { saveUserToJson, saveToken, getRandomUserFromFile } from '../utils/utils.js';


describe("Search User", () => {

    it("Search user by invalid phone", async () => {
        const response = await axios.get(`${jsonData.baseUrl}/user/search/phonenumber/1111`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }
            })
            .catch((err) => err.response.data.message);
        chai.expect(response).contains("User not found");


    });


    it("Search user by valid phone", async () => {
        var user = getRandomUserFromFile();
        var phone_number = user.phone_number;
        const response = await axios.get(`${jsonData.baseUrl}/user/search/phonenumber/${phone_number}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data.error.message);

        chai.expect(response.message).contains("User found");

    });
});