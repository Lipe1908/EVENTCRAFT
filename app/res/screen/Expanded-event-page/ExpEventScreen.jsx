// Gabriel / RC
import React, {useEffect, useState} from "react";
import {View, Alert, StyleSheet, ActivityIndicator} from 'react-native';
import { Center, ScrollView, StatusBar,} from '@gluestack-ui/themed';
import {Button,ButtonText,ButtonIcon,ButtonSpinner,ButtonGroup,} from "@gluestack-ui/themed";
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogFooter,AlertDialogBody,Input, InputField, InputSlot, InputIcon, EyeOffIcon, EyeIcon } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import axios from 'axios';
import { Heading } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { Box, SafeAreaView, Image, ImageBackground } from '@gluestack-ui/themed';
import topImage from '../../../src/img/image-removebg-preview.png';
import bottomImage from '../../../src/img/image-removebg-preview2.png';
import logo from '../../../src/img/logo.png';
import Animated, { BounceIn, Easing, FadeInRight, FadeOutLeft, Keyframe, LightSpeedInLeft, ReduceMotion, SlideInLeft, StretchInX, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { SharedTransition, withSpring } from 'react-native-reanimated';
import moment from "moment";
import { Building2, Calendar, Clock, LockKeyhole } from "lucide-react-native";


export default function Evento({navigation, route})  {
 
  const [nomeEvento, setNomeEvento] = useState('');
  const [nConvidados, setNConvidados] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemBase64, setImagemBase64] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [horaEvento, setHoraEvento] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
    
  const AnimatedBox = Animated.createAnimatedComponent(Box);
  const id = route.params.id
      useEffect(()=>{
          axios.get(`http://10.0.2.2:8085/api/readEvent/${id}`)
          axios.get(`http://10.0.2.2:8085/api/readEventAdress/${id}`)
          .then(response =>{  
            setNConvidados(response.data.nConvidados)
            setNomeEvento(response.data.nomeEvento)
            setDescricao(response.data.descricao)
            setImagemBase64(response.data.imagemBase64)
            setDataEvento(response.data.dataEvento)
            setHoraEvento(response.data.horaEvento)
              //Ordenar os dados pelo id em ordem crescente
              const sortData= response.data.sort((a,b) => a.id - b.id);
              setData(sortData);
              
          })
          .catch(error => {
              console.log(JSON.stringify(error));
          });
          
      },[]);
      useEffect(()=>{
          axios.get(`http://10.0.2.2:8085/api/readEventAdress/${id}`)
         
          .then(response =>{  
            
            setRua(response.data.rua)
            setBairro(response.data.bairro)
            setNumero(response.data.numero)
            
              //Ordenar os dados pelo id em ordem crescente
              const sortData= response.data.sort((a,b) => a.id - b.id);
              setData(sortData);
              
          })
          .catch(error => {
              console.log(JSON.stringify(error));
          });
          
      },[]);

      const enteringScreenAnimation = new Keyframe({
        0: {
         opacity: 0
        },
        25: {
          opacity: 0.25
        },
        
        50: {
          opacity: 0.5
        },
        75: {
          opacity: 0.75
        },
      
        100: {
          opacity: 1
          
        },
      }).duration(1000);

      const enteringImageAnimation = new Keyframe({
        0: {
          transform: [
            { translateY: 350 },
            {scaleX:0},
            {scaleY:0},
          ]
        },
        25: {
          transform: [
            { translateY: 250 },
            {scaleX:0.25},
            {scaleY:0.25},
          ]
        },
        
        50: {
          transform: [
            { translateY: 200 },
            {scaleX:0.50},
            {scaleY:0.50},
          ]
        },
        75: {
          transform: [
            { translateY: 100 },
            {scaleX:0.75},
            {scaleY:0.75},
          ]
        },
      
        100: {
          transform: [
            { translateY: 0 },
            {scaleX:1},
            {scaleY:1},
          ]
          
        },
      }).duration(700);

      const enteringTextAnimation = new Keyframe({
        0: {
          transform: [
            { translateY: 350 },
            {scaleX:0},
            {scaleY:0},
          ]
        },
        25: {
          transform: [
            { translateY: 250 },
            {scaleX:0.25},
            {scaleY:0.25},
          ]
        },
        
        50: {
          transform: [
            { translateY: 200 },
            {scaleX:0.50},
            {scaleY:0.50},
          ]
        },
        75: {
          transform: [
            { translateY: 100 },
            {scaleX:0.75},
            {scaleY:0.75},
          ]
        },
      
        100: {
          transform: [
            { translateY: 0 },
            {scaleX:1},
            {scaleY:1},
          ]
          
        },
      }).duration(600).delay(500);
      return (
    
   
    <SafeAreaView bg='#EDE9E4' h={'100%'} >
    
    <StatusBar hidden/>

    <ScrollView showsVerticalScrollIndicator={false}>
      <AnimatedBox entering={enteringScreenAnimation} bg='#EDE9E4' flex={1}>
      <Box>
          <Animated.Image
          entering={enteringImageAnimation}

          style={{top: 0, width: '100%', height: 350}}
          alt="ahghksa"
          source={{
                    uri: `data:image/jpeg;base64,${imagemBase64}`
                  }} />
     </Box>

<AnimatedBox marginBottom={15} entering={enteringTextAnimation}>
          <Text color={'#AA7E39'}  alignSelf="center" fontWeight={'$bold'} margin={25} fontSize={35}>{nomeEvento}</Text>
          <Text color={'black'}  w={'90%'} alignSelf="center" fontWeight={'$light'} margin={0} fontSize={15}>{descricao}</Text>

          <Box marginTop={20} marginLeft={25} alignItems="center" flexDirection="row">
          <Text color={'#AA7E39'}  alignSelf="flex-start" fontWeight={'$bold'}  fontSize={20}>Data </Text>
          <Icon as={Calendar} color="#AA7E39" w={12} h={15} />
          </Box>
        
          <Text color={'black'}  alignSelf="flex-start" fontWeight={'$light'} marginLeft={25} fontSize={17}>{moment(dataEvento).format('DD/MM/YYYY')}</Text>


          <Box marginTop={20} marginLeft={25} alignItems="center" flexDirection="row">
          <Text color={'#AA7E39'}  alignSelf="flex-start" fontWeight={'$bold'}  fontSize={20}>Horário </Text>
          <Icon as={Clock} color="#AA7E39" w={12} h={12} />
          </Box>
          <Text color={'black'}  alignSelf="flex-start" fontWeight={'$light'} marginLeft={25} fontSize={17}>{horaEvento}</Text>

          <Box marginTop={20} alignSelf='center' alignItems="center" flexDirection="row">
          <Text color={'#AA7E39'}  alignSelf="flex-start" fontWeight={'$bold'}  fontSize={20}>Endereço </Text>
          <Icon as={Building2} color="#AA7E39" w={12} h={12} />
          </Box>

<Box h={'auto'} marginTop={25} flexDirection="row" alignItems="center">
<Text color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$semibold'} marginLeft={25} fontSize={18}>Rua</Text>
<Text color={'black'}  alignSelf="flex-start" fontWeight={'$light'} marginTop={2} marginLeft={10} fontSize={15}>{rua}.</Text>
</Box>

<Box h={'auto'} marginTop={25} flexDirection="row" alignItems="center">
<Text color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$semibold'} marginLeft={25} fontSize={18}>Bairro:</Text>
<Text color={'black'}  alignSelf="flex-start" fontWeight={'$light'} marginTop={2} marginLeft={10} fontSize={15}>{bairro}.</Text>
</Box>

<Box h={'auto'} marginTop={25} flexDirection="row" alignItems="center">
<Text color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$semibold'} marginLeft={25} fontSize={18}>Número:</Text>
<Text color={'black'}  alignSelf="flex-start" fontWeight={'$light'}  marginLeft={10} fontSize={18}>{numero}</Text>
</Box>
          
</AnimatedBox>

        
       
        


         
      </AnimatedBox>
    



    </ScrollView>

   
    </SafeAreaView>
    
  )
}

