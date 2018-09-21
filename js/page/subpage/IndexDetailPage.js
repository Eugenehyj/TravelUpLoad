/**
 * 个人信息的建议
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
    ScrollView, Dimensions,
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import OneHeader from '../../group/element/OneHeader';
import Spinkit from 'react-native-spinkit';
import Contants from '../../util/Constants';

export default class indexdetail extends React.Component{
    constructor(props){
        super(props);
        this._fetchData();
        this.state = {
            state:0,
            screenWidth:Dimensions.get('window').width,
            bottomDis:Dimensions.get('window').width/5,
            bottomBtr:Dimensions.get('window').width-Dimensions.get('window').width/5,
            oneBtnS:Dimensions.get('window').width/5,
            allMessage:'',
            isLoading:true,
        };
    }
    _fetchData = () =>{
        const { params } = this.props.navigation.state;
        fetch(Contants.CONNECTURL+'Attraction/getAttractionById?attractionID='+params.indexId)
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson = responseJson.extend;
                console.log(responseJson);
                this.setState({
                    allMessage: responseJson.extend,
                    isLoading:false,
                })
            })
            .catch((error) => {
                alert(error);
                this.setState({
                    isLoading:false,
                });
                console.error(error);
            });
    };
    render(){
        return(
            <View>
                <View style={{backgroundColor:'#515556',height:'100%'}}>
                    <OneHeader
                        title="优记"
                        navigation={this.props.navigation}
                    />
                    <View style={styles.subMessage}>
                        <View style={styles.subMain}>
                            <View style={{flexDirection:'row',margin:10,}}>
                                {/*图片*/}
                                <View>
                                    <Image
                                        style={{height:120,width:120,borderRadius:100,}}
                                        source={{uri:Contants.CONNECTURL+'Attraction/downloadPicture?picturePath='+this.state.allMessage.picture}}
                                    />
                                </View>
                                {/*文字*/}
                                <View style={{width:Dimensions.get('window').width-180,marginLeft:10,justifyContent:'space-around'}}>
                                    <View><Text>{this.state.allMessage.name}</Text></View>
                                    <View><Text style={{fontSize:12}}>{this.state.allMessage.description}</Text></View>
                                    <View style={{flexDirection:'row',}}>
                                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                            <View style={{height:25,width:25,borderWidth:.3,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                                                <Image
                                                style={{height:20,width:20,borderRadius:50,}}
                                                source={{uri:'part'}}
                                                />
                                            </View>
                                            <Text>语言</Text>
                                        </View>
                                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                            <View style={{height:25,width:25,borderWidth:.3,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                                                <Image
                                                    style={{height:20,width:20,borderRadius:50,}}
                                                    source={{uri:'part'}}
                                                />
                                            </View>
                                            <Text>下载</Text>
                                        </View>
                                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                            <View style={{height:25,width:25,borderWidth:.3,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                                                <Image
                                                    style={{height:20,width:20,borderRadius:50,}}
                                                    source={{uri:'part'}}
                                                />
                                            </View>
                                            <Text>自动</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            {/*下半部分*/}
                            <View style={{marginBottom:10,}}>
                                <View style={styles.nextPartText}>
                                    <Text>景区地址:</Text>
                                    <Text style={{marginLeft:20}}>{this.state.allMessage.location}</Text>
                                </View>
                                <View style={styles.nextPartText}>
                                    <Text>开放时间:</Text>
                                    <Text style={{marginLeft:20}}>{this.state.allMessage.openTime}</Text>
                                </View>
                                <View style={styles.nextPartBtn}>
                                    <View style={{marginBottom:10,}}>
                                        <Text style={{fontSize:10}}>您尚未激活该景区,无法获得完整体验,请问是否立即激活?</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{marginRight:20,borderWidth:.3,borderRadius:5,padding:5,}}>
                                            <Text style={{fontSize:18,}}>免费试听</Text>
                                        </View>
                                        <View style={{marginLeft:20,borderWidth:.3,borderRadius:5,padding:5,}}>
                                            <Text style={{fontSize:18,}}>授权购买</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{height:360,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:26,}}>测试内容</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <ScrollView
                            style={[{height:50,width:this.state.bottomBtr,backgroundColor:'#fff'}]}
                            horizontal={true}
                        >
                            <View style={[{width:this.state.oneBtnS},styles.oneBtn]}>
                                <Image
                                    style={styles.bottomImg}
                                    source={{uri:'location'}}
                                />
                                <Text style={styles.bottomText}>景点</Text>
                            </View>
                            <View style={[{width:this.state.oneBtnS,},styles.oneBtn]}>
                                <Image
                                    style={styles.bottomImg}
                                    source={{uri:'location'}}
                                />
                                <Text style={styles.bottomText}>路线</Text>
                            </View>
                            <View style={[{width:this.state.oneBtnS,},styles.oneBtn]}>
                                <Image
                                    style={styles.bottomImg}
                                    source={{uri:'location'}}
                                />
                                <Text style={styles.bottomText}>厕所</Text>
                            </View>
                            <View style={[{width:this.state.oneBtnS,},styles.oneBtn]}>
                                <Image
                                    style={styles.bottomImg}
                                    source={{uri:'location'}}
                                />
                                <Text style={styles.bottomText}>美食</Text>
                            </View>
                            <View style={[{width:this.state.oneBtnS,},styles.oneBtn]}>
                                <Image
                                    style={styles.bottomImg}
                                    source={{uri:'location'}}
                                />
                                <Text style={styles.bottomText}>出入口</Text>
                            </View>
                            <View style={[{width:this.state.oneBtnS,},styles.oneBtn]}>
                                <Image
                                    style={styles.bottomImg}
                                    source={{uri:'location'}}
                                />
                                <Text style={styles.bottomText}>住宿</Text>
                            </View>
                        </ScrollView>
                        <View style={{height:50,width:this.state.bottomDis,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                            <View style={{borderLeftWidth:0.3,borderColor:'#e8eae9'}}>
                                <Image
                                    style={{height:30,width:30,marginLeft:18,}}
                                    source={{uri:'up'}}
                                />
                            </View>
                        </View>
                    </View>
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

const styles= StyleSheet.create({
    subMessage:{
        position:'absolute',
        width:'100%',
        //backgroundColor:'#090909',
        top:70,
        zIndex:9,
    },
    subMain:{
        backgroundColor:'#fff',
        margin:10,
        marginTop:20,
        borderRadius:10,
    },
    oneBtn:{
        justifyContent:'center',
        alignItems:'center',
        height:50,
    },
    bottomText:{
        fontSize:10,
        color:'#555555',
    },
    bottomImg:{
        height:22,
        width:22,
        tintColor:'#a5b0b6',
    },
    nextPartText:{
        borderTopWidth:.3,
        marginLeft:10,
        marginRight:10,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        borderStyle:'dotted',
        borderColor:'#f0f0f0',
    },
    nextPartBtn:{
        borderTopWidth:.3,
        marginLeft:10,
        marginRight:10,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        borderStyle:'dotted',
        borderColor:'#f0f0f0',
    },
    loading:{
        position:'absolute',
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0)',
        zIndex:20,
        top:70,
    },
});