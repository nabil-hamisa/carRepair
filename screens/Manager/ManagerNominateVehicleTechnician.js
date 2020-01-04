import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Text, TextInput,Picker} from 'react-native';
import Header from '../../component/Header'
import Card from '../../component/Card';
import ButtonSmall from '../../component/ButtonSmall';


class NominateTechnician extends React.Component{
    state = {
    Carid: "",
    TechId:""};
    render() {
        return (
            <View style={styles.container}>
                <Header title='Affect Technician'/>
                <ScrollView>

                    <Card>
                        <View style={styles.Form}>
                            <Text style={styles.textStyle}>Car Id:</Text>
                            <Picker
                                style={styles.pickerStyle}
                                selectedValue={this.state.Carid}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ Carid: itemValue })
                                }>
                                <Picker.Item label="" value="none" />
                                <Picker.Item label="Doddge Demon" value="4564123" />
                            </Picker>
                            <Text style={styles.textStyle}>Technicien:</Text>
                            <Picker
                                style={styles.pickerStyle}
                                selectedValue={this.state.TechId}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ TechId: itemValue })
                                }>
                                <Picker.Item label="" value="none" />
                                <Picker.Item label="Batal Metrasem" value="aezeaze" />
                            </Picker>
                        </View>
                    </Card>
                    <ButtonSmall style={styles.submitButton}>Nominate this Car to Tech</ButtonSmall>

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

    }, textStyle:{
        fontFamily:'hemi head bd it',
        color:'white'

    } ,submitButton:{
        marginHorizontal:50,
        marginBottom:20
    },pickerStyle:{
        borderRadius:24,
        color:'#999999',
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth:5,
    }
});
export default NominateTechnician;
