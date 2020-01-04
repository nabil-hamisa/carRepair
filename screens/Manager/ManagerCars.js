import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import Header from '../../component/Header';
import Card from '../../component/Card';
import ImageCars from '../../component/ImageCars';
import ButtonSmall from '../../component/ButtonSmall'
class Cars extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header title='All Cars'/>
                <View>
                    <Card>
                        <View style={styles.textContainer}>
                            <Text style={styles.textCars}>Car Id :<Text
                                style={styles.detailCars}> 48972145</Text></Text>
                            <Text style={styles.textCars}>Car Owner :<Text style={styles.detailCars}> Me</Text></Text>
                            <Text style={styles.textCars}>Car Problem :<Text
                                style={styles.detailCars}> None</Text></Text>
                            <Text style={styles.textCars}>Car Avance :<Text
                                style={styles.detailCars}> 1500$</Text></Text>
                            <Text style={styles.textCars}>Technicien :<Text style={styles.detailCars}> Weld
                                Gzuez</Text></Text>
                            <Text style={styles.textCars}>Nominate Date :<Text
                                style={styles.detailCars}> 2001/10/13</Text></Text>
                            <Text style={styles.textCars}>Add Date :<Text
                                style={styles.detailCars}> 1890/1/22</Text></Text>
                            <Text style={styles.textCars}>Status : <Text
                                style={styles.detailCars}> Repairing</Text></Text>
                        </View>
                        <View style={styles.img}>
                            <ImageCars/>
                        </View>
                    </Card>
                    <Card>
                        <View style={styles.textContainer}>
                            <Text style={styles.textCars}>Car Id :<Text
                                style={styles.detailCars}> 48972145</Text></Text>
                            <Text style={styles.textCars}>Car Owner :<Text style={styles.detailCars}> Me</Text></Text>
                            <Text style={styles.textCars}>Car Problem :<Text
                                style={styles.detailCars}> None</Text></Text>
                            <Text style={styles.textCars}>Car Avance :<Text
                                style={styles.detailCars}> 1500$</Text></Text>
                            <Text style={styles.textCars}>Technicien :<Text style={styles.detailCars}> Weld
                                Gzuez</Text></Text>
                            <Text style={styles.textCars}>Nominate Date :<Text
                                style={styles.detailCars}> Not nominated</Text></Text>
                            <Text style={styles.textCars}>Add Date :<Text
                                style={styles.detailCars}> 1890/1/22</Text></Text>
                            <Text style={styles.textCars}>Status : <Text
                                style={styles.detailCars}> Waitlist</Text></Text>
                            <ButtonSmall  >Nominate Car</ButtonSmall>

                        </View>
                        <View style={styles.img}>
                            <ImageCars/>
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
        flex:1,

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

    }

});
export default Cars;

