import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Button from './element/Button';


export default class MainCirButton extends Component<{}>{
    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.buttonGroup}>
                <Button name="电子地图" color="#ffae21" subicon="location" nicName={this.props.nicName} />
                <Button name="免费wifi" color="#ff7d73" subicon="wifi" />
                <Button name="热门游记" color="#8cd763" subicon="hot" page="TravelList" navigation={navigate} />
                <Button name="城市攻略" color="#4ab6e7" subicon="city" />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    buttonGroup:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
    },
});