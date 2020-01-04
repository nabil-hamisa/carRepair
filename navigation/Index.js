import React from 'react';
import {createAppContainer} from 'react-navigation';
import TechnicienNavigator from'../navigation/TechnicienNavigator'
import AuthentificationNavigation from '../navigation/AuthentificationNavigation';
import AuthLoading from'../screens/Auth/AuthLoading'
import {createSwitchNavigator}  from'react-navigation'
import ManagerNavigation from '../navigation/ManagerNavigator';

const  Main = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Auth: AuthentificationNavigation,
        manager: ManagerNavigation,
        tech:TechnicienNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
)
const AppContainer=createAppContainer(Main)
export default AppContainer;
