import React from "react";
import { View, Text } from 'react-native-ui-lib';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home screen</Text>
    </View>
  );
}

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}