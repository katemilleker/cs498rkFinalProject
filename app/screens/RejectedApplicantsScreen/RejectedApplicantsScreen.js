
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class RejectedApplicantsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.itemIndicator]}>
          Applicant 1 out of 20
        </Text>
        <View style={[styles.detailBoxRow]}>
          <View style={[styles.arrowSideBox]}>
            <Text style={[styles.arrowItem]}>&#x2190;</Text>
          </View>
          <View style={[styles.detailBox]}>
            <Text style={[styles.detailName]}>Dohn Joe</Text>
            <Text style={[styles.detailMajor, styles.detailTextItem]}>Computer Science</Text>
            <Text style={[styles.detailSchool, styles.detailTextItem]}>University of Illinois</Text>
            <Text style={[styles.detailYear, styles.detailTextItem]}>Graduating Spring 2020</Text>
            <View style={[styles.descriptionContainer]}>
              <Text style={[styles.detailTextItem]}>
                CEO of both Google and Starbucks. In my free time I like to set
                subway maps on fire and complain about tax payer waste. Hobbies
                include: La Croix
              </Text>
            </View>
          </View>
          <View style={[styles.arrowSideBox]}>
            <Text style={[styles.arrowItem]}>&#x2192;</Text>
          </View>
        </View>
        <View style={[styles.arrowBottomBox]}>
          <Text style={[styles.arrowItem]}>&#x2193;</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowBottomBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    paddingTop: 12
  },
  arrowItem: {
    fontSize: 24
  },
  arrowSideBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "10%"
  },
  bold: {
    fontWeight: "bold"
  },
  container: {
    padding: 8,
    flexDirection: "column"
  },
  descriptionContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  detailBox: {
    borderWidth: 1,
    borderColor: "#666",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "12%",
    width: "80%",
    flexDirection: "column"
  },  
  detailBoxRow: {
    flexDirection: "row",
    height: "78%",
    marginTop: 32
  },
  detailName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    marginTop: "20%",
    paddingBottom: 12
  },
  detailTextItem: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16
  },
  itemIndicator: {
    textAlign: "center",
    marginTop: 24
  }
});
