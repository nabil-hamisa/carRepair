import React, { Component } from "react";
import {View, Image, Button, StyleSheet} from 'react-native';
import ImagePicker from "react-native-image-picker";
import ButtonSmall from "../component/ButtonSmall";
import Card from '../component/Card';

class PickImage extends Component {
  state = {
    pickedImaged: null
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick Car Image"}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImaged: { uri: res.uri }
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.placeholder}>
          <Image source={this.state.pickedImaged} style={styles.previewImage} />
        </Card>
        <View style={styles.buttonContaier} >
            <ButtonSmall   style={styles.addphoto}  onPress={this.pickImageHandler} >Add Photo</ButtonSmall>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },addphoto:{
        backgroundColor:'#999999',
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth:5,

    }
    ,
    placeholder: {
        backgroundColor:'#999999',
        height:200,
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth:5,
        width:'100%'

    },

    previewImage: {
        borderRadius:10,
        width: "100%",
        height: "100%",
        alignItems:'center',
        justifyContent:'center'
    },buttonContaier:{
        width:"100%"
    }
  });

export default PickImage;
