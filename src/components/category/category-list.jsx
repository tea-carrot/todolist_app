import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ColorStyle} from '../../config/color';
import {MarginStyle, PaddingStyle, RadiusStyle} from '../../config/dimens';

const RenderItem = props => {
  const {item, onPress} = props;
  const [isSelected, setIsSelected] = useState(item.isSelected);

  const handleIsSelected = () => {
    const _item = {...item, isSelected: !isSelected};
    setIsSelected(!isSelected);
    onPress(_item, !isSelected);
  };

  return (
    <TouchableOpacity
      style={[styles.renderItemView, isSelected && styles.renderItemSelectView]}
      onPress={handleIsSelected}>
      <Text style={styles.icon}>{item.icon}</Text>
    </TouchableOpacity>
  );
};

const CategoryListComponent = props => {
  const {listData, onPress} = props;
  return (
    <>
      <FlatList
        style={styles.container}
        keyExtractor={index => index.toString()}
        data={listData}
        renderItem={({item}) => <RenderItem item={item} onPress={onPress} />}
        numColumns={6}
        windowSize={2}
      />
    </>
  );
};

export default CategoryListComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
  },
  icon: {
    fontSize: Dimensions.get('screen').width / 12,
  },

  // Select
  renderItemView: {
    margin: MarginStyle.margin2,
    padding: PaddingStyle.padding5,
    borderRadius: RadiusStyle.radius12,
  },
  renderItemSelectView: {
    backgroundColor: ColorStyle.colorPrimarySelect,
  },
});
