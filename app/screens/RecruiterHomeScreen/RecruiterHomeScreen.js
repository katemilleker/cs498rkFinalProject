
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class RecruiterHomeScreen extends Component {
  goToApprovedApplicantsScreen = () => {
    this.props.navigation.navigate("ApprovedApplicantsScreen", this.state);
  };

  goToRejectedApplicantScreen = () => {
    this.props.navigation.navigate("RejectedApplicantsScreen", this.state);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.paragraphItem]}>
          This is the recruiter home screen
        </Text>
        <Text 
          onPress={() => this.goToApprovedApplicantsScreen()}
          style={[styles.link, styles.paragraphItem]}>
          Go to the approved applicants screen
        </Text>
        <Text 
          onPress={() => this.goToRejectedApplicantScreen()}
          style={[styles.link, styles.paragraphItem]}>
          Go to the rejected applicants screen
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
  paragraphItem: {
    paddingTop: 6,
    paddingBottom: 6
  }
});

