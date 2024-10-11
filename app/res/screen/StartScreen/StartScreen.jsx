// Gabriel / RC
import React from "react";
import {StyleSheet} from 'react-native';
import { Center, ScrollView, StatusBar,} from '@gluestack-ui/themed';
import {Button,ButtonText} from "@gluestack-ui/themed";
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogFooter,AlertDialogBody } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { Box, SafeAreaView, Image, } from '@gluestack-ui/themed';
import topImage from '../../../src/img/image-removebg-preview.png';
import bottomImage from '../../../src/img/image-removebg-preview2.png';
import logo from '../../../src/img/logo.png';
import Animated, { Easing, FadeInLeft, FadeInRight, FadeOutLeft, ReduceMotion, SlideInLeft, StretchInX, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { withRepeat } from 'react-native-reanimated';
export default function StartScreen({navigation}) {
const easing = Easing.bezier(0.90, -0.5, 0.25, 1);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showAlertDialog2, setShowAlertDialog2] = React.useState(false);
  const [showAlertDialog3, setShowAlertDialog3] = React.useState(false);
  const AnimatedBox = Animated.createAnimatedComponent(Box);
  const AnimatedCenter = Animated.createAnimatedComponent(Center);
  const sv = useSharedValue(1);
  const scale = useSharedValue(1);
  React.useEffect(() => {
    sv.value = withRepeat( withRepeat(
        withTiming(-1, { duration: 1300, easing }),
        -1,
        true,
        () => {},
        ReduceMotion.Never,
      ), -1);
  }, []);


  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(scale.value * 0.9, { duration: 900 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 0.09}rad`}],
  }));

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));


  


   

  return (
   
    <SafeAreaView  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='#EDE9E4'>
    
    <StatusBar hidden/>

   


   <Animated.View entering={FadeInRight} exiting={FadeOutLeft} w={'100%'} h={'100%'}>

<KeyboardAvoidingView behavior="position">







<AnimatedCenter style={[styles.center, scaleStyles]} h={100} w={415} marginBottom={25}>

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



<AnimatedBox alignItems={'center'} justifyContent={'center'}
style={[styles.box,]}>
<Image
w={130}
h={100}
source={logo}
alt="logo"
/>
</AnimatedBox>



</Box>


<Animated.View entering={StretchInX}>
<Text color={'#A87B34'} fontSize={24} fontWeight='$extrabold' marginVertical={10}>BEM-VINDO À EVENTCRAFT</Text>
</Animated.View>


<Animated.View entering={SlideInLeft}>

</Animated.View>

<Animated.View entering={SlideInLeft}>

</Animated.View>



<Animated.View entering={FadeInLeft}>
    <Button w={170} borderRadius={15} borderColor={'#A87B34'} marginTop={70} marginBottom={35} variant="outline" onPress={() => navigation.navigate('Login')}>
    <ButtonText color={'#A87B34'} fontWeight='$bold'>ENTRAR</ButtonText>
    </Button>
</Animated.View>
<Animated.View entering={FadeInRight}>
<Button w={170} borderRadius={15} bg={'#A87B34'} borderColor={'#'} marginTop={-20} marginBottom={35} variant="solid" onPress={() => navigation.navigate('SignIn')}>
<ButtonText color={'#FFF'} fontWeight='$bold'>REGISTRAR-SE</ButtonText>
</Button>

</Animated.View>



</Center>




</ScrollView>


</KeyboardAvoidingView>

<AnimatedCenter style={[styles.center, scaleStyles]} h={100} w={415} marginTop={-8}>

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