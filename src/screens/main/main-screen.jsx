import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {icCalender, icMenu} from '../../assets/index';
import ScreenContainerComponent from '../../components/container/screen-container';
import HeaderComponent from '../../components/header/header';

const MainScreen = () => {
  const navigation = useNavigation();

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

  const dummyTodos = [
    {
      id: 1,
      emoji: '🍴',
      title: '점심 메뉴 정하기',
      date: '07-01',
      time: '12:00',
      description: '오늘 친구와 만나서 점심 메뉴를 골라야한다.',
    },
    {
      id: 2,
      emoji: '🍨',
      title: '점심 메뉴 정하기',
      date: '07-01',
      time: '12:00',
      description: '오늘 친구와 만나서 점심 메뉴를 골라야한다.',
    },
    {
      id: 3,
      emoji: '🍙',
      title: '점심 메뉴 정하기',
      date: '07-01',
      time: '12:00',
      description: '오늘 친구와 만나서 점심 메뉴를 골라야한다.',
    },
  ];

  const ListHeaderComponent = () => {
    return (
      <View style={{marginTop: 30, marginHorizontal: 30}}>
        <Text style={{fontSize: 31}}>Pending Task</Text>
      </View>
    );
  };

  const RenderItem = ({item}) => {
    const {title, emoji, date, time, description} = item;
    return (
      <View
        style={{
          width: 180,
          height: '100%',
          marginHorizontal: 15,
        }}
        key={item.id}>
        {/* 배경 View */}
        <View style={{width: '100%', height: '100%', position: 'absolute'}}>
          <View style={{height: 60}} />
          <View style={{backgroundColor: 'white', flex: 1, borderRadius: 16}} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              width: '100%',
              height: 150,
              fontSize: 150,
              textAlign: 'center',
            }}>
            {emoji}
          </Text>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.dateTimeText}>
            {date} {time}
          </Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainerComponent>
      {/* Drawer Header */}
      <HeaderComponent
        leftIcon={icMenu}
        leftOnPress={handleHeaderLeft}
        rightIcon={icCalender}
        rightOnPress={handleHeaderRight}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
            placeholderTextColor={'#888888'}
          />
          <ListHeaderComponent />
          <FlatList
            style={styles.listView}
            contentContainerStyle={styles.listContentContainerStyle}
            data={dummyTodos}
            horizontal={true}
            renderItem={({item}) => <RenderItem item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Button title="Add" onPress={() => navigation.navigate('Add')} />
      </ScrollView>
    </ScreenContainerComponent>
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

  // FaltList Style
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
});
