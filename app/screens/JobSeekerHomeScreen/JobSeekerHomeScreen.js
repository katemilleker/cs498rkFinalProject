
import React, { Component } from "react";

import { StyleSheet, Text, View, Button , TextInput, WebView} from "react-native";
import axios from 'axios';

import ImagePicker from 'react-native-image-picker'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';


import QRCode from 'react-native-qrcode';


var options = {
  title: 'Select Resume'
};



export default class JobSeekerHomeScreen extends Component {



  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      majorInput: "",
      descInput: "",
      userData: null,
    };
    this.resumeUri = null;
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
        <Button
          title="edit Resume"
          onPress={ () => {
              DocumentPicker.show({
                filetype: [DocumentPickerUtil.pdf()],
              },(error,res) => {
                console.log(res);
                console.log(
                   res.uri,
                   res.type,
                   res.fileName,
                   res.fileSize
                );
                this.resumeUri = res.uri;


              });

            }

          }
        />

        <Button
          onPress={ () => {
            axios.put("http://10.0.2.2:3000/profile/", {
              details: this.state.descInput,
              major: this.state.majorInput
            }).then((res) => {
              if(this.resumeUri){

                var fileData = new FormData();
                fileData.append('res', {
                  uri: this.resumeUri,
                  type: 'application/pdf',
                  name: 'resumeName'
                });
                axios.post("http://10.0.2.2:3000/upload/", fileData)
                  .then(() => {
                    this.switchMode();
                  })
                  .catch((err) => {
                    console.log(err);
                  });

              }else{
                this.switchMode();
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
    axios.get('http://10.0.2.2:3000/profile/')
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
        return axios.post('http://10.0.2.2:3000/login/', {
            email: 'joeb',
            password: 'password'
          });
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
          onPress={ () => {
            axios.get("http://10.0.2.2:3000/logout/", {})
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

// ImagePicker.showImagePicker(options, (response) => {
//   console.log('Response = ', response);
//
//   if (response.didCancel) {
//     console.log('User cancelled image picker');
//   }
//   else if (response.error) {
//     console.log('ImagePicker Error: ', response.error);
//   }
//   else {
//     let source = { uri: response.uri };
//     return source;
//   }
// });

const styles = StyleSheet.create({
  container: {
    padding: 8
  }
});
