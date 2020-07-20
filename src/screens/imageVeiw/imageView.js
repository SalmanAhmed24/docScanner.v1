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
                  this.props.navigation.popToTop();
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
                name: 'Scannifier.pdf',
                maxSize: { // optional maximum image dimension - larger images will be resized
                    width: screenWidth * 900,
                    height: screenHeight * 900,
                },
                quality: 1, // optional compression paramter
            };
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            
            Share.open({url:`file://${pdf.filePath}`})
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
                } catch(e) {
                    console.log(e);
                }
        
    }
    render(){
        const width = this.props.route.params.item.width;
        const height = this.props.route.params.item.height;
        return(
            <View style={styles.container}>
                <Image 
                     style={{width:'100%',height:300}}
                    source={{uri:this.props.route.params.item.uri}}/>
                <View style={styles.btnWrap}>
                    <TouchableOpacity 
                        style={styles.iconWrap}
                        onPress={()=>this.sharePdf(this.props.route.params.item)}>
                        <Image style={styles.icons} source={require('../../../assets/images/share.png')} />
                        <Text style={styles.text}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconWrap}
                        onPress={()=>this.delete(this.props.route.params.item.uri)}>
                        <Image style={styles.icons} source={require('../../../assets/images/del.png')} />
                        <Text style={styles.text}>Delete</Text>
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
        margin:20,
    },
    icons:{
        width:32,
        height:32,
        marginRight:5
    },
    iconWrap:{
        display:'flex',
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor:'#B8D0EB',
        borderRadius:8
    },
    text:{
        marginTop:7,
        textTransform:'uppercase',
        color:'#fff'
    }
})