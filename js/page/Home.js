import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    FlatList,
    Text,
    View,
    Image,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Animated
} from 'react-native';
import Swiper from 'react-native-swiper';
import SingleIndexMessage from '../group/SingleIndexMessage';
import CirButton from '../group/MainCirButton';
import Button from '../group/element/Button';
import ForOnePress from '../util/CommonUtil';
import Spinkit from 'react-native-spinkit';
import Constants from '../util/Constants';
import Toast, {DURATION} from 'react-native-easy-toast';

class Home_main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            state:0,
            screenWidth:Dimensions.get('window').width,
            swiperShow:false,
            topOp:0,
            allMessage:'',
            isLoading:true,
        };
        this._fetchData();
    }
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                // source={focused ? {uri:'step'} : {uri:'scan'}}
                source={{uri:'step'}}
                style={{ width: 26, height: 26, tintColor: tintColor }}
            />
        )
    };
    _fetchData = () =>{
        fetch(Constants.CONNECTURL+'Attraction/getAllAttractions')
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            responseJson = responseJson.extend;
            this.setState({
                allMessage: responseJson.extend,
                isLoading:false,
            })
        })
        .catch((error) => {
            console.error(error);
            this.refs.toast.show(error,2000);
            this.setState({isLoading:false});
        });
    };
    /*主要信息显示*/
    _renderItem = (item) => {
        const {navigate} = this.props.navigation;
        const imageI = Constants.CONNECTURL+'Attraction/downloadPicture?picturePath='+item.item.oneMessage.picture;
        return (
            <View>
                <TouchableOpacity
                    onPress={() => ForOnePress(()=>navigate('indexdetail',{user:'indexdetail',indexId :item.item.oneMessage.touristAttractionId}))}
                >
                    <SingleIndexMessage
                        title = {item.item.oneMessage.name}
                        context = {item.item.oneMessage.description}
                        number = {item.item.oneMessage.listenNumber}
                        image = {imageI}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    componentDidMount(){
        setTimeout(()=>{
            this.setState({swiperShow:true});
        },0)
    };
    _renderImage = () => {
        if(this.state.swiperShow){
            return(
                <Swiper
                    height={Dimensions.get('window').width<500?260:360}
                    horizontal={true}
                    loop={true}
                    paginationStyle={{bottom: 10}}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={2}
                >
                    <Image
                        style={{height:this.state.screenWidth,width:this.state.screenWidth}}
                        source={{uri:'gugong'}}
                    />
                    <Image
                        style={{height:this.state.screenWidth,width:this.state.screenWidth}}
                        source={{uri:'dsn'}}
                    />
                    <Image
                        style={{height:this.state.screenWidth,width:this.state.screenWidth}}
                        source={{uri:'yhy'}}
                    />
                </Swiper>
            );
        }else{
            return <View style={{height:150}}></View>;
        }

    };
    _renderBtn = () =>{
        if(this.state.swiperShow){
            return(
                <Swiper
                    horizontal={true}
                    paginationStyle={{bottom: 5}}
                    showsButtons={false}
                    loop={false}
                    dot={<View style={{           //未选中的圆点样式
                        backgroundColor: 'rgba(0,0,0,.2)',
                        width: 5,
                        height: 5,
                        borderRadius: 50,
                        margin:5,
                    }}/>}
                    activeDot={<View style={{    //选中的圆点样式
                        backgroundColor: 'rgba(0,0,0,.8)',
                        width: 5,
                        height: 5,
                        borderRadius: 50,
                        margin:5,
                    }}/>}
                >
                    <CirButton
                        nicName={this.state.nicName}
                        navigation={this.props.navigation}
                    />
                    <View style={{justifyContent:'space-around',flexDirection:'row',}}>
                        <Button name="附近厕所" color="#ffae21" subicon="location" />
                        <View style={{width:80}}></View>
                        <View style={{width:80}}></View>
                        <View style={{width:80}}></View>
                    </View>
                </Swiper>
            );
        }else{
            return <View style={{height:150}}></View>;
        }
    };

    render(){
        const {navigate} = this.props.navigation;
         var data = [];
         for (var i = 0; i < this.state.allMessage.length; i++) {
             data.push({key: i, oneMessage: this.state.allMessage[i]});
         }
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'rgba(10,10,10,0.3)'}
                    translucent={true}
                    barStyle={'default'}
                />

                <ScrollView
                    /*onScroll={(event)=>{
                        const roll = event.nativeEvent.contentOffset.y;
                        const count = Dimensions.get('window').width<500?260:360;
                        if(roll>count){
                            this.setState({
                                topOp:1,
                            });
                        }else{
                            this.setState({
                                topOp:0,
                            });
                        }
                    }}*/

                >

                    <View style={[styles.topBar,{opacity:this.state.topOp}]}>
                        <View style={{flex:1,alignItems:'center',}}>
                            <Image
                                style={{height:25,width:25,}}
                                source={{uri:'scan'}}
                            />
                        </View>
                        <View style={{flex:4,alignItems:'center',}}>
                            <Text style={{fontSize:18,color:'#6d400f'}}>优记</Text>
                        </View>
                        <View style={{flex:1,alignItems:'center',}}>
                            <Image
                                style={{height:25,width:25}}
                                source={{uri:'search'}}
                            />
                        </View>
                    </View>
                    {this._renderImage()}
                    <View style={[styles.main,{}]}>
                        {/*相关条目*/}
                        <View style={styles.mainButton}>
                            <View style={styles.addressAndSearch}>
                                <TouchableOpacity
                                    style={styles.address}
                                    onPress={() => ForOnePress(()=>navigate('province',{user:'province'}))}
                                >
                                    <Text style={styles.address_i}>深圳</Text><Text style={styles.subIcon}>▼</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.Search}
                                    onPress={() => ForOnePress(()=>navigate('search_',{user:'search_'}))}
                                >
                                    <View>
                                        <Image
                                            style={{height:15,width:15,marginRight:7,}}
                                            source={{uri:'search'}}
                                        />
                                    </View>
                                    <Text style={{color:'#b6b6b6',}}>请输入景区或者目的地</Text>
                                </TouchableOpacity>
                            </View>
                            {this._renderBtn()}
                        </View>
                        {/*主要信息*/}
                        <FlatList
                            renderItem={this._renderItem}
                            data = {data}
                        >
                        </FlatList>
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
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    topBar:{
        position:'absolute',
        width:'100%',
        height:68,
        backgroundColor:'#f5ce4d',
        top:0,
        zIndex:9,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end',
        paddingBottom:8,
    },
    Img:{
        position:'absolute',
        width:'100%',
        top:0,
    },
    headImg:{
        height:280,
        backgroundColor:'blue',
        opacity:0,
    },
    main:{
        //marginTop:280,
        height:1010,
        backgroundColor:'#f4f5f7',
    },
    mainButton:{
        paddingTop:20,
        height:170,
        justifyContent: 'flex-end',

        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        backgroundColor:'white'
    },
    addressAndSearch:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginLeft:20,
        marginRight:20,
        height:35,
        borderRadius:5,
        borderWidth:.3,
        borderColor:'#e0e0e0',
        backgroundColor:'#f5f5f5',

    },
    Search:{

        height:35,
        alignItems:'center',
        paddingLeft:10,
        flexDirection:'row',
    },
    address:{
        height:35,
        justifyContent:'center',
        paddingLeft:15,
        flexDirection:'row',
        alignItems:'center'
    },
    subIcon:{
        paddingLeft:10,
        paddingRight:10,
        borderRightWidth:1,
        borderColor:'#c0c0c0',
        color:'black',
        fontSize:10,
    },
    address_i:{

        color:'black',
        fontWeight:'300',
    },
    loading:{
        position:'absolute',
        height:'100%',
        width:'100%',
        paddingTop:130,
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0)',
    },
});


export default Home_main;
/*
export default class App extends Component<{}> {
  /!*示例
    constructor(props){
      super(props);
      this.state = {state:1};
    }
    customPressHandle = () => {
      //自定义方法，使用属性来定义
      alert("按钮"+this.state.state++);
    };
  *!/
}
*/
