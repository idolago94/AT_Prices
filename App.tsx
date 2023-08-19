import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import store from '@store'
import { Provider } from 'react-redux'
import { RootNavigator } from '@navigators';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={[s.container, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View flex>
          <RootNavigator />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

export default App;

const s = StyleSheet.create({
  container: {
    flex: 1,
  }
})