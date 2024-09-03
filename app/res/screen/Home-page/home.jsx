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
import { withTiming, withSpring } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import { AvatarFallbackText } from "@gluestack-ui/themed";
import { Dimensions, } from "react-native";
import teste from '../../../src/img/evento1.png'
import teste2 from '../../../src/img/evento2.jpg'
 
// const imageUrls = [
//   'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png',
//   'https://media.geeksforgeeks.org/wp-content/uploads/20210224040124/JSBinCollaborativeJavaScriptDebugging6-300x160.png',
//   'https://media.geeksforgeeks.org/wp-content/uploads/20230816223732/geeksgforgeeks-logo.jpg',
//   'https://media.geeksforgeeks.org/wp-content/uploads/20230816223829/geeksgforgeeks-logo-1.png',
// ];
function HomeScreen() {
  const [imageSource, setImageSource] = useState('');


//   const generateRandomImage = () => {
//     const randomIndex = 
//           Math.floor(Math.random() * imageUrls.length);
//     setImageSource(imageUrls[randomIndex]);
// };

  return (
    <SafeAreaView sharedTransitionTag="sharedTag"  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='white'>
    
    <StatusBar hidden/>

   
    <Box w={'100%'} h={'100%'}>


<ScrollView>



<Box alignItems="center" justifyContent="center">



<Box  w={'100%'} h={260} bg='#EDE9E4' marginHorizontal={30}>

<Box h={'auto'}>


<Text color={'#AA7E39'} marginTop={60} marginHorizontal={20} fontSize={15}>Olá</Text>

<Text color={'#AA7E39'} marginHorizontal={20} fontWeight='bold' fontSize={17}>XXXX</Text>


<Avatar marginLeft={350} marginTop={-40} bgColor="$coolGray500" size="md" borderRadius="$full">
  <AvatarFallbackText>Luís Felipe</AvatarFallbackText>
</Avatar>

</Box>


<Input h={50} alignSelf="center" marginVertical={30} $focus-borderColor={'#A87B34'} w={'80%'} bg={'white'} borderRadius={10} >
  <InputSlot pl="$3">
  <Ionicons name={'search'} size={20} color={'#9B8A6F'} />
  </InputSlot>
  <InputField $focus-borderColor={'#A87B34'} alignItems="center" fontSize={13} justifyContent="center" placeholderTextColor={'#9B8A6F'}  placeholder="Pesquisar eventos..." />
</Input>


</Box>

<Center marginVertical={-4}>



<Box alignSelf="center" alignItems="center" w={400} marginVertical={0}>


</Box>



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

const Tab = createBottomTabNavigator();
export default function Home({navigation}) {
  
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
    <Tab.Screen options={{headerShown: false}} name="Página Inicial" component={HomeScreen} />
    <Tab.Screen options={{headerShown: false}} name="Eventos" component={EventsScreen} />
  </Tab.Navigator>


    
  )
}

