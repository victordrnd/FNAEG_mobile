import * as React from 'react';
import { Text, Button } from 'react-native-elements';
import { StatusBar, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import LottieView from 'lottie-react-native';
import styles from '../assets/styles/styles';
interface NavigationParams {
    kit
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}



const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
};


export class CompteurScreen extends React.Component<Props> {
    animation
    componentDidMount() {
        this.setState({ kit : this.props.navigation.getParam("kit"), count : this.props.navigation.getParam("kit").Stock});
    }
    state = {
        count: 0,
        kit : {
            CodeKit : null,
            Stock : 0
        }
    }



    increase = () => {
        this.animation.play(20, 60);
        ReactNativeHapticFeedback.trigger("selection", options);
        this.setState({ count: this.state.count += 1 });
    }

    _onPress = () => {
        this.state.kit.Stock = this.state.count;
        this.props.navigation.state.params.onValidate(this.state.kit);
        this.props.navigation.goBack();
    }

    render() {
        const { navigate } = this.props.navigation;
        const {kit} = this.state;
        return (
            <View>

                <StatusBar backgroundColor='#fff' barStyle='dark-content'></StatusBar>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>

                        </View>
                        <View style={{ flex: 1 }}>
                            <Image source={require("../assets/logo-dark.png")} style={{ width: 100, height: 100, alignSelf: "center" }}></Image>

                        </View>
                        <View style={{ flex: 1 }}>

                            <Icon name="check" size={24} color="#000" style={styles2.validate} onPress={()=> this._onPress()}></Icon>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>

                        <Text style={[styles.titleDark, { textAlign: "center", marginTop: 100 }]}>Inventaire du kit</Text>
                        <Text style={[styles.titleDark, { textAlign: "center", fontSize: 25 }]}>
                                {kit.CodeKit}
                            </Text>

                    </View>
                    <View style={{ flex: 1 }}>

                        <TouchableOpacity onPress={() => this.increase()} style={{ marginTop: "45%", width: 600, height: 400, alignSelf: "center" }}>
                            <LottieView source={require('../assets/animations/pulse.json')} style={{ width: 600, alignSelf: "center" }} loop={false} ref={animation => {
                                this.animation = animation;
                            }} />
                        </TouchableOpacity>

                        {/* <Button title={this.state.count.toString()} titleStyle={styles2.bigTitle} buttonStyle={styles2.bigButton} onPress={() => { this.increase() }}></Button> */}

                        <View style={{ width: "100%", alignSelf: "center", marginTop: 0 }}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Icon name="minus" size={24} color="#000" style={[styles2.iconButton, { alignSelf: "flex-end" }]}
                                        onPress={() => {
                                            if (this.state.count - 1 >= 0) {
                                                this.setState({ count: this.state.count -= 1 })
                                            }
                                        }
                                        }></Icon>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: "center", fontSize: 34, marginTop: -6, fontFamily : "ProductSansBold" }}>{this.state.count}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Icon name="plus" size={24} color="#000" style={[styles2.iconButton, { alignSelf: "flex-start" }]}
                                        onPress={() => this.setState({ count: this.state.count += 1 })}></Icon>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }


}
const styles2 = StyleSheet.create({
    bigButton: {
        backgroundColor: "#d8a864",
        height: 350,
        width: 350,
        borderRadius: 250,
        alignSelf: "center",
        marginTop: "45%",
        elevation: 5
    },
    bigTitle: {
        fontSize: 75,
    },
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