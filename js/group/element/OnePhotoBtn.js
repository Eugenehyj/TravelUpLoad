/**
 * 单一图片按钮
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import Storage from "../../util/Storage";

export default class OnePhotoBtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            state:1,
            screenWidth:Dimensions.get('window').width/4,
        };
    }
    customPressHandle = () => {
        //自定义方法，使用属性来定义
        if(this.props.isPage==true){
            Storage.isLogin(this.props.navigation,this.props.page);
        }
        else{
            alert("按钮"+this.state.state+"height:"+Dimensions.get('window').height);
        }
    };
    render(){
        return (
            <View>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'white',width:this.state.screenWidth}]}
                    onPress={this.customPressHandle}
                >
                    <Image
                        style={styles.images}
                        source={{uri:this.props.img}}
                    />
                    <Text style={styles.buttonTxt}>{this.props.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button:{
        height:70,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonTxt:{
        marginTop:5,
        textAlign:'center',
        color:'black'
    },
    images:{
      height:30,
      width:30,
    },
});
