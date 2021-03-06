import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {dummyCategoryList} from '../../dummy/dummy-category';
import ButtonFooterComponent from '../button/buttonFooter';
import ContentHeaderComponent from '../content/header-content';
import CategoryListComponent from './category-list';

const CategoryListSeletedComponent = props => {
  const {categories, handleCategorySelected} = props;
  const [checkItems, setCheckItems] = useState([]);

  const [categoryList, setCategoryList] = useState(dummyCategoryList);

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
            listData={categoryList}
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
