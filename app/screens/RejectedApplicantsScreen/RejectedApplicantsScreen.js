
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class RejectedApplicantsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          This is the rejected applicants screen
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
