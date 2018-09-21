import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    StatusBar
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';

export default class Tools extends React.Component {
    static navigationOptions = {
        tabBarLabel: '工具',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                source={{uri:'tools'}}
                style={{ width: 26, height: 26, tintColor: tintColor }}
            />
        )
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topItem}>
                    <Text style={{fontSize:20,marginBottom:10,fontWeight:'500',color:'#6d400f'}}>工具</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topItem:{
        backgroundColor:'#f5ce4d',
        alignItems:'center',
        height:70,
        justifyContent:'flex-end',
    },
});
