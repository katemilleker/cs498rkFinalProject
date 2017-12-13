// global imports
import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, Text, TextInput, View, ImageBackground, Image } from "react-native";

// local imports
import { logInJobSeeker, logInRecruiter } from "./../../api/auth";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      logInAs: "jobSeeker"
    };
  }

  goToJobSeekerHomeScreen = () => {
    this.props.navigation.navigate("JobSeekerHome", this.state);
  };

  goToRecruiterHomeScreen = () => {
    this.props.navigation.navigate("RecruiterHome", this.state);
  };

  goToApprovedApplicantScreen = () => {
    this.props.navigation.navigate("ApprovedApplicantsScreen", this.state);
  };

  goToSignUpScreen = () => {
    this.props.navigation.navigate("SignUp", this.state);
  };

  loginUser = () => {
    // clear any errors
    this.setState({ error: null });

    // validate, if errors return
    if (!this.state.email || this.state.email === "") {
      return this.setState({ error: "No email provided" });
    }

    if (!this.state.password || this.state.password === "") {
      return this.setState({ error: "No password provided" });
    }

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    let logIn = this.state.logInAs === "jobSeeker" ?
      logInJobSeeker : logInRecruiter;

    let goToScreen = this.state.logInAs === "jobSeeker" ?
      this.goToJobSeekerHomeScreen : this.goToRecruiterHomeScreen;

    logIn(user).then(response => {
      goToScreen();
    }).catch(error => {
      this.setState({ error: "There was an issue logging in" });
      console.log("There was an issue logging the user in:", error);
    });
  };

  render() {
    let jobSeekerButtonStyle = this.state.logInAs === "jobSeeker" ?
      styles.buttonToggleItemSelected : styles.buttonToggleItemNotSelected;

    let recruiterButtonStyle = this.state.logInAs === "recruiter" ?
      styles.buttonToggleItemSelected : styles.buttonToggleItemNotSelected;

    return (
      <ImageBackground source={require('../../assets/images/Background.png')} style={styles.backgroundImage}>
        <View style={[styles.container]}>


          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/Icon.png')}
            />
          </View>


          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              <Text style={{ fontFamily: "Raleway-Black", fontSize: 40, color: "white" }}>H</Text>
              YPERCRUITER</Text>
          </View>


          <View style={styles.buttonToggleRow}>
            <View style={[styles.pullRight, styles.flexGrow]}>
              <TouchableHighlight
                style={[styles.buttonToggleItem, jobSeekerButtonStyle]}
                onPress={() => this.setState({ logInAs: "jobSeeker" })}>
                <Text style={[styles.whiteColor, styles.buttonToggleLabelText]}>JOB SEEKER</Text>
              </TouchableHighlight>
            </View>

            <View style={[styles.pullLeft, styles.flexGrow]}>
              <TouchableHighlight
                style={[styles.buttonToggleItem, recruiterButtonStyle]}
                onPress={() => this.setState({ logInAs: "recruiter" })}>
                <Text style={styles.buttonToggleLabelText} >RECRUITER</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[styles.inputContainer]}>


            <TextInput
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
              underlineColorAndroid="transparent"
              placeholderTextColor="#FFFFFF"
              placeholder="ENTER EMAIL"
              autoCapitalize="none"
              style={[styles.inputItem]}
            />
          </View>

          <View style={[styles.inputContainer]}>
            <TextInput
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
              placeholder="PASS"
              underlineColorAndroid="transparent"
              placeholderTextColor="#FFFFFF"
              autoCapitalize="none"
              secureTextEntry={true}
              style={[styles.inputItem]}
            />
          </View>

          {
            this.state.error &&
            <View style={[styles.errorRow, styles.textItem]}>
              <Text style={[styles.centerText, styles.errorText]}>
                {this.state.error}
              </Text>
            </View>
          }

          <View style={[styles.buttonRow]}>
            <View style={[styles.loginButtonContainer]}>
              <TouchableHighlight
                underlayColor="#ddd"
                style={[styles.loginButton]}
                onPress={() => this.loginUser()}>
                <Text style={[styles.loginButtonText]}>LOGIN</Text>
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
      </ImageBackground>
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
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 10,
    paddingBottom: 10,
    width: 130,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonToggleItemSelected: {
    backgroundColor: "#7178C4",
  },
  buttonToggleItemNotSelected: {
    backgroundColor: "#D8D8D8",
  },
  buttonToggleLabel: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    paddingBottom: 14
  },
  whiteColor: {
    color: "white"
  },
  buttonToggleLabelText: {
    fontSize: 14,
    fontFamily: "Raleway-Light"
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  buttonToggleRow: {
    flexDirection: "row",
    marginTop: 30,
    paddingBottom: 8
  },
  centerText: {
    textAlign: "center"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14
  },
  errorText: {
    color: "white",
    backgroundColor: "transparent",
    fontFamily: "Raleway-Bold"
  },
  flexGrow: {
    flexGrow: 1
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: 'rgba(76,76,76,.37)',
    marginTop: 25
  },
  inputItem: {
    margin: "auto",
    borderColor: "transparent",
    borderRadius: 50,
    fontSize: 14,
    paddingLeft: 30,
    //underlineColorAndroid : "none",
    fontFamily: "Raleway-Thin",
    width: "70%",
    height: 60,
    color: "white"
  },
  link: {
    color: "#FFFFFF",
    backgroundColor: "transparent",
    fontFamily: "Raleway-Light"
  },
  loginButton: {
    borderRadius: 50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7178C4"
  },
  loginButtonContainer: {
    marginTop: 20,
    borderRadius: 50,
    width: "50%",
    backgroundColor: "#ccc",
    marginTop: 10
  },
  loginButtonText: {
    fontSize: 24,
    fontFamily: "Raleway-Light",
    color: "white",
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
  },
  headerContainer: {

  },
  headerText: {
    fontSize: 40,
    fontFamily: "Raleway-Thin",
    color: "white",
    backgroundColor: "transparent",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  }
});
