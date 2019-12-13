import * as React from 'react';
import { Text, Button } from 'react-native-elements';
import { StatusBar, View, StyleSheet, Image, Alert } from 'react-native';
import { NavigationScreenProp, NavigationState, FlatList } from 'react-navigation';
import styles from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import { List, Badge } from 'react-native-paper';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Header from '../../components/Header'
import Kit from '../../core/models/kit';
import InventaireService from '../../services/InventaireService';
interface NavigationParams {
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export class ListInventaireScreen extends React.Component<Props> {

    state = {
        inventaires: []
    }
    componentDidMount() {
        InventaireService.getAll()
            .then(inventaires => {
                this.setState({ inventaires: inventaires });
            });
    }

    render() {
        const { inventaires } = this.state;
        return (
            <View>

                <StatusBar backgroundColor='#f1f3f6' barStyle='dark-content'></StatusBar>
                <Header title="Historique des inventaires"></Header>
                <View style={{ paddingHorizontal: 15, marginTop: 140 }}>

                    <FlatList
                        data={inventaires}
                        keyExtractor={(item: any) => item.id}
                        legacyImplementation={true}
                        renderItem={this._renderItem.bind(this)}
                        style={{ marginBottom: 50 }}>
                    </FlatList>
                </View>
            </View>
        );
    }



    _renderItem({ item, index }) {
        const _onLongPress = () => {
            ReactNativeHapticFeedback.trigger("selection", {});
            Alert.alert(
                'Avertissement',
                'Voulez vous supprimer cet inventaire',
                [
                    {
                        text: 'Annuler'
                    },
                    {
                        text: "Valider",
                        onPress: () => {
                            InventaireService.delete(item)
                            this.state.inventaires.splice(index, 1);
                            this.setState({ inventaires: this.state.inventaires });
                        }
                    }
                ]
            )
        }
        const _OnPress = () => {
            this.props.navigation.navigate('DetailInventaire', { inventaire: item })
        }
        let date = new Date(item.created_at)
        return (

            <List.Item
                title={`Inventaire #${item.id}`}
                description={`${date.toLocaleDateString()} à ${date.getHours()}h${date.getMinutes()}`}
                right={() => <Text style={[styles.listText, { marginVertical: 15 }]}>Victor</Text>}
                left={() => <Badge visible style={{ marginVertical: 15, backgroundColor: "#d8a864", color: "#fff" }}>{item.enregistrements.length}</Badge>}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.subtitle}
                style={{ marginVertical: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 1 }}
                onPress={_OnPress}
                onLongPress={_onLongPress}>
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