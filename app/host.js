//module.exports = "localhost";
import {Platform} from "react-native"

module.exports = Platform.OS === 'ios' ? "localhost":"10.0.2.2";
