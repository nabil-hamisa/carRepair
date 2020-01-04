
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import React from 'react';
import ManagerHome from '/screens/Manager/ManagerHome';
import Cars from '/screens/Manager/ManagerCars';

const TabNavigator = createBottomTabNavigator({
    Home: {Screen: ManagerHome},
    Cars: {Screen: Cars}
});
export default createAppContainer(TabNavigator);;
