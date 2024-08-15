import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import CustomTabBar from '@/components/CustomTabBar';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'rgba(0, 112, 239, 0.8)',
      tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: "#FFF"
      }
    }} tabBar={(props) => <CustomTabBar {...props} />}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Tab Two',
        tabBarIcon: ({ color, focused }) => <TabBarIcon name="cloud" color={color} />,
      }}
    />
    
    <Tabs.Screen
      name="two"
      options={{
        title: 'Tab Two',
        tabBarIcon: ({ color, focused }) => <TabBarIcon name="search" color={color} />,
      }}
    />
  </Tabs>
  
  );
}
