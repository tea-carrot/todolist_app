import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RoundCheckbox from 'rn-round-checkbox';
import {icCalender, icMenu} from '../../assets/index';
import {ButtonFloatingActionComponent} from '../../components/button/button-floating';
import ScreenContainerComponent from '../../components/container/screen-container';
import HeaderComponent from '../../components/header/header';
import {ColorStyle} from '../../config/color';
import {TodoModel} from '../../models/todo.model';
import {TodoState} from '../../state/state';

const MainScreen = () => {
  const navigation = useNavigation();

  // const [todos] = useReducer(reducer, initialState.todos);
  const todoState = useContext(TodoState);
  const [todos, dispatch] = todoState;

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
        {/* 배경 View */}
        <View style={styles.itemBackgroundView}>
          <View style={styles.itemBackgroundViewBox} />
        </View>
        <View style={styles.itemEmojiView}>
          <Text style={styles.itemEmojiText}>{todo.emoji}</Text>
          <View style={styles.itemCheckBox}>
            <RoundCheckbox
              size={24}
              checked={todo.isComplete}
              onValueChange={handleIsComplate}
            />
          </View>
          <Text
            style={[
              styles.titleText,
              todo.isComplete && {textDecorationLine: 'line-through'},
            ]}>
            {todo.title}
          </Text>
          <Text style={styles.dateTimeText}>
            {todo.date} {todo.time}
          </Text>
          <Text style={styles.descriptionText}>{todo.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <ScreenContainerComponent>
        {/* Drawer Header */}
        <HeaderComponent
          leftIcon={icMenu}
          leftOnPress={handleHeaderLeft}
          rightIcon={icCalender}
          rightOnPress={handleHeaderRight}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* {todos.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{backgroundColor: 'green'}}
              onPress={() =>
                dispatch({type: 'increment', id: todos.length + 1})
              }>
              <Text style={{fontSize: 24}}>count2: {value.title}</Text>
            </TouchableOpacity>
          );
        })} */}
          <View style={styles.titleView}>
            <Text style={styles.titleTextFirst}>Recent</Text>
            <Text style={styles.titleTextSecond}>TaskList</Text>
          </View>
          <View>
            <TextInput
              style={styles.searchInput}
              onChangeText={handleSearchText}
              value={searchText}
              placeholder="Search"
              placeholderTextColor={ColorStyle.colorGrayDark}
            />
            <ListHeaderComponent />
            <FlatList
              style={styles.listView}
              contentContainerStyle={styles.listContentContainerStyle}
              data={todos}
              horizontal={true}
              renderItem={({item}) => <RenderItem item={item} />}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </ScreenContainerComponent>
      <ButtonFloatingActionComponent
        onPress={name => navigation.navigate(name)}
      />
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    width: '100%',
    paddingHorizontal: 30,
  },
  titleTextFirst: {
    fontSize: 34,
  },
  titleTextSecond: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    marginTop: 20,
    marginHorizontal: 30,
    paddingHorizontal: 15,
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 16,
  },

  // FlatList Style
  listView: {
    height: 350,
    width: '100%',
  },
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
    width: 180,
    height: '100%',
    marginHorizontal: 15,
  },
  itemBackgroundView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  itemBackgroundViewBox: {
    marginTop: 60,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 16,
  },
  itemCheckBox: {
    marginVertical: 5,
  },
  itemEmojiView: {alignItems: 'center'},
  itemEmojiText: {
    width: '100%',
    height: 150,
    fontSize: 150,
    textAlign: 'center',
  },
});
