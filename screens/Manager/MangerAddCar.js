import React from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput} from 'react-native';
import Header from '../../component/Header';
import Card from '../../component/Card';
import ButtonSmall from '../../component/ButtonSmall';
import PickImage from '../../component/PickImage'
TextInput.defaultProps.selectionColor = 'white';
class AddCar extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header title='Add Car'/>
                <ScrollView>

                    <Card>
                        <View style={styles.Form}>
                            <Text style={styles.textStyle}>Cin :</Text>
                            <TextInput style={styles.inputstyle}/>
                            <Text style={styles.textStyle}>First Name:</Text>
                            <TextInput style={styles.inputstyle}/>
                            <Text style={styles.textStyle}>Last Name :</Text>
                            <TextInput style={styles.inputstyle}/>
                            <Text style={styles.textStyle}>Car Plate :</Text>
                            <TextInput style={styles.inputstyle}/>
                            <Text style={styles.textStyle}>Problem :</Text>
                            <TextInput style={styles.inputstyle}/>
                            <Text style={styles.textStyle}>Avance payday :</Text>
                            <TextInput style={styles.inputstyle}/>
                            <Text style={styles.textStyle}>Car Photo :</Text>
                            <PickImage onImagePicked={this.imagePickedHandler}/>
                        </View>
                    </Card>
                    <ButtonSmall style={styles.submitButton}>Add Car</ButtonSmall>

                </ScrollView>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {

        backgroundColor: '#000000',
        flex: 1,
    }, Form: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,

    }, inputstyle: {
        borderRadius:8,
        backgroundColor:'#999999',
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth:5,
        marginRight: 10,
        marginLeft: 10,

    },textStyle:{
        marginRight: 10,
        marginLeft: 10,
        width:"100%",
        fontFamily:'hemi head bd it',
        color:'white'

    },photoStyle:{
        backgroundColor:'#999999',
        height:200,
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth:5,

    } ,addphoto:{
        backgroundColor:'#999999',
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth:5,
    },submitButton:{
        marginBottom:20
    }
});
export default AddCar;
