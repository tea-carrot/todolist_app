import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from './screens/main/main-screen';

const Drawer = createDrawerNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    Color: isDarkMode ? Colors.darker : Colors.light,
  };

  return (
    <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Main" component={MainScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
