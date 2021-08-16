import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {PaddingStyle} from '../../config/dimens';
import IconBasicComponent from '../icon/icon-basic';

const ButtonIconComponent = props => {
  const {iconSet, iconSize, iconColor, onPress, bgColor, bgShape} = props;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: bgColor},
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
  },

  // shape
  circle: {
    borderRadius: 48,
  },
});
