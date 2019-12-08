import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import styles from '../assets/styles/styles';
import Header from '../components/Header';
import ActionSheet from 'react-native-actionsheet';
import { Button } from 'react-native-elements';
import KitService from '../services/KitService';

interface NavigationParams {
    kits
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}





export class InventaireSuccess extends React.Component<Props> {
    animation;
    ActionSheet
    kits;

    option = [
        'Export serveur',
        'Export XML',
        'Export JSON',
        'Annuler'
    ]

    componentDidMount() {
        this.animation.play()
        this.kits = this.props.navigation.getParam("kits");
    }


    showActionSheet = () => {
        //To show the Bottom ActionSheet
        this.ActionSheet.show();
    };

    switchIndex(index) {
        switch (index) {
            case 0:
                console.log(index)
                alert('todo')
                break;
            case 1:
                console.log('test');
                KitService.exportToXML(this.kits);
                break;
        }
    }



    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#f1f3f6', height: "100%" }}>
                <StatusBar backgroundColor='#f1f3f6' barStyle='dark-content'></StatusBar>
                <Header title="Inventaire terminé !"></Header>
                <LottieView source={require('../assets/animations/page-success.json')} style={{ width: 600, alignSelf: "center", marginTop: 50 }} loop={false} ref={animation => {
                    this.animation = animation;
                }} />
                <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={'Exporter vers'}
                    options={this.option}
                    cancelButtonIndex={3}
                    onPress={index => this.switchIndex(index)}
                />
                <Button title="Exporter" icon={<Icon name="share" color="#fff" size={18}></Icon>}
                    iconRight titleStyle={styles.buttonText} buttonStyle={[styles.button, { marginTop: 70 }]}
                    onPress={() => this.showActionSheet()}></Button>

                <Button title="Retour vers l'accueil" icon={<Icon name="arrow-right" color="#000" size={18}></Icon>}
                    iconRight titleStyle={[styles.buttonText, { color: '#000' }]} buttonStyle={[styles.button, { marginTop: 20, backgroundColor: '#fff' }]}
                    onPress={() => this.showActionSheet()}></Button>
            </View>
        );
    }


}

const styles2 = StyleSheet.create({
    validate: {
        alignSelf: "flex-end",
        marginTop: 30,
        marginRight: 30,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 7,
        elevation: 3
    },
    iconButton: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 20,
        elevation: 3
    }
})