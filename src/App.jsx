import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import MainScreen from './screens/main/main-screen';
import MonthlyScreen from './screens/monthly/monthly-screen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <RootNavigator /> */}
      <Drawer.Navigator>
        <Drawer.Screen name="MainTabNavigator">
          {() => (
            <Tab.Navigator screenOptions={{tabBarVisible: false}}>
              <Tab.Screen name="Main" component={MainScreen} />
              <Tab.Screen name="Monthly" component={MonthlyScreen} />
            </Tab.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
