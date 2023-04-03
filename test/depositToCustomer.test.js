import chai from 'chai';
import axios from 'axios';
import configData from '../config/env.json' assert { type : "json" };
import { saveToken, getTwoCustomersFromFile, getRandomUser, saveUserToJson } from '../utils/utils.js';
import { getName, getEmail, getPhone, createRandomUser} from '../utils/randomUtils.js';


describe("Deposit To Customer", () => {
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

    before(async () => {
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

        id = response.user.id;
        saveUserToJson(createRandomUser(id, name, email, password, phone_number, nid, role));

    });

    it("Deposit to customer from customer account", async () => {
        let customerList = getTwoCustomersFromFile();
        let customer1 = customerList[0];
        let customer2 = customerList[1];

        const response = await axios.post(`${configData.baseUrl}/transaction/deposit`,
            {
                "from_account": `${customer1.phone_number}`,
                "to_account": `${customer2.phone_number}`,
                "amount": 1000
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": configData.token,
                    "X-AUTH-SECRET-KEY": configData.secretKey
                }
            }).then((res) => res.data)
            .catch((err) => err.response.data);

        chai.expect(response.message).contains("Only Agent can deposit money");
    });

    it("Deposit to valid customer from valid agent", async () => {
        let randomAgent = getRandomUser("Agent");
        let randomCustomer = getRandomUser("Customer");
        const response = await axios.post(`${configData.baseUrl}/transaction/deposit`,
            {
                "from_account": `${randomAgent.phone_number}`,
                "to_account": `${randomCustomer.phone_number}`,
                "amount": 1000
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
