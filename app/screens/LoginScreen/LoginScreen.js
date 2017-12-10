
// global imports
import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, Text, TextInput, View } from "react-native";

// local imports
import { logInJobSeeker, logInRecruiter } from "./../../api/auth";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInAs: "jobSeeker"
    };
  }

  goToJobSeekerHomeScreen = () => {
    this.props.navigation.navigate("JobSeekerHome", this.state);
  };

  goToRecruiterHomeScreen = () => {
    this.props.navigation.navigate("RecruiterHome", this.state);
  };

  goToSignUpScreen = () => {
    this.props.navigation.navigate("SignUp", this.state);
  };

  loginUser = () => {
    let logIn = this.state.logInAs === "jobSeeker" ?
      logInJobSeeker : logInRecruiter;

    let goToScreen = this.state.logInAs === "jobSeeker" ?
      this.goToJobSeekerHomeScreen : this.goToRecruiterHomeScreen;

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    logIn(user).then(response => {
      goToScreen();
    }); 
  };

  render() {
    let jobSeekerButtonStyle = this.state.logInAs === "jobSeeker" ?
      styles.buttonToggleItemSelected : styles.buttonToggleItemNotSelected;

    let recruiterButtonStyle = this.state.logInAs === "recruiter" ?
      styles.buttonToggleItemSelected : styles.buttonToggleItemNotSelected;

    return (
      <View style={[styles.container]}>
        <View style={[styles.buttonToggleLabel]}>
          <Text style={styles.buttonToggleLabelText}>Log In As</Text>
        </View>

        <View style={styles.buttonToggleRow}>
          <View style={[styles.pullRight, styles.flexGrow]}>
            <TouchableHighlight 
              style={[styles.buttonToggleItem, jobSeekerButtonStyle]}
              onPress={() => this.setState({logInAs: "jobSeeker"})}>
              <Text>Job Seeker</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.pullLeft, styles.flexGrow]}>
            <TouchableHighlight 
              style={[styles.buttonToggleItem, recruiterButtonStyle]}
              onPress={() => this.setState({logInAs: "recruiter"})}>
              <Text>Recruiter</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[styles.inputContainer]}>
          <TextInput
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder="email"
            autoCapitalize="none"
            style={[styles.inputItem]}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}            
            style={[styles.inputItem]}
          />
        </View>

        <View style={[styles.buttonRow]}>
          <View style={[styles.loginButtonContainer]}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.loginButton]}
              onPress={() => this.loginUser()}>
              <Text style={[styles.loginButtonText]}>Log In</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[styles.signUpRedirectRow, styles.textItem]}>
          <Text
            style={[styles.link, styles.centerText]}
            onPress={() => this.goToSignUpScreen()}>
            Need an Account? Sign Up
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 15
  },
  buttonToggleItem: {
    borderRadius: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    width: 130,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonToggleItemSelected: {
    backgroundColor: "lightgreen"
  },
  buttonToggleItemNotSelected: {
    backgroundColor: "#bbb"
  },
  buttonToggleLabel: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    paddingBottom: 14
  },
  buttonToggleLabelText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  buttonToggleRow: {
    flexDirection: "row",
    marginTop: 6,
    paddingBottom: 8
  },
  centerText: {
    textAlign: "center"
  },
  container: {
    padding: 8,
    paddingTop: 15
  },
  flexGrow: {
    flexGrow: 1
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 5
  },
  inputItem: {
    margin: "auto",
    borderColor: "#333333",
    borderRadius: 5,
    borderWidth: 1.5,
    width: "55%",
    height: 35,
    paddingLeft: 10
  },
  link: {
    color: "blue"
  },
  loginButton: {
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc"
  },
  loginButtonContainer: {
    borderRadius: 8,
    width: "40%",
    backgroundColor: "#ccc",
    marginTop: 10
  },
  loginButtonText: {
    fontSize: 18
  },
  pullLeft: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  pullRight: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  textItem: {
    paddingTop: 8
  },
  signUpRedirectRow: {
    marginTop: 10
  }
});
