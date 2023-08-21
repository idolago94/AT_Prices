module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["babel-plugin-module-resolver",
      {
        "alias": {
          "@navigators": "./src/navigators",
          "@screens": "./src/screens",
          "@store": "./src/store",
          "@constants": "./src/constants",
          "@content": "./src/content",
          "@utils": "./src/utils"
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
