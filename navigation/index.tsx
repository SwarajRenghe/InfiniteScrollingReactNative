import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import MyMethod from '../screens/MyMethod';
import OptimisedFlatList from '../screens/OptimisedFlatList';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { MyMethodParamList, OptimisedFlatListParamList } from '../types';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const MyMethodStack = createStackNavigator<MyMethodParamList>();

function MyMethodNavigator() {
  return (
    <MyMethodStack.Navigator>
      <MyMethodStack.Screen
        name="MyMethod"
        component={MyMethod}
        options={{ headerTitle: 'Custom Method' }}
      />
    </MyMethodStack.Navigator>
  );
}

const OptimisedFlatListStack = createStackNavigator<OptimisedFlatListParamList>();

function OptimisedFlatListNavigator() {
  return (
    <OptimisedFlatListStack.Navigator>
      <OptimisedFlatListStack.Screen
        name="OptimisedFlatList"
        component={OptimisedFlatList}
        options={{ headerTitle: 'Normal Flat List' }}
      />
    </OptimisedFlatListStack.Navigator>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="MyMethod" component={MyMethodNavigator} />
      <Stack.Screen name="OptimisedFlatList" component={OptimisedFlatListNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
