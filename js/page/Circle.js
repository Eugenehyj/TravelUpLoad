import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Dimensions,
    DeviceEventEmitter,
    AsyncStorage,
    Alert,
    RefreshControl
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import OneShareCir from '../group/SingleShareCir';
import Storage from '../util/Storage';
import  ForOnePress from '../util/CommonUtil';
import Spinkit from 'react-native-spinkit';
import Constants from "../util/Constants";

class Circle_main extends React.Component {
    static navigationOptions = {
        tabBarLabel: '驴友圈',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                source={{uri:'travel_1'}}
                style={{ width: 26, height: 26, tintColor: tintColor }}
            />
        )
    };
    constructor(props){
        super(props);
        this._fetchData();
        this.state = {
            state:0,
            allMessage:'',
            isRefreshing:false,
            isLoading:true,
        };
    }
    //注册通知
    componentDidMount(){
        DeviceEventEmitter.addListener('Update',(dic)=>{
            //接收到详情页发送的通知，刷新首页的数据，改变按钮颜色和文字，刷新UI
            if(dic.iOperation=='update'){
                this._fetchData();
            }
        });
    }
    componentWillUnmount(){

    };

    /*_getSave=(key)=> {
        try {
            AsyncStorage.getItem(
                key,
                (error,result)=>{
                    if (error){
                        console.log('取值失败:'+error);
                    }else{
                        console.log('取值成功:'+result);
                        if(result!=null){
                            this._fetchData(result);
                        }
                    }
                }
            )
        }catch(error) {
            alert('失败' + error);
        }
    };*/

    _fetchData = () =>{
        fetch(Constants.CONNECTURL+'instantNote/selectAllInstantNote')
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                this.setState({
                    allMessage: responseJson,
                    isLoading:false,
                })
            })
            .catch((error) => {
                console.error(error);
                alert(error);
                this.setState({
                    isLoading:false,
                })
            });
    };
    _renderItem = (item) => {
        return (
            <View>
                <OneShareCir
                    navigation = {this.props.navigation}
                    allMessage = {item.item.oneMessage}
                    onePic = {item.item.onePic}
                    oneCommet = {item.item.oneCommet}
                />
            </View>
        );
    };
    _onRefresh = () =>{
        this.setState({isRefreshing: true});
        this._fetchData();
        setTimeout(() => {
            this.setState({
                isRefreshing: false,
            });
        }, 500);
    };
    render() {
        var data = [];
        for (var i = this.state.allMessage.length-1; i >=0; i--) {
            data.push({key: i, oneMessage: this.state.allMessage[i],onePic:this.state.allMessage[i].listPicture,oneComment:this.state.allMessage[i].listComment});
        }
        return (
            <View style={styles.container}>
                <View style={styles.topItem}>
                    <Text style={{fontSize:20,marginBottom:10,fontWeight:'500',color:'#6d400f'}}>分享时刻</Text>
                </View>
                <View>
                    <FlatList
                        style={{marginBottom:70,}}
                        renderItem={this._renderItem}
                        data = {data}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                                colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                                progressBackgroundColor="#ffffff"
                            />
                        }
                    >
                    </FlatList>

                </View>
                <View style={styles.shareBtn}>
                    <TouchableOpacity
                        onPress={() => ForOnePress(() => Storage.isLogin(this.props.navigation,'sendShare'))}
                    >
                        <Text style={{color:'#fff'}}>分享</Text>
                    </TouchableOpacity>
                </View>
                {this.state.isLoading?
                    <View style={[styles.loading,{}]}>
                        <Spinkit
                            isVisible={this.state.isLoading}
                            style={{}}
                            size={50}
                            color={'#3b77ff'}
                            type={'Circle'}
                        />
                    </View>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f5f7',
    },
    topItem:{
        backgroundColor:'#f5ce4d',
        alignItems:'center',
        height:70,
        justifyContent:'flex-end',
    },
    shareBtn:{
        position:'absolute',
        bottom:20,
        right:20,
        backgroundColor:'rgba(0,0,0,.8)',
        width:45,
        height:45,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        elevation: 15,
        shadowOffset: {width: 10, height: 10},
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    loading:{
        position:'absolute',
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0)',
    },
});


export default Circle_main;