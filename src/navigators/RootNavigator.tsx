import React from "react";
import { View, Text, Button } from 'react-native-ui-lib';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { useAppDispatch, usePrefencesReducer } from "@store/hooks";
import { ScreenNames } from "@constants/ScreenNames";
import { PrefencesScreen, HeightWidthCalculator } from "@screens";
import { setInitialScreen } from "@store/reducers/PrefencesReducer";

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }: any) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home screen</Text>
    </View>
  );
}

export const RootNavigator = () => {
  const dispatch = useAppDispatch()
  const { initialScreen } = usePrefencesReducer()

  const onNavigationChange = (state: NavigationState | undefined) => {
    const { history = [] } = state || {}
    if (!state || history.length == 0) return
    const lastHistoryItem: any = history[history.length - 1]
    if (lastHistoryItem?.type == "route") {
      const screenName = lastHistoryItem?.key?.split("-")[0]
      if (screenName !== ScreenNames.PREFENCES) {
        dispatch(setInitialScreen(screenName))
      }
    }
  }

  return <HeightWidthCalculator/>
  // return (
  //   <NavigationContainer onStateChange={onNavigationChange}>
  //     <Drawer.Navigator initialRouteName={initialScreen || ScreenNames.HOME}>
  //       <Drawer.Screen name={ScreenNames.HOME} component={HomeScreen} />
  //       <Drawer.Screen name={ScreenNames.PREFENCES} component={PrefencesScreen} />
  //     </Drawer.Navigator>
  //   </NavigationContainer>
  // );
}