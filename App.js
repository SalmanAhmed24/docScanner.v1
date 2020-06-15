import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/home/home';
import CameraComponent from './src/screens/camera/camera';
import AlbumScreen from './src/screens/album/album';
import ImageView from './src/screens/imageVeiw/imageView';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Camera" component={CameraComponent}/>
        <Stack.Screen name="Album" component={AlbumScreen}/>
        <Stack.Screen name="ImageView" component={ImageView}/>        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

