
import React, { Component } from "react";
import { StyleSheet, Text, View, WebView } from "react-native";

const host = require('../../host.js');


export default class ResumeScreen extends Component {
  render() {
    return (
      /*<WebView
        source={{ uri: `http://${host}:3000/upload/` }}
        style={{ marginTop: 20 }}
      />*/
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
  }
});
