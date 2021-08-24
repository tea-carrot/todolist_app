import {useNavigation} from '@react-navigation/native';
import React, {useContext, useRef} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import RoundCheckbox from 'rn-round-checkbox';
import {icCalender, icMenu} from '../../assets/index';
import {ButtonFloatingActionComponent} from '../../components/button/button-floating';
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
      console.log('Animated');
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('screen').width / 3,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    const slideInit = () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    const slideStyle = {
      transform: [
        {
          translateX: slideAnim,
        },
      ],
    };

    const handleIsComplate = () => {
      dispatch({type: 'COMPLETE_TODO', id: todo.id});
    };

    return (
      <GestureRecognizer
        key={todo.id}
        onSwipeLeft={() => slideLeft()}
        onSwipeRight={() => slideInit()}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}>
        <Animated.View style={[styles.itemContainer, slideStyle]}>
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
        </Animated.View>
      </GestureRecognizer>
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
        <FlatList
          style={styles.listView}
          contentContainerStyle={styles.listContentContainerStyle}
          windowSize={5}
          data={state.todos}
          horizontal={false}
          renderItem={({item}) => <RenderItem item={item} />}
          showsHorizontalScrollIndicator={false}
        />
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
    flex: 1,
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
    // backgroundColor: 'red',
    marginTop: 10,
    marginEnd: 10,
  },
});
