import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import MainTabNavigator from './navigations/main/main-tab-navigator';
import RootNavigator from './navigations/root/drawer-navigator';
import AddScreen from './screens/add/add-screen';
import MainScreen from './screens/main/main-screen';
import MonthlyScreen from './screens/monthly/monthly-screen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator>
        <MainTabNavigator />
      </RootNavigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
