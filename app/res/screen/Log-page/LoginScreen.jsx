// Gabriel / RC
import React, {useEffect, useState} from "react";
import {View, Alert, StyleSheet} from 'react-native';
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
import Animated, { BounceIn, Easing, FadeInRight, FadeOutLeft, LightSpeedInLeft, ReduceMotion, SlideInLeft, StretchInX, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { SharedTransition, withSpring } from 'react-native-reanimated';
export default function LoginScreen({navigation}) {
  const AnimatedCenter = Animated.createAnimatedComponent(Center);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(scale.value * 0.9, { duration: 900 }),
      -1,
      true
    );
  }, []);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  FadeOutLeft.duration(500).easing(Easing.ease);
  BounceIn.duration(1000)
  .delay(500)
  .randomDelay()
  .reduceMotion(ReduceMotion.Never)
  .withInitialValues({ transform: [{ translateY: -420 }] })
  .withCallback((finished) => {
    console.log(`finished without interruptions: ${finished}`);
  });

  SlideInLeft.duration(900).easing(Easing.ease);
 
  SlideInLeft.springify()
  .damping(30)
  .mass(10)
  .stiffness(10)
  .overshootClamping(false)
  .restDisplacementThreshold(0.1)
  .restSpeedThreshold(5);

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showAlertDialog2, setShowAlertDialog2] = React.useState(false);
  const [showAlertDialog3, setShowAlertDialog3] = React.useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {

    try {

        //verificar se os campos foram preenchidos

        if (!email || !senha) {
            setShowAlertDialog(true)
            return;
        }


        if (!email.includes('@')) {
            setShowAlertDialog3(true)
            return;
        }


        //Objetivo para enviar para a API
        const data = {
            email: email.toLowerCase(),
            senha: senha
        }

        console.log(data)

        //Envio dos dados para a API

        const response = await axios.post('http://10.0.2.2:8085/api/validation', data);

        //Verificar se o login foi efetuado com sucesso

        if (response.status === 200) {
            setEmail('');
            setSenha('');
            const userData = {
                id: response.data.id,
                nome: response.data.nome,
                sobrenome: response.data.sobrenome,
                email: response.data.email,
                senha: response.data.senha,
            }
            console.log(userData)
            navigation.navigate('Home', {userData});
        }
        else {
          setShowAlertDialog2(true)
        }

    }
    catch (error) {
        if (error.response && error.response.status === 401) {
          setShowAlertDialog2(true)


        }

        else {
            console.log(error)
            Alert.alert('Ocorreu um erro ao tentar fazer login')
        }
    };
  };

  

  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })};

   

  return (
   
    <SafeAreaView  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='#EDE9E4'>
    
    <StatusBar hidden/>

   


   <Animated.View entering={FadeInRight} exiting={FadeOutLeft} w={'100%'} h={'100%'}>

<KeyboardAvoidingView behavior="position">







<AnimatedCenter  style={[scaleStyles]} h={100} w={415} marginBottom={25}>

<Image
w={'100%'}
size="lg"
source={topImage}
alt="topimg"
/>

</AnimatedCenter>





<ScrollView>




<Center marginTop={75} alignItems="center" justifyContent="center">

<Box h={'auto'} w={'100%'} marginTop={-35} marginBottom={15} justifyContent="center" alignItems="center">
<Animated.View entering={BounceIn}>
<Image
size="xl"
source={logo}
alt="logo"
/>
</Animated.View>

</Box>


<Animated.View entering={StretchInX}>
<Text color={'#A87B34'} fontSize={24} fontWeight='$extrabold' marginVertical={10}>LOGIN</Text>
</Animated.View>


<Animated.View entering={SlideInLeft}>
<Input
borderRadius={12}
bg='#FFFF'
w={'80%'}
h={50}
variant="outline"
size="md"
isDisabled={false}
isInvalid={false}
isReadOnly={false}
$focus-borderColor={'#A87B34'}

>
<InputField onChangeText={setEmail} value={email.toLowerCase()} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="EMAIL:" placeholderTextColor={'#A87B34'}  />
</Input>
</Animated.View>

<Animated.View entering={SlideInLeft}>
<Input
marginVertical={10}
borderRadius={12}
bg='#FFFF'
w={'80%'}
h={50}
variant="outline"
size="md"
isDisabled={false}
isInvalid={false}
isReadOnly={false}
$focus-borderColor={'#A87B34'}

>
<InputField $focus-borderColor={'#A87B34'} onChangeText={setSenha}
value={senha} type={showPassword ? "text" : "password"} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="SENHA:" placeholderTextColor={'#A87B34'}  />

<InputSlot pr="$3" onPress={handleState}>
          <InputIcon
            as={showPassword ? EyeIcon : EyeOffIcon}
            color="#A87B34"
          />
</InputSlot>
</Input>
</Animated.View>



<Button w={170} borderRadius={15} borderWidth={1.5} borderColor={'#A87B34'} marginTop={20} marginBottom={35} variant="outline" onPress={handleLogin}>
<ButtonText color={'#A87B34'} fontWeight='$bold'>ENTRAR</ButtonText>
</Button>


<Center flexDirection="row">

<Text color={'#A87B34'} fontSize={13} fontWeight='$extrabold' marginTop={10}>Não tem uma conta?</Text> 


<Button w={70} borderWidth={0} marginTop={10} variant="link" onPress={() => navigation.navigate('SignIn')}>
<ButtonText color={'#6FBFEF'} fontSize={15} fontWeight='$bold' >Crie uma</ButtonText>
</Button>

</Center>




</Center>




</ScrollView>











<>
<AlertDialog
isOpen={showAlertDialog}
onClose={() => {
setShowAlertDialog(false)
}}
>
<AlertDialogBackdrop/>
<AlertDialogContent bg='#EDE9E4'>
<AlertDialogHeader>
  <Heading color='#A87B34' size="lg">Insira um email e uma senha!</Heading>
  <AlertDialogCloseButton>
   
  </AlertDialogCloseButton>
</AlertDialogHeader>
<AlertDialogBody>
  <Text  size="sm">
   Os campos para login estão vazios, para continuar você deve inserir um email e uma senha válidos!
  </Text>
</AlertDialogBody>
<AlertDialogFooter>
  <Center space="lg">
   
    <Button
      
      variant="outline"
      borderColor={'#A87B34'}
      onPress={() => {
        setShowAlertDialog(false)
      }}
    >
      <ButtonText color={'#A87B34'}>OK</ButtonText>
    </Button>
  </Center>
</AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>

</>



<>
<AlertDialog
isOpen={showAlertDialog2}
onClose={() => {
setShowAlertDialog2(false)
}}
>
<AlertDialogBackdrop />
<AlertDialogContent>
<AlertDialogHeader>
  <Heading color='#A87B34' size="lg">Email ou senha incorretos!</Heading>
  <AlertDialogCloseButton>
   
  </AlertDialogCloseButton>
</AlertDialogHeader>
<AlertDialogBody>
  <Text size="sm">
   Os campos para login não constam em nossa base de dados, para continuar você deve inserir um email e uma senha válidos!
  </Text>
</AlertDialogBody>
<AlertDialogFooter>
  <Center space="lg">
   
  <Button
      
      variant="outline"
      borderColor={'#A87B34'}
      onPress={() => {
        setShowAlertDialog2(false)
      }}
    >
      <ButtonText color={'#A87B34'}>OK</ButtonText>
    </Button>
  </Center>
</AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>

</>

<>
<AlertDialog
isOpen={showAlertDialog3}
onClose={() => {
setShowAlertDialog3(false)
}}
>
<AlertDialogBackdrop />
<AlertDialogContent>
<AlertDialogHeader>
  <Heading color='#A87B34' size="lg">Email incorreto!</Heading>
  <AlertDialogCloseButton>
   
  </AlertDialogCloseButton>
</AlertDialogHeader>
<AlertDialogBody>
  <Text size="sm">
  O email inserido está incorreto tente incluir algum provedor seguido do caractere '@' Exemplo: '@gmail, @hotmail, @aluno.senai'. 
  </Text>
</AlertDialogBody>
<AlertDialogFooter>
  <Center space="lg">
   
  <Button
      
      variant="outline"
      borderColor={'#A87B34'}
      onPress={() => {
        setShowAlertDialog3(false)
      }}
    >
      <ButtonText color={'#A87B34'}>OK</ButtonText>
    </Button>
  </Center>
</AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>

</>

</KeyboardAvoidingView>

<AnimatedCenter style={[scaleStyles]} h={100} w={415} marginTop={-8}>

<Image
w={'100%'}
size="lg"
source={bottomImage}
alt="Bottomimg"
/>
</AnimatedCenter>
</Animated.View>


  


      
    </SafeAreaView>
    
  )
}


const styles = StyleSheet.create({
  center: {
    height: 'auto',
    width: 'auto',
  
  },
});