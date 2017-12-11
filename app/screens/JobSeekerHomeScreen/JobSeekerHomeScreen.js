
import React, { Component } from "react";
import { StyleSheet, Text, View, Button , TextInput, WebView} from "react-native";
import ImagePicker from 'react-native-image-picker'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import axios from 'axios';
import QRCode from 'react-native-qrcode';

const options = {
  title: 'Select Resume'
};

const host = require("../../host.js");

export default class JobSeekerHomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      majorInput: "",
      descInput: "",
      userData: null,
      resumeUri: null,
      resumeName: null
    };
  }

  switchMode() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  renderEditMode() {
    var placeholders = {};

    return(
      <View>
        <Text>
          Major
        </Text>
        <TextInput
          editable = {true}
          maxLength = {40}
          defaultValue = {this.state.majorInput}
          onChangeText = {(text) => this.setState({majorInput: text})}
        />

        <Text>
          Description/Recent Experience
        </Text>
        <TextInput
          multiline = {true}
          editable = {true}
          defaultValue = {this.state.descInput}
          onChangeText = {(text) => this.setState({descInput : text})}
        />
        {this.state.resumeUri ?
          <View>
            <Text>
              Attached {this.state.resumeName}
            </Text>
            <Button
              title="Remove Attached"
              onPress={ () => {
                  this.setState({
                    resumeUri: null,
                    resumeName: null
                  });
                }
              }
            />
          </View>
          : <Text></Text>
        }

        <Button
          title="edit Resume"
          onPress={ () => {
              DocumentPicker.show({
                filetype: [DocumentPickerUtil.pdf()],
              },(error,res) => {
                this.setState({
                  resumeName: res.fileName,
                  resumeUri: res.uri
                })
              });

            }

          }
        />

        <Button
          onPress={ () => {
            axios.put(`http://${host}:3000/profile/`, {
              details: this.state.descInput,
              major: this.state.majorInput
            }).then((res) => {
              if(this.state.resumeUri){
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

              }else{
                this.switchMode();
                this.setState({
                  resumeUri: null,
                  resumeName: null
                })

              }
            });
          } }
          title="Save"
        />
      </View>
    )
  }

  renderViewMode(){
    var profile;
    axios.get(`http://${host}:3000/profile/`)
      .then((res) => {
        this.setState({
          userData: res.data.user,
          descInput: res.data.user.details,
          majorInput: res.data.user.major
        });
      })
      .catch((err) => {
        console.log(err);
        // return to login screen here on failure, but this is a test
        this.props.navigation.goBack(null);
      });
    return(
      <View>
          {
            this.state.userData ?
             <View>
                <Text>
                  Major:{"\n"}
                  {this.state.userData.major ? this.state.userData.major : "Not specified"}
                  {"\n"}
                  Description/Recent Experience:{"\n"}
                  {this.state.userData.details ? this.state.userData.details : "Not written"}
                  {"\n"}
                </Text>

              </View>

            :
              <Text> Loading </Text>
          }
        <Button
          onPress={ () => {this.switchMode()} }
          title="Edit"
        />
      </View>
    )
  }

  render() {
    var body;

    if(this.state.editMode){
      body = this.renderEditMode();
    }else{
      body = this.renderViewMode();
    }

    return (
      <View style={styles.container}>
        <Text>
          {this.state.userData ? this.state.userData.name : ""}
        </Text>

        {this.state.userData ?

          <QRCode
            value={this.state.userData._id}
            size={250}
            bgColor='black'
            fgColor='white'/>: <Text></Text>
        }
        { body }
        <Button
          title="View Resume"
          onPress={() => {
            this.props.navigation.navigate("ResumeScreen", this.state);
          }}
        />
        <Button
          onPress={ () => {
            axios.get(`http://${host}:3000/logout/`, {})
              .then((res) => {
                this.props.navigation.goBack(null);
              });
          } }
          title="Log out"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  }
});
