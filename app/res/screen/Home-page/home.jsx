// Gabriel / RC
import React, {useState} from "react";
import {View, Alert} from 'react-native';
import { Avatar, Center, ScrollView, StatusBar,} from '@gluestack-ui/themed';
import {Button,ButtonText,ButtonIcon,ButtonSpinner,ButtonGroup,} from "@gluestack-ui/themed";
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogFooter,AlertDialogBody,Input, InputField, InputSlot, InputIcon, EyeOffIcon, EyeIcon } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import axios from 'axios';
import { Icon } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { Box, SafeAreaView, Image, ImageBackground } from '@gluestack-ui/themed';
import topImage from '../../../src/img/image-removebg-preview.png';
import bottomImage from '../../../src/img/image-removebg-preview2.png';
import logo from '../../../src/img/logo2.png';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchIcon } from "lucide-react";
import { Card } from '@gluestack-ui/themed';
import { withTiming, withSpring, useAnimatedStyle, withRepeat, useSharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import { AvatarFallbackText } from "@gluestack-ui/themed";
import { Dimensions, } from "react-native";
import teste from '../../../src/img/evento1.png'
import teste2 from '../../../src/img/evento2.jpg'




function HomeScreen({navigation, route}) {

  const { id, nome, sobrenome, email, senha } = route.params.obj;

  console.log(id)

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];
    return randomElement;
}

const array = [
'https://isep.org.br/wp-content/uploads/2021/02/sp_criancas_festa_aniversario_bacana-1.jpeg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeDfl-_svu8jLAcWyhD3DcjAbFmvIbBpQwwA&s',
'https://i.em.com.br/IQ1l_dkc9VYK5P8PW-EaTphOuF4=/790x/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/21/1496049/uma-cor-que-esta-totalmente-proibida-para-as-convidadas-de-acordo-com-a-etiqueta-de-casamento-e-o-branco-que-esta-reservado-para-as-noivas-a-nao-ser-que-o-casamento-seja-na-praia_1_55583.jpg',
'https://cdn.prod.website-files.com/636d4036709c50b9ac704e98/65b157c74e6fb6c92b778c37_eventos-inovacao-tecnologia_2024_numerik.jpg',
];
const randomElement = getRandomElement(array);

 


  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const AnimatedBox = Animated.createAnimatedComponent(Box);
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
  const scaleBox = useSharedValue(1);


  React.useEffect(() => {
    scaleBox.value = withRepeat(
      withTiming(scaleBox.value * 0.98, { duration: 800 }),
      -1,
      true
    );
  }, []);

  const scaleBoxStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scaleBox.value }],
  }));
  const [imageSource, setImageSource] = useState('');




  return (
    <SafeAreaView sharedTransitionTag="sharedTag"  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='white'>
    
    <StatusBar hidden/>

   
    <Box w={'100%'} h={'100%'}>


<ScrollView>



<Box alignItems="center" justifyContent="center">



<Box  w={'100%'} h={260} bg='#EDE9E4' marginHorizontal={30}>

<Box h={'auto'}>


<Text color={'#AA7E39'} marginTop={70} marginHorizontal={40} fontSize={15}>Olá</Text>

<Text color={'#AA7E39'} marginTop={8} marginHorizontal={40} fontWeight='bold' fontSize={15}>{nome} {sobrenome}</Text>


<Avatar marginLeft={350} marginTop={-40} bgColor="$coolGray500" size="md" borderRadius="$full">
  <AvatarFallbackText>{nome}</AvatarFallbackText>
</Avatar>



</Box>


<Input h={50} alignSelf="center" marginVertical={30} $focus-borderColor={'#A87B34'} w={'80%'} bg={'white'} borderRadius={10} >
  <InputSlot pl="$3">
  <Ionicons name={'search'} size={20} color={'#9B8A6F'} />
  </InputSlot>
  <InputField $focus-borderColor={'#A87B34'} alignItems="center" fontSize={13} justifyContent="center" placeholderTextColor={'#9B8A6F'}  placeholder="Pesquisar eventos..." />
</Input>




</Box>

<Center h={'auto'} marginVertical={-3}>



<AnimatedBox style={[scaleBoxStyles]}  alignSelf="center" alignItems="center" w={400} h={190} marginTop={-25}>

<Image 
tintColor={'black'}
position="absolute"
opacity={0.95}
 h={160}
 borderRadius={20}

 w={'90%'}
 source={{ uri: randomElement }}
 alt="logo"
 />
<Image 
opacity={0.5}
 h={160}
 borderRadius={20}
 w={'90%'}
 source={{ uri: randomElement }}
 alt="logo"
 />
 <Text bg={'red'} position="absolute" fontWeight={"$extrabold"} fontSize={15} color={'white'} marginTop={105}> Comece Já! </Text>
 <Text marginTop={40} fontWeight={"$extrabold"} fontSize={25} color={'white'} position="absolute">Planeje seus eventos</Text>
 <Text marginTop={70} fontWeight={"$extrabold"} fontSize={20} color={'white'} position="absolute">Da melhor maneira!</Text>
</AnimatedBox>



</Center>



</Box>




</ScrollView>





</Box>
  


      
    </SafeAreaView>
  );
}

function EventsScreen() {
  LocaleConfig.locales['br'] = {
    monthNames: [
      'JANEIRO',
      'FEVEREIRO',
      'MARÇO',
      'ABRIL',
      'MAIO',
      'JUNHO',
      'JULHO',
      'AGOSTO',
      'SETEMBRO',
      'OUTUBRO',
      'NOVEMBRO',
      'DEZEMBRO'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: "Hoje"
  };
  
  LocaleConfig.defaultLocale = 'br';
  const [selected, setSelected] = useState('');
  return (
    <SafeAreaView  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='#EDE9E4'>

      <Center h={'100%'} marginTop={-290}>
        <Box h={'auto'} w={'100%'} marginTop={-130} marginBottom={10} alignItems="center">
          <Image
            size="xl"
            w={150}
            source={logo}
            alt="logo"
            />
        </Box>

        <Text color={'#9B8A6F'} fontSize={24} fontWeight='$light' marginVertical={0}>MEUS EVENTOS</Text>
      </Center>

      <Center alignItems="center" justifyContent="center" marginTop={-290}>
      <Calendar 
      theme={{
        backgroundColor: '#EDE9E4',
        calendarBackground: '#EDE9E4',
        textSectionTitleColor: '#AA7E39',
        selectedDayBackgroundColor: '#AA7E39',
        selectedDayTextColor: '#ffffff',
        todayTextColor: 'black',
        dayTextColor: 'black',
        textDisabledColor: 'gray',
        monthTextColor: '#AA7E39',
        textMonthFontWeight: 'bold',
        arrowColor: "#AA7E39",
        
      }}
      style={{
      backgroundColor: '#EDE9E4',
      width: 340,
      height: 350
  }}
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'},
        '2024-03-01': {selected: true, marked: true, selectedColor: ''},
        '2024-03-02': {marked: true},
        '2024-03-03': {selected: true, marked: true, selectedColor: ''}
      }}
    />
      </Center>

  </SafeAreaView>
  );
}

function CreateEventScreen(){

}

const Tab = createBottomTabNavigator();
export default function Home({navigation, route}) {
  const AnimatedBox = Animated.createAnimatedComponent(Box);
  const scale = useSharedValue(1);


  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(scale.value * 0.9, { duration: 800 }),
      -1,
      true
    );
  }, []);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const obj = route.params.userData;
  return (
   
    <Tab.Navigator
 
   
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Página Inicial') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Eventos') {
          iconName = focused
           ? 'calendar'
           : 'calendar-outline';
        }
         

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={20} color={color} />;
      },

      tabBarStyle: {
        height: 50,
        backgroundColor: 'white',
        borderColor: '#EDE9E4',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
      tabBarActiveTintColor: '#AA7E39',
      tabBarInactiveTintColor: '#AA7E39',
     
      
    }
    
    )}
  >
    <Tab.Screen initialParams={{obj}} options={{headerShown: false}} name="Página Inicial" component={HomeScreen} />
    <Tab.Screen initialParams={{ obj }}
     options={{headerShown: false, tabBarIcon: ({focused, color, size}) => {
            return (
              <AnimatedBox style={[scaleStyles]} position="absolute" >
                <Box alignItens="center" marginBottom={40}>
                  <Ionicons name={'add-circle'} size={70} color={color}/>
                </Box>
              </AnimatedBox>
            );
          },
          }} name="Criar-Evento" component={CreateEventScreen} />
    <Tab.Screen initialParams={{ obj }} options={{headerShown: false}} name="Eventos" component={EventsScreen} />
  </Tab.Navigator>


    
  )
}

