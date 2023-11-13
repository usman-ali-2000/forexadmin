import React, { useEffect } from "react";
import { SafeAreaView, Text, View, StatusBar, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Lesson({route}){

    const image1 = route.params.image;
    const heading1 = route.params.heading;
    const text = route.params.text;

    useEffect(()=>{
        console.log(image1, heading1, text);
    },[])

    return(
        <SafeAreaView style={{height:'100%', width:'100%', flex:1}}>
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
            <ScrollView>
            <Image style={{height:300, width:'100%', padding:5}} source={{uri:image1}}/>
            {/* <Image style={{height:200, width:'100%'}} source={require('../assets/placeholder.png')}/> */}
            <Text style={{fontSize:30, fontWeight:'bold', paddingLeft:5}}>{heading1}</Text>
            <Text style={{fontSize:20, padding:5}}>{text}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}