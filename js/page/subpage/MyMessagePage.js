/**
 * 个人信息
 */

import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
    TextInput,
    AsyncStorage,
    DeviceEventEmitter,
    Alert,

} from 'react-native';
import OneHeader from '../../group/element/OneHeader';
import ImagePicker_ from "react-native-image-crop-picker";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import moment from "moment/moment";
import ForOnePress from '../../util/CommonUtil';
import Spinkit from 'react-native-spinkit';
import Toast, {DURATION} from 'react-native-easy-toast';
import Constants from '../../util/Constants';

export default class MyMessagePage extends React.Component{
    constructor(props){
        super(props);
        const {params}=this.props.navigation.state;
        this.state = {
            isEdit:false,
            userId:params.userId,
            userName:params.name,
            sex:params.sex,
            country:params.country,
            city:params.city,
            street:params.street,
            //introduction:params.user.introduction,
            allMessage:params,
            images: [{uri:Constants.CONNECTURL+''}],
            isLoading:false,
        };
        this.dataToPost = [];

    }
    _fetchData = () =>{
        console.log(this.state.images);
        let formData = new FormData();
        if(this.state.images == null||this.state.images == ''){
            alert("请选择头像");
            return;
        } else {
            for(var i = 0;i<this.state.images.length;i++){
                var uri = this.state.images[i].uri;
                var index = uri.lastIndexOf("\/");
                var name  = uri.substring(index + 1, uri.length);
                let file = {uri: uri, type: 'multipart/form-data', name: name } ;
                formData.append('file', file);
            }
        }

        //上传图片时，可以在此添加相关其他参数
        formData.append('userId',this.state.userId);
        formData.append('name',this.state.userName);
        formData.append('sex',this.state.sex);
        formData.append('country',this.state.address);
        //formData.append('introduction',this.state.introduction);

        //console.log(formData);
        const REQUEST_URL = Constants.CONNECTURL+'TravelPro/setUser';
        fetch(REQUEST_URL,{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
                'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
            },
            body:formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading:false});
                //console.log(responseJson);
                if(responseJson.result=='001'){
                    DeviceEventEmitter.emit('ChangeUI', {setCounter:'ok'});
                    alert('修改成功');
                    if(responseJson.delete=='000'){
                        console.log('删除不成功');
                    }else if(responseJson.delete=='002'){
                        console.log('文件不存在');
                    }
                }else{
                    alert('修改失败');
                }

            }).catch((error) => {
            this.setState({isLoading:false});
            alert(error);
        });

    };
    _openPhoto=()=>{
        ImagePicker_.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: false,
            compressImageMaxWidth: 480,
            compressImageMaxHeight: 640,
            compressImageQuality: 0.5,
            mediaType: 'photo',
            compressVideoPreset: 'MediumQuality'
        }).then(image => {
            this.dataToPost = [];
            this.dataToPost.push({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime
            });
            this.setState({
                images: this.dataToPost
            });
        }).catch(e => {
            Alert.alert(e.message
                ? e.message
                : e);
        });
    };
    render(){
        return(
            <View>
                <OneHeader
                    title="个人信息"
                    navigation={this.props.navigation}
                />
                <Toast
                    ref="toast"
                    style={{backgroundColor:'rgba(0,0,0,.7)'}}
                    position='center'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#fff'}}
                />
                <View style={{marginTop:80,alignItems:'center',}}>
                    <View style={{width:'100%',backgroundColor:'#fff'}}>
                        {/*头像*/}
                        {this.state.isEdit?
                            <TouchableOpacity
                                onPress={()=>{this._openPhoto()}}
                                style={{height:160,justifyContent:'center',alignItems:'center'}}
                            >
                                <View>
                                    <Image style={{borderRadius:150,width: 150, height: 150, resizeMode: 'cover'}} source={this.state.images} />
                                </View>
                            </TouchableOpacity>:
                            <View style={{height:160,justifyContent:'center',alignItems:'center'}}>
                                <View>
                                    <Image style={{borderRadius:150,width: 150, height: 150, resizeMode: 'cover'}} source={this.state.images} />
                                </View>
                            </View>
                        }
                    </View>

                    <View style={[styles.inputText,{marginTop:15}]}>
                        <View style={{marginLeft:10}}><Text style={{fontSize:18}}>昵称:</Text></View>
                        <TextInput
                            style={{paddingLeft:10,flex:1}}
                            placeholder="昵称"
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    nicName: text
                                })
                            }}
                            value={this.state.nicName}
                            editable={this.state.isEdit}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.inputText}>
                        <View style={{marginLeft:10}}><Text style={{fontSize:18}}>性别:</Text></View>
                        {this.state.isEdit?
                            <RadioGroup
                                selectedIndex={0}
                                onSelect = {(index, value) => {this.setState({sex:value})}}
                                style={{flexDirection:'row',flex:1}}
                            >
                                <RadioButton value={'保密'} >
                                    <Text>保密</Text>
                                </RadioButton>

                                <RadioButton value={'男'}>
                                    <Text>男</Text>
                                </RadioButton>

                                <RadioButton value={'女'}>
                                    <Text>女</Text>
                                </RadioButton>
                            </RadioGroup>:
                            <View style={{flex:1}}>
                                <TextInput
                                    style={{paddingLeft:10,}}
                                    placeholder="性别"
                                    underlineColorAndroid = {'transparent'}
                                    value={this.state.sex}
                                    editable={false}
                                >
                                </TextInput>
                            </View>
                        }
                    </View>
                    <View style={styles.inputText}>
                        <View style={{marginLeft:10}}><Text style={{fontSize:18}}>国家:</Text></View>
                        <TextInput
                            style={{paddingLeft:10,flex:1,}}
                            placeholder="国家"
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    country: text
                                })
                            }}
                            value={this.state.country}
                            editable={this.state.isEdit}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.inputText}>
                        <View style={{marginLeft:10}}><Text style={{fontSize:18}}>城市:</Text></View>
                        <TextInput
                            style={{paddingLeft:10,flex:1,}}
                            placeholder="城市"
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    city: text
                                })
                            }}
                            value={this.state.city}
                            editable={this.state.isEdit}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.inputText}>
                        <View style={{marginLeft:10}}><Text style={{fontSize:18}}>街道:</Text></View>
                        <TextInput
                            style={{paddingLeft:10,flex:1,}}
                            placeholder="街道"
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    street: text
                                })
                            }}
                            value={this.state.street}
                            editable={this.state.isEdit}
                        >
                        </TextInput>
                    </View>
                    {/*<View style={[styles.inputText,{marginTop:15}]}>
                        <View style={{marginLeft:10}}><Text style={{fontSize:18}}>个性签名:</Text></View>
                        <TextInput
                            style={{paddingLeft:10,flex:1,}}
                            placeholder="个性签名"
                            multiline={true}
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    introduction: text
                                })
                            }}
                            value={this.state.introduction}
                            editable={this.state.isEdit}
                        >
                        </TextInput>
                    </View>*/}
                    {/*{this.state.isEdit?
                        <TouchableOpacity
                            onPress={() => ForOnePress(()=>{this.setState({isLoading:true,isEdit:false});this._fetchData()})}
                            style={[styles.btn,{backgroundColor:'#f5ce4d',}]}
                        >
                            <Text style={{fontSize:16}}>
                                保存
                            </Text>
                        </TouchableOpacity>:
                        <TouchableOpacity
                            onPress={() => ForOnePress(()=>{this.setState({isEdit:true})})}
                            style={[styles.btn,{backgroundColor:'#f5ce4d',}]}
                        >
                            <Text style={{fontSize:16}}>
                                编辑
                            </Text>
                        </TouchableOpacity>
                    }*/}
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
    btn:{
        marginTop:20,
        width:300,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    loading:{
        position:'absolute',
        height:'200%',
        width:'100%',
        top:-80,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0)',
    },
    inputText:{
        borderTopWidth:.4,
        borderColor:'#e8eae9',
        width:'100%',
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
});