import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, View, Text } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
interface NavigationParams {
    my_param: string; 
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export class AuthLoadingScreen extends Component<Props> {

    state = {
    };
    animation;

    
    componentDidMount() {
        this.animation.play(60);
        setTimeout(() =>{this.checkIntro()}, 2500)
    }


    checkIntro(){
        AsyncStorage.getItem('@introDone').then(res => {
            res = JSON.parse(res);
            if(!res){
              this.props.navigation.navigate('IntroScreen', {});
            }else{
                this.props.navigation.navigate('Home') 
            }
          })
    }




    render() {
        return (    
            <>
                <StatusBar backgroundColor='#d8a864' barStyle='light-content'></StatusBar>
                <View style={{ backgroundColor: "#d8a864", height: "100%", width: "100%" }}>
                    <Image source={require('../assets/logo.png')} style={{ alignSelf: "center", marginTop: 150, height: 200, width: 200 }}></Image>
                    <LottieView source={require('../assets/animations/dna2.json')} style={{ marginTop: 100, width:200, alignSelf : "center" }} autoPlay loop ref={animation => {
                        this.animation = animation;
                    }} />
                    <Text style={{textAlign : "center", color:"#fff", fontFamily : "ProductSansRegular", marginTop : 100}}>Chargement...</Text>
                </View>
            </>
        )
    }

}


