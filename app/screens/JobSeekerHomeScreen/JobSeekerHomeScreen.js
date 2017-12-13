
import React, { Component } from "react";
import { TouchableHighlight, ScrollView, StyleSheet, Text, View, Button, TextInput, WebView, ImageBackground, Platform } from "react-native";
import ImagePicker from 'react-native-image-picker'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import axios from 'axios';
import QRCode from 'react-native-qrcode';
import OpenFile from 'react-native-doc-viewer';

const host = require("../../host.js");
const options = {
  title: 'Select Resume'
};

export default class JobSeekerHomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      majorInput: "",
      descInput: "",
      schoolInput: "",
      gradInput: "",
      userData: null,
      resumeUri: null,
      resumeName: null,
      resMessage: ""
    };
  }

  switchMode() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  renderEditMode() {
    var placeholders = {};

    return (
      <View >
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataTitle}>
            Major
        </Text>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              editable={true}
              defaultValue={this.state.majorInput}
              onChangeText={(text) => this.setState({ majorInput: text })}
              style={[styles.inputItem]}
            />
          </View>

          <Text style={styles.userDataTitle}>
            University
        </Text>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              editable={true}
              defaultValue={this.state.schoolInput}
              onChangeText={(text) => this.setState({ schoolInput: text })}
              style={[styles.inputItem]}
            />
          </View>


          <Text style={styles.userDataTitle}>
            Graduation Year
        </Text>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              editable={true}
              defaultValue={this.state.gradInput}
              onChangeText={(text) => this.setState({ gradInput: text })}
              style={[styles.inputItem]}
            />
          </View>

          <Text style={styles.userDataTitle}>
            Description/Recent Experience
        </Text>
          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              editable={true}
              underlineColorAndroid="transparent"
              defaultValue={this.state.descInput}
              onChangeText={(text) => this.setState({ descInput: text })}
              style={[styles.inputItem]}
            />
          </View>
        </View>

        {this.state.resumeUri ?
          <View>
            <Text>
              Attached {this.state.resumeName}
            </Text>
            <Button
              title="Remove Attached"
              onPress={() => {
                this.setState({
                  resumeUri: null,
                  resumeName: null
                });
              }
              }
            />
          </View>
          : null
        }
        <View style={styles.buttonRow}>

          <View style={[styles.buttonContainer]}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.button]}
              onPress={() => {
                DocumentPicker.show({
                  filetype: [DocumentPickerUtil.pdf()],
                }, (error, res) => {
                  if (error) {
                    console.log("ERROR", error);
                  }
                  if (res != null) {
                    this.setState({
                      resumeName: res.fileName,
                      resumeUri: res.uri
                    })
                  }
                });

              }

              }>
              <Text style={styles.buttonText}>Upload Resume</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.buttonContainer]}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.button]}
              onPress={() => {
                axios.put(`http://${host}:3000/profile/`, {
                  details: this.state.descInput,
                  major: this.state.majorInput,
                  school: this.state.schoolInput,
                  graduating: this.state.gradInput
                }).then((res) => {
                  if (this.state.resumeUri) {
                    var fileData = new FormData();
                    fileData.append('res', {
                      uri: this.state.resumeUri,
                      type: 'application/pdf',
                      name: this.state.resumeName
                    });
                    axios.post(`http://${host}:3000/upload/`, fileData)
                      .then(() => {
                        this.switchMode();
                      })
                      .catch((err) => {
                        console.log(err);
                      });

                  } else {
                    this.switchMode();
                    this.setState({
                      resumeUri: null,
                      resumeName: null
                    })

                  }
                });
              }}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableHighlight>
          </View>

        </View>

      </View>
    )
  }

  renderViewMode() {
    var profile;
    axios.get(`http://${host}:3000/profile/`)
      .then((res) => {
        this.setState({
          userData: res.data.user,
          descInput: res.data.user.details,
          majorInput: res.data.user.major,
          gradInput: res.data.user.gradInput,
          schoolInput: res.data.user.school
        });
      })
      .catch((err) => {
        console.log(err);
        // return to login screen here on failure, but this is a test
        this.props.navigation.goBack(null);
      });
    return (
      <View>
        {
          this.state.userData ?
            <View style={styles.userDataContainer}>
              <Text style={styles.removeBackground}>
                <Text style={styles.userDataTitle}>Major: {"\n"}</Text>
                {this.state.userData.major ? this.state.userData.major : "Not specified"}
                {"\n"}
                <Text style={styles.userDataTitle}>University: {"\n"}</Text>
                {this.state.userData.school ? this.state.userData.school : "Not specified"}
                {"\n"}
                <Text style={styles.userDataTitle}>Graduation Year: {"\n"}</Text>
                {this.state.userData.school ? this.state.userData.graduating : "Not specified"}
                {"\n"}
                <Text style={styles.userDataTitle}>Description: {"\n"}</Text>
                {this.state.userData.details ? this.state.userData.details : "Not written"}
                {"\n"}
              </Text>
            </View>

            :
            <Text> Loading </Text>
        }


        <View style={styles.buttonRow} >
          <View style={[styles.buttonContainer]}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.button]}
              onPress={() => {
                if (!this.state.userData.resume) {
                  this.setState({ resMessage: "Please upload your resume" });
                  return;
                }
                if (Platform.OS === 'ios') {
                  OpenFile.openDocBinaryinUrl([{
                    url: `http://${host}:3000/upload/`,
                    fileName: "resume",
                    fileType: "pdf"
                  }], (error, url) => {
                    if (error) {
                      this.setState({ resMessage: "Please upload your resume" })
                    } else {
                      this.setState({ resMessage: "" })
                    }
                  })
                } else {
                  OpenFile.openDoc([{
                    url: `http://${host}:3000/upload/`,
                    fileName: "resume",
                    cache: false,
                    fileType: "pdf"
                  }], (error, url) => {
                    if (error) {
                      this.setState({ resMessage: "Please upload your resume" })
                    } else {
                      this.setState({ resMessage: "Please upload your resume" })
                    }
                  })
                }
              }}>
              <Text style={styles.buttonText}>View Resume</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.buttonContainer]}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.button]}
              onPress={() => { this.switchMode() }}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableHighlight>
          </View>

        </View>




      </View>
    )
  }

  render() {
    var body;

    if (this.state.editMode) {
      body = this.renderEditMode();
    } else {
      body = this.renderViewMode();
    }

    return (
      <ImageBackground source={require('../../assets/images/Background.png')} style={styles.backgroundImage}>
        <ScrollView overScrollMode="always" contentContainerStyle={[styles.container, styles.moreSpace]}>
          <Text style={[styles.removeBackground, styles.userName]}>
            {this.state.userData ? this.state.userData.name.toUpperCase() : ""}
          </Text>

          {this.state.userData ?
            <View style={styles.qrContainer} >
              <QRCode
                style={styles.qrCode}
                value={this.state.userData._id}
                size={300}
                bgColor='black'
                fgColor='white' />
            </View>
            : <Text></Text>
          }
          {body}

          <View style={[styles.buttonRow]} >
            <View style={[styles.buttonContainer]}>
              <TouchableHighlight
                underlayColor="#ddd"
                style={[styles.button]}
                onPress={() => {
                  axios.get(`http://${host}:3000/logout/`, {})
                    .then((res) => {
                      this.props.navigation.goBack(null);
                    });
                }}>
                <Text style={styles.buttonText}>LOGOUT</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  qrCode: {

  },


  qrContainer: {
    padding: 15,
    backgroundColor: "white",
    marginTop: 0,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    /*shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,*/
  },
  userDataContainer: {
    padding: 15,
    backgroundColor: "white",
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 30
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  userName: {
    fontFamily: "Raleway-Regular",
    color: "white",
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10
  },
  userDataTitle: {
    fontFamily: "Raleway-Bold",
    marginTop: 5
  },
  removeBackground: {
    backgroundColor: "transparent"
  },
  buttonContainer: {
    borderRadius: 50,
    width: "45%",
    backgroundColor: "#ccc",
    marginTop: 2
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5
  },
  button: {
    borderRadius: 50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7178C4"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Raleway-Light",
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 20,
    marginTop: 3,
    backgroundColor: 'rgba(76,76,76,.37)',
  },
  inputItem: {
    margin: "auto",
    borderColor: "transparent",
    borderRadius: 50,
    fontSize: 14,
    paddingLeft: 10,
    width: "70%",
    color: "black",
    height: 45
  }

});
