/**
 * 他人信息详细页面
 */


import React from "react";
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    FlatList,
    StatusBar,
    ScrollView,
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import OneHeader from '../../group/element/OneHeader';
import Constants from "../../util/Constants";
import ForOnePress from "../../util/CommonUtil";

export default class DetailMessage extends React.Component {
    constructor(props) {
        super(props);
        this._Message();
        this.state={
            allMessage:''
        }
    };

    _Message = ()=>{
        fetch(Constants.CONNECTURL+'UserInfo/getOneUserById?userId='+this.props.navigation.state.userId)
            .then((response_) => response_.json())
            .then((responseJson) => {
                responseJson = responseJson.extend;
                console.log(responseJson);
                //alert(responseJson_.user.nicName);
                this.setState({
                    allMessage:responseJson.result,
                });
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    };

    render(){
        return(
            <View>
                <View>
                    <OneHeader
                        title=""
                        navigation={this.props.navigation}
                    />
                </View>
                <View style={{marginTop:60,height:170,backgroundColor:'#f5ce4d',alignItems:'center'}}>
                    <View style={{flex:3}}>
                        <View style={styles.mainCir}>
                            <View style={styles.mainCir_i}>
                                <Image
                                    style={{height: 40, width: 40, marginLeft: 1, marginBottom: 3,}}
                                    source={{uri: 'login'}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{fontSize:16,marginBottom:15}}>{this.state.allMessage.name}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginRight:5}}>{this.state.allMessage.country}</Text>
                            <Text>{this.state.allMessage.city}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.message}>
                        <View style={styles.message_i}>
                            <Text style={{flex:1}}>邮箱</Text>
                            <Text style={[styles.blackColor,{flex:3}]}>{this.state.allMessage.email}</Text>
                        </View>
                    </View>
                    <View style={styles.message}>
                        <View style={styles.message_i}>
                            <Text style={{flex:1}}>性别</Text>
                            <Text style={[styles.blackColor,{flex:3}]}>{this.state.allMessage.sex}</Text>
                        </View>
                    </View>
                    <View style={styles.message}>
                        <View style={styles.message_i}>
                            <Text style={{flex:1}}>电话</Text>
                            <Text style={[styles.blackColor,{flex:3}]}>{this.state.allMessage.telphone}</Text>
                        </View>
                    </View>
                    <View style={styles.message}>
                        <View style={styles.message_i}>
                            <Text style={{flex:1}}>个性签名</Text>
                            <Text style={[styles.blackColor,{flex:3}]}>世界那么大，我想去看看。</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainCir:{
        height:85,
        width:85,
        borderWidth:.5,
        borderColor:'#ffe39f',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f9d974'
    },
    mainCir_i:{
        height:65,
        width:65,
        borderRadius:50,
        backgroundColor:'#fffef8',
        alignItems:'center',
        justifyContent:'center',
        opacity:.6,
    },
    message:{
        backgroundColor:'#fff',
        height:50,
        borderWidth:.3,
        borderColor:'#e0e0e0',
        justifyContent:'center',
        paddingRight:15,
        paddingLeft:15,
    },
    message_i:{
        flexDirection:'row',
    },
    blackColor:{
        color:'#000',
        fontSize:14
    },
});
