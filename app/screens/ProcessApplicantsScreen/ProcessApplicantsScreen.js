
import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

// local imports
import { getAllJobSeekers } from "../../api/jobSeekers";
import { getSavedUsers, saveUser, getRecruiter } from "../../api/recruiter";

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
    getSavedUsersFull(savedUsers => {
      this.setState({applicants: savedUsers});
    });
  }

  approveJobSeeker(user, i) {
    let { applicants } = this.state;
    applicants.splice(i, 1);
    this.setState({applicants});
    saveUser(user, "accepted");
  };

  changeCurrentApplicant(newIdx) {
    this.setState({currentApplicantIdx: newIdx});
  };

  rejectJobSeeker(user, i) {
    let { applicants } = this.state;
    applicants.splice(i, 1);
    this.setState({applicants});
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
      <View>
        {
          (applicants && applicants.length > 0) &&
          <Text style={[styles.itemIndicator]}>
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
              (currentApplicantIdx < (applicants.length - 1)) &&
              <Text
                style={[styles.arrowItem]}
                onPress={() => this.changeCurrentApplicant(currentApplicantIdx + 1)}>
                &#x2192;
              </Text>
            }
          </View>
        </View>

        <View style={[styles.actionRow]}>
          <TouchableHighlight
            style={[styles.rejectButton, styles.buttonItem]}
            onPress={() => this.rejectJobSeeker(currentApplicant)}>
            <Text style={[styles.buttonText]}>Reject</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.acceptButton, styles.buttonItem]}
            onPress={() => this.approveJobSeeker(currentApplicant)}>
            <Text style={[styles.buttonText]}>Approve</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
});
