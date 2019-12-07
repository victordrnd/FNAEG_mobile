import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Transition } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStackNavigator } from 'react-navigation-stack';
import OfflineNotice from './components/OfflineNotice';
import { AuthLoadingScreen } from './screens/AuthLoadingScreen';
import { HomeScreen } from './screens/HomeScreen';
import NavigationService from './services/NavigationService';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { CompteurScreen } from './screens/CompteurScreen';

//TODO delete
// AsyncStorage.clear();
export default class App extends React.Component {

  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
        <OfflineNotice />
      </PaperProvider>
    )
  }
}


const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{backgroundColor : tintColor, borderRadius : 10, padding : 7, width: 40, marginTop : -7}}>
            <Icon style={{ color: "#000", textAlign : "center" }} name="home" size={20}></Icon>
          </View>
        )
      }
    },
    Stock: {
      screen: CompteurScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{backgroundColor : tintColor, borderRadius : 10, padding : 7, width: 40, marginTop : -7}}>
            <Icon style={{ color: "#000", textAlign : "center" }} name="package" size={20}></Icon>
          </View>
        )
      }
    },
    Historique: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{backgroundColor : tintColor, borderRadius : 10, padding : 7, width: 40, marginTop : -7}}>
            <Icon style={{ color: "#000", textAlign : "center"}} name="clipboard" size={20}></Icon>
          </View>
        ),
        tabBarBadge : true
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ebecf1',
    inactiveColor: '#fff',
    labeled: false,
    barStyle: { backgroundColor: '#fff'},
  },
);







const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222a5b',
    accent: '#f1c40f',
    background: '#ebecf1'
  },
};




AppNavigator = createAppContainer(createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: bottomTabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }),
);

const AppContainer = createAppContainer(AppNavigator);
