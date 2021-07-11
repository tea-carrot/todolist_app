import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
const Drawer = createDrawerNavigator();

const RootNavigator = props => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainTab" component={props.children} />
    </Drawer.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
