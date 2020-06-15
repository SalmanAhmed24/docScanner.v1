import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    ImageBackground,
    BackHandler
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import * as Font  from 'expo-font';
class AlbumScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataArray:[],
            fontsLoaded:false
        }
    }
  async componentDidMount(){
        
        CameraRoll.getPhotos({first:20,groupName:'DocumentScanner'})
        .then(res=>{
            this.setState({dataArray:res.edges})
        })
        .catch(err=>console.log(err));
        await Font.loadAsync({
            //font1 or 2 can be any name. This'll be used in font-family
             
            'Nunito-Bold': require('../../../assets/fonts/Nunito-Bold.ttf'),                         
        });
        this.setState({fontsLoaded: true});
    }
    viewImage = (item)=>{
        this.props.navigation.navigate('ImageView',{item:item})
    }
    componentWillUnmount(){
        this.props.navigation.navigate('Home')
    }
    render(){
        console.log('these are the imaegs',this.state.dataArray);
        const imageArray = this.state.dataArray.map(item=>item.node.image);
        console.log(imageArray);
        return(
            <View style={styles.container}>
                {
                    (this.state.fontsLoaded) ? <Text style={styles.galHead}>Gallery</Text>
                    : null
                }
                <ImageBackground 
                style={styles.bgImage}
                source={require('../../../assets/images/bg1.jpg')}>
                </ImageBackground>
                {
                    (imageArray.length == 0) ? <Text style={{color:'#fff'}}>No Pdf found.</Text>
                    : <FlatList 
                    style={{width:'100%'}}
                    horizontal={false}
                    numColumns={3}
                    columnWrapperStyle={{margin:10}}
                    data={imageArray}
                    keyExtractor={item=>item.filename}
                    renderItem={({item})=>{
                        return(<TouchableOpacity onPress={()=>this.viewImage(item)}>
                            <Image source={{uri:item.uri}}style={styles.imagePdf}/>
                        </TouchableOpacity>)
                    }}
                    />
                }
            </View>
        )
    }
}
export default AlbumScreen;
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        position:'relative',
    },
    imagePdf:{
        width:100,
        height:100,
        margin:5
    },
    galHead:{
        fontFamily:'Nunito-Bold',
        fontSize:35,
        textTransform:'uppercase',
        alignSelf:'center',
        marginVertical:20
    },
    bgImage:{
        width:'100%',
        height:'100%',
        position:'absolute',
        top:0,
        left:0,
        opacity:0.2,
        zIndex:0
    }
})
