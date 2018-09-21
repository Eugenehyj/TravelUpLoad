/**
 * 发送朋友圈页面
 */
import ImagePicker_ from 'react-native-image-crop-picker';
import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Platform,
    Alert,
    TextInput,
    DeviceEventEmitter,
    AsyncStorage,
} from 'react-native';
import moment from 'moment';
import ForOnePress from '../../util/CommonUtil';
import Spinkit from 'react-native-spinkit';
import Toast, {DURATION} from 'react-native-easy-toast';
import Contants from '../../util/Constants';

export default class sendShare extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            title: '上传信息',
            headerRight: (
                <Button
                    title="上传"
                    onPress={()=>{
                        state.params.commitPage();
                    }}
                />
            ),
        };
    };

    componentWillMount(){
        this.props.navigation.setParams({
            commitPage:this.commitPage,
        })
    }
    constructor(props){
        super(props);
        //存放数组
        this.dataToPost = [];
        this.state={
            images: [],
            blog:'',
            isLoading:false,
            location:'广东·惠州',
        };
    }
    show() {
        let items = [
            {title: '从相册选取', onPress: () => this.openPicLib()},
            {title: '拍照一张',onPress: () => this.pickSingleWithCamera()},
        ];
        let cancelItem = {title: '关闭'};
    }
    _getSave=(key)=> {
        try {
            AsyncStorage.getItem(
                key,
                (error,result)=>{
                    if (error){
                        console.log('取值失败:'+error);
                    }else{
                        console.log('取值成功:'+result);
                        this.commitPage(result);
                    }
                }
            )
        }catch(error) {
            this.refs.toast.show('失败'+error,2000);
        }
    };
    render(){
        return(
            <ScrollView>
                <View>
                    <View style={styles.container}>
                        <View style={styles.topItem}>
                            <TouchableOpacity
                                style={styles.topBack}
                                onPress={()=>{this.props.navigation.goBack()}}
                            >
                                <Text
                                    style={{fontSize:14,color:'#734104',marginBottom:14,marginTop:10,}}

                                >
                                    返回
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.topTitle}>
                                <Text style={{fontSize:18,color:'#734104',marginBottom:12,marginTop:10,}}>信息编辑</Text>
                            </View>
                            <View style={styles.topOther}>
                                <TouchableOpacity
                                    onPress={()=>ForOnePress(()=>{this.setState({isLoading:true});this._getSave('NameId')})}
                                >
                                    <Text
                                        style={{fontSize:14,color:'#734104',marginBottom:14,marginTop:10,}}

                                    >
                                        发送
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={{height:100,marginLeft:20,marginRight:20,}}>
                            <TextInput
                                multiline={true}
                                style={{}}
                                underlineColorAndroid = {'transparent'}
                                onChangeText={(text) => {
                                    this.setState({
                                        blog: text
                                    })
                                }}
                            >

                            </TextInput>
                        </View>
                        <View style={{marginTop:5,marginLeft:20,marginRight:20,marginBottom:30,}}>
                            {this.createImageItem()}
                        </View>
                    </View>
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
            </ScrollView>

        )
    }

    createImageItem(){
        //let  imageSource = require('../../imgs/upload.png');
        let mainView;
        if(this.state.images!=null&&this.state.images.length>=9){
            mainView=null;
        }else{
            mainView=
                <TouchableOpacity
                    onPress={()=>{
                        // this.show();
                        this.openPicLib();
                    }}
                    style={{height:70,width:70,borderWidth:1,borderColor:'#e8eae9',alignItems:'center',justifyContent:'center'}}
                >
                    {/*<Image source={imageSource} />*/}
                    <Text>选择</Text>
                </TouchableOpacity>
        }

        return(
            <View style={{}}>
                <View style={{flexDirection:'row',flexWrap:'wrap',marginRight:5}}>
                    {this.state.images ?
                        this.state.images.map(i => <View key={i.uri}
                                                         style={{marginRight:5,overflow:'hidden',marginBottom:10,}}
                                                    >
                                                        {this.renderImage(i)}
                                                    </View>) : null}
                    {mainView}
                </View>
            </View>
        )
    }

    //从相机获取图片
    pickSingleWithCamera=()=> {
        ImagePicker_.openCamera({
            cropping: false,
            width: Math.round((Dimensions.get('window').width-20)),
            height: 300,
        }).then(image => {
            this.dataToPost.push({
                uri: image.path,
                width: image.width,
                height: image.height,
            });
            this.setState({
                images: this.dataToPost
            });
        }).catch(
            e => this.refs.toast.show(e,2000)
        );
    };

    //从图库或者相机进行获取,因为安卓平台不能进行多图选择，所以，需要区分不同平台
    openPicLib=()=> {
        if(Platform.OS === 'ios'){
            ImagePicker_.openPicker({
                multiple: true,
                waitAnimationEnd: false,
            }).then(images => {
                for (var i=0;i<images.length;i++) {
                    this.dataToPost.push({
                        uri: images[i].path,
                        width: images[i].width,
                        height: images[i].height,
                        mime: images[i].mime,
                    });
                }
                this.setState({
                    images: this.dataToPost
                });
            }).catch(e =>
                alert(e)
            );

        }else{
            ImagePicker_.openPicker({
                width: 300,
                height: 300,
                cropping: false,
                cropperCircleOverlay: false,
                compressImageMaxWidth: 480,
                compressImageMaxHeight: 640,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                compressVideoPreset: 'MediumQuality'
            }).then(image => {
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
                this.refs.toast.show(e.message
                    ? e.message
                    : e,2000);
            });
        }
    };

    renderImage(image) {
        return <Image style={{width: 70, height: 70, resizeMode: 'cover'}} source={image} />
    }


    //数据提交
    commitPage=(NameId)=>{
        if(this.state.images==''&&this.state.blog==''){
            Alert.alert('无效','图片或文章至少一个不为空', [{text:"我知道了"}]);
            return;
        }
        let formData = new FormData();
        let listPicture = [];
        if(this.state.images != null&&this.state.images!=''){
            for(var i = 0;i<this.state.images.length;i++){
                var uri = this.state.images[i].uri;
                var index = uri.lastIndexOf("\/");
                var name  = uri.substring(index + 1, uri.length);
                let file = {uri: uri, type: 'multipart/form-data', name: name } ;
                formData.append('file', file);
            }
            /*for(let i=0;i<this.state.images.length;i++){
                listPicture.push({picturePath:this.state.images[i].uri});
            }
            formData.append('listPicture',listPicture);*/
        }
        //上传图片时，可以在此添加相关其他参数
        formData.append('loginUserId', NameId);
        //formData.append('date', moment().format('YYYY-MM-DD HH:mm:ss'));
        formData.append('content',this.state.blog);
        formData.append('location',this.state.location);

        //console.log(formData);
        const REQUEST_URL = Contants.CONNECTURL+'instantNote/addInstantNote';
        fetch(REQUEST_URL,{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
                'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
            },
            body:formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({isLoading:false});
                DeviceEventEmitter.emit('Update', {iOperation:'update'});
                this.props.navigation.goBack();
        }).catch((error) => {
            this.setState({isLoading:false});
            this.refs.toast.show(error,2000);
        });

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topItem:{
        backgroundColor:'#f5ce4d',
        alignItems:'center',
        height:70,
        justifyContent:'space-around',
        flexDirection:'row',
    },
    topBack:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        //backgroundColor:'red',
        height:70,
    },
    topTitle:{
        flex:5,
        //backgroundColor:'black',
        height:70,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    topOther:{
        flex:1,
        //backgroundColor:'green',
        height:70,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    loading:{
        position:'absolute',
        height:'100%',
        width:'100%',
        top:70,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0)',
    },
});