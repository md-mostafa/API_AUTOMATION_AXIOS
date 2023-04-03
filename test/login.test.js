import chai from 'chai';
import axios from 'axios';
import { saveToken } from '../utils/utils.js';
import configData from '../config/env.json' assert { type : "json" };


describe("User can do login", () => {
    it("User can not login with invalid email", async () => {
        const response = await axios.post(`${configData.baseUrl}/user/login`,
            {
                "email": "invalid@gmail.com",
                "password": "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .catch((err) => err.response);
        chai.expect(response.data.message).contains("User not found");

    });

    it("User can not login with invalid password", async () => {
        const response = await axios.post(`${configData.baseUrl}/user/login`,
            {
                "email": "salman@roadtocareer.net",
                "password": "12344"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .catch((err) => err.response);
        chai.expect(response.data.message).contains("Password incorrect");

    });


    it("User can login successfully with valid creds", async () => {
        const response = await axios.post(`${configData.baseUrl}/user/login`,
            {
                "email": "salman@roadtocareer.net",
                "password": "1234"
            },
            {
                "Content-Type": "application/json"
            }).then((res) => res.data)

        chai.expect(response.message).contains("Login successfully");
        saveToken(response.token);
    });
});