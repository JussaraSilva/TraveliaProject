import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { themeColors } from '@/constants/theme';
import { CalendarDotsIcon, ChatsCircleIcon, HouseIcon, SealPercentIcon, UserIcon } from "phosphor-react-native";


import { useTheme } from '../../context/themeProvider'; // Verifique se o caminho está correto

export default function TabLayout() {
  
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors[theme].tabIconActive,
        tabBarInactiveTintColor: themeColors[theme].tabIconInative,
        tabBarStyle: { 
                      backgroundColor: themeColors[theme].background, 
                      borderTopColor: themeColors[theme].borderColor,
                      height: 70,
                      paddingBottom: 10,
                      paddingTop: 10,
                    },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => 
          <HouseIcon
            size={28} 
            color={color} 
            weight="fill"
          />
        }}
      />
      <Tabs.Screen
        name="promos"
        options={{
          title: 'Promos',
          tabBarIcon: ({ color }) => 
          <SealPercentIcon
            size={28} 
            color={color} 
            weight="fill"
          />
        }}
      />
      <Tabs.Screen
        name="myTrips"
        options={{
          title: 'My Trips',
          tabBarIcon: ({ color }) => 
          <CalendarDotsIcon
            size={28} 
            color={color} 
            weight="fill"
          />
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => 
          <ChatsCircleIcon
            size={28} 
            color={color} 
            weight="fill"
          />
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => 
          <UserIcon
            size={28}
            color={color} 
            weight="fill"
          />
        }}
      />
    </Tabs>
  );
}
