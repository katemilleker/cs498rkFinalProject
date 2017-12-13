
import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, Text, View, ImageBackground, Button } from "react-native";

// local imports
import { getAllJobSeekers } from "../../api/jobSeekers";
import { getSavedUsers, saveUser, getRecruiter, getUsersFullData } from "../../api/recruiter";

/**
 * Return true if the user is within the saved users array
 * @param {object} user
 * @param {array} savedUsers
 */
const isSavedUser = (user, savedUsers) => {
  let userId = user._id;
  for (const savedUser of savedUsers) {
    if (userId === savedUser.user_id) {
      return true;
    }
  }
  return false;
};

export default class ProcessApplicantsScreen extends Component {
  constructor(props) {
    super(props);

    // dummy data for now
    this.state = {
      currentApplicantIdx: 0
    };
  }

  componentWillMount() {
    getUsersFullData("saved", savedUsers => {
      this.setState({ applicants: savedUsers });
    });
  }

  approveJobSeeker(user, i) {
    let { applicants } = this.state;
    applicants.splice(i, 1);
    this.setState({ applicants });
    saveUser(user, "accepted");
  };

  changeCurrentApplicant(newIdx) {
    this.setState({ currentApplicantIdx: newIdx });
  };

  rejectJobSeeker(user, i) {
    let { applicants } = this.state;
    applicants.splice(i, 1);
    this.setState({ applicants });
    saveUser(user, "deleted");
  };

  render() {
    let { currentApplicantIdx, applicants } = this.state;

    // state when there are no applicants to process
    if (!applicants || applicants.length === 0) {
      return (
        <View style={[styles.container]}>
          <Text>
            There are no more applicants to process
          </Text>
        </View>
      )
    }

    let currentApplicant = applicants[currentApplicantIdx];

    return (
      <ImageBackground source={require('../../assets/images/Background.png')} style={styles.backgroundImage}>
        <View>
          {
            (applicants && applicants.length > 0) &&
            <Text style={[styles.itemIndicator, styles.itemIndicatorText]}>
              Applicant {currentApplicantIdx + 1} out of {applicants.length}
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
                {currentApplicant.name}
              </Text>

              <Text style={[styles.detailMajor, styles.detailTextItem]}>
                {currentApplicant.major}
              </Text>

              <Text style={[styles.detailSchool, styles.detailTextItem]}>
                {currentApplicant.school}
              </Text>

              <Text style={[styles.detailYear, styles.detailTextItem]}>
                Graduating {currentApplicant.graduating}
              </Text>

              <View style={[styles.descriptionContainer]}>
                <Text style={[styles.detailTextItem]}>
                  {currentApplicant.details}
                </Text>
              </View>

              <View style={[styles.buttonColumn]}>
                <View style={[styles.optionButtonContainer]}>
                  <TouchableHighlight
                    underlayColor="#ddd"
                    style={[styles.optionButton]}
                  /*onPress={() => this.goToApprovedApplicantsScreen()}>*/
                  >
                    <Text style={[styles.optionButtonText]}>Resume</Text>
                  </TouchableHighlight>
                </View>

                <View style={[styles.optionButtonContainer]}>
                  <TouchableHighlight
                    underlayColor="#ddd"
                    style={[styles.optionButton]}
                  /*onPress={() => this.goToApprovedApplicantsScreen()}>*/
                  >
                    <Text style={[styles.optionButtonText]}>Accept</Text>
                  </TouchableHighlight>
                </View>

                <View style={[styles.optionButtonContainer]}>
                  <TouchableHighlight
                    underlayColor="#ddd"
                    style={[styles.optionButton]}
                  /*onPress={() => this.goToApprovedApplicantsScreen()}>*/
                  >
                    <Text style={[styles.optionButtonText]}>Reject</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>

            <View style={[styles.arrowSideBox]}>
              {
                (currentApplicantIdx < (applicants.length - 1)) &&
                <Text
                  style={[styles.arrowItem]}
                  onPress={() => this.changeCurrentApplicant(currentApplicantIdx + 1)}>
                  &#x2192;
              </Text>
              }
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

/*const styles = StyleSheet.create({
  acceptButton: {
    backgroundColor: "lightgreen"
  },
  actionRow: {
    paddingLeft: "10%",
    paddingRight: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 18
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
  buttonItem: {
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center"
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
    marginTop: 26
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
  },
  rejectButton: {
    backgroundColor: "red"
  }
});*/

const styles = StyleSheet.create({
  arrowItem: {
    fontSize: 40,
    color: "white"
  },
  arrowSideBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "10%"
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  buttonColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 15,
    justifyContent: "flex-end"
  },
  buttonToggleItem: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 10,
    paddingBottom: 10,
    width: 130,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonToggleItemSelected: {
    backgroundColor: "#7178C4",
  },
  buttonToggleItemNotSelected: {
    backgroundColor: "#D8D8D8",
  },
  buttonToggleLabel: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    paddingBottom: 14
  },
  buttonToggleLabelText: {
    fontSize: 14,
    fontFamily: "Raleway-Light"
  },
  buttonToggleRow: {
    flexDirection: "row",
    marginTop: 30,
    paddingBottom: 8
  },
  bold: {
    fontWeight: "bold"
  },
  centerText: {
    textAlign: "center"
  },
  container: {
    padding: 8,
    flexDirection: "column"
  },
  descriptionContainer: {
    flexGrow: 1,
    flexDirection: "column",
    /*marginTop: 40,
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10,*/
  },
  detailBox: {
    borderWidth: 4,
    borderColor: "#666",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "5%",
    width: "80%",
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
  },
  detailBoxRow: {
    flexDirection: "row",
    height: "85%",
    marginTop: 32,
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
  errorRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14
  },
  errorText: {
    color: "white",
    backgroundColor: "transparent",
    fontFamily: "Raleway-Bold"
  },
  flexGrow: {
    flexGrow: 1
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 40,
  },
  headerText: {
    fontSize: 40,
    fontFamily: "Raleway-Regular",
    color: "white",
    backgroundColor: "transparent",
  },
  itemIndicator: {
    textAlign: "center",
    marginTop: 24
  },
  itemIndicatorText: {
    fontSize: 30,
    fontFamily: "Raleway-Regular",
    color: "white",
    backgroundColor: "transparent",
  },
  link: {
    color: "#FFFFFF",
    backgroundColor: "transparent",
    fontFamily: "Raleway-Light"
  },
  loginButton: {
    /*borderRadius: 50,*/
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7178C4"
  },
  loginButtonContainer: {
    /*marginTop: 20,
    borderRadius: 50,*/
    width: "50%",
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    fontSize: 24,
    fontFamily: "Raleway-Light",
    color: "white",
  },
  optionButton: {
    borderRadius: 50,
    height: 60,
    /*borderWidth: 10,*/
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7178C4"
  },
  optionButtonContainer: {
    marginTop: 20,
    borderRadius: 50,
    width: "50%",
    backgroundColor: "#ccc",
  },
  optionButtonText: {
    fontSize: 24,
    fontFamily: "Raleway-Light",
    color: "white",
  },
  optionButtons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    /*flexGrow: 1,*/
  },
  optionButtonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

