import {useNavigation} from '@react-navigation/native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RoundCheckbox from 'rn-round-checkbox';
import {icCalender, icMenu} from '../../assets/index';
import {ButtonFloatingActionComponent} from '../../components/button/button-floating';
import ScreenContainerComponent from '../../components/container/screen-container';
import HeaderComponent from '../../components/header/header';
import {ColorStyle} from '../../config/color';
import {TodoModel} from '../../models/todo.model';
import {TodoState} from '../../state/state';

const CategoryScreen = props => {
  const {title} = props;
  const navigation = useNavigation();

  const todoState = useContext(TodoState);
  const [state, dispatch] = todoState;

  const [searchText, setSearchText] = useState();

  const handleHeaderLeft = () => {
    navigation.openDrawer();
  };
  const handleHeaderRight = () => {
    navigation.navigate('Monthly');
  };

  const handleSearchText = value => {
    console.log('OK:', value);
    setSearchText(value);
  };

  const ListHeaderComponent = () => {
    return (
      <View style={{marginTop: 30, marginHorizontal: 30}}>
        <Text style={{fontSize: 31}}>Pending Task</Text>
      </View>
    );
  };

  const RenderItem = ({item}) => {
    const todo = TodoModel(item);

    const handleIsComplate = () => {
      dispatch({type: 'COMPLETE_TODO', id: todo.id});
    };
    return (
      <View style={styles.itemContainer} key={todo.id}>
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
