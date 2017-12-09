
import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, Text, TextInput, View } from "react-native";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToJobSeekerHomeScreen = () => {
    this.props.navigation.navigate("JobSeekerHome", this.state);
  };

  goToRecruiterHomeScreen = () => {
    this.props.navigation.navigate("RecruiterHome", this.state);
  };

  goToSignUpScreen = () => {
    console.log("AM HERE");
    this.props.navigation.navigate("SignUp", this.state);
  };

  loginUser = () => {
    // todo
    this.goToJobSeekerHomeScreen();
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.inputContainer]}>
          <TextInput
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
            placeholder="username"
            style={[styles.inputItem]}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholder="password"
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
  centerText: {
    textAlign: "center"
  },
  container: {
    padding: 8,
    paddingTop: 15
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
  textItem: {
    paddingTop: 8
  },
  signUpRedirectRow: {
    marginTop: 10
  }
});
