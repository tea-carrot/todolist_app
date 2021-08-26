import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {IconVector} from '../../assets/icons/icon-vector';
import ButtonIconComponent from '../../components/button/button-icon';
import {ColorStyle} from '../../config/color';
import AddCategoryScreen from '../../screens/add/add-category-screen';
import BookmarkScreen from '../../screens/bookmark/bookmark-screen';
import CategoryScreen from '../../screens/category/category-screen';
import DoneScreen from '../../screens/done/done-screen';
import {TodoState} from '../../store/state';
const Drawer = createDrawerNavigator();

const DrawerTitleComponent = props => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        paddingVertical: 10,
        borderColor: ColorStyle.colorGrayBasic,
        borderBottomWidth: 1,
      }}
      View>
      {props.title && <Text style={{fontSize: 25}}>{props.title}</Text>}
      {props.children}
    </View>
  );
};
const DrawerItemComponent = props => {
  return (
    <TouchableHighlight
      style={{
        marginHorizontal: 20,
        paddingVertical: 10,
      }}
      activeOpacity={0.6}
      underlayColor={ColorStyle.colorPrimaryWhite}
      onPress={props.onPress}>
      <View>
        {props.title && <Text style={{fontSize: 20}}>{props.title}</Text>}
        {props.children}
      </View>
    </TouchableHighlight>
  );
};
const DrawerIconComponent = props => {
  return (
    <TouchableHighlight
      style={{
        width: 48,
        marginHorizontal: 20,
        paddingVertical: 10,
      }}
      activeOpacity={0.6}
      underlayColor={ColorStyle.colorPrimaryWhite}
      onPress={props.onPress}>
      <ButtonIconComponent {...props} />
    </TouchableHighlight>
  );
};

const DrawerContentComponent = props => {
  const todoState = useContext(TodoState);
  const [state, dispatch] = todoState;
  return (
    <DrawerContentScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <DrawerTitleComponent
          onPress={() => props.navigation.navigate('MainTab')}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={ColorStyle.colorPrimaryWhite}
            onPress={() => props.navigation.navigate('MainTab')}>
            <Text style={{fontSize: 25}}>메인</Text>
          </TouchableHighlight>
        </DrawerTitleComponent>
        {/* Category */}
        <DrawerTitleComponent title={'Category'} />
        <DrawerItemComponent
          title={'📌 ALL'}
          onPress={() => props.navigation.navigate('All')}
        />
        {state.categories.map(category => {
          return (
            <DrawerItemComponent
              key={category.id}
              title={`${category.emoji} ${category.title}`}
              onPress={() =>
                props.navigation.navigate(`${category.emoji}${category.title}`)
              }
            />
          );
        })}
        {/* 추가 버튼 */}
        <DrawerIconComponent
          onPress={() => props.naviagation.navigate('AddCategory')}
          iconSet={IconVector.plus}
          iconSize={36}
          color={ColorStyle.colorPrimaryBlack}
          bgColor={ColorStyle.colorPrimaryWhite}
          bgShape={'circle'}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <DrawerIconComponent
          onPress={() => props.navigation.navigate('DoneList')}
          iconSet={IconVector.checkcircle}
          iconSize={36}
        />
        <DrawerIconComponent
          onPress={() => props.navigation.navigate('BookmarkList')}
          iconSet={IconVector.clipboardOn}
          iconSize={36}
        />
        <DrawerIconComponent
          onPress={() => Alert.alert('SettingScreen')}
          iconSet={IconVector.settings}
          iconSize={36}
        />
      </View>
    </DrawerContentScrollView>
  );
};
const RootNavigator = props => {
  const todoState = useContext(TodoState);
  const [state, dispatch] = todoState;

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContentComponent {...props} />}
      drawerStyle={{width: '75%'}}>
      <Drawer.Screen name="MainTab" options={{title: '메인'}}>
        {() => props.children}
      </Drawer.Screen>
      <Drawer.Screen name="All">
        {() => <CategoryScreen emoji={'📌'} title={'All'} />}
      </Drawer.Screen>
      {state.categories.map(category => {
        return (
          <Drawer.Screen
            key={category.id}
            name={`${category.emoji}${category.title}`}
            options={{
              title: `${category.emoji} ${category.title}`,
            }}>
            {() => (
              <CategoryScreen
                emoji={`${category.emoji}`}
                title={`${category.title}`}
              />
            )}
          </Drawer.Screen>
        );
      })}
      <Drawer.Screen name="AddCategory" options={{title: '+'}}>
        {() => <AddCategoryScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="DoneList" options={{title: 'Done'}}>
        {() => <DoneScreen />}
      </Drawer.Screen>
      <Drawer.Screen name="BookmarkList" options={{title: 'Bookmark'}}>
        {() => <BookmarkScreen />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
