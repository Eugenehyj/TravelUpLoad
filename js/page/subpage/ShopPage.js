/**
 * 未登录页面
 */


import React from "react";
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import OneHeader from '../../group/element/OneHeader';

export default class shop extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <OneHeader
                    title="商城"
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}
