import * as React from 'react';
import { Text, Button } from 'react-native-elements';
import { StatusBar, View, StyleSheet, Image, Alert } from 'react-native';
import { NavigationScreenProp, NavigationState, FlatList } from 'react-navigation';
import styles from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import KitService from '../services/KitService';
import { List, Badge } from 'react-native-paper';
import NavigationService from '../services/NavigationService';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Header from '../components/Header'
import Kit from '../core/models/kit';
interface NavigationParams {
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export class ListKitScreen extends React.Component<Props> {

    state = {
        kits: [
            {
                CodeKit: "K001",
                Stock: 1,

            },
            {
                CodeKit: "K002",
                Stock: 0,
            },
            {
                CodeKit: "K003",
                Stock: 5,
            },
            {
                CodeKit: "K004",
                Stock: 3,
            },
            {
                CodeKit: "K005",
                Stock: 1,
            }
        ]
    }
    componentDidMount() {
        // KitService.getAllKit((kits : Kit) =>{
        //     this.kits = kits;
        // });
        this.state.kits.map((kit : Kit) => kit.done = false)
    }


    _onPress(){
        const notDone = this.state.kits.find((el : Kit) => !el.done);
        const save = () => this.props.navigation.navigate('InventaireSuccess', {kits : this.state.kits});
        if(notDone){
            Alert.alert(
                'Avertissement',
                "Certains kits n'ont pas été comptés, souhaitez vous tout de même continuer ?",
                [
                    {
                        text : "Cancel"
                    },
                    {
                        text : "Confirmer",
                        onPress : () => {
                            save()
                        }
                    }
                ]
            )
        }else{
            save();
        }
    }

    render() {
        const { kits } = this.state;
        return (
            <View>

                <StatusBar backgroundColor='#f1f3f6' barStyle='dark-content'></StatusBar>
                <Header
                title="Inventaire des kits"
                right={<Icon name="save" size={20} color="#000" style={styles2.validate} onPress={() => this._onPress()}></Icon>}></Header>
                <View style={{ paddingHorizontal: 15, marginTop: 140 }}>

                    <FlatList
                        data={kits}
                        keyExtractor={(item: any) => item.CodeKit}
                        legacyImplementation={true}
                        renderItem={this._renderItem.bind(this)}>

                    </FlatList>
                </View>
            </View>
        );
    }



    _renderItem( {item, index} ) {
        const _onPress = () => {
            NavigationService.navigate('Compteur', {
                kit: item,
                index: index,
                onValidate: async (kit) => {
                    let kits : Array<Kit> = this.state.kits;
                    kit.done = true;
                    kits[index] = kit
                    await this.setState({ kits: kits });
                }
            })
        }

        const _onLongPress = () => {
            ReactNativeHapticFeedback.trigger("selection", {});
            Alert.alert(
                'Avertissement',
                'Voulez vous remettre à 0 les stocks de ce kit ?',
                [
                    {
                        text: 'Annuler'
                    },
                    {
                        text: "Valider",
                        onPress: async () => {
                            let kits : Array<Kit> = this.state.kits;
                            item.Stock = 0;
                            kits[index] = item
                            await this.setState({ kits: kits });
                        }
                    }
                ]
            )
        }
        return (

            <List.Item
                title={`Kit #${item.CodeKit}`}
                description={`Durée : 10min`}
                right={() => <Text style={[styles.listText, { marginVertical: 15 }]}>Qté : {item.Stock}</Text>}
                left={() => <Badge visible style={{ marginVertical: 15, backgroundColor: item.done ? "#d8a864" : "#f1f3f6" }}><Icon name="check" color="#fff" /></Badge>}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.subtitle}
                style={{ marginVertical: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 1 }}
                onPress={() => _onPress()}
                onLongPress={() => _onLongPress()}>
            </List.Item>
        )
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