import React, {useEffect, useState} from "react";
import { Text, View, Button, ImageBackground, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CategoryForm(){

    const Api_Url = 'https://vercelapi-coral.vercel.app/category';
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drayui4zo/upload";
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [publicId, setPublicId] = useState('');


    useEffect(() => {
      const requestGalleryPermission = async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
      }

      requestGalleryPermission();
    },[])
    
    const pickImage = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing: true,
            aspect: [4,3],
            base64:false,
            quality:1
        });
    if(!result.canceled){
        setImage(result.assets[0].uri);
        
      }
    }

    if(hasGalleryPermission === false){
        return(<Text>no access to gallery...</Text>);
    }
    
    const handlePost = async () => {
        try {
          if (!image) {
            return;
          }
            
            // setUploading('uploading...');
          let formData = new FormData();
          formData.append('file', { uri: image, name: 'image.jpg', type: 'image/jpeg' });
          formData.append('upload_preset', 'appForex');
      
          fetch(CLOUDINARY_URL, {
            body: formData,
            headers: {
              'content-type': 'multipart/form-data'
            },
            method: 'POST',
          }).then(async r => {
            let data = await r.json();
            // console.log(data);
            if (data.secure_url) {
              // Use the secure URL in your REST API
              console.log('imageUrl',data.secure_url);              
             const url = data.secure_url;
             console.log('url:', url);
              // setRestUrl(data.secure_url);

        //       const splitUrl =  url.split('/');
        //   const lastPart =  splitUrl[splitUrl.length - 1];
        //  const lastPart2 =  lastPart.split('.')[0];

        //  console.log('publicid', lastPart2);
        //  const lastPart3 = lastPart2; 
        // //  console.log(lastPart3);
        //  setPublicId(lastPart3);

            handleSubmit(data.secure_url);
              Alert.alert('uploaded successfully...');
            }
            
            // setUploading('');
          }).catch(err => console.log(err));
        } catch (err) {
          console.log(err);
        }

      };

      const handleSubmit = async (imageUrl)=>{
        
        
        const splitUrl =  imageUrl.split('/');
        const lastPart =  splitUrl[splitUrl.length - 1];
       const lastPart2 =  lastPart.split('.')[0];

       console.log('publicid', lastPart2);
       const lastPart3 = lastPart2; 
      //  console.log(lastPart3);
      //  setPublicId(lastPart3);
 
        const data = { heading: text, image: imageUrl, text:description, imageId:lastPart3 };
        await fetch(Api_Url, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error))  
    }

      const deleteImageFromCloudinary = async (publicId) => {
        
        try {
          
          const cloudName = 'drayui4zo'; // Replace with your Cloudinary cloud name
          const apiKey = '113395972779231'; // Replace with your Cloudinary API key
          const apiSecret = 'FMIOWm26x8VUGb-doFYMcQm-ZQQ'; // Replace with your Cloudinary API secret
      
          // Construct the URL for the delete request
          const deleteUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
      
          const publicId = 'https://res.cloudinary.com/drayui4zo/image/upload/v1694878441/bbgvy1juz0jvoebbeyks.jpg';

          const splitUrl = publicId.split('/');
          const lastPart = splitUrl[splitUrl.length - 1];
         const lastPart2 = lastPart.split('.')[0]; 
       
         console.log(lastPart2);
          // Construct the request body
          
          
          const requestBody = {
            public_id: 'bbgvy1juz0jvoebbeyks', // The public ID of the image you want to delete
            api_key: apiKey,
            api_secret: apiSecret,
          };
      
          const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
      
          if (response.status === 200) {
            console.log(`Image with public ID ${publicId} has been deleted.`);
            // Handle success
          } else {
            console.error('Failed to delete image from Cloudinary.');
            // Handle error
          }
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
          // Handle error
        }
      };

    return(

        <View style={{height:'100%', width:'100%', flexDirection:'column'}}>
            <TouchableOpacity onPress={()=>pickImage()}>
            <View style={{flexDirection:'row', justifyContent:'flex-end', padding:10}}>
            {!image && <Image style={{height:50, width:50}} source={require('../assets/picture.png')}/>}
            </View>
            </TouchableOpacity>
            {image && <ImageBackground source={{uri: image}} style={{height:200, width:'100%'}}>
                <TouchableOpacity onPress={()=>pickImage()}>
                <View style={{flexDirection:'row', justifyContent:'flex-end', padding:10}}><Image style={{height:40, width:40}} source={require('../assets/picture.png')}/></View>
                </TouchableOpacity>
                </ImageBackground>}
                <TextInput
                multiline
                style={{fontSize:25, fontWeight:'bold', width:350, minHeight:50, backgroundColor:'lightgrey', margin:5, borderRadius:10, borderWidth:1, borderColor:'lightgrey', paddingLeft:10}}
                placeholder="heading..."
                value={text}
                onChangeText={setText}
                />
                <TextInput
                multiline
                style={{fontSize:25, width:360, height:150,padding:10, textAlignVertical:'top', backgroundColor:'lightgrey', borderRadius:25, paddingTop:15}}
                placeholder="Description..."
                value={description}
                onChangeText={setDescription}
                />
                {/* <Button title="delete" onPress={deleteImageFromCloudinary}/> */}
                <View style={{marginTop:150, marginLeft:280,height:60, width:60, borderRadius:50, borderWidth:1, borderColor:'#9370db', backgroundColor:'#9370db'}}>
                 <TouchableOpacity onPress={handlePost}>
                 <Text style={{textAlign:'center', fontSize:25, fontWeight:'bold', paddingTop:10, color:'white'}}>post</Text>
                 </TouchableOpacity>
                </View>
            </View>
    )
}