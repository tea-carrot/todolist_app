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
    <>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'dark-content'} />
      <SafeAreaView style={backgroundStyle}>
        <View style={{height: '100%'}}>{props.children}</View>
      </SafeAreaView>
    </>
  );
};

export default ScreenContainerComponent;

const styles = StyleSheet.create({});
