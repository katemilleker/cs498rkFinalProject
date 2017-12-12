//module.exports = "localhost";
import {Platform} from "react-native"

module.exports = Platform.OS === 'ios' ? "localhost":"10.0.2.2";
//module.exports = "ec2-54-191-25-227.us-west-2.compute.amazonaws.com";
