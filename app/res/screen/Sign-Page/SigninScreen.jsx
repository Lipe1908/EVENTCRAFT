// Gabriel / RC
import React, {useState} from "react";
import {View, Alert, StyleSheet} from 'react-native';
import { Center, ScrollView, StatusBar,} from '@gluestack-ui/themed';
import {Button,ButtonText,ButtonIcon,ButtonSpinner,ButtonGroup,} from "@gluestack-ui/themed";
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogFooter,AlertDialogBody,Input, InputField, InputSlot, InputIcon, EyeOffIcon, EyeIcon } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed"
import { Heading } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { Box, SafeAreaView, Image, ImageBackground } from '@gluestack-ui/themed';
import topImage from '../../../src/img/image-removebg-preview.png';
import bottomImage from '../../../src/img/image-removebg-preview2.png';
import logo from '../../../src/img/logo.png';
import axios from 'axios'
import { BounceIn, Easing, FadeIn, FadeInRight, FadeOut, FadeOutLeft, Keyframe, ReduceMotion, SlideInLeft, SlideInRight, StretchInX, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { SharedTransition, withSpring } from 'react-native-reanimated';
export default function SigninScreen({navigation}) {
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

  FadeOutLeft.duration(2000).easing(Easing.ease);
  BounceIn.duration(2000)
  .delay(100)
  .randomDelay()
  .reduceMotion(ReduceMotion.Never)
  .withInitialValues({ transform: [{ translateY: -1100 }] })
  .withCallback((finished) => {
    console.log(`finished without interruptions: ${finished}`);
  });

  SlideInLeft.duration(3000).easing(Easing.ease);
 
  SlideInLeft.springify()
  .delay(500)
  .damping(50)
  .mass(10)
  .stiffness(10)
  .overshootClamping(false)
  .restDisplacementThreshold(0.1)
  .restSpeedThreshold(2);

  SlideInRight.duration(2000).easing(Easing.ease);
 
  SlideInRight.springify()
  .damping(30)
  .mass(10)
  .stiffness(10)
  .overshootClamping(false)
  .restDisplacementThreshold(0.1)
  .restSpeedThreshold(1);


  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showAlertDialog2, setShowAlertDialog2] = React.useState(false);
  const [showAlertDialog3, setShowAlertDialog3] = React.useState(false);

  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })}

    const [formData, setFormData] = useState({
      id: '',
      email: '',
      nome: '',
      sobrenome: '',
      senha: '',
      
  });

  const handleInputChange = (name, value) => {
      setFormData({...formData, [name]:value});
  };

  //validar se campos estão vazios

  const handleCadastrar = async () => {
  
      if(!formData.email || !formData.nome || !formData.sobrenome || !formData.senha){
        setShowAlertDialog(true)
          return;
      }
      //envio de informações para a API cadastrar no banco de dados
      try {
          await axios.post('http://10.0.2.2:8085/api/cadastro', formData);
          setShowAlertDialog2(true)

          setFormData('');

          
      } 
      catch(error){
          console.log(error)
          if(error.response.status === 401) {
              setShowAlertDialog3(true)
          }
          else {
              console.log(error)
          }
      }
  };

  const enteringAnimation = new Keyframe({
    0: {
      opacity: 0,
     
    
    },
    30: {
      opacity: 0.3,
     
    
    },
    50: {
      opacity: 0.5,
      easing: Easing.out(Easing.quad),
    },
    70: {
      opacity: 0.8,
      easing: Easing.out(Easing.quad),
    },
    100: {
      opacity: 1,
      
    },
  }).duration(900);


  const enteringInputAnimation = new Keyframe({
    0: {
      transform: [
        { translateX: -150 },
      ]
    },
    
    50: {
      transform: [
        { translateX: -50 },
      ]
    },
  
    100: {
      transform: [
        { translateX: 0 },
      ]
      
    },
  }).duration(650);

  const enteringInput2Animation = new Keyframe({
    0: {
      transform: [
        { translateX: 150 },
      ]
    },
    
    50: {
      transform: [
        { translateX: 50 },
      ]
    },
  
    100: {
      transform: [
        { translateX: 0 },
      ]
      
    },
  }).duration(650);


  return (
   
    <SafeAreaView  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='#EDE9E4'>
    
    <StatusBar hidden/>


<Animated.View entering={enteringAnimation} exiting={FadeOutLeft} w={'100%'} h={'100%'}>

    

<KeyboardAvoidingView behavior="height">




<ScrollView>
<StatusBar hidden/>

<AnimatedCenter AnimatedCenter style={[scaleStyles]} h={100} w={415} marginBottom={25}>


<Image
w={'100%'}
size="lg"
source={topImage}
alt="topimg"
/>

</AnimatedCenter>










<Center marginTop={75} alignItems="center" justifyContent="center">

<Box h={'auto'} w={'100%'} marginTop={-35} marginBottom={15} justifyContent="center" alignItems="center">
<Animated.View w={'auto'} h={'auto'}>
<Image
size="xl"
source={logo}
alt="logo"
/>
</Animated.View>

</Box>


<Animated.View>
<Text color={'#A87B34'} fontSize={24} fontWeight='$extrabold' marginVertical={10}>REGISTRE-SE</Text>
</Animated.View>

<Animated.View entering={enteringInputAnimation}>
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
<InputField onChangeText={(text)=> handleInputChange('nome' , text)} value={formData.nome} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="NOME:" placeholderTextColor={'#A87B34'}  />
</Input>



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
<InputField onChangeText={(text)=> handleInputChange('sobrenome' , text)} value={formData.sobrenome} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="SOBRENOME:" placeholderTextColor={'#A87B34'}  />
</Input>
</Animated.View>


<Animated.View entering={enteringInput2Animation}>
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
<InputField  onChangeText={(text)=> handleInputChange('email' , text.toLowerCase() )} value={formData.email} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="EMAIL:" placeholderTextColor={'#A87B34'}  />
</Input>

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
<InputField  onChangeText={(text)=> handleInputChange('senha' , text)}  value={formData.senha} $focus-borderColor={'#A87B34'}  type={showPassword ? "text" : "password"} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="SENHA:" placeholderTextColor={'#A87B34'}  />

<InputSlot pr="$3" onPress={handleState}>
          <InputIcon
            as={showPassword ? EyeIcon : EyeOffIcon}
            color="#A87B34"
          />
</InputSlot>
</Input>

</Animated.View>


<Button w={170} onPress={handleCadastrar} borderRadius={15} borderWidth={1.5} borderColor={'#A87B34'} marginTop={20} marginBottom={35} variant="outline">
<ButtonText color={'#A87B34'} fontWeight='$bold' >REGISTRAR</ButtonText>
</Button>


<Center flexDirection="row">

<Text color={'#A87B34'} fontSize={13} fontWeight='$extrabold' marginTop={10}>Já tem uma conta?</Text> 


<Button w={48} borderWidth={0} marginTop={10} variant="link" onPress={() => navigation.push('Login')}>
<ButtonText color={'#6FBFEF'} fontSize={15} fontWeight='$bold' >Entre</ButtonText>
</Button>

</Center>




</Center>


<AnimatedCenter style={[scaleStyles]} h={100} w={415} marginTop={-8}>

<Image
w={'100%'}
size="lg"
source={bottomImage}
alt="Bottomimg"
/>

</AnimatedCenter>


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
  <Heading color='#A87B34' size="lg">Prencha todos os campos para o cadastro!</Heading>
  <AlertDialogCloseButton>
   
  </AlertDialogCloseButton>
</AlertDialogHeader>
<AlertDialogBody>
  <Text  size="sm">
   Os campos para cadastro estão vazios, para continuar você deve preencher todos!
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
  <Heading color='#A87B34' size="lg">Cadastro realizado com sucesso!</Heading>
  <AlertDialogCloseButton>
   
  </AlertDialogCloseButton>
</AlertDialogHeader>
<AlertDialogBody>
  <Text size="sm">
  Você se cadastrou com sucesso em EventCraft, agora acesse sua nova conta fazendo login!
  </Text>
</AlertDialogBody>
<AlertDialogFooter>
  <Center space="lg">
   
  <Button
      
      variant="outline"
      borderColor={'#A87B34'}
      onPress={() => {
        setShowAlertDialog2(false)
        navigation.navigate('Login')
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
  <Heading color='#A87B34' size="lg">Email já cadastrado!</Heading>
  <AlertDialogCloseButton>
   
  </AlertDialogCloseButton>
</AlertDialogHeader>
<AlertDialogBody>
  <Text size="sm">
 Parece que esse email já foi usado para o cadastro em uma conta EventCraft, troque o email ou faça login em sua conta. 
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