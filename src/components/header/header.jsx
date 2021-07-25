import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ColorStyle} from '../../config/color';
import {FontSizeStyle} from '../../config/font-size';
import IconBasicComponent from '../icon/icon-basic';

const HeaderComponent = props => {
  const {title} = props;
  const {leftIcon, leftOnPress} = props;
  const {rightIcon, rightOnPress} = props;

  // Custom Icon
  const {leftIconCustom, rightIconCustom} = props;
  const leftIconSize = props.leftIconSize
    ? props.leftIconSize
    : FontSizeStyle.fontSize24;
  const rightIconSize = props.rightIconSize
    ? props.rightIconSize
    : FontSizeStyle.fontSize24;
  const leftIconColor = props.leftIconColor
    ? props.leftIconColor
    : ColorStyle.colorPrimaryBlack;
  const rightIconColor = props.rightIconColor
    ? props.rightIconColor
    : ColorStyle.colorPrimaryBlack;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftOnPress}>
        <Image style={styles.iconStyle} source={leftIcon} />
        {leftIconCustom && (
          <IconBasicComponent
            iconSet={leftIconCustom}
            iconSize={leftIconSize}
            color={leftIconColor}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.titleStyle}></Text>
      <TouchableOpacity onPress={rightOnPress}>
        <Image style={styles.iconStyle} source={rightIcon} />
        {rightIconCustom && (
          <IconBasicComponent
            iconSet={rightIconCustom}
            iconSize={rightIconSize}
            color={rightIconColor}
          />
        )}
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
