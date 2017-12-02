
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class SignUpScreen extends Component {
  goToJobSeekerHomeScreen = () => {
    this.props.navigation.navigate("JobSeekerHome", this.state);
  };

  goToLoginScreen = () => {
    this.props.navigation.navigate("Login", this.state);
  };

  goToRecruiterHomeScreen = () => {
    this.props.navigation.navigate("RecruiterHome", this.state);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <Text
          style={[styles.textItem]}
        >
          This is the sign up screen
        </Text>
        <Text
          onPress={() => this.goToLoginScreen()}
          style={[styles.textItem, styles.link]}
        >
          Go to the login screen
        </Text>
        <Text
          onPress={() => this.goToRecruiterHomeScreen()}
          style={[styles.textItem, styles.link]}
        >
          Go to the recruiter home screen
        </Text>
        <Text
          onPress={() => this.goToJobSeekerHomeScreen()}
          style={[styles.textItem, styles.link]}
        >
          Go to the job seeker home screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  link: {
    color: "blue"
  },
  textItem: {
    paddingTop: 8
  }
});