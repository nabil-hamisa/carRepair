import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Cars from '../../screens/Manager/ManagerCars';
import AddCar from '../../screens/Manager/MangerAddCar';
import ManagerHome from '../../screens/Manager/ManagerHome';
import VehicleTechnician from '../../screens/Manager/ManagerVehicleTechnician';
import NominateTechnician from '../../screens/Manager/ManagerNominateVehicleTechnician';
import Icon from 'react-native-vector-icons/FontAwesome5';
import profile from '../../screens/Manager/profile';

const ManagerNavigation = createBottomTabNavigator({
        Home: {
            screen: ManagerHome,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'home'} size={24}/>
                ),
            },
        }, AddCars: {
            screen: AddCar,
            navigationOptions: {
                tabBarLabel: 'Add Client',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'car-crash'} size={24}/>
                ),
            },
        },
        Cars: {
            screen: Cars,
            navigationOptions: {
                tabBarLabel: 'Add Car',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'car'} size={24}/>
                ),
            },
        }


        ,
      /*  AllTech: {
            screen: VehicleTechnician,
            navigationOptions: {
                tabBarLabel: 'Technician',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'users'} size={24}/>
                ),
            },
        }
        ,*/
        NominateTech: {
            screen: NominateTechnician,
            navigationOptions: {
                tabBarLabel: 'Nominate',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'tools'} size={24}/>
                ),
            },
        },
        profile: {
            screen: profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'user'} size={24}/>
                ),
            },
        },
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
);
export default ManagerNavigation;
