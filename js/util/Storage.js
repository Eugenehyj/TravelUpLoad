import React, {
    Alert,
    AsyncStorage
} from 'react-native';

class Storage {
    /**
     * 是否登陆
     * @param navigation 用于页面跳转
     * @param aim 目标页面
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    static isLogin (navigation,aim) {
        navigation?navigation:null;
        aim?aim:null;
        try {
            AsyncStorage.getItem(
                'NameId',
                (error,result)=>{
                    if (error){
                        console.log('取值失败:'+error);
                    }else{
                        console.log('取值NameId成功');
                        if(result!=null){
                            if(navigation!=null&&navigation!=''){
                                const {navigate} = navigation;
                                navigate(aim,{user:aim});
                            }
                        }
                        else{
                            Alert.alert('登陆','请先登录', [{text:"我知道了"}]);
                        }
                    }
                }
            )
        }catch(error) {
            alert('失败' + error);
        }
    };

    /**
     * 删除
     * @param key 查询的键值
     * @returns {Promise<T>|*|Promise.<TResult>}
     */
    static deleteSave(key){
        try {
            AsyncStorage.removeItem(
                key,
                (error)=>{
                    if(!error){
                        console.log('移除成功');
                    }
                }
            )
        }catch (error){
            console.log('失败',+error);
        }
    };

    /**
     * 存值
     * @param name 查询的键值
     * @param val 存取的值
     * @returns {Promise<T>|*|Promise.<TResult>}
     */
    static save(name,val){
        try {
            AsyncStorage.setItem(
                name,
                val,
                (error)=>{
                    if (error){
                        console.log('存值失败:',error);
                    }else{
                        console.log('存值成功!');
                    }
                }
            );
        } catch (error){
            alert('失败'+error);
        }
    };
}

export default Storage;