import React, { PureComponent, Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import styles from '../assets/styles/styles';





interface Props {
    title: string
    right? : React.ReactNode
    left? : React.ReactNode
}



export default class Header extends PureComponent<Props> {
    state = {
    }



    componentDidMount() {
    }




    render() {
        const {right, left} = this.props
        return (

            <View>

                <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            {left}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image source={require("../assets/logo-dark.png")} style={{ width: 100, height: 100, alignSelf: "center" }}></Image>

                        </View>

                        <View style={{ flex: 1 }}>
                                {right}
                        </View>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.titleDark, { textAlign: "center", marginTop: 100 }]}>{this.props.title}</Text>
                    </View>
                </View>
            </View>
        )
    }
}



