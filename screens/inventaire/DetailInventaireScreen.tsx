import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import styles from '../../assets/styles/styles';
import Header from '../../components/Header';
import { Button } from 'react-native-elements';
import InventaireService from '../../services/InventaireService';

interface NavigationParams {
    inventaire
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}





export class DetailInventaireScreen extends React.Component<Props> {
    animation;
    ActionSheet
    inventaire;

    state = {
        inventaire : null
    }
    componentDidMount() {
        this.setState({inventaire : this.props.navigation.getParam("inventaire")});
    }


    render() {
        const {inventaire} = this.state;
        if(!inventaire){
            return null
        }
        return (
            <View style={{ backgroundColor: '#f1f3f6', height: "100%" }}>
                <StatusBar backgroundColor='#f1f3f6' barStyle='dark-content'></StatusBar>
                <Header title={`Inventaire #${inventaire.id}`}></Header>
                <LottieView source={require('../../assets/animations/page-success.json')} style={{ width: 600, alignSelf: "center", marginTop: 50 }} loop={false} ref={animation => {
                    this.animation = animation;
                }} />
                <Button title="Exporter" icon={<Icon name="share" color="#fff" size={18}></Icon>}
                    iconRight titleStyle={styles.buttonText} buttonStyle={[styles.button, { marginTop: 70 }]}
                    onPress={() => {}}></Button>
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