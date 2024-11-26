
import React, { useEffect, useState } from "react";
import { Center, ScrollView, Spinner, StatusBar, VStack, } from '@gluestack-ui/themed';
import { Button, ButtonText, ButtonIcon, ButtonSpinner, ButtonGroup, } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import axios from 'axios';
import { Heading } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { Box, SafeAreaView, Image, ImageBackground } from '@gluestack-ui/themed';
import logo from '../../../src/img/logo.png';
import Animated, { BounceIn, Easing, FadeInRight, FadeOutLeft, Keyframe, LightSpeedInLeft, ReduceMotion, SlideInLeft, StretchInX, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { SharedTransition, withSpring } from 'react-native-reanimated';
import moment from "moment";
import { Building2, Calendar, Clock, LockKeyhole } from "lucide-react-native";
import api from "../../props/api";


export default function Evento({ navigation, route }) {

// const de animação de entrada da tela
  const enteringScreenAnimation = new Keyframe({
    0: {
      opacity: 0
    },
    25: {
      opacity: 0.25
    },

    50: {
      opacity: 0.50
    },
    75: {
      opacity: 0.75
    },

    100: {
      opacity: 1

    },
  }).duration(550).delay(100);

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
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const id = route.params.id
  useEffect(() => {
    api.get(`/api/readEvent/${id}`)
      // axios.get(`http://192.168.15.10:8085/api/readEvent/${id}`)
      .then(response => {
        setNConvidados(response.data.nConvidados)
        setNomeEvento(response.data.nomeEvento)
        setDescricao(response.data.descricao)
        setImagemBase64(response.data.imagemBase64)
        setDataEvento(response.data.dataEvento)
        setHoraEvento(response.data.horaEvento)
        //Ordenar os dados pelo id em ordem crescente

      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });

  }, []);
  useEffect(() => {
    // axios.get(`http://10.0.2.2:8085/api/readEventAdress/${id}`)
    api.get(`/api/readEventAdress/${id}`)

      .then(response => {

        setRua(response.data.rua)
        setBairro(response.data.bairro)
        setNumero(response.data.numero)

      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });

  }, []);



  const [isLoading, setIsLoading] = useState(true);
  return (


    <SafeAreaView bg='#EDE9E4' h={'100%'} >

      <StatusBar hidden />

      <ScrollView showsVerticalScrollIndicator={false}>

        {isLoading &&
          <Box justifyContent="center" h={'100%'} alignSelf="center">



            <Image alignSelf="center" marginTop={-65} marginBottom={15} alt="logo" w={150} h={110} source={logo} />


            <Spinner alignSelf="center" color={'#AA7E39'} size={"large"} />

          </Box>
        }
        <AnimatedBox entering={enteringScreenAnimation} bg='#EDE9E4' flex={1}>

          <Box w={'100%'} h={250}>

            <Animated.Image

              onLoadEnd={() => setIsLoading(false)}

              style={{ top: 0, width: '100%', height: 250 }}
              alt="ahghksa"
              source={{
                uri: `data:image/jpeg;base64,${imagemBase64}`
              }} />
          </Box>

          <AnimatedBox marginBottom={15}>
            <AnimatedText color={'#AA7E39'} alignSelf="center" fontWeight={'$bold'} margin={25} fontSize={35}>{nomeEvento}</AnimatedText>
            <AnimatedText color={'black'} w={'90%'} alignSelf="center" fontWeight={'$light'} margin={0} fontSize={15}>{descricao}</AnimatedText>

            <Box marginTop={20} marginLeft={25} alignItems="center" flexDirection="row">
              <AnimatedText color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$bold'} fontSize={20}>Data</AnimatedText>
              <Icon as={Calendar} color="#AA7E39" w={12} h={15} />
            </Box>

            <AnimatedText color={'black'} alignSelf="flex-start" fontWeight={'$light'} marginLeft={25} fontSize={17}>{moment(dataEvento).format('DD/MM/YYYY')}</AnimatedText>


            <Box marginTop={20} marginLeft={25} alignItems="center" flexDirection="row">
              <AnimatedText color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$bold'} fontSize={20}>Horário </AnimatedText>
              <Icon as={Clock} color="#AA7E39" w={12} h={12} />
            </Box>
            <AnimatedText color={'black'} alignSelf="flex-start" fontWeight={'$light'} marginLeft={25} fontSize={17}>{horaEvento}</AnimatedText>

            <Box marginTop={20} alignSelf='center' alignItems="center" flexDirection="row">
              <Text color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$bold'} fontSize={20}>Endereço </Text>
              <Icon as={Building2} color="#AA7E39" w={12} h={12} />
            </Box>

            <Box h={'auto'} marginTop={25} flexDirection="row" alignItems="center">
              <Text color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$semibold'} marginLeft={25} fontSize={18}>Rua</Text>
              <Text color={'black'} alignSelf="flex-start" fontWeight={'$light'} marginTop={2} marginLeft={10} fontSize={15}>{rua}.</Text>
            </Box>

            <Box h={'auto'} marginTop={25} flexDirection="row" alignItems="center">
              <Text color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$semibold'} marginLeft={25} fontSize={18}>Bairro:</Text>
              <Text color={'black'} alignSelf="flex-start" fontWeight={'$light'} marginTop={2} marginLeft={10} fontSize={15}>{bairro}.</Text>
            </Box>

            <Box h={'auto'} marginTop={25} flexDirection="row" alignItems="center">
              <Text color={'#AA7E39'} alignSelf="flex-start" fontWeight={'$semibold'} marginLeft={25} fontSize={18}>Número:</Text>
              <Text color={'black'} alignSelf="flex-start" fontWeight={'$light'} marginLeft={10} fontSize={18}>{numero}</Text>
            </Box>

          </AnimatedBox>







        </AnimatedBox>




      </ScrollView>


    </SafeAreaView>

  )
}

