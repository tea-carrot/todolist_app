import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorStyle} from '../../config/color';
import {MarginStyle} from '../../config/dimens';
import {FontSizeStyle} from '../../config/font-size';

const ContentComponent = props => {
  const {title, titleSize} = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, titleSize && {fontSize: titleSize}]}>
        {title}
      </Text>
      <View style={styles.valueView}>{props.children}</View>
    </View>
  );
};

export default ContentComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: MarginStyle.margin20,
    marginHorizontal: MarginStyle.margin20,
  },
  titleText: {
    color: ColorStyle.colorPrimaryBlack,
    fontSize: FontSizeStyle.fontSize16,
    fontWeight: 'bold',
  },
  valueView: {
    marginTop: MarginStyle.margin5,
  },
});
