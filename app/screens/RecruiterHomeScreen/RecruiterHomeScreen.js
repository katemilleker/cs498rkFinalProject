
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class RecruiterHomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          This is the recruiter home screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  }
});

