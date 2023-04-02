const { expect } = require('chai');
const axios = require('axios');
const jsonData = require('../env.json');
const fs = require('fs');


describe("User can do login", () => {
    it("User can not login with invalid email", async () => {
        const response = await axios.post(`${jsonData.baseUrl}/user/login`,
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
        expect(response.data.message).contains("User not found");

    });

    it("User can not login with invalid password", async () => {
        const response = await axios.post(`${jsonData.baseUrl}/user/login`,
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
        expect(response.data.message).contains("Password incorrect");

    });


    it("User can login successfully with valid creds", async () => {
        const response = await axios.post(`${jsonData.baseUrl}/user/login`,
            {
                "email": "salman@roadtocareer.net",
                "password": "1234"
            },
            {
                "Content-Type": "application/json"
            }).then((res) => res.data)

        expect(response.message).contains("Login successfully");
        jsonData.token = response.token;
        fs.writeFileSync('env.json', JSON.stringify(jsonData));
    });
});