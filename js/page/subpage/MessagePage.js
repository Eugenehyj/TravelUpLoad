/**
 * 关注页面
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
    FlatList, AsyncStorage
} from 'react-native';
import OneHeader from '../../group/element/OneHeader';
import Constants from '../../util/Constants';
import ForOnePress from '../../util/CommonUtil';

export default class message extends React.Component{
    constructor(props){
        super(props);
        this._getSave('NameId');
        this.state={
            allMessage:''
        }
    }

    _Message = (NameId)=>{
        fetch(Constants.CONNECTURL+'followPeopleList/selectMyFollowUserList?loginUserId='+NameId)
            .then((response_) => response_.json())
            .then((responseJson) => {
                console.log(responseJson);
                //alert(responseJson_.user.nicName);
                this.setState({
                    allMessage:responseJson,
                });
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    };

    _getSave=(key)=> {
        try {
            AsyncStorage.getItem(
                key,
                (error,result)=>{
                    if (error){
                        console.log('取值失败:'+error);
                    }else{
                        console.log('取值成功:'+result);
                        if(result!=null){
                            this._Message(result);
                        }
                    }
                }
            )
        }catch(error) {
            alert('失败' + error);
        }
    };

    _renderItem = (item) =>{
        const {navigate} = this.props.navigation;
        return(
            <TouchableOpacity
                onPress={()=>ForOnePress(navigate('DetailMessage',{user:'DetailMessage',userId:item.item.Id}))}
                style={{height:60,backgroundColor:'#fff',justifyContent:'center',borderTopWidth:.3,borderColor:'#b0b0b0'}}
            >
                <View style={{flexDirection:'row',alignItems:'center',marginRight:10,marginLeft:10}}>
                    <Image
                        style={styles.image}
                        source={{uri:'zan'}}
                    />
                    <Text style={{marginLeft:10,fontSize:18}}>{item.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render(){
        var data = [];
        for (var i = 0; i < this.state.allMessage.length; i++) {
            data.push({key: i,image:''+i,name:this.state.allMessage.hostUserName,Id:this.state.allMessage.hostUserId});
        }
        return(
            <View>
                <View>
                    <OneHeader
                        title="关注驴友"
                        navigation={this.props.navigation}
                    />
                </View>
                <View style={{marginTop:70}}>
                    <FlatList
                        renderItem={this._renderItem}
                        data = {data}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
   image:{
       height:50,
       width:50,
       tintColor:'#000'
   },
});