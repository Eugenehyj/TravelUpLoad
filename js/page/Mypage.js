import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    DeviceEventEmitter,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Alert
} from 'react-native';
import TelescopicBtn from '../group/TelescopicBtn';
import Storage from "../util/Storage";
import ForOnePress from '../util/CommonUtil';
import Spinkit from 'react-native-spinkit';
import Toast, {DURATION} from 'react-native-easy-toast';
import Constants from '../util/Constants';

export default class Mypage extends React.Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                source={{uri:'mine'}}
                style={{ width: 26, height: 26, tintColor: tintColor }}
            />
        )
    };
    constructor(props){
        super(props);
        this._getSave('NameId');
        this.state = {
            state:0,
            itemHeight:585,
            allMessage:'',
            isLoading:true,
        };
    }
    //注册通知
    componentDidMount(){
        DeviceEventEmitter.addListener('ChangeUI',(dic)=>{
            //接收到详情页发送的通知，刷新首页的数据，改变按钮颜色和文字，刷新UI
            if(dic.setCounter=='ok'){
                this._getSave('NameId');
            }else{
                this.refs.toast.close('登陆成功', 500);
                Storage.save('NameId',dic.userId+"");
                //Storage.save('Name',dic.uName.userName);
                this.setState({
                    allMessage:dic,
                });
            }
        });
    }
    changePressHandle = () => {
        //自定义方法，使用属性来定义
        //判断高度，为scrollview设置高度更改state的值
        if(this.state.state == "0"){
            this.setState({
                state:1,
                itemHeight:670,
            });
        }
        else{
            this.setState({
                state:0,
                itemHeight:585,
            });
        }
    };
    _Message = (NameId)=>{
        fetch(Constants.CONNECTURL+'UserInfo/getOneUserById?userId='+NameId)
            .then((response_) => response_.json())
            .then((responseJson) => {
                responseJson = responseJson.extend;
                console.log(responseJson);
                //alert(responseJson_.user.nicName);
                this.setState({
                    allMessage:responseJson.result,
                    isLoading:false,
                });
            })
            .catch((error) => {
                console.error(error);
                alert(error);
                this.setState({isLoading:false,});
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
                        }else{
                            this.setState({isLoading:false})
                        }
                    }
                }
            )
        }catch(error) {
            alert('失败' + error);
        }
    };

    _ToLogout=()=>{
        this.refs.toast.close('注销成功', DURATION.LENGTH_SHORT);
        this.setState({allMessage:''});
        //Storage.deleteSave('Name');
        Storage.deleteSave('NameId');
        //console.log(this.state.allMessage);
        this.confirm;
    };
    render() {
        //const images =this.state.allMessage!=''?this.state.allMessage.userImage.split('&'):'';
        let image = this.state.allMessage!=''?this.state.allMessage.picture:null;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView style={{height:Dimensions.get('window').height<600?this.state.itemHeight:null}}>
                        <View>
                            {/*顶部信息*/}
                            <View style={styles.selfImg}>
                                {/*设置按钮*/}
                                <View style={{alignItems:'center',position:'absolute',top:35,left:15,}}>
                                    <TouchableOpacity
                                        onPress={() => navigate('settingPage',{user:'settingPage'})}
                                    >
                                        <Image
                                            style={[styles.topImg,{}]}
                                            source={{uri:'setting'}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/*按钮*/}
                                <View style={{flex:2,alignItems:'center'}}>
                                    <TouchableOpacity style={styles.subImg}>
                                        <Image
                                            style={[styles.topImg,{}]}
                                            source={{uri:'some'}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/*头像+昵称*/}
                                <View style={{flex:1,alignItems:'center'}}>
                                    <Text style={{fontSize:16,color:'#734104',marginBottom:20,marginTop:10,}}>个人中心</Text>
                                    {
                                        this.state.allMessage == '' ?
                                            <TouchableOpacity
                                                style={{alignItems: 'center'}}
                                                onPress={() => ForOnePress(()=>navigate('Login', {user: 'Login'}))}
                                            >
                                                <View style={styles.mainCir}>
                                                    <View style={styles.mainCir_i}>
                                                        <Image
                                                            style={{height: 40, width: 40, marginLeft: 1, marginBottom: 3,}}
                                                            source={{uri: 'login'}}
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>:
                                            <TouchableOpacity
                                                onPress={()=>ForOnePress(()=>navigate('MyMessagePage', {user: this.state.allMessage}))}
                                            >
                                                <View style={styles.mainCir}>
                                                    <View
                                                        style={styles.hasImage}
                                                    >
                                                        <Image
                                                            style={{height: 65, width: 65, borderRadius:50,}}
                                                            source={{uri: Constants.CONNECTURL+'UserInfo/downloadPicture?picturePath='+image}}
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                    }
                                    {
                                        this.state.allMessage==''?
                                            <TouchableOpacity
                                                onPress={() => ForOnePress(()=>navigate('Login', {user: 'Login'}))}
                                            >
                                                <Text style={{marginTop:20,fontSize:14,color:'#734104'}}>
                                                    登陆/注册
                                                </Text>
                                            </TouchableOpacity>:
                                            <TouchableOpacity
                                                onPress={()=>ForOnePress(()=>navigate('MyMessagePage', {user: this.state.allMessage}))}
                                            >
                                                <Text style={{marginTop:18,fontSize:18,color:'#734104'}}>
                                                    {this.state.allMessage.nicName}
                                                </Text>
                                            </TouchableOpacity>
                                    }


                                </View>
                                <Toast
                                    ref="toast"
                                    style={{backgroundColor:'red'}}
                                    position='top'
                                    positionValue={200}
                                    fadeInDuration={750}
                                    fadeOutDuration={1000}
                                    opacity={0.8}
                                    textStyle={{color:'red'}}
                                />
                                {/*分享按钮*/}
                                <View style={{flex:2,alignItems:'center'}}>
                                    <TouchableOpacity style={styles.subImg}>
                                        <Image
                                            style={[styles.topImg,{}]}
                                            source={{uri:'share'}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/*注销按钮*/}
                                {this.state.allMessage==''?null:
                                    <View style={{alignItems:'center',position:'absolute',top:35,right:15,}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                Alert.alert('注销','确认退出账号？',
                                                    [
                                                        {text:"取消", onPress:this.close},
                                                        {text:"确认", onPress:()=>this._ToLogout()},
                                                    ]
                                                )
                                            }}
                                        >
                                            {/*<Image
                                        style={[styles.topImg,{}]}
                                        source={{uri:'setting'}}
                                    />*/}
                                            <Text style={{color:'#734104',}}>注销</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            {/*个人动态*/}
                            <View style={styles.messageBar}>
                                <View style={[styles.mess,]}>
                                    <TouchableOpacity
                                        style={{alignItems:'center'}}
                                        onPress={() => {Storage.isLogin(this.props.navigation,'message')}}
                                    >
                                        <Text style={styles.mess_i}>0</Text><Text>关注人</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.mess,{borderLeftWidth:.3,borderRightWidth:.3,}]}>
                                    <TouchableOpacity
                                        style={{alignItems:'center'}}
                                        onPress={() => {Storage.isLogin(this.props.navigation,'mycir')}}
                                    >
                                        <Text style={styles.mess_i}>0</Text><Text>我的动态</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.mess,]}>
                                    <TouchableOpacity
                                        style={{alignItems:'center'}}
                                        onPress={() => {Storage.isLogin(this.props.navigation,'mycard')}}
                                    >
                                        <Text style={styles.mess_i}>0</Text><Text>我的卡券</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/*各种控件*/}
                            <View style={{marginTop:10,}}>
                                <TouchableOpacity
                                    onPress={this.changePressHandle}
                                >
                                    <TelescopicBtn
                                        name="常用功能"
                                        subtitle="更多"
                                        img="common"
                                        subimg="down"
                                        color="#f7b851"
                                        Telescopic={true}
                                        navigation={this.props.navigation}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop:10,marginBottom:10}}>
                                <TelescopicBtn
                                    name="商城"
                                    subtitle="兑换"
                                    img="shop"
                                    subimg="way"
                                    color="#ee9c00"
                                    isPage={true}
                                    navigation={this.props.navigation}
                                    page="shop"
                                />
                                <TelescopicBtn
                                    name="我的订单"
                                    subtitle="查看所以订单"
                                    img="pay"
                                    subimg="way"
                                    color="#7b8fc4"
                                    isPage={true}
                                    navigation={this.props.navigation}
                                    page="mypay"
                                />
                            </View>
                        </View>
                    </ScrollView>
                    {this.state.isLoading?
                        <View style={styles.loading}>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f4f5f7',
        height:'100%',
    },
    selfImg:{
        height:235,
        backgroundColor:'#f5ce4d',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    subImg:{
        height:38,
        width:38,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:3,
        borderColor:'#ffd855',
        borderRadius:50,
        backgroundColor:'rgba(0,0,0,.1)',
    },
    topImg:{
        height:25,
        width:25,
    },
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
    hasImage:{
        height: 72,
        width: 72,
        backgroundColor:'#fff',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
    },
    messageBar:{
        height:70,
        backgroundColor:'white',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
    },
    mess:{
        flex:1,
        borderColor:'#e0e0e0',
        borderBottomWidth:.3,
        justifyContent:'center',
        alignItems:'center',
    },
    mess_i:{
        color:'red',
        fontSize:20,
        marginBottom:5,
    },
    loading:{
        position:'absolute',
        height:'200%',
        width:'100%',
        top:70,
        alignItems:'center',
        paddingTop:200,
        backgroundColor:'rgba(0,0,0,0)',
    },
});
