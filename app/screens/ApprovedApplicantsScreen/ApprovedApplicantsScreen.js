
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class ApprovedApplicantsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          This is the approved applicants screen
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
