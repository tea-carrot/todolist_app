import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IconVector} from '../../assets/icons/icon-vector';
import ButtonFooterComponent from '../../components/button/buttonFooter';
import ScreenContainerComponent from '../../components/container/screen-container';
import HeaderComponent from '../../components/header/header';
import IconBasicComponent from '../../components/icon/icon-basic';
import {ColorStyle} from '../../config/color';
import {MarginStyle} from '../../config/dimens';
import {FontSizeStyle} from '../../config/font-size';
import {CategoryModel} from '../../models/category.model';
import {TodoState} from '../../store/state';

const AddCategoryScreen = () => {
  const todoState = useContext(TodoState);
  const [state, dispatch] = todoState;

  const navigation = useNavigation();

  const [emoji, setEmoji] = useState(null);
  const [title, setTitle] = useState(null);

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

  const handleIconChange = value => {
    const check_num = /[0-9]/; // 숫자
    const check_eng = /[a-zA-Z]/; // 문자
    const check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크

    // setEmoji(
    //   value.replace(
    //     /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/gi,
    //     '',
    //   ),
    // );
    setEmoji(value);
  };

  // Todo 아이템 추가 버튼
  const handleAddTodo = async () => {
    const _category = await CategoryModel({
      id: state.categories.length + 1,
      emoji: emoji,
      title: title,
    });
    dispatch({
      type: 'INSERT_CATEGORY',
      category: _category,
    });
    initState();
    Alert.alert('등록되었습니다.');
    navigation.goBack();
  };

  // 값 초기화
  const initState = () => {
    setEmoji(null);
    setTitle(null);
  };

  return (
    <ScreenContainerComponent>
      {/* Drawer Header */}
      <HeaderComponent
        title={'new category'}
        leftIconCustom={IconVector.arrowBack}
        leftOnPress={handleHeaderLeft}
        rightOnPress={handleHeaderRight}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.containerScrollView}>
        <View style={styles.content}>
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
        </View>

        <ButtonFooterComponent title={'Add to Task'} onPress={handleAddTodo} />
      </KeyboardAwareScrollView>
    </ScreenContainerComponent>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  containerScrollView: {flexGrow: 1},

  content: {
    flex: 1,
    justifyContent: 'center',
  },

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
});
