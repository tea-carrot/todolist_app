import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import AddScreen from '../../screens/add/add-screen';
const Drawer = createDrawerNavigator();

const RootNavigator = props => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainTab">{() => props.children}</Drawer.Screen>
      <Drawer.Screen name="Add">{() => <AddScreen />}</Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
