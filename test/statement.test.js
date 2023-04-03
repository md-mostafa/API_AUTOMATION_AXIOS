import chai, { expect } from 'chai';
import axios from 'axios';
import configData from '../config/env.json' assert { type: "json" };
import { getRandomUser, saveToken } from '../utils/utils.js';

describe("Check statement", () => {
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

    it("Check customer statement with invalid customer phone", async () => {
        let invalidPhone = '1232131'
        const response = await axios.get(`${configData.baseUrl}/transaction/balance/${invalidPhone}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data.message);

        chai.expect(response).contains("User not found");


    });

    it("Check customer statement with valid creds", async () => {
        let randomUser = getRandomUser("Customer");
        const response = await axios.get(`${configData.baseUrl}/transaction/balance/${randomUser.phone_number}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data.message);


        chai.expect(response.message).contains('User balance');

    });


});
