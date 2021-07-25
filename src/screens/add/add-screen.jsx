import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon, Overlay} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IconVector} from '../../assets/icons/icon-vector';
import ButtonIconComponent from '../../components/button/button-icon';
import ButtonFooterComponent from '../../components/button/buttonFooter';
import ScreenContainerComponent from '../../components/container/screen-container';
import ContentHeaderComponent from '../../components/content/header-content';
import HeaderComponent from '../../components/header/header';
import IconBasicComponent from '../../components/icon/icon-basic';
import {ColorStyle} from '../../config/color';
import {MarginStyle} from '../../config/dimens';
import {FontSizeStyle} from '../../config/font-size';
import {getDateTime} from '../../utils/common';

const AddScreen = () => {
  const navigation = useNavigation();

  const [emoji, setEmoji] = useState(null);
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryDialog, setCategoryDialog] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDate(getDateTime());
    });
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // handle Header
  const handleHeaderLeft = () => {
    navigation.goBack();
  };
  const handleHeaderRight = () => {
    setIsCheck(!isCheck);
  };

  // handle Info
  const handleTitleChange = value => {
    setTitle(value);
  };
  const handleDateChange = value => {
    setDate(value);
  };

  // Dialog
  const handleCategoryDialogShow = () => {
    setCategoryDialog(true);
  };
  const handleCategoryDialogHide = () => {
    setCategoryDialog(false);
  };
  const handleCategoryDialogPositive = () => {
    handleCategoryDialogHide();
  };
  const handleCategoryDialogNegative = () => {
    handleCategoryDialogHide();
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
  return (
    <ScreenContainerComponent>
      {/* Dialog */}
      <Overlay
        isVisible={categoryDialog}
        onBackdropPress={handleCategoryDialogNegative}>
        <Text>Category List</Text>
      </Overlay>
      {/* Drawer Header */}
      <HeaderComponent
        leftIconCustom={IconVector.arrowBack}
        rightIconCustom={
          !isCheck ? IconVector.clipboardOff : IconVector.clipboardOn
        }
        leftOnPress={handleHeaderLeft}
        rightOnPress={handleHeaderRight}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.containerScrollView}>
        <View style={styles.emojiView}>
          <View>
            <IconBasicComponent
              iconSet={IconVector.circle}
              iconSize={206}
              iconColor={ColorStyle.colorGrayLight}
            />
          </View>
          <View style={styles.emojiEmptyView}>
            <IconBasicComponent
              iconSet={IconVector.smile}
              iconSize={108}
              iconColor={ColorStyle.colorPrimaryWhite}
            />
            <Text style={styles.emojiEmptyText}>Add Icon</Text>
          </View>
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

        <ContentHeaderComponent title={'Category'}>
          <ButtonIconComponent
            onPress={handleCategoryDialogShow}
            iconSet={IconVector.plus}
          />
        </ContentHeaderComponent>
        <ContentHeaderComponent title={'Content'}>
          <TextInput
            style={styles.contentText}
            placeholder={'Tab here to continue...'}
            multiline={true}
          />
        </ContentHeaderComponent>

        <ButtonFooterComponent title={'Add to Task'} />
      </KeyboardAwareScrollView>
    </ScreenContainerComponent>
  );
};

export default AddScreen;

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
  // content (description)
  contentText: {
    height: 100,
    color: ColorStyle.colorGrayDark,
  },
});
