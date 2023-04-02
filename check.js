import { createRandomUser, getEmail, getName, getPhone} from "./utils/randomUtils.js";
import { saveUserToJson } from './utils/utils.js';


var name = getName();
var email = getEmail();
var phone_number = getPhone();
var password = "1234";
var nid = "12345789"
var role = "Agent";
var id = 12346;

var newUser = createRandomUser(id, name, email, password, phone_number, nid, role);

saveUserToJson(newUser);