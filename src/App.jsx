import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useReducer} from 'react';
import {StyleSheet} from 'react-native';
import MainTabNavigator from './navigations/main/main-tab-navigator';
import RootNavigator from './navigations/root/drawer-navigator';
import {reducer} from './state/reducer';
import {initialState, TodoState} from './state/state';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    todos: initialState.todos,
    categories: initialState.categories,
  });

  return (
    <TodoState.Provider value={[state, dispatch]}>
      <NavigationContainer>
        <RootNavigator>
          <MainTabNavigator />
        </RootNavigator>
      </NavigationContainer>
    </TodoState.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
