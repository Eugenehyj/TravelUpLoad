/**
 *
 */

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView, Dimensions,
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import ForOnePress from "../util/CommonUtil";

export default class top extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View
                style={{}}
            >
                <View
                    style={{height:Dimensions.get('window').height,justifyContent:'center',alignItems:'center'}}
                >
                    <TouchableOpacity
                        onPress={() => {navigate('',{user:''})}}
                        style={{}}
                    >
                        <Text
                            style={{fontSize:16}}
                        >起始页面</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({

});