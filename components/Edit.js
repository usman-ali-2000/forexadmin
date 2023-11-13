import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";

export default function Edit({route}){

    const id = route.params.id;
    const heading = route.params.heading;
    const text1 = route.params.text;

    const [text, setText] = useState(heading);
    const [description, setDescription] = useState(text1);

    const handleEdit=async()=>{
        await fetch(`https://vercelapi-coral.vercel.app/category/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ heading: text, text: description }),
        }).then(Alert.alert('text edited...'));
    }

    useEffect(()=>{
        console.log(id);
    },[]);

    return(
        <View>
            <TextInput
                multiline
                style={{fontSize:25, fontWeight:'bold', width:350, minHeight:50, backgroundColor:'lightgrey', margin:5, borderRadius:10, borderWidth:1, borderColor:'lightgrey', paddingLeft:10}}
                placeholder="heading..."
                value={text}
                onChangeText={setText}
                />
                <TextInput
                multiline
                style={{fontSize:25, width:360, height:350,padding:10, textAlignVertical:'top', backgroundColor:'lightgrey', borderRadius:25, paddingTop:15}}
                placeholder="Description..."
                value={description}
                onChangeText={setDescription}
                />
                <View style={{marginTop:150, marginLeft:280,height:60, width:60, borderRadius:50, borderWidth:1, borderColor:'#9370db', backgroundColor:'#9370db'}}>
                 <TouchableOpacity onPress={()=>{
                    handleEdit()
                 }}>
                 <Text style={{textAlign:'center', fontSize:25, fontWeight:'bold', paddingTop:10, color:'white'}}>Edit</Text>
                 </TouchableOpacity>
                </View>
        </View>
            );
}