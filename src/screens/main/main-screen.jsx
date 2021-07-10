import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ScreenContainerComponent from '../../components/container/screen-container';

const DrawerHeaderComponent = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image src={{}} />
      <Text>Header</Text>
      <Image src={{}} />
    </View>
  );
};
const MainScreen = () => {
  return (
    <ScreenContainerComponent>
      {/* Drawer Header */}
      <DrawerHeaderComponent />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>main</Text>
      </View>
    </ScreenContainerComponent>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
