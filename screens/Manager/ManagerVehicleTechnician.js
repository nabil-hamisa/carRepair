import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput, Text} from 'react-native';
import Header from '../../component/Header';
import Card from '../../component/Card';
import ImageCars from '../../component/ImageCars';
import ImageNotWorking from '../../component/ImageNotWorking';
import ButtonSmall from '../../component/ButtonSmall';
class VehicleTechnician extends React.Component {
    render() {
        return (




            <View style={styles.container}>
                <Header title='All Technician'/>
                <View>
                    <Card>
                        <View style={styles.textContainer}>
                            <Text style={styles.textCars}>First_Name :<Text
                                style={styles.detailCars}> Mrabet</Text></Text>
                            <Text style={styles.textCars}>Last_name :<Text style={styles.detailCars}> Mechanic</Text></Text>
                            <Text style={styles.textCars}>Repairing Car :<Text
                                style={styles.detailCars}>Doddge Demon</Text></Text>
                            <Text style={styles.textCars}>Avance Payday :<Text style={styles.detailCars}>
                                1500$</Text></Text>
                            <Text style={styles.textCars}>Nominate Date :<Text
                                style={styles.detailCars}> 2001/10/13</Text></Text>
                            <Text style={styles.textCars}>Costs : <Text
                                style={styles.detailCars}> 500$</Text></Text>
                            <Text style={styles.textCars}>Status : <Text
                                style={styles.detailCars}> Repairing</Text></Text>
                        </View>
                        <View style={styles.img}>
                            <ImageCars/>
                        </View>
                    </Card>
                    <Card >
                        <View style={styles.inactiveTech}>
                            <Text style={styles.textCars}>First_Name :<Text
                                style={styles.detailCars}>Batal</Text></Text>
                            <Text style={styles.textCars}>Last_name :<Text style={styles.detailCars}> Metrasem</Text></Text>
                            <Text style={styles.textCars}>Repairing Car :<Text
                                style={styles.detailCars}>None</Text></Text>
                            <Text style={styles.textCars}>Avance Payday :<Text style={styles.detailCars}>
                               none</Text></Text>
                            <Text style={styles.textCars}>Nominate Date :<Text
                                style={styles.detailCars}> none</Text></Text>
                            <Text style={styles.textCars}>Status : <Text
                                style={styles.detailCars}> Waiting For orders</Text></Text>
                            <ButtonSmall  >Nominate Tech</ButtonSmall>

                        </View>
                        <View style={styles.img}>
                            <ImageNotWorking/>
                        </View>
                    </Card>
                </View>

            </View>







        );
    }
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,

    }, textCars: {
        color: '#fd8228',
        fontFamily:'hemi head bd it',
        marginLeft: '3%',
    }, detailCars: {
        color: 'white',
    }, img: {
        flexDirection: 'row',
        height:'100%',
        width:'100%'

    },textContainer:{
        padding:10,
        margin:5
    },nominateButtons:{
        fontFamily:'Xenogears',
        color: '#fd8228'

    },inactiveTech:{
        padding:10,
        margin:5
    }

});
export default VehicleTechnician;

