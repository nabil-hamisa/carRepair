import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import AddOrder from '../../screens/Technicien/TechnicianAddOrder';
import doneCar from '../../screens/Technicien/TechnicianCar Done';
import editOrder from '../../screens/Technicien/TechnicianEditOrder';
import TechnicianHome from '../../screens/Technicien/TechnicianHome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import profile from '../../screens/Manager/profile';

const TechnicienNavigator = createBottomTabNavigator({
        Home: {
            screen: TechnicianHome,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'home'} size={24}/>
                ),
            },
        },
        Cars: {
            screen: AddOrder,
            navigationOptions: {
                tabBarLabel: 'Add Order',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'truck-loading'} size={24}/>
                ),
            },
        }
        ,
        AddCars: {
            screen: editOrder,
            navigationOptions: {
                tabBarLabel: 'Edit Order',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'edit'} size={24}/>
                ),
            },
        }
        ,
        AllTech: {
            screen: doneCar,
            navigationOptions: {
                tabBarLabel: 'Car Repaired',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'calendar-check'} size={24}/>
                ),
            },
        },
        profile:{
            screen:profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'user'} size={24}/>
                ),
            },
        }
    }, {
        initialRouteName: 'Home',
        navigationOptions: {},
        tabBarOptions: {
            activeTintColor: '#000000',
            activeBackgroundColor: '#fd8228',
            inactiveTintColor: '#999999',
            inactiveBackgroundColor: '#000000',
            tabBarPosition: 'top',

        },
    },
    )
;
export  default   TechnicienNavigator;
