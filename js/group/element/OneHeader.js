import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import ForOnePress from '../../util/CommonUtil';

export default class OneHeader extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
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
                        <Text style={{fontSize:18,color:'#734104',marginBottom:12,marginTop:10,}}>{this.props.title}</Text>
                    </View>
                    <View style={styles.topOther}>
                        {this.props.other==true?
                            <TouchableOpacity
                                onPress={() => ForOnePress(()=>navigate(this.props.subPage,{user:this.props.subPage}))}
                            >
                                <Text
                                    style={{fontSize:14,color:'#734104',marginBottom:14,marginTop:10,}}

                                >
                                    注册
                                </Text>
                            </TouchableOpacity>:null
                        }
                    </View>
                </View>

            </View>
        );
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
});
