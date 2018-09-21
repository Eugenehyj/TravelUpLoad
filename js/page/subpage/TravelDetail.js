/**
 * 游记详细页面
 */

import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    FlatList,
    StatusBar,
    ScrollView, Dimensions,
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import OneHeader from '../../group/element/OneHeader';
import Constants from "../../util/Constants";
import ForOnePress from "../../util/CommonUtil";

export default class TravelDetail extends React.Component{
    constructor(props){
        super(props);
        this._Message();
        this.state={
            allMessage:'',
            contentMes:''
        }
    };

    _Message = ()=>{
        fetch(Constants.CONNECTURL+'Note/getNoteByNoteId?id='+this.props.navigation.state.travelId)
            .then((response_) => response_.json())
            .then((responseJson) => {
                responseJson = responseJson.extend;
                console.log(responseJson);
                //alert(responseJson_.user.nicName);
                this.setState({
                    allMessage:responseJson.result,
                    contentMes:responseJson.result.content
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
            <View>
                {
                    item.item.key==0?
                        <View style={{backgroundColor:'#f4f5f7',paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>
                            <Text style={{fontSize:20}}>{item.item.title}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{flex:1,fontSize:18}}>tourist</Text>
                                <Text>{item.item.days}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{flex:1}}>{item.item.spendMoney}</Text>
                                <Text>Days</Text>
                            </View>
                        </View>:
                        <View style={{backgroundColor:'#f4f5f7',marginTop:5,paddingRight:10,paddingLeft:10,paddingTop:5,paddingBottom:5}}>
                            <Text style={{fontSize:17}}>title</Text>
                            <Text style={{fontSize:15}}>{item.item.content}</Text>
                        </View>
                }
            </View>
        );
    };

    render(){
        var data = [];
        for (var i = 0; i < this.state.allMessage.length; i++) {
            data.push({key: i,title:this.state.allMessage.title,content:this.state.contentMes.travelNoteContent,spendMoney:this.state.allMessage.spendMoney,days:this.state.allMessage.touristDay});
        }
        return(
          <View style={{height:'100%'}}>
              <View style={{height:70}}>
                  <OneHeader
                      title="游记详情"
                      navigation={this.props.navigation}
                  />
              </View>
              <View style={{paddingBottom:110}}>
                  <FlatList
                      renderItem={this._renderItem}
                      data = {data}
                  />
              </View>
              <View style={{backgroundColor:'#f4f5f7',position:'absolute',width:'100%',bottom:0}}>
                  <View style={{flexDirection:'row',borderTopWidth:.5,height:40}}>
                      <View style={{flex:1,flexDirection:'row',marginLeft:10,alignItems:'center'}}>
                          <View style={{flex:1,flexDirection:'row'}}>
                              <Image
                                  style={{height:20,width:20,tintColor:'#909090',marginRight:5,}}
                                  source={{uri:'mine'}}
                              />
                              <Text>
                                  六个核
                              </Text>
                          </View>
                          <View style={{flex:1,flexDirection:'row'}}>
                              <Image
                                  style={{height:20,width:20,tintColor:'#909090',marginRight:5,}}
                                  source={{uri:'zan'}}
                              />
                              <Text>
                                  关注
                              </Text>
                          </View>
                      </View>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',marginRight:10,alignItems:'center'}}>
                          <Text style={{marginRight:15}}>
                              收藏
                          </Text>
                          <View style={{flexDirection:'row'}}>
                              <Image
                                  style={{height:20,width:20,tintColor:'#909090',marginRight:5,}}
                                  source={{uri:'commet'}}
                              />
                              <Text>
                                  评论
                              </Text>
                          </View>
                      </View>
                  </View>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({

});