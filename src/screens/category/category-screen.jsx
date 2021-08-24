import {useNavigation} from '@react-navigation/native';
import React, {useContext, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {log} from 'react-native-reanimated';
import GestureRecognizer from 'react-native-swipe-gestures';
import RoundCheckbox from 'rn-round-checkbox';
import {IconVector} from '../../assets/icons/icon-vector';
import {icCalender, icMenu} from '../../assets/index';
import {ButtonFloatingActionComponent} from '../../components/button/button-floating';
import ButtonIconComponent from '../../components/button/button-icon';
import ScreenContainerComponent from '../../components/container/screen-container';
import HeaderComponent from '../../components/header/header';
import {ColorStyle} from '../../config/color';
import {TodoModel} from '../../models/todo.model';
import {TodoState} from '../../store/state';

const CategoryScreen = props => {
  const {title} = props;
  const navigation = useNavigation();

  const todoState = useContext(TodoState);
  const [state, dispatch] = todoState;

  const handleHeaderLeft = () => {
    navigation.openDrawer();
  };
  const handleHeaderRight = () => {
    navigation.navigate('Monthly');
  };

  const RenderItem = ({item}) => {
    const todo = TodoModel(item);

    const slideAnim = useRef(new Animated.Value(0)).current;
    const slideLeft = () => {
      Animated.spring(slideAnim, {
        toValue: -Dimensions.get('screen').width / 3,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
    const slideInit = () => {
      Animated.spring(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    useMemo(() => {
      if (todo.selected) {
        slideLeft();
      } else {
        slideInit();
      }
    }, [todo.selected]);

    const slideStyle = {
      transform: [
        {
          translateX: slideAnim,
        },
      ],
    };

    // 완료
    const handleIsComplate = () => {
      dispatch({type: 'COMPLETE_TODO', id: todo.id});
    };
    // 애니메이션 왼쪽 슬라이드
    const handleSlideSeleted = () => {
      dispatch({type: 'SELECTED_SLIDE_LEFT', id: todo.id});
    };
    // 애니메이션 초기화
    const handleSlideSeletedInit = () => {
      dispatch({type: 'SELECTED_SLIDE_INIT'});
    };
    // 삭제
    const handleDelete = () => {
      dispatch({type: 'DELETE_TODO', id: todo.id});
    };

    return (
      !todo.deleted && (
        <GestureRecognizer
          key={todo.id}
          onSwipeLeft={handleSlideSeleted}
          onSwipeRight={handleSlideSeletedInit}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}>
          <Animated.View style={[styles.container, slideStyle]}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemEmojiText}>{todo.emoji}</Text>
              <View style={styles.itemContent}>
                <Text style={styles.dateTimeText}>
                  {todo.date} {todo.time}
                </Text>
                <Text
                  style={[
                    styles.titleText,
                    todo.isComplete && {textDecorationLine: 'line-through'},
                  ]}>
                  {todo.title}
                </Text>
                <Text style={styles.descriptionText}>{todo.description}</Text>
              </View>
              <View style={styles.itemCheckBox}>
                <RoundCheckbox
                  size={24}
                  checked={todo.isComplete}
                  onValueChange={handleIsComplate}
                />
              </View>
            </View>
            {todo.selected && (
              <View style={[styles.slideView]}>
                <ButtonIconComponent
                  iconSet={IconVector.delete}
                  iconSize={48}
                  iconColor={ColorStyle.colorPrimaryWhite}
                  bgShape={'circle'}
                  bgSize={60}
                  bgColor={ColorStyle.colorPrimaryBlack}
                  onPress={handleDelete}
                />
              </View>
            )}
          </Animated.View>
        </GestureRecognizer>
      )
    );
  };

  return (
    <>
      <ScreenContainerComponent>
        {/* Drawer Header */}
        <HeaderComponent
          title={title}
          leftIcon={icMenu}
          leftOnPress={handleHeaderLeft}
          rightIcon={icCalender}
          rightOnPress={handleHeaderRight}
        />
        {useMemo(() => {
          return (
            <FlatList
              style={styles.listView}
              contentContainerStyle={styles.listContentContainerStyle}
              windowSize={5}
              data={state.todos.filter(todo => {
                return (
                  title == 'All' ||
                  todo.categories
                    .map(category => {
                      console.log('title', category.emoji, title);
                      return category.emoji == title && category;
                    })
                    .filter(Boolean).length != 0
                );
              })}
              horizontal={false}
              renderItem={({item}) => <RenderItem item={item} />}
              showsHorizontalScrollIndicator={false}
            />
          );
        }, [state])}
      </ScreenContainerComponent>
      <ButtonFloatingActionComponent
        onPress={name => navigation.navigate(name)}
      />
    </>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  // FlatList Style
  listView: {},
  listContentContainerStyle: {
    marginTop: 20,
  },
  titleText: {
    marginTop: 5,
    paddingHorizontal: 10,
    fontSize: 22,
  },
  dateTimeText: {
    marginTop: 5,
    paddingHorizontal: 10,
    color: '#9f9f9f',
    fontSize: 16,
  },
  descriptionText: {
    marginTop: 5,
    paddingHorizontal: 10,
    color: '#9f9f9f',
    fontSize: 15,
  },

  // RenderItem Style
  itemContainer: {
    backgroundColor: ColorStyle.colorPrimaryWhite,
    // flex: 1,
    width: '90%',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
  },
  itemEmojiText: {
    margin: 10,
    fontSize: 72,
  },
  itemContent: {
    flex: 1,
    marginVertical: 10,
  },
  descriptionText: {
    width: '80%',
    marginHorizontal: 10,
  },
  itemCheckBox: {
    marginTop: 10,
    marginEnd: 10,
  },

  // Slide 하면 나오는 아이템
  slideView: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width / 3 - 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
