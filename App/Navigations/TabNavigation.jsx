import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import ProfileScreen from "../Screen/ProfileScreen/ProfileScreen"
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import Color from '../utils/Color';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
   <Tab.Navigator screenOptions={{
    headerShown:false,
   }}>
      <Tab.Screen name="home"
       component={HomeScreen}
      options={{
        tabBarLabel:'Search',
        tabBarActiveTintColor:Color.PRIMARY,
        tabBarIcon:({color,size}) => (
            <FontAwesome name="search" size={size} color={color} />
        )
      }}/>
      <Tab.Screen name="favorite"
       component={FavoriteScreen}
       options={{
        tabBarLabel:'Favorite',
        tabBarActiveTintColor:Color.PRIMARY,
        tabBarIcon:({color,size}) => (
            <Feather name="heart" size={size} color={color} />
        )
      }}
      />
      <Tab.Screen name="profile"
       component={ProfileScreen}
       options={{
        tabBarLabel:'Profile',
        tabBarActiveTintColor:Color.PRIMARY,
        tabBarIcon:({color,size}) => (
            <FontAwesome name="user-circle" size={size} color={color} />
        )
      }}
      />
   </Tab.Navigator>
  )
}