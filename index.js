/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, I18nManager } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { ThemeManager } from 'react-native-ui-lib';
import { Colors } from '@constants/Theme';

I18nManager.forceRTL(true);

ThemeManager.setComponentTheme('View', {
    backgroundColor: Colors.background
});

AppRegistry.registerComponent(appName, () => App);
