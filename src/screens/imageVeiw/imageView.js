import React from 'react';
import {View,Image,TouchableOpacity, StyleSheet,Text,Alert,Dimensions} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import RNImageToPdf from 'react-native-image-to-pdf';
import Share from 'react-native-share';

class ImageView extends React.Component{
    constructor(props){
        super(props);
    }
    delete = (imgPath)=>{
        Alert.alert(
            "Delete Photo",
            "Are you sure you want to delete the PDF?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                  CameraRoll.deletePhotos([imgPath]);
                  this.props.navigation.navigate('Home');
                } }
            ],
            { cancelable: false }
          );
          
    }
    sharePdf = async(imgArray)=>{
        let editedPath = imgArray.uri.replace('file://','');
        const screenWidth = Math.round(Dimensions.get('window').width);
        const screenHeight = Math.round(Dimensions.get('window').height);
        try {
            const options = {
                imagePaths: [`${editedPath}`],
                name: 'DocScanner.pdf',
                maxSize: { // optional maximum image dimension - larger images will be resized
                    width: screenWidth * 900,
                    height: screenHeight * 900,
                },
                quality: 1, // optional compression paramter
            };
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            console.log(pdf.filePath);
            Share.open({url:`file://${pdf.filePath}`})
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
                } catch(e) {
                    console.log(e);
                }
        
    }
    render(){
        console.log(this.props.route.params.item);
        const width = this.props.route.params.item.width;
        const height = this.props.route.params.item.height;
        return(
            <View style={styles.container}>
                <Image 
                     style={{width:'100%',height:300}}
                    source={{uri:this.props.route.params.item.uri}}/>
                <View style={styles.btnWrap}>
                    <TouchableOpacity onPress={()=>this.sharePdf(this.props.route.params.item)}>
                        <Text style={{color:'#fff'}}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        ()=>this.delete(this.props.route.params.item.uri)}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default ImageView;
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000',
    },
    btnWrap:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%',
        margin:20
    }
})