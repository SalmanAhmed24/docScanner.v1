import React from 'react';
import { StyleSheet, Text, View,ImageBackground,Image, TouchableOpacity } from 'react-native';
import * as Font  from 'expo-font';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fontsLoaded: false
        }
    }
    async componentDidMount(){
        await Font.loadAsync({
            //font1 or 2 can be any name. This'll be used in font-family
             
            'Nunito-Bold': require('../../../assets/fonts/Nunito-Bold.ttf'),                         
            'Nunito-Light': require('../../../assets/fonts/Nunito-Bold.ttf'),
        });
        this.setState({fontsLoaded: true});
    }
    render(){
        return (
            
            (this.state.fontsLoaded) ? <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/bg3.jpg')} style={styles.image}>
              </ImageBackground>
              
                   <View style={styles.headingWrap}>
                      <Text style={styles.mainHeading}>Welcome</Text>
                      <Text style={styles.subHeading}>convert Image To PDF</Text>
                  </View>
                 
              
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Album')}>
              <View style={styles.infoWrap}>
                  <View style={{display:'flex',flexDirection:'row'}}>
                    <Image style={styles.iconImg} source={require('../../../assets/images/pdf.png')} />
                    <Text style={styles.infoHead}>PDF Files</Text>
                  </View>
                  <Text style={styles.infoPara}>View all the PDF files and share them with eveyone</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Camera')}> 
              <View style={styles.infoWrap}>
              <View style={{display:'flex',flexDirection:'row'}}>
                    <Image style={styles.iconImg} source={require('../../../assets/images/camera-icon.png')} />
                    <Text style={styles.infoHead}>Scan</Text>
                  </View>
                  <Text style={styles.infoPara}>Scan the document and convert it into PDF</Text>
              </View>
            </TouchableOpacity>
          </View>
            : null
          );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height:'100%',
      position:'relative',
    },
    image:{
      opacity:0.2,
      height:'100%',
      width:'100%',
      position:'absolute',
      top:0,
      left:0,
      zIndex:-1
    },
    headingWrap:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'center',
      width:'100%',
      alignSelf:'flex-start',
      marginTop:50,
      marginBottom:30
    },
    mainHeading:{
        fontFamily:'Nunito-Bold',fontSize:55,textTransform:'uppercase'
    },
    subHeading:{
        fontFamily:'Nunito-Light',fontSize:13,textTransform:'uppercase'
    },
    infoWrap:{
        paddingHorizontal:20,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        width:'100%',
        marginVertical:30
    },
    infoHead:{
        fontFamily:'Nunito-Bold',
        fontSize:25,
        textTransform:'uppercase',
        marginTop:10
    },
    infoPara:{
        fontFamily:'Nunito-Light',
        fontSize:15,
        textTransform:'uppercase',
        marginVertical:20
    },
    iconImg:{
        width:50,
        height:50,
        marginRight:20
    }
  });
  export default Home;