
// global imports
import { StackNavigator } from "react-navigation";

// local imports
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RecruiterHomeScreen from "../screens/RecruiterHomeScreen/RecruiterHomeScreen";
import JobSeekerHomeScreen from "../screens/JobSeekerHomeScreen/JobSeekerHomeScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ResumeScreen from "../screens/ResumeScreen/ResumeScreen";


export const Root = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Log In"
    }
  },
  RecruiterHome: {
    screen: RecruiterHomeScreen,
    navigationOptions: {
      title: "Home"
    }
  },
  JobSeekerHome: {
    screen: JobSeekerHomeScreen,
    navigationOptions: {
      title: "Home"
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  ResumeScreen: {
    screen: ResumeScreen,
    navigationOptions: {
      title: ""
    }
  },
});
