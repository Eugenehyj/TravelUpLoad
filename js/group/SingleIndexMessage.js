/*单个主页信息显示*/
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
} from 'react-native';

export default class  SingleIndexMessage extends React.Component{
    render(){
        return (
            <View style={styles.main_i}>
                <View style={styles.mainItem}>
                    <View style={[styles.imageItem,{marginRight:10,}]}>
                        <Image
                            style={{height:85,width:80,borderRadius:5,}}
                            source={{uri:this.props.image}}
                        />
                    </View>
                    <View style={{}}>
                        <View style={{flex:5,justifyContent:'center'}}>
                            <Text style={{fontSize:16,fontWeight:'300',color:'black'}}>
                                {this.props.title}
                            </Text>
                            <Text style={{color:'#b8c1c5',width:260,fontSize:12,}}>
                                {this.props.context}
                            </Text>
                        </View>
                        <View  style={{flex:3,flexDirection:'row',alignItems:'center'}}>
                            <Image
                                style={{height:15,width:15,marginRight:8,}}
                                source={{uri:'part'}}
                            />
                            <Text style={{color:'#b8c1c5'}}>{this.props.number}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    main_i:{
        height:100,
        borderTopWidth:1,
        borderTopColor:'#f0f0f0',
        backgroundColor:'white'
        //backgroundColor:'#666666',
    },
    mainBtn:{

    },
    mainItem:{
        flexDirection:'row',
        marginRight:10,
        marginLeft:10,
        alignItems:'center',
    },
    imageItem:{
        alignItems:'center',
        justifyContent:'center',
        height:100,
    },
});