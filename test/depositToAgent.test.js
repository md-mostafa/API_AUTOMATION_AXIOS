import chai from 'chai';
import axios from 'axios';
import configData from '../config/env.json' assert { type : "json" };
import { saveToken, getRandomUser } from '../utils/utils.js';



describe("Deposit To Agent", () => {
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

    it("Deposit to agent with invalid phone", async () => {
        const response = await axios.post(`${configData.baseUrl}/transaction/deposit`,
            {
                "from_account": "SYSTEM",
                "to_account": "0987439873985",
                "amount": 1000
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res)
            .catch((err) => err.response.data);

        chai.expect(response.message).contains("Account does not exist");
    });


    it("Deposit to agent with valid phone", async () => {
        let randomAgent = getRandomUser("Agent");
        const response = await axios.post(`${configData.baseUrl}/transaction/deposit`,
            {
                "from_account": "SYSTEM",
                "to_account": `${randomAgent.phone_number}`,
                "amount": 3000
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data);

        chai.expect(response.message).contains("Deposit successful");
    });

});
