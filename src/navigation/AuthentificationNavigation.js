import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Authentication from '../../screens/Auth/Authentication'
import Register  from '../../screens/Auth/Register'
import Icon from 'react-native-vector-icons/FontAwesome5';
const AuthentificationNavigation = createBottomTabNavigator({
        Authentication: {
            screen: Authentication,
            navigationOptions: {
                tabBarLabel: 'Login',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'sign-in-alt'} size={24}/>
                ),
            },
        },
        Register: {
            screen: Register,
            navigationOptions: {
                tabBarLabel: 'Register',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name={'user-plus'} size={24}/>
                ),
            },
        }

    }, {
        initialRouteName: 'Authentication',
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
export default AuthentificationNavigation;
