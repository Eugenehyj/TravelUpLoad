/**
 * 个人信息的建议
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

export default class advice extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <OneHeader
                    title="建议提交"
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}