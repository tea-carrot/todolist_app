import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const ScreenContainerComponent = props => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    Color: isDarkMode ? Colors.darker : Colors.light,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {props.children}
    </SafeAreaView>
  );
};

export default ScreenContainerComponent;

const styles = StyleSheet.create({});
