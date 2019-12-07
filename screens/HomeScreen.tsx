import * as React from 'react';
import { Text, Button } from 'react-native-elements';
import { StatusBar, View, StyleSheet, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import styles from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';

interface NavigationParams {
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}


export class HomeScreen extends React.Component<Props> {



    render() {
        return (
            <View>

                <StatusBar backgroundColor='#f1f3f6' barStyle='dark-content'></StatusBar>
                <Image source={require("../assets/logo-dark.png")} style={{width : 100, height : 100, alignSelf : "center"}}></Image>
                <Text style={styles.titleDark}>Bienvenue sur l'application de gestion des stocks FNAEG</Text>
                <Text style={[styles.subtitle, {textAlign : "center"}]}>Gérez les stocks de kits pour le laboratoire FNAEG</Text>
                <Image source={ require('../assets/note-yellow.png')} style={{width:240, height : 240, alignSelf : "center", marginTop : 100}}></Image>
                <Button title="Réaliser un nouvel inventaire" icon={<Icon name="arrow-right" color="#fff" size={18}></Icon>}
                 iconRight titleStyle={styles.buttonText} buttonStyle={[styles.button, {marginTop : 100}]}
                 onPress={()=> {this.props.navigation.navigate('Stock')}}></Button>
                
            </View>
        );
    }



}

