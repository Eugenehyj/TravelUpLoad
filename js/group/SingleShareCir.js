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
    Modal
} from 'react-native';
import  ImageViewer  from 'react-native-image-zoom-viewer';
import  ForOnePress from '../util/CommonUtil';
import Constants from "../util/Constants";

export default class SingleShareCir extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            state:0,
            open: false,
            imageIndex:0,
            canDelete:false,
        };
        this._getSave('NameId');
        this.dataToPost = [];
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
                        if(result!=null){
                            if(result==this.props.allMessage.createId)
                                this.setState({
                                    canDelete:true,
                                });
                        }
                    }
                }
            )
        }catch(error) {
            alert('失败' + error);
        }
    };

    _renderImages = () => {
        let images =this.props.onePic!=null?this.props.onePic!=''?this.props.onePic:'n':'n';
        if(images.length>1){
            let imageItem = [];
            for(let i=0;i<images.length;i++){
                imageItem.push({
                    image:images[i].instantNotePictureId,
                    index:i,
                });
            }
            //console.log(imageItem);
            if(imageItem.length==1){
                return (
                    <View>
                        <TouchableOpacity
                            onPress={() => {this._ini();this.setState({open: true})}}
                        >
                            <Image
                                style={{height: 220, width: 220, resizeMode: 'cover'}}
                                source={{uri: Constants.CONNECTURL+'instantNotePicture/downloadPicture?instantNotePictureId=' + imageItem[0].image}}
                            />
                        </TouchableOpacity>
                    </View>
                );
            }
            else{
                return (
                    imageItem.map(i =>
                        <View key={i.index} style={{marginBottom:10,marginRight:10,}}>
                            <TouchableOpacity
                                onPress={() => {this._ini();this.setState({open: true,imageIndex:i.index});}}
                            >
                                <Image
                                    style={{height:80,width:80,resizeMode: 'cover'}}
                                    source={{uri:Constants.CONNECTURL+'instantNotePicture/downloadPicture?instantNotePictureId='+i.image}}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                );
            }
        }else{
            return (
                null
            );
        }
    };
    _ini =() =>{
        let images =this.props.onePic!=null?this.props.onePic!=''?this.props.onePic:'n':'n';
        this.dataToPost=[];
        for(var i = 0;i<images.length;i++){
            this.dataToPost.push({
                url: Constants.CONNECTURL+'instantNotePicture/downloadPicture?instantNotePictureId=' + images[i].instantNotePictureId
            })
        }
        //console.log(this.dataToPost);
    };
    render() {
        let images ='';
        const {navigate} = this.props.navigation;
        return (
            <View style={{borderWidth:.3,borderColor:'#e0e0e0',backgroundColor:'white',marginBottom:10,}}>
                <View style={{padding:10,paddingBottom:0,}}>
                    <TouchableOpacity
                        onPress={() => ForOnePress(() => navigate('detailshare',{user:'detailshare',oneMessage:this.props.allMessage,onePic:this.props.onePic,oneComment:this.props.oneComment}))}
                    >
                    <View style={{flexDirection:'row'}}>
                        <View style={{justifyContent:'center'}}>
                            <TouchableOpacity
                                onPress={() => ForOnePress(() => navigate('DetailMessage',{user:'DetailMessage',userId:this.props.allMessage.createId}))}
                            >
                                <Image
                                    style={{height:35,width:35,borderRadius:50,}}
                                    source={{uri:'mine'}}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:5,}}>
                            <Text style={{color:'black'}}>{this.props.allMessage.createrName}</Text>
                            <Text style={{color:'#b0b0b0'}}>{this.props.allMessage.createTime}</Text>
                        </View>
                        {
                            this.state.canDelete==true?
                                <TouchableOpacity
                                    onPress={()=>{}}
                                >
                                    <Text>删除</Text>
                                </TouchableOpacity>:null
                        }
                    </View>
                    <View style={{marginTop:10,}}>
                        <Text style={{color:'black'}}>{this.props.allMessage.content}</Text>
                    </View>
                    <View style={{marginTop:10,flexDirection:'row',flexWrap:'wrap',}}>
                        {/*分享圈图片区域*/}
                        {this._renderImages()}
                    </View>

                    <View style={styles.bottomBtn}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row',}}>
                            <View style={{marginRight:10,flexDirection:'row',}}>
                                <Image
                                    style={{height:20,width:20,tintColor:'#909090',marginRight:5,}}
                                    source={{uri:'commet'}}
                                />
                                <Text style={{color:'#909090'}}>评论</Text>
                            </View>
                            <View style={{flexDirection:'row',}}>
                                <Image
                                    style={{height:20,width:20,tintColor:'#909090',marginRight:5,}}
                                    source={{uri:'zan'}}
                                />
                                <Text style={{color:'#909090'}}>点赞</Text>
                            </View>
                        </View>
                        <View style={{flex:1,alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}}>
                            <Image
                                style={{height:20,width:20,tintColor:'#909090',marginRight:5,}}
                                source={{uri:'share'}}
                            />
                            <Text style={{color:'#909090'}}>分享</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.open}
                    // modalDidOpen={() => console.log(this.dataToPost)}
                    // modalDidClose={() => this.setState({open: false})}
                    onRequestClose={() => this.setState({open: false})}
                    style={{flex:1,justifyContent:'center',arguments:'center'}}>
                    <View style={{flex:1}}>
                        <ImageViewer
                            imageUrls={this.dataToPost}
                            index={this.state.imageIndex}
                        />
                        <TouchableOpacity
                            style={styles.modalBtn}
                            onPress={() => this.setState({open: false})}>
                            <Text style={{fontSize:20,}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    bottomBtn:{
        flexDirection:'row',
        borderTopWidth:.3,
        borderColor:'#e0e0e0',
        justifyContent:'space-around',
        height:40,
        marginTop:10,
    },
    modalBtn:{
        position:'absolute',
        width:30,
        height:30,
        right:10,
        top:20,
        backgroundColor:'rgba(255,255,255,0.7)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        //transform:[{rotate:'45deg'}],
    },
});
