import chai from 'chai';
import axios from 'axios';
import { getRandomUser, getTwoCustomersFromFile, saveToken, updateUser } from '../utils/utils.js';
import configData from '../config/env.json' assert { type: "json" };

describe("Send Money", () => {
    before(async () => {
        var response = await axios.post(`${configData.baseUrl}/user/login`,
            {
                "email": "salman@roadtocareer.net",
                "password": "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token
                }
            }).then((res) => res.data);

        saveToken(response.token);

    });


    it("Send money should not be successful to an invalid customer", async () => {
        let randomUser = getRandomUser("Customer", true);
        const response = await axios.post(`${configData.baseUrl}/transaction/sendmoney`,
            {
                "from_account": `${randomUser.phone_number}`,
                "to_account": "232",
                "amount": 50
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response);


        chai.expect(response.data.message).contains("From/To Account does not exist");

    });

    it("Send money should not be successful to an agent", async () => {
        let randomUser = getRandomUser("Customer", true);
        let randomAgent = getRandomUser("Agent", false);
        const response = await axios.post(`${configData.baseUrl}/transaction/sendmoney`,
            {
                "from_account": `${randomUser.phone_number}`,
                "to_account": `${randomAgent.phone_number}`,
                "amount": 50
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response);

        chai.expect(response.message).contains("From/To account should not be an agent account");

    });

    it("Send money should be successful to a valid user", async () => {
        let randomUser1 = getRandomUser("Customer", true);
        let randomUser2 = getRandomUser("Customer", false);
        let amount = 50;
        const response = await axios.post(`${configData.baseUrl}/transaction/sendmoney`,
            {
                "from_account": `${randomUser1.phone_number}`,
                "to_account": `${randomUser2.phone_number}`,
                "amount": amount
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response);

        let balanceBeforeSendMoney = randomUser1.balance;
        let fee = response.fee;
        let expectedBalance = balanceBeforeSendMoney - fee - amount;

        chai.expect(response.message).contains("Send money successful");
        chai.expect(response.currentBalance).equals(expectedBalance);

    });

});