/**
 * 收起展开与常规条块信息显示
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
import OnePhotoBtn from './element/OnePhotoBtn';
import Storage from "../util/Storage";

export default class TelescopicBtn extends Component{
    constructor(props){
        super(props);
        this.state = {
            state:0,
            subheight:70,
            subtitle:this.props.subtitle,
            icon:this.props.subimg,
        };
    }
    customPressHandle = () => {
        //自定义方法，使用属性来定义
        if(this.props.Telescopic == true){
            //alert("状态"+this.state.state);
            //this.state.state=this.state.state == "0"? 1:0;
            if(this.state.state == "0"){
                this.setState({
                    state:1,
                    subheight:140,
                    subtitle:"收起",
                    icon:'up',
                });
            }
            else{
                this.setState({
                    state:0,
                    subheight:70,
                    subtitle:"更多",
                    icon:'down'
                });
            }
        }
        if(this.props.isPage == true){
            Storage.isLogin(this.props.navigation,this.props.page)
        }
    };
    render(){
        return (
            <View>

                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'white'}]}
                    onPress={this.customPressHandle}
                >

                    <View style={[styles.imageContent,{backgroundColor:this.props.color}]}>
                        <Image
                            style={styles.images}
                            source={{uri:this.props.img}}
                        />
                    </View>
                    <View style={{flex:10,}}>
                        <Text style={styles.buttonTxt}>{this.props.name}</Text>
                    </View>
                    <View style={{flex:6,}}>
                        <Text style={{textAlign:'right',}}>
                            {this.state.subtitle}
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={styles.subimages}
                            source={{uri:this.state.icon}}
                        />
                    </View>
                </TouchableOpacity>
                {this.props.Telescopic == true ?
                    <View style={[styles.subTool,{height:this.state.subheight,}]}>
                        <View style={styles.oneItem}>
                            <OnePhotoBtn
                                name="离线包管理"
                                img="download"
                                isPage={true}
                                navigation={this.props.navigation}
                                page="download"
                            />
                            <OnePhotoBtn
                                name="我的收藏"
                                img="collection"
                                isPage={true}
                                navigation={this.props.navigation}
                                page="collection"
                            />
                            <OnePhotoBtn
                                name="我的足迹"
                                img="travel"
                                isPage={true}
                                navigation={this.props.navigation}
                                page="mystep"
                            />
                            <OnePhotoBtn
                                name="关注驴友"
                                img="notify"
                                isPage={true}
                                navigation={this.props.navigation}
                                page="message"
                            />
                        </View>
                        <View style={styles.oneItem}>
                            <OnePhotoBtn
                                name="我的财富"
                                img="pocket"
                                isPage={true}
                                navigation={this.props.navigation}
                                page="mypocket"
                            />
                            <OnePhotoBtn
                                name="建议反馈"
                                img="advice"
                                isPage={true}
                                navigation={this.props.navigation}
                                page="advice"
                            />
                            <OnePhotoBtn
                                name="使用帮助"
                                img="help"
                                isPage={true}
                                navigation={this.props.navigation}
                                page="help"
                            />
                            <OnePhotoBtn
                                name="联系客服"
                                img="server"
                                navigation={this.props.navigation}
                            />
                        </View>
                    </View>
                :null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        height:50,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:.3,
        borderColor:'#e0e0e0',
    },
    buttonTxt:{
        color:'black',
        marginLeft:5,
    },
    imageContent:{
        backgroundColor:'#f7b851',
        borderRadius:6,
        height:20,
        width:20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
    },
    images:{
        height:15,
        width:15,
    },
    subimages:{
        height:20,
        width:20,
        marginRight:5,
        marginTop:1,
    },
    subTool:{
        backgroundColor:'white',
        borderBottomWidth:.3,
        borderColor:'#e0e0e0',
        overflow:'hidden',
    },
    oneItem:{
        flexDirection:'row',
        flexWrap:'wrap',
    }
});

