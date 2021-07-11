import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const HeaderComponent = props => {
  const {title} = props;
  const {leftIcon, leftOnPress} = props;
  const {rightIcon, rightOnPress} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftOnPress}>
        <Image style={styles.iconStyle} source={leftIcon} />
      </TouchableOpacity>
      <Text style={styles.titleStyle}></Text>
      <TouchableOpacity onPress={rightOnPress}>
        <Image style={styles.iconStyle} source={rightIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 22,
    height: 15,
    padding: 10,
  },
  titleStyle: {
    flex: 1,
    textAlign: 'center',
  },
});
