import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AddScreen from '../../screens/add/add-screen';
import MainScreen from '../../screens/main/main-screen';

const Tab = createStackNavigator();
const MainStackNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
    </Tab.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
