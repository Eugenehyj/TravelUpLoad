/**
 * 单一圆形按钮
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Image,
} from 'react-native';

import ForOnePress from '../../util/CommonUtil';

export default class Button extends Component{
    constructor(props){
        super(props);
        this.state = {state:1};
    }
    customPressHandle = () => {
        //自定义方法，使用属性来定义
        alert(this.props.nicName?this.props.nicName:null);
    };
    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:this.props.color}]}
                    onPress={()=>{this.props.page?ForOnePress(navigate(this.props.page,{user:this.props.page})):null}}
                >
                    <Image
                        style={{height:30,width:30}}
                        source={{uri:this.props.subicon}}
                    />
                </TouchableOpacity>
                <Text style={styles.buttonTxt}>{this.props.name}</Text>
                {/*<TouchableHighlight
                    style={styles.button}
                    onPress={()=>{alert(1)}}
                >
                    <Text style={styles.buttonTxt}
                    >充值</Text>
                </TouchableHighlight>*/}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        height:100,
        width:80,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        height:45,
        width:45,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonTxt:{
        marginTop:5,
        textAlign:'center',
        color:'black'
    },
});