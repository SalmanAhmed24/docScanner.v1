import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {View,BackHandler} from 'react-native';
// import RNFetchBlob from 'react-native-fetch-blob'
import CameraRoll from "@react-native-community/cameraroll";
import ImageResizer from 'react-native-image-resizer';

class CameraComponent extends React.Component{
    constructor(props){
      super(props);
      
    }
  //   componentWillMount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }
  
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick =()=>{
    this.props.navigation.navigate('Home');
    return true;
}
     componentDidMount(){
       ImagePicker.openCamera({
        cropping: true,
      }).then(image => {
        ImageResizer.createResizedImage(image.path, 300, 399, 'JPEG', 100, 0, '')
        .then(response => console.log('this is the result',response))
        .catch(err=>console.log(err))
          CameraRoll.save(image.path, { type:'photo', album:'DocumentScanner' })
          .then(res=>this.props.navigation.navigate('Album'))
          .catch(err=>console.log(err))
      }).catch(err=>{
        console.log(err);
        this.props.navigation.navigate('Home');
      });
    }
    render(){
        return(
            <View>
            </View>
        )
    }
}
export default CameraComponent;