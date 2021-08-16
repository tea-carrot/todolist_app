import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CategoryScreen = props => {
  const {title} = props;
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
