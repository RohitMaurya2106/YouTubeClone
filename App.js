import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './scr/screens/Home'
import Search from './scr/screens/Search'
import VideoPlayer from './scr/screens/VideoPlayer'
import Explore from './scr/screens/Explore'
import Subscribe from './scr/screens/Subscribe'
import Constant from 'expo-constants'
import{MaterialIcons} from '@expo/vector-icons'
import { NavigationContainer,DefaultTheme,DarkTheme,useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import {reducer} from './scr/reducers/reducer'
import {Provider,useSelector} from 'react-redux'
import {createStore,combineReducers} from 'redux'
import {themeReducer} from './scr/reducers/themeReducer'

const rootReducer = combineReducers({
  cardData:reducer, //[],
  myDarkMode:themeReducer //false
})

const store = createStore(rootReducer)

const customDarkTheme={
  ...DarkTheme,
  colors:{
  ...DarkTheme.colors,
  headerColor:"#404040",
  iconColor:"white",
  tabIcon:"white",
  }
}
const customDefaultTheme={
  ...DefaultTheme,
  colors:{
  ...DefaultTheme.colors,
  headerColor:"white",
  iconColor:"black",
  tabIcon:"red",
}
}

const Stack = createStackNavigator()
const Tabs= createBottomTabNavigator()

const RootHome=()=>{
  const {colors}=useTheme()
  return(
    <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'home') {
          iconName = 'home';
        } else if (route.name === 'explore') {
          iconName = 'explore';
        }else if(route.name === 'subscribe'){
          iconName = 'subscriptions';
        }

        return <MaterialIcons name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.tabIcon,
      inactiveTintColor: 'gray',
    }}
    >
      <Tabs.Screen name="home" component={Home} />
     <Tabs.Screen name="explore" component={Explore} />
     <Tabs.Screen name="subscribe" component={Subscribe} />
    </Tabs.Navigator>
  )
}
export default ()=>{
  return(<Provider store = {store}>
    <Navigation/>
  </Provider>)
}
export  function Navigation() {
let currentTheme= useSelector(state=>{
  return state.myDarkMode
})
  return (
    <Provider store = {store}>
    <NavigationContainer theme={currentTheme?customDarkTheme: customDefaultTheme}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="rootHome" component={RootHome} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="videoplayer" component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


