import chai from 'chai';
import axios from 'axios';
import { getRandomUser, getTwoCustomersFromFile, saveToken, updateUser } from '../utils/utils.js';
import configData from '../config/env.json' assert { type: "json" };


describe("Withdraw Money", () => {
    it("Withdraw money from invalid agent number", async () => {
        let randomUser = getRandomUser("Customer", true);
        const response = await axios.post(`${configData.baseUrl}/transaction/withdraw`,
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
            }).then((res) => res)
            .catch((err) => err.response);

        chai.expect(response.data.message).contains("Account does not exist");

    });


    it("Withdraw money from another customer", async () => {
        let userList = getTwoCustomersFromFile();
        const response = await axios.post(`${configData.baseUrl}/transaction/withdraw`,
            {
                "from_account": `${userList[0].phone_number}`,
                "to_account": `${userList[1].phone_number}`,
                "amount": 50
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res)
            .catch((err) => err.response);
        chai.expect(response.data.message).contains("Customer can not withdraw money from another customer");

    });


    it("Withdraw money from valid agent", async () => {
        let randomUser = getRandomUser("Customer", true);
        let randomAgent = getRandomUser("Agent", false);
        let amount = 50;

        const response = await axios.post(`${configData.baseUrl}/transaction/withdraw`,
            {
                "from_account": `${randomUser.phone_number}`,
                "to_account": `${randomAgent.phone_number}`,
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
        
        let balanceBeforeWithdrawing = randomUser.balance;
        let fee = response.fee;
        let expectedBalance = balanceBeforeWithdrawing - fee - amount;

        
        chai.expect(response.message).contains("Withdraw successful");
        chai.expect(response.currentBalance).equals(expectedBalance);

        randomUser.balance = response.currentBalance;
        updateUser(randomUser);

    });


});