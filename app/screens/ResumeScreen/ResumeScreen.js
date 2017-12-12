
import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, WebView } from "react-native";



const host = require('../../host.js');


export default class ResumeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          This is the resume screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  pdf: {
    flex:1,
    width: Dimensions.get('window').width
  }
});
