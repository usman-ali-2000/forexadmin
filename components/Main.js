import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View, SafeAreaView, StatusBar, Alert, Animated, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import {FloatingAction} from "react-native-floating-action";
import {LinearGradient} from "expo-linear-gradient";

export default function Main(){

    const navigation = useNavigation();

    const [userData, setUserData] = useState([]);

    const scrollY = new Animated.Value(0);
    // let i= userData.length;

    const fetchData = async()=>{
try{
        const response = await fetch('https://vercelapi-coral.vercel.app/category');
        const json = await response.json();
        setUserData(json);
        // console.log(userData);
        // console.log(json.length);
}catch(e){
    console.log('error fetching...', e);
}
    }

    useEffect(()=>{
        fetchData();
    },[userData])

    const actions = [
        {
          text: 'Add',
          name: 'add',
          icon: require("../assets/plus-round-icon.png"),
          position: 1,
        },
      ]

      const handleActionPress =(name)=>{
    
        switch(name){
          case 'add':
            handleButton();
            break;
        }
      }

      const showAlert =(itemId) => {
      
        Alert.alert(
          'Delete',
          'Are you sure, you want to delete this?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Confirm', onPress: () => handleDelete(itemId) },
          ],
          { cancelable: true },
        );
      };

      const handleDelete= async(itemId)=>{
        if(!itemId){
          return;
        }
        try{const response = await fetch(`https://vercelapi-coral.vercel.app/category/${itemId}`,{
          method:'DELETE',
        });
        if(response.status===200){
          Alert.alert('successfully deleted');
          fetchData();
        }else{
          console.log('error in while deleting data');
        }
      }catch(e){
      console.log('Error:'+e);
    }
  }

      const handleButton=()=>{
        navigation.navigate('CategoryForm');
      }

      const headerHeight = scrollY.interpolate({
        inputRange: [0, 600],
        outputRange: [200, 0],
        extrapolate: 'clamp',
      });

    return(
        <SafeAreaView style={{height:'100%', width:'100%', flex:1, paddingBottom:5}}>
          <View style={{height:50}}>
          <LinearGradient
          colors={['pink','#9370db']}
          style={{flex:1,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          >
          <StatusBar translucent={true} backgroundColor={'transparent'}/>
          <View style={{height:30, paddingTop:Platform.OS === 'android' ? 0 : 0}}></View>
            </LinearGradient>
            </View>
            <Animated.View style={{overflow:'hidden', height:headerHeight}}>
            <Animated.Image
             style={{ height: headerHeight, width: Dimensions.get('window').width, resizeMode:'cover' }}
             source={require('../assets/forex_img.png')}
           />
            </Animated.View>
            <FlatList
            data={userData}
            keyExtractor={(item) => item._id}
            renderItem={({item, index})=>{
               
              const i = index+1;

              return(
                <View style={{flexDirection:'row', marginTop:10}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Lesson',{heading: item.heading, image: item.image, text: item.text})}>
                    <View style={{flexDirection:'row'}}>
                    <View style={{marginLeft:10,height:40, width:40, borderWidth:1, borderColor:'grey', borderRadius:10, backgroundColor:'grey'}}>
                      <Text style={{color:'white', textAlign:'center', fontSize:25, fontWeight:'bold', marginTop:1}}>{i}</Text>
                    </View>
                    <Text style={{marginLeft:10,fontSize:25, width:200}}>{item.heading}</Text>    
                    </View>
                </TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent:'flex-start'  }}>
                    <TouchableOpacity onPress={()=>showAlert(item._id)}>
                    <View style={{height:40, width:40, backgroundColor:'lightgrey', borderRadius:30, alignItems:'center', marginLeft:10}}>
                      <Image style={{height:30, width:30, marginTop:5}} source={require('../assets/recycle-bin.png')}/>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Edit',{id: item._id, heading: item.heading, text: item.text})}>
                    <View style={{height:40, width:40, backgroundColor:'lightgrey', borderRadius:30, alignItems:'center', marginLeft:3}}>
                      <Image style={{height:30, width:30, marginTop:3, marginLeft:5}} source={require('../assets/edit.png')}/>
                    </View>
                    </TouchableOpacity>
                    </View>
                </View>
            )
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={25}
            />
            <FloatingAction
            position="left"
            actions={actions}
            onPressItem={handleActionPress}
            />
        </SafeAreaView> 
          )
}