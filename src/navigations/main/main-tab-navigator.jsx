import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import MonthlyScreen from '../../screens/monthly/monthly-screen';
import MainStackNavigator from './main-stack-navigator';

const Tab = createBottomTabNavigator();
const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarVisible: false}}>
      <Tab.Screen name="MainNavigator" component={MainStackNavigator} />
      <Tab.Screen name="Monthly" component={MonthlyScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({});
