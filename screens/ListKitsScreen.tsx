import * as React from 'react';
import { Text, Button } from 'react-native-elements';
import { StatusBar, View, StyleSheet, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import styles from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import KitService from '../services/KitService';
interface NavigationParams {
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}






export class ListKitScreen extends React.Component<Props> {
    kits;
    state
    componentDidMount(){
        KitService.getAllKit((kits) =>{
            this.kits = kits;
        });
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>

                <StatusBar backgroundColor='#ebecf1' barStyle='dark-content'></StatusBar>
                <Image source={require("../assets/logo-dark.png")} style={{width : 100, height : 100, alignSelf : "center"}}></Image>
                <Text style={styles.titleDark}>Bienvenue sur l'application FNAEG</Text>
                

            </View>
        );
    }


}
