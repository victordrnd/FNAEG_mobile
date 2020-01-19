import React from 'react';
import { View, StatusBar } from 'react-native';
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
import { ListKitScreen } from './screens/ListKitsScreen';
import {InventaireSuccess} from './screens/inventaire/InventaireSuccess'
import {ListInventaireScreen} from './screens/inventaire/ListInventaireScreen';
import {DetailInventaireScreen} from './screens/inventaire/DetailInventaireScreen';
import Service from './services/Service';
import UserService from './services/UserService';
import IntroScreen from './screens/IntroScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginScreen} from './screens/LoginScreen'; 
export default class App extends React.Component {
  async componentDidMount(){
    await AsyncStorage.getItem('@token').then( async (token) => {
      UserService.tokenSubject.next(token);
      Service.token = token;
      await UserService.populate();
    });
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor="#d8a864"></StatusBar>
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
      screen: ListKitScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{backgroundColor : tintColor, borderRadius : 10, padding : 7, width: 40, marginTop : -7}}>
            <Icon style={{ color: "#000", textAlign : "center" }} name="package" size={20}></Icon>
          </View>
        )
      }
    },
    Historique: {
      screen: ListInventaireScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{backgroundColor : tintColor, borderRadius : 10, padding : 7, width: 40, marginTop : -7}}>
            <Icon style={{ color: "#000", textAlign : "center"}} name="clipboard" size={20}></Icon>
          </View>
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f1f3f6',
    inactiveColor: '#fff',
    labeled: false,
    barStyle: { backgroundColor: '#fff',position : "absolute"},
  },
);







const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222a5b',
    accent: '#f1c40f',
    background: '#f1f3f6'
  },
};

const AuthenticationNavigator = createStackNavigator({
  Login : LoginScreen
},
{
  headerMode :'none'
})

const HomeNavigator = createStackNavigator({
  App : bottomTabNavigator,
  IntroScreen : IntroScreen,
  Compteur : CompteurScreen,
  InventaireSuccess : InventaireSuccess,
  DetailInventaire : DetailInventaireScreen,
},{
  headerMode :'none'
})

AppNavigator = createAppContainer(createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: HomeNavigator,
    Login : AuthenticationNavigator
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
