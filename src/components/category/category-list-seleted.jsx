import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TodoState} from '../../store/state';
import ButtonFooterComponent from '../button/buttonFooter';
import ContentHeaderComponent from '../content/header-content';
import CategoryListComponent from './category-list';

const CategoryListSeletedComponent = props => {
  const {seletedCategories, handleCategorySelected} = props;

  const todoState = useContext(TodoState);
  const [state, dispatch] = todoState;

  const [checkItems, setCheckItems] = useState([]);

  const [categories, setCategories] = useState(state.categories);

  // 카테고리 선택
  const handleCheckItem = async (value, isChecked) => {
    console.log(value);
    if (isChecked) {
      setCheckItems([...checkItems, value]);
    } else {
      setCheckItems(checkItems.filter(checkItem => checkItem.id !== value.id));
    }
  };

  const handleSubmit = () => {
    handleCategorySelected(checkItems);
  };

  return (
    <>
      <View
        style={{
          width: '80%',
          height: 200,
        }}>
        <ContentHeaderComponent title={'All'}>
          <CategoryListComponent
            listData={categories}
            onPress={handleCheckItem}
          />
        </ContentHeaderComponent>
      </View>
      <ButtonFooterComponent title={'Select'} onPress={handleSubmit} />
    </>
  );
};

export default CategoryListSeletedComponent;

const styles = StyleSheet.create({});
