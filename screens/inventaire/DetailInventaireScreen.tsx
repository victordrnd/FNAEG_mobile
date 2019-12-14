import * as React from 'react';
import { StyleSheet, View, StatusBar, Dimensions, FlatList, Text, ScrollView } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';
import styles from '../../assets/styles/styles';
import Header from '../../components/Header';
import { BarChart } from "react-native-chart-kit";
import { List, Badge } from 'react-native-paper';
import KitService from '../../services/KitService';

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
        inventaire: null
    }
    data;
    componentDidMount() {
        this.inventaire = this.props.navigation.getParam("inventaire");
        this.setState({ inventaire: this.props.navigation.getParam("inventaire") });
        this.setData();
    }


    render() {
        const { inventaire } = this.state;
        if (!inventaire) {
            return null
        }
        return (
            <View style={{ backgroundColor: '#f1f3f6', height: "100%" }}>
                <StatusBar backgroundColor='#f1f3f6' barStyle='dark-content'></StatusBar>
                <Header title={`Inventaire #${inventaire.id}`}
                    left={<Icon name="chevron-left" size={24} style={{ margin: 30 }}
                        onPress={() => this.props.navigation.goBack()}></Icon>}
                    right={<Icon name="share" size={20}
                        style={{ marginRight: 30, marginTop: 30, alignSelf: 'flex-end' }}
                    onPress={() => KitService.exportToXML(this.inventaire.enregistrements)}>
                    
                     </Icon>}>

                </Header>

                <BarChart
                    data={this.data}
                    width={Dimensions.get('window').width - 20}
                    height={220}
                    chartConfig={chartConfig}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        alignSelf: 'center',
                        marginTop: 130
                    }}
                />
                <Text style={[styles.buttonText, { color: "#000", marginLeft: 10 }]}>Réalisé :</Text>
                <FlatList
                    data={this.inventaire.enregistrements}
                    keyExtractor={(item: any) => item.id}
                    legacyImplementation={true}
                    renderItem={this._renderItem.bind(this)}
                    style={{ marginBottom: 0, paddingHorizontal: 15 }}>
                </FlatList>
            </View>
        );
    }


    _renderItem({ item, index }) {
        return (

            <List.Item
                title={`Kit #${item.CodeKit}`}
                description={``}
                left={() => <Icon name="package" size={15} style={{ marginVertical: 15 }}></Icon>}
                right={() => <>

                    <Text style={{ marginVertical: 12 }}>Qté : </Text>

                    <Badge visible style={{ marginVertical: 12, backgroundColor: "#d8a864", color: "#fff" }}>{item.Stock}</Badge>
                </>}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.subtitle}
                style={{ marginVertical: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 1 }}>
            </List.Item>
        )
    }


    setData() {
        this.data = {
            labels: this.inventaire.enregistrements.map(rec => rec.CodeKit),
            datasets: [
                {
                    data: this.inventaire.enregistrements.map(rec => rec.Stock),
                },
            ],
        }
    }
}

const chartConfig = {
    backgroundColor: '#d8a864',
    backgroundGradientFrom: '#d8a864',
    backgroundGradientTo: '#d8a864',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
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