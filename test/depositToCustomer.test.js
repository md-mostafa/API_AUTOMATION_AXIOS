import chai from 'chai';
import axios from 'axios';
import jsonData from '../env.json' assert { type: "json" };
import { saveToken, getRandomAgentFromFile, getTwoCustomersFromFile, getRandomCustomerFromFile } from '../utils/utils.js';


describe("Deposit To Customer", () => {
    before(async () => {
        const response = await axios.post(`${jsonData.baseUrl}/user/login`,
            {
                "email": "salman@roadtocareer.net",
                "password": "1234"
            },
            {
                "Content-Type": "application/json"
            }).then((res) => res.data);

        saveToken(response.token);
    });

    it("Deposit to customer from customer account", async () => {
        let customerList = getTwoCustomersFromFile();
        let customer1 = customerList[0];
        let customer2 = customerList[1];

        const response = await axios.post(`${jsonData.baseUrl}/transaction/deposit`,
            {
                "from_account": `${customer1.phone_number}`,
                "to_account": `${customer2.phone_number}`,
                "amount": 1000
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data);

        chai.expect(response.message).contains("Only Agent can deposit money");
    });

    it("Deposit to valid customer from valid agent", async () => {
        let randomAgent = getRandomAgentFromFile();
        let randomCustomer = getRandomCustomerFromFile();
        const response = await axios.post(`${jsonData.baseUrl}/transaction/deposit`,
            {
                "from_account": `${randomAgent.phone_number}`,
                "to_account": `${randomCustomer.phone_number}`,
                "amount": 10
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data);

        chai.expect(response.message).contains("Deposit successful");
    });


});
