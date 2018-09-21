/**
 * 游记列表页面
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

export default class TravelList extends React.Component{
    constructor(props){
        super(props);
        this._Message();
        this.state={
            allMessage:''
        }
    };

    _Message = ()=>{
        fetch(Constants.CONNECTURL+'Note/getNote')
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

    _renderItem = (item) =>{
        const {navigate} = this.props.navigation;
        return (
            <View style={{marginLeft:15,marginRight:15,marginTop:10}}>
                <TouchableOpacity
                    onPress={() => ForOnePress(()=>navigate('TravelDetail',{user:'TravelDetail',travelId :item.item.travelId}))}
                >
                    <View>
                        <View style={{marginBottom:5}}>
                            <Text style={{fontSize:20,color:'#070707'}}>{item.item.title}</Text>
                        </View>
                        <View style={{marginBottom:5}}>
                            <Text style={{fontSize:16,color:'#070707'}}>{item.item.touristAttraction}</Text>
                        </View>
                        <View style={{flexDirection:'row',borderBottomWidth:.3,borderColor:'#909090',paddingBottom:7}}>
                            <View style={{flex:1}}>
                                <Image
                                    style={{width:20,height:20}}
                                    source={{uri:'mine'}}
                                />
                                <Text  style={{fontSize:14}}>{item.item.user}</Text>
                            </View>
                            <View style={{justifyContent:'flex-end'}}>
                                <Text  style={{fontSize:14}}>{item.item.date}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    render(){
        var data = [];
        for (var i = 0; i < this.state.allMessage.length; i++) {
            data.push({key: i, title:this.state.allMessage[i].title,user:'虎虎虎'+i,date:this.state.allMessage[i].touristDay,touristAttraction:'欢乐谷',travelId:this.state.allMessage[i].travelNoteId});
        }
        return(
            <View style={{backgroundColor:'#fff'}}>
                <OneHeader
                    title="热门游记"
                    navigation={this.props.navigation}
                />
                <View style={{marginTop:70}}>
                    <FlatList
                        renderItem={this._renderItem}
                        data = {data}
                    />
                </View>
            </View>
        );
    }
};

const Styles = StyleSheet.create({

});