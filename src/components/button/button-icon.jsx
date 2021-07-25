import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {PaddingStyle} from '../../config/dimens';
import IconBasicComponent from '../icon/icon-basic';

const ButtonIconComponent = props => {
  const {iconSet, iconSize, iconColor, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <IconBasicComponent
        iconSet={iconSet}
        iconSize={iconSize}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export default ButtonIconComponent;

const styles = StyleSheet.create({
  container: {
    padding: PaddingStyle.padding2,
  },
});
