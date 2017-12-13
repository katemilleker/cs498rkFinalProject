
import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, Text, View, ImageBackground, Button, Dimensions } from "react-native";
import Camera from 'react-native-camera';

var host = require("../../host.js");
import axios from 'axios';


export default class RecruiterHomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      read: false
    };
  }

  goToApprovedApplicantsScreen = () => {
    this.props.navigation.navigate("ApprovedApplicantsScreen", this.state);
  };

  goToRejectedApplicantScreen = () => {
    this.props.navigation.navigate("RejectedApplicantsScreen", this.state);
  };

  goToResumeScreen = () => {
    this.props.navigation.navigate("ResumeScreen", this.state);
  };

  goToProcessApplicantsScreen = () => {
    this.props.navigation.navigate("ProcessApplicantsScreen", this.state);
  };

  putData(event){
    var user_id = event.data;
    axios.post(`http://${host}:3000/save/`, {
        user_id: event.data
      })
      .then((err, res) => {
        this.setState({
          read: false
        });
      })
  }

  render() {
    if(this.state.read){
      return (
        <View style={styles.containerCam}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            barCodeTypes = {['org.iso.QRCode']}
            onBarCodeRead = {(event) => { this.putData(event); }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            >
            <Button
              title="Cancel"
              onPress={() => this.setState({read: false})}
              />

          </Camera>

        </View>
      )
    }
    
    return (
      <ImageBackground source={require('../../assets/images/Background.png')} style={styles.backgroundImage}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            <Text style={{ fontFamily: "Raleway-Black", fontSize: 40, color: "white" }}>R</Text>
            ECRUITER HOME</Text>
        </View>

        <View style={styles.container}>
        <View style={[styles.buttonRow]}>
            <View style={[styles.ButtonContainer]}>
              <TouchableHighlight
                underlayColor="#ddd"
                style={[styles.Button]}
                onPress={ () => {
                  this.setState({read: true});
                }}
                >
                <Text style={[styles.ButtonText]}>Scan QR Codes</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[styles.buttonRow]}>
            <View style={[styles.ButtonContainer]}>
              <TouchableHighlight
                underlayColor="#ddd"
                style={[styles.Button]}
                onPress={() => this.goToProcessApplicantsScreen()}>
                <Text style={[styles.ButtonText]}>Review Applicants</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[styles.buttonRow]}>
            <View style={[styles.ButtonContainer]}>
              <TouchableHighlight
                underlayColor="#ddd"
                style={[styles.Button]}
                onPress={() => this.goToApprovedApplicantsScreen()}>
                <Text style={[styles.ButtonText]}>Approved Applicants</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[styles.buttonRow]}>
            <View style={[styles.ButtonContainer]}>
              <TouchableHighlight
                underlayColor="#ddd"
                style={[styles.Button]}
                onPress={() => this.goToRejectedApplicantScreen()}>
                <Text style={[styles.ButtonText]}>Rejected Applicants</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[styles.buttonRow]}>
            <View style={[styles.ButtonContainer]}>
              <TouchableHighlight
                underlayColor="#ddd"
                style={[styles.Button]}
                onPress={() => {
                  axios.get(`http://${host}:3000/logout/`, {})
                    .then((res) => {
                      this.props.navigation.goBack(null);
                    });
                }}>
                <Text style={[styles.ButtonText]}>LOGOUT</Text>
              </TouchableHighlight>
            </View>
          </View>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 15
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
  whiteColor: {
    color: "white"
  },
  buttonToggleLabelText: {
    fontSize: 14,
    fontFamily: "Raleway-Light"
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  buttonToggleRow: {
    flexDirection: "row",
    marginTop: 30,
    paddingBottom: 8
  },
  centerText: {
    textAlign: "center"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14
  },
  errorText: {
    color: "red"
  },
  flexGrow: {
    flexGrow: 1
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: 'rgba(76,76,76,.37)',
    marginTop: 25
  },
  inputItem: {
    margin: "auto",
    borderColor: "transparent",
    borderRadius: 50,
    fontSize: 14,
    paddingLeft: 30,
    //underlineColorAndroid : "none",
    fontFamily: "Raleway-Thin",
    width: "70%",
    height: 60,
    color: "white"
  },
  link: {
    color: "#FFFFFF",
    backgroundColor: "transparent",
    fontFamily: "Raleway-Light"
  },
  Button: {
    borderRadius: 50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7178C4"
  },
  ButtonContainer: {
    marginTop: 20,
    borderRadius: 50,
    width: "60%",
    backgroundColor: "#ccc",
    marginTop: 10
  },
  ButtonText: {
    fontSize: 24,
    fontFamily: "Raleway-Light",
    color: "white",
    textAlign: "center"
  },
  pullLeft: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  pullRight: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  textItem: {
    paddingTop: 8
  },
  signUpRedirectRow: {
    marginTop: 10
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 40,
  },
  headerText: {
    fontSize: 40,
    fontFamily: "Raleway-Thin",
    color: "white",
    backgroundColor: "transparent",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  containerCam: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
