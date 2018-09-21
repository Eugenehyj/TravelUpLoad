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

export default class Login extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Text style={{marginTop:100,}}>
                        返回
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}