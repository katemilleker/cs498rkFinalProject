
import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, Text, TextInput, View } from "react-native";
import { signUp } from "./../../api/auth.js";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToJobSeekerHomeScreen = () => {
    this.props.navigation.navigate("JobSeekerHome", this.state);
  };

  goToLoginScreen = () => {
    this.props.navigation.navigate("Login", this.state);
  };

  goToRecruiterHomeScreen = () => {
    this.props.navigation.navigate("RecruiterHome", this.state);
  };

  signUpUser = () => {
    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };

    signUp(user).then(response => {
      // go to profile
    }).catch(error => {
      console.log("Error signing up:", error);
    });
  };

  render() {
    return (
      <View style={[styles.container]}>
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

        <View style={[styles.inputContainer]}>
          <TextInput 
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
            placeholder="full name"
            style={[styles.inputItem]}
          />
        </View>

        <View style={[styles.buttonRow]}>
          <View style={[styles.signUpButtonContainer]}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.signUpButton]}
              onPress={() => this.signUpUser()}>
              <Text style={[styles.signUpButtonText]}>Sign Up</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[styles.loginRedirectRow, styles.textItem]}>
          <Text 
            style={[styles.link, styles.centerText]}
            onPress={() => this.goToLoginScreen()}>
            Already have an account? Log In.
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
  link: {
    color: "blue"
  },
  loginRedirectRow: {
    marginTop: 10
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
  signUpButton: {
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc"
  },
  signUpButtonContainer: {
    borderRadius: 8,
    width: "40%",
    backgroundColor: "#ccc",
    marginTop: 10
  },
  signUpButtonText: {
    fontSize: 18
  },
  textItem: {
    paddingTop: 8
  }
});