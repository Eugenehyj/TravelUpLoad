/**
 * 注册页面
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
import Contants from '../../util/Constants';

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            password:'',
            rePassword:'',
            nicName:'',
            sex:'保密',
            address:'',
            introduction:'',
            allMessage:'',
            images: '',
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
                formData.append('picture', file);
            }
        }

        //上传图片时，可以在此添加相关其他参数
        formData.append('userId', this.state.userName);
        formData.append('password', this.state.password);
        formData.append('name',this.state.nicName);
        formData.append('sex',this.state.sex);
        formData.append('city',this.state.address);
        //formData.append('introduction',this.state.introduction);

        console.log(formData);
        fetch(Contants.CONNECTURL+'UserInfo/userRegister',{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
                'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
            },
            body:formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading:false});
                DeviceEventEmitter.emit('Register', {isRegister:'ok'});
                this.props.navigation.goBack();
            }).catch((error) => {
                this.setState({isLoading:false});
            this.refs.toast.close(error, 2000);
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
            this.refs.toast.close(e.message
                ? e.message
                : e, 500);
        });
    };
    render(){
        return(
            <View>
                <OneHeader
                    title="注册"
                    navigation={this.props.navigation}
                />
                <View style={{marginTop:80,alignItems:'center',}}>
                    <View style={{width:'100%',backgroundColor:'#fff'}}>
                        <TouchableOpacity
                            onPress={()=>{this._openPhoto()}}
                            style={{height:100,justifyContent:'center',alignItems:'center'}}
                        >
                            {this.state.images==''?
                                <View style={{borderRadius:50,width: 90, height: 90,borderWidth:1,borderColor:'#e8eae9',justifyContent:'center',alignItems:'center'}}>
                                    <Text>选择头像</Text>
                                </View>
                            :
                                <View>
                                    <Image style={{borderRadius:50,width: 90, height: 90, resizeMode: 'cover'}} source={this.state.images} />
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:5,width:'100%'}}>
                        <TextInput
                            style={{paddingLeft:10,backgroundColor:'#fff'}}
                            placeholder="账号"
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    userName: text
                                })
                            }}
                        >
                        </TextInput>
                    </View>
                    <View style={{borderTopWidth:.4,borderColor:'#e8eae9',width:'100%'}}>
                        <TextInput
                            style={{paddingLeft:10,backgroundColor:'#fff'}}
                            placeholder="密码不小于6位"
                            password ={true}
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                        >
                        </TextInput>
                    </View>
                    {/*<View style={{borderTopWidth:.4,borderColor:'#e8eae9',width:'100%'}}>
                        <TextInput
                            style={{paddingLeft:10,backgroundColor:'#fff'}}
                            placeholder="重复密码"
                            password ={true}
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    rePassword: text
                                })
                            }}
                        >
                        </TextInput>
                    </View>*/}
                    <View style={{width:'100%',marginTop:5,}}>
                        <TextInput
                            style={{paddingLeft:10,backgroundColor:'#fff'}}
                            placeholder="昵称"
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    nicName: text
                                })
                            }}
                        >
                        </TextInput>
                    </View>
                    <View style={{borderTopWidth:.4,borderColor:'#e8eae9',width:'100%'}}>
                        <RadioGroup
                            selectedIndex={0}
                            onSelect = {(index, value) => {this.setState({sex:value})}}
                            style={{backgroundColor:'#fff',flexDirection:'row'}}
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
                        </RadioGroup>
                    </View>
                    <View style={{borderTopWidth:.4,borderColor:'#e8eae9',width:'100%'}}>
                        <TextInput
                            style={{paddingLeft:10,backgroundColor:'#fff'}}
                            placeholder="地址"
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    address: text
                                })
                            }}
                        >
                        </TextInput>
                    </View>
                    <View style={{borderTopWidth:.4,borderColor:'#e8eae9',width:'100%'}}>
                        <TextInput
                            style={{paddingLeft:10,backgroundColor:'#fff'}}
                            placeholder="个性签名"
                            multiline={true}
                            underlineColorAndroid = {'transparent'}
                            onChangeText={(text) => {
                                this.setState({
                                    introduction: text
                                })
                            }}
                        >
                        </TextInput>
                    </View>

                    <TouchableOpacity
                        onPress={() => ForOnePress(()=>{this.setState({isLoading:true});this._fetchData()})}
                        style={[styles.btn,{
                            backgroundColor:this.state.userName==''|this.state.password==''?'#e8eae9':this.state.nicName==''?'#e8eae9':'#f5ce4d',
                        }]}
                        disabled = {this.state.userName==''|this.state.password==''?true:this.state.nicName==''?true:false}
                    >
                        <Text style={{fontSize:16}}>注册</Text>
                    </TouchableOpacity>
                    <Toast
                        ref="toast"
                        style={{backgroundColor:'rgba(0,0,0,.7)'}}
                        position='top'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{color:'#fff'}}
                    />
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
});