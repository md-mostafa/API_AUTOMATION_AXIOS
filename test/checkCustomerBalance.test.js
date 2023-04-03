import chai from 'chai';
import axios from 'axios';
import configData from '../config/env.json' assert { type : "json" };
import { saveToken, getRandomUser, updateUser } from '../utils/utils.js';


describe("Check customer balance after deposit", () => {
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

    it("Check customer balance with invalid phone", async () => {
        let invalidPhone = "24324234231";

        const response = await axios.get(`${configData.baseUrl}/transaction/balance/${invalidPhone}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data);
        
        chai.expect(response.message).contains("User not found");
    });

    it("Check customer balance with valid creds", async () => {
        let user = getRandomUser("Customer");


        const response = await axios.get(`${configData.baseUrl}/transaction/balance/${user.phone_number}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data);

        chai.expect(response.message).contains("User balance");
        user["balance"] = response.balance;
        updateUser(user);
    });


});