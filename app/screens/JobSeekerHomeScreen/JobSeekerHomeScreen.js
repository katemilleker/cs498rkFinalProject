
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
          onPress={ () => {
            axios.put("http://10.0.2.2:3000/profile/", {
              details: this.state.descInput,
              major: this.state.majorInput
            }).then((res) => {
              this.switchMode()
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
        // return axios.post('http://10.0.2.2:3000/login/', {
        //     email: 'joeb',
        //     password: 'password'
        //   });
      });
    return(
      <View>
        <Text>
          {
            this.state.userData ?
              <Text>
                Major:{"\n"}
                {this.state.userData.major ? this.state.userData.major : "Not specified"}
                {"\n"}
                Description/Recent Experience:{"\n"}
                {this.state.userData.details ? this.state.userData.details : "Not written"}
                {"\n"}
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





const styles = StyleSheet.create({
  container: {
    padding: 8
  }
});
