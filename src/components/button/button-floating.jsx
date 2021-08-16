import React from 'react';
import {StyleSheet} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {icPlus} from '../../assets/index';
import {ColorStyle} from '../../config/color';

export const ButtonFloatingActionComponent = props => {
  const {onPress} = props;
  return (
    <FloatingAction
      color={ColorStyle.colorGrayBasic}
      actions={[
        {
          text: 'Add',
          icon: icPlus,
          name: 'Add',
          position: 1,
          color: ColorStyle.colorGrayDark,
        },
      ]}
      onPressItem={name => onPress(name)}
    />
  );
};

const styles = StyleSheet.create({});
