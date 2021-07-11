import React from 'react';
import {StyleSheet} from 'react-native';
import MainScreen from '../../screens/main/main-screen';
import MonthlyScreen from '../../screens/monthly/monthly-screen';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createStackNavigator();
const MainStackNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Main" component={MainScreen} />
    </Tab.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
