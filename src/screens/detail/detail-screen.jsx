import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IconVector} from '../../assets/icons/icon-vector';
import ButtonIconComponent from '../../components/button/button-icon';
import ButtonFooterComponent from '../../components/button/buttonFooter';
import CategoryListSeletedComponent from '../../components/category/category-list-seleted';
import ScreenContainerComponent from '../../components/container/screen-container';
import ContentHeaderComponent from '../../components/content/header-content';
import HeaderComponent from '../../components/header/header';
import IconBasicComponent from '../../components/icon/icon-basic';
import {ColorStyle} from '../../config/color';
import {MarginStyle, PaddingStyle} from '../../config/dimens';
import {FontSizeStyle} from '../../config/font-size';
import {TodoState} from '../../store/state';
import {getDateTime} from '../../utils/common';

const DetailScreen = () => {
  const {params} = useRoute();
  const {backNavi, todo, id} = params;
  const todoState = useContext(TodoState);
  const [state, dispatch] = todoState;
  // const todo = TodoModel(state.todos.filter(todo => todo.id == id)[0]);

  const navigation = useNavigation();

  const [emoji, setEmoji] = useState(todo.emoji);
  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(todo.date);
  const [time, setTime] = useState(todo.time);
  const [description, setDescription] = useState(todo.description);

  // Category
  const [categories, setCategories] = useState(todo.categories);
  const [categoryDialog, setCategoryDialog] = useState(null);
  const [seletedCategoryItem, setSeletedCategoryItem] = useState(null);

  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmoji(todo.emoji);
      setTitle(todo.title);
      setDate(todo.date);
      setTime(todo.time);
      setDescription(todo.description);
    });
    return () => clearTimeout(timeout);
  }, [todo]);

  // handle Header
  const handleHeaderLeft = () => {
    navigation.goBack();
  };
  const handleHeaderRight = () => {
    setIsImportant(!isImportant);
  };

  // handle Info
  const handleTitleChange = value => {
    setTitle(value);
  };
  const handleDateChange = value => {
    setDate(value);
  };
  const handleDescriptionChange = value => {
    setDescription(value);
  };

  // Dialog
  const handleCategoryDialogShow = () => {
    setCategoryDialog(true);
  };
  const handleCategoryDialogHide = () => {
    setCategoryDialog(false);
  };
  const handleCategoryDialogPositive = value => {
    handleCategoryDialogHide();
    setCategories(value);
  };
  const handleCategoryDialogNegative = () => {
    handleCategoryDialogHide();
  };

  const handleIconChange = value => {
    const check_num = /[0-9]/; // 숫자
    const check_eng = /[a-zA-Z]/; // 문자
    const check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크

    setEmoji(value);
  };

  // Todo 아이템 업데이트 버튼
  const handleAddTodo = async () => {
    dispatch({
      type: 'UPDATE_TODO',
      todo: {
        id: todo.id,
        emoji: emoji,
        title: title,
        categories: categories,
        date: date,
        time: time,
        description: description,
        isImportant: todo.isImportant,
        isComplete: todo.isComplete,
        createdAt: todo.createdAt,
        updatedAt: getDateTime(),
        selected: todo.selected,
        deleted: todo.deleted,
      },
    });
    navigation.goBack();
  };

  return (
    <ScreenContainerComponent>
      {/* Dialog */}
      <Overlay
        style={{borderRadius: 24}}
        isVisible={categoryDialog}
        onBackdropPress={handleCategoryDialogNegative}>
        <CategoryListSeletedComponent
          seletedCategories={categories}
          handleCategorySelected={handleCategoryDialogPositive}
        />
      </Overlay>

      {/* Drawer Header */}
      <HeaderComponent
        leftIconCustom={IconVector.arrowBack}
        rightIconCustom={
          !isImportant ? IconVector.clipboardOff : IconVector.clipboardOn
        }
        leftOnPress={handleHeaderLeft}
        rightOnPress={handleHeaderRight}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.containerScrollView}>
        <View style={styles.emojiView}>
          {!emoji && (
            <>
              <IconBasicComponent
                iconSet={IconVector.circle}
                iconSize={206}
                iconColor={ColorStyle.colorGrayLight}
              />

              <View style={styles.emojiEmptyView}>
                <IconBasicComponent
                  iconSet={IconVector.smile}
                  iconSize={108}
                  iconColor={ColorStyle.colorPrimaryWhite}
                />
                <Text style={styles.emojiEmptyText}>Add Icon</Text>
              </View>
            </>
          )}
          <View style={styles.emojiInputView}>
            <TextInput
              style={styles.emojiInputText}
              value={emoji}
              onChangeText={handleIconChange}
              maxLength={2}
              caretHidden={true}
              textAlign={'center'}
            />
          </View>
        </View>
        {/* Title */}
        <TextInput
          style={styles.titleInputText}
          value={title}
          onChangeText={handleTitleChange}
          placeholder={'untitled'}
          placeholderTextColor={'#AEAEAE'}
          textAlign={'center'}
          maxLength={20}
        />
        {/* Date Time */}
        <TextInput
          style={styles.dateInputText}
          value={date}
          onChangeText={handleDateChange}
          placeholderTextColor={'#AEAEAE'}
          textAlign={'center'}
          maxLength={20}
        />

        {/* Category */}
        <ContentHeaderComponent title={'Category'}>
          <FlatList
            style={styles.categoryView}
            contentContainerStyle={styles.categoryContentView}
            horizontal={true}
            data={categories}
            renderItem={({item}) => (
              <Text
                style={{
                  marginHorizontal: MarginStyle.margin5,
                  fontSize: FontSizeStyle.fontSize40,
                }}>
                {item.emoji}
              </Text>
            )}
            ListFooterComponent={
              <ButtonIconComponent
                onPress={handleCategoryDialogShow}
                iconSet={IconVector.plus}
                iconSize={36}
              />
            }
            persistentScrollbar={false}
          />
        </ContentHeaderComponent>
        <ContentHeaderComponent title={'Content'}>
          <TextInput
            value={description}
            onChangeText={handleDescriptionChange}
            style={styles.contentText}
            placeholder={'Tab here to continue...'}
            multiline={true}
          />
        </ContentHeaderComponent>

        <ButtonFooterComponent
          title={'Update to Task'}
          onPress={handleAddTodo}
        />
      </KeyboardAwareScrollView>
    </ScreenContainerComponent>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  containerScrollView: {flexGrow: 1},

  // 이모지 뷰
  emojiView: {
    width: '100%',
    height: 200,
    marginVertical: MarginStyle.margin40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 이모지 비어있는 뷰
  emojiEmptyView: {
    position: 'absolute',
    alignItems: 'center',
  },
  emojiEmptyText: {
    color: '#FFFFFF',
    fontSize: FontSizeStyle.fontSize18,
    fontWeight: 'bold',
  },
  // 이모지 입력 뷰
  emojiInputView: {
    position: 'absolute',
    alignItems: 'center',
  },
  emojiInputText: {fontSize: 204},

  // Title
  titleInputText: {
    fontSize: FontSizeStyle.fontSize28,
    fontWeight: 'bold',
  },
  // Date Time
  dateInputText: {
    color: ColorStyle.colorGrayDark,
    fontSize: FontSizeStyle.fontSize18,
    fontWeight: '300',
  },
  // content (categories)
  categoryView: {
    paddingVertical: PaddingStyle.padding5,
  },
  categoryContentView: {
    alignItems: 'center',
  },
  // content (description)
  contentText: {
    height: 100,
    color: ColorStyle.colorPrimaryBlack,
  },
});
