
import React, {useEffect, useState} from "react";
import {StyleSheet} from 'react-native';
import { Center, Spinner, StatusBar,} from '@gluestack-ui/themed';
import {Button,ButtonText} from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { Box, SafeAreaView, Image, } from '@gluestack-ui/themed';
import topImage from '../../../src/img/image-removebg-preview.png';
import bottomImage from '../../../src/img/image-removebg-preview2.png';
import logo from '../../../src/img/logo.png';
import Animated, { Easing, FadeInLeft, FadeInRight, FadeOutLeft, ReduceMotion, SlideInLeft, StretchInX, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "@gluestack-ui/config/build/theme";
import { AlertDialog } from "@gluestack-ui/themed";
import axios from "axios";

    export default function LoadingScreen({navigation}) {
        
        useEffect(()=> {
            
            const LoginId = async() => {
                
                const id = await AsyncStorage.getItem("id")
                console.log(id)
                if (id) { 
                    try{
                        const response = await axios.post(`http://192.168.15.12:8085/api/validationID/${id}`,
                        // const response = await axios.post(`http://10.0.2.2:8085/api/validationID/${id}`,
                        {Headers: {
                            Authorization: `Bearer ${id}`
                        }
                    });
                        if (response.status === 200) {
                            
                            const userData = {
                                id: response.data.id,
                                nome: response.data.nome,
                                sobrenome: response.data.sobrenome,
                                email: response.data.email,
                                senha: response.data.senha,
                            }
                            navigation.navigate('Home', {userData});
                    }
                    
                    }
                    catch(error){
                        console.log(error)
                        navigation.navigate('Start');
                    }
                    
            }
            else{
                navigation.navigate('Start');
            }
          
        }
        LoginId();
    },[])

  return (
    <SafeAreaView  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='#EDE9E4'>
    <StatusBar hidden/>
<Box h={'auto'} w={'100%'} marginTop={-35} marginBottom={15} justifyContent="center" alignItems="center">
<Box alignItems={'center'} justifyContent={'center'}
style={[styles.box,]}>
<Image
w={120}
h={110}
source={logo}
alt="logo"
/>
</Box>

<Center>
<Spinner alignSelf="center" color={'#AA7E39'} size={"large"} />
</Center>
</Box>

    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    box: {
      height: 'auto',
      width: 'auto',
      borderRadius: 20,
      marginVertical: 10,
    },
    center: {
      height: 'auto',
      width: 'auto',
    
    },
  });