import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorStyle} from '../../config/color';
import {MarginStyle, RadiusStyle} from '../../config/dimens';
import {FontSizeStyle} from '../../config/font-size';

const ButtonFooterComponent = props => {
  const {title, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonFooterComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorStyle.colorPrimaryBlack,
    height: 60,
    marginHorizontal: MarginStyle.margin20,
    marginVertical: MarginStyle.margin30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RadiusStyle.radius12,
  },
  titleStyle: {
    textAlign: 'center',
    color: ColorStyle.colorPrimaryWhite,
    fontSize: FontSizeStyle.fontSize16,
    fontWeight: 'bold',
  },
});
