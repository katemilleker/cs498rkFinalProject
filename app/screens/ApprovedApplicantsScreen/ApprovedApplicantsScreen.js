
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class ApprovedApplicantsScreen extends Component {
  constructor(props) {
    super(props);

    // dummy data for now
    this.state = {
      currentApplicantIdx: 0,
      approvedApplicants: [
        {
          name: "Dohn Joe",
          email: "dohnjoe@illinois.edu",
          major: "Computer Science",
          school: "University of Illinois",
          details: "CEO of both Google and Starbucks. In my free time I like to set subway maps on fire and complain about tax payer waste. Hobbies include: La Croix",
          graduating: "Spring 2020"
        },
        {
          name: "Foo Bar",
          email: "foobar@illinois.edu",
          major: "Computer Engineering",
          school: "University of Alaska",
          details: "Direct descendant of Napolean. Expatriated after his death, and moved to Alaska. My goal is to study computer engineering and build an army of robots.",
          graduating: "December 2017"
        },
        {
          name: "Car Mex",
          email: "carmex@gmail.edu",
          major: "Statistics",
          school: "University of Chicago",
          details: "CEO of both La Croix and La Croix. Born with a PhD in Economics, studying statistics because it's pretty neat.",
          graduating: "Spring 2018"
        },
      ]
    };
  }

  changeCurrentApplicant(newIdx) {
    this.setState({currentApplicantIdx: newIdx});
  }

  render() {
    let { currentApplicantIdx, approvedApplicants } = this.state;
    let currentApplicant = approvedApplicants[currentApplicantIdx];

    return (
      <View style={styles.container}>
        {
          (approvedApplicants && approvedApplicants.length > 0) &&
          <Text style={[styles.itemIndicator]}>
            Applicant {currentApplicantIdx + 1} out of {approvedApplicants.length}
          </Text> 
        }

        <View style={[styles.detailBoxRow]}>
          <View style={[styles.arrowSideBox]}>
            {
              (currentApplicantIdx > 0) &&
              <Text 
                style={[styles.arrowItem]}
                onPress={() => this.changeCurrentApplicant(currentApplicantIdx - 1)}>
                &#x2190;
              </Text>
            }
          </View>
          <View style={[styles.detailBox]}>
            <Text style={[styles.detailName]}>
              { currentApplicant.name }
            </Text>

            <Text style={[styles.detailMajor, styles.detailTextItem]}>
              { currentApplicant.major }
            </Text>

            <Text style={[styles.detailSchool, styles.detailTextItem]}>
              { currentApplicant.school } 
            </Text>

            <Text style={[styles.detailYear, styles.detailTextItem]}>
              Graduating { currentApplicant.graduating }
            </Text>

            <View style={[styles.descriptionContainer]}>
              <Text style={[styles.detailTextItem]}>
                { currentApplicant.details }
              </Text>
            </View>
          </View>
          <View style={[styles.arrowSideBox]}>
            {
              (currentApplicantIdx < (approvedApplicants.length - 1)) &&
              <Text 
                style={[styles.arrowItem]}
                onPress={() => this.changeCurrentApplicant(currentApplicantIdx + 1)}>
                &#x2192;
              </Text>
            }
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
