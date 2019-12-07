import * as React from 'react';
import { Text, Button } from 'react-native-elements';
import { StatusBar, View, StyleSheet, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, FlatList } from 'react-navigation';
import styles from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import KitService from '../services/KitService';
import { List, Badge } from 'react-native-paper';
import NavigationService from '../services/NavigationService';
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
        // KitService.getAllKit((kits) =>{
        //     this.kits = kits;
        // });
        this.state.kits.map(kit => kit.done = false)
    }



    render() {
        const { navigate } = this.props.navigation;
        const { kits } = this.state;
        return (
            <View>

                <StatusBar backgroundColor='#f1f3f6' barStyle='dark-content'></StatusBar>
                <View style={{ flex: 1, flexDirection: "row"}}>
                    <View style={{ flex: 1 }}>

                    </View>
                    <View style={{ flex: 3 }}>

                        <Text style={[styles.titleDark, {marginTop : 35}]}>Inventaire des kits</Text>
                    </View>
                    <View style={{ flex: 1 }}>

                        <Icon name="check" size={24} color="#000" style={styles2.validate} onPress={() => this._onPress()}></Icon>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 15, marginTop :100 }}>

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



    _renderItem({ item, index }) {
        return (

            <List.Item
                title={`Kit #${item.CodeKit}`}
                description={`Durée : 10min`}
                right={() => <Text style={[styles.listText, { marginVertical: 15 }]}>Qté : {item.Stock}</Text>}
                left={() => <Badge visible style={{ marginVertical: 15, backgroundColor: item.done ? "#d8a864" : "#f1f3f6" }}><Icon name="check" color="#fff" /></Badge>}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.subtitle}
                style={{ marginVertical: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 1 }}
                onPress={() => NavigationService.navigate('Compteur', {
                    kit: item,
                    index: index,
                    onValidate: async (kit) => {
                        let kits = this.state.kits;
                        kit.done = true;
                        kits[index] = kit
                        await this.setState({ kits: kits });
                    }
                })}>
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
        padding: 5,
        elevation: 3
    },
    iconButton: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 20,
        elevation: 3
    }
})