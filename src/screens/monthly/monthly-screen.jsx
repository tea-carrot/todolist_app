import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ScreenContainerComponent from '../../components/container/screen-container';
import {icMenu, icCalender} from '../../assets/index';
import HeaderComponent from '../../components/header/header';
import {useNavigation} from '@react-navigation/native';

const MonthlyScreen = () => {
  const navigation = useNavigation();
  const handleHeaderLeft = () => {
    navigation.openDrawer();
  };
  const handleHeaderRight = () => {
    navigation.navigate('Main');
  }; 
  return (
    <ScreenContainerComponent>
      {/* Drawer Header */}
      <HeaderComponent
        leftIcon={icMenu}
        leftOnPress={handleHeaderLeft}
        rightIcon={icCalender}
        rightOnPress={handleHeaderRight}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>monthly</Text>
        <Text style={{backgroundColor: 'green', width: '100%', height: 400}}>
          캘린더
        </Text>
      </View>
    </ScreenContainerComponent>
  );
};

export default MonthlyScreen;

const styles = StyleSheet.create({});
