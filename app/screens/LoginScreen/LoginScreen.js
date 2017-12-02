
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class LoginScreen extends Component {
  goToRecruiterHomeScreen = () => {
    this.props.navigation.navigate("RecruiterHome", this.state)
  };

  render() {
    return (
      <View style={[styles.container]}>
        <Text
          style={[styles.textItem]}
        >
          This is the login screen
        </Text>
        <Text
          onPress={() => this.goToRecruiterHomeScreen()}
          style={[styles.textItem, styles.link]}
        >
          Go to the recruiter home screen
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