import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import AddCategoryScreen from '../../screens/add/add-category-screen';
import CategoryScreen from '../../screens/category/category-screen';
import {TodoState} from '../../store/state';
const Drawer = createDrawerNavigator();

const RootNavigator = props => {
  const todoState = useContext(TodoState);
  const [state, dispatch] = todoState;

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainTab">{() => props.children}</Drawer.Screen>
      <Drawer.Screen name="All">
        {() => <CategoryScreen title={'All'} />}
      </Drawer.Screen>
      {state.categories.map(category => {
        return (
          <Drawer.Screen
            key={category.id}
            name={`${category.emoji}${category.title}`}
            options={{
              title: `${category.emoji} ${category.title}`,
            }}>
            {() => <CategoryScreen title={`${category.emoji}`} />}
          </Drawer.Screen>
        );
      })}
      <Drawer.Screen name="AddCategory" options={{title: '+'}}>
        {() => <AddCategoryScreen />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
