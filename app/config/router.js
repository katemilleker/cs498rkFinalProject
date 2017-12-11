
// global imports
import { StackNavigator } from "react-navigation";

// local imports
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RecruiterHomeScreen from "../screens/RecruiterHomeScreen/RecruiterHomeScreen";
import JobSeekerHomeScreen from "../screens/JobSeekerHomeScreen/JobSeekerHomeScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ApprovedApplicantsScreen from "../screens/ApprovedApplicantsScreen/ApprovedApplicantsScreen";
import RejectedApplicantsScreen from "../screens/RejectedApplicantsScreen/RejectedApplicantsScreen";


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
      title: "Recruiter Home"
    }
  },
  JobSeekerHome: {
    screen: JobSeekerHomeScreen,
    navigationOptions: {
      title: "Job Seeker Home"
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  ApprovedApplicantsScreen: {
    screen: ApprovedApplicantsScreen,
    navigationOptions: {
      title: "Approved Applicants"
    }
  },
  RejectedApplicantsScreen: {
    screen: RejectedApplicantsScreen,
    navigationOptions: {
      title: "Rejected Applicants"
    }
  }
});