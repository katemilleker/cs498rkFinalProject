
import React, { Component } from "react";
import { StyleSheet, Text, View, Button , TextInput} from "react-native";
import axios from 'axios';

export default class JobSeekerHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      majorInput: "",
      descInput: "",
      userData: null,
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
          onChangeText = {(text) => this.setState({majorInput: text})}
        />

        <Text>
          Description
        </Text>
        <TextInput
          editable = {true}
          maxLength = {40}
          onChangeText = {(text) => this.setState({descInput : text})}
        />

        <Button
          onPress={ () => {this.switchMode()} }
          title="Save"
        />
      </View>
    )

  }



  renderViewMode(){
    var profile;
    if(!this.state.userData){
      axios.get('http://10.0.2.2:3000/profile/')
        .then((res) => {
          this.setState({
            userData: res.data,
            descInput: res.data.details,
            majorInput: res.data.major
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    return(
      <View>
        <Text>
          {
            this.state.userData ?
              <Text>
                Major: {this.state.userData.major}

                Description/Recent Experience:
                {this.state.userData.details}
              </Text>
            :
              <Text> Loading </Text>
          }
        </Text>
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
        { body }
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  }
});
