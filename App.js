
import React, { Component } from 'react';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import Home from './js/page/Home';
import Circle from './js/page/Circle';
import Tools from './js/page/Tools';
import Mypage from './js/page/Mypage';
import indexdetail from "./js/page/subpage/IndexDetailPage";
import province from "./js/page/subpage/ProvincePage";
import search_ from "./js/page/subpage/SearchPage";
import detailshare from "./js/page/subpage/DetailSharePage";
import message from "./js/page/subpage/MessagePage";
import mycir from "./js/page/subpage/MyCirPage";
import shop from "./js/page/subpage/ShopPage";
import mypay from "./js/page/subpage/MyPayPage";
import settingPage from "./js/page/subpage/SettingPage";
import download from "./js/page/subpage/DownloadPage";
import mycard from "./js/page/subpage/MyCardPage";
import Login from "./js/page/subpage/LoginPage";
import collection from "./js/page/subpage/CollectionPage";
import mystep from "./js/page/subpage/MyStepPage";
import mypocket from "./js/page/subpage/MyPocketPage";
import help from "./js/page/subpage/HelpPage";
import mycontact from "./js/page/subpage/MyMontactPage";
import advice from "./js/page/subpage/AdvicePage";
import sendShare from "./js/page/subpage/SendSharePage";
import Register from './js/page/subpage/RegisterPage';
import MyMessagePage from './js/page/subpage/MyMessagePage';
import TravelList from './js/page/subpage/TravelList';
import TravelDetail from './js/page/subpage/TravelDetail';
import DetailMessage from './js/page/subpage/DetailMessage';

import Top from './js/test/top';

const App = TabNavigator(
{
    Home: {
        screen: Home,
    },
    Circle: {
        screen: Circle,
    },
    Tools: {
        screen: Tools,
    },
    Mypage: {
        screen: Mypage,
    },
},
{
    tabBarOptions: {
        activeTintColor: '#4BC1D2',
        inactiveTintColor: '#000',
        showIcon: true,
        showLabel: true,
        upperCaseLabel: false,
        pressColor: '#823453',
        pressOpacity: 0.8,
        style: {
            backgroundColor: '#fff',
            paddingBottom: 0,
            borderTopWidth: 0.5,
            borderTopColor: '#ccc',
            height:55,
        },
        labelStyle: {
            fontSize: 10,
            margin: 1,
        },
        indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
});

const Travel=StackNavigator({
    //Home:{screen:App},
    Home:{screen:Top},
    indexdetail:{screen:indexdetail},
    search_:{screen:search_},
    province:{screen:province},
    detailshare:{screen:detailshare},
    Login: {screen: Login},
    settingPage: {screen: settingPage},
    mycir: {screen: mycir},
    mycard: {screen: mycard},
    mycontact: {screen: mycontact},
    download: {screen: download},
    collection: {screen: collection},
    mystep: {screen: mystep},
    message: {screen: message},
    mypocket: {screen: mypocket},
    advice: {screen: advice},
    help: {screen: help},
    shop: {screen: shop},
    mypay: {screen: mypay},
    sendShare:{screen:sendShare},
    Register:{screen:Register},
    MyMessagePage:{screen:MyMessagePage},
    TravelList:{screen:TravelList},
    TravelDetail:{screen:TravelDetail},
    DetailMessage:{screen:DetailMessage},
},{
    headerMode: 'none'
}
);
export default Travel;