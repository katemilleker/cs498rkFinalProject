
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class JobSeekerHomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          This is the job seeker home screen
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
