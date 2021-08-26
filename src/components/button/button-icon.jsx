import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {ColorStyle} from '../../config/color';
import {PaddingStyle} from '../../config/dimens';
import IconBasicComponent from '../icon/icon-basic';

const ButtonIconComponent = props => {
  const {iconSet, iconSize, iconColor, onPress} = props;
  const {bgShape, bgSize, bgColor} = props;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: bgColor, width: bgSize, height: bgSize},
        bgShape == 'circle' && styles.circle,
      ]}
      onPress={onPress}>
      <IconBasicComponent
        iconSet={iconSet}
        iconSize={iconSize}
        iconColor={iconColor}
      />
    </TouchableOpacity>
  );
};

export default ButtonIconComponent;

const styles = StyleSheet.create({
  container: {
    padding: PaddingStyle.padding2,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: ColorStyle.colorGrayBasic,
        shadowOpacity: 0.8,
        shadowOffset: {width: 2, height: 2},
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // shape
  circle: {
    borderRadius: 48,
  },
});
