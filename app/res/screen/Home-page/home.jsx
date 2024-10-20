
import React, {useEffect, useState} from "react";
import {View, Alert} from 'react-native';
import { ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ArrowLeftIcon, Avatar, AvatarImage, CalendarDaysIcon, Center, Checkbox, CheckboxIndicator, CloseIcon, HStack, Link, Modal, ModalBody, ScrollView, StatusBar,} from '@gluestack-ui/themed';
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
import logo from '../../../src/img/logo.png';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Card } from '@gluestack-ui/themed';
import { withTiming, withSpring, useAnimatedStyle, withRepeat, useSharedValue, BounceInLeft, StretchInX, ReduceMotion, BounceInDown, BounceInUp, FadeInUp, FadeInLeft, FadeInDown, SharedTransition } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import { AvatarFallbackText } from "@gluestack-ui/themed";
import { Dimensions, } from "react-native";
import teste from '../../../src/img/evento1.png'
import teste2 from '../../../src/img/evento2.jpg'
import { ModalBackdrop } from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
import { ModalHeader } from "@gluestack-ui/themed";
import { useIsFocused } from '@react-navigation/native';
import { ModalCloseButton } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";
import { AddIcon } from "@gluestack-ui/themed";
import { EditIcon } from "@gluestack-ui/themed";
import MaskInput, { Masks } from 'react-native-mask-input';
import { InfoIcon } from "@gluestack-ui/themed";
import { PersonStanding, AlignJustify, ImageDown, Pencil, Clock, StretchVertical, Building2, House, ArrowBigRight, CircleX, CheckIcon, LockKeyhole, MailQuestionIcon, CirclePlus, PartyPopper } from "lucide-react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CheckboxIcon } from "@gluestack-ui/themed";
import { CheckboxLabel } from "@gluestack-ui/themed";
import { SegmentedButtons } from 'react-native-paper';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RNFS from 'react-native-fs';
import { SettingsContext } from "react-native-paper/lib/typescript/core/settings";
import { FlatList } from "react-native-gesture-handler";
import { LinkText } from "@gluestack-ui/themed";
import { ArrowRightIcon } from "@gluestack-ui/themed";
import moment from "moment";
import CustomBottomTabBar from "../../props/customTabBar";
import {  Easing, Keyframe,  } from 'react-native-reanimated';
import { Actionsheet } from "@gluestack-ui/themed";
import { ActionsheetDragIndicatorWrapper } from "@gluestack-ui/themed";
import { ActionsheetItem } from "@gluestack-ui/themed";
import { ActionsheetItemText } from "@gluestack-ui/themed";

function HomeScreen({navigation, route}) {


  const { id, nome, sobrenome, email, senha } = route.params.obj;


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


  const [data, setData] = useState([]);
  
      useEffect(()=>{
          axios.get(`http://192.168.15.11:8085/api/readEvents`)
          // axios.get(`http://10.0.2.2:8085/api/readEvents`)
          .then(response =>{
              //Ordenar os dados pelo id em ordem crescente
              const sortData= response.data.sort((a,b) => a.id - b.id);

            
              setData(sortData);
              
          })
          .catch(error => {
              console.log(JSON.stringify(error));
          });

      },[]);

      

      const handleVizualizar = (id) =>{
          navigation.push('Evento', {id})
      };


      const customTransition = SharedTransition.custom((values) => {
        'worklet';
        return {
          height: withSpring(values.targetHeight),
          width: withSpring(values.targetWidth),
          originX: withSpring(values.targetOriginX),
          originY: withSpring(values.targetOriginY),
        };
      });
     

      const [showActionsheet, setShowActionsheet] = React.useState(false)
      const handleClose = () => setShowActionsheet(!showActionsheet)
      

      const renderItem = ({item})=>
      
      
      (
  
         
        <Card w={350} p="$5" borderRadius="$lg" m="$3">
          
      <Animated.Image
      style={{marginBottom: 15, height: 240, width: 315, borderRadius: 9, alignSelf: 'center'}}
        alt="imagemEvento"
        source={{
          uri: `data:image/jpeg;base64,${item.imagemBase64}`
        }}
      />
      <HStack justifyContent="center">
      <Heading size="md" fontFamily="$heading">
      {item.nomeEvento}
      </Heading>
      </HStack>
     

     <HStack alignItems="center" justifyContent="center">
     <Text
     
     fontSize="$sm"
     fontStyle="normal"
     fontFamily="$heading"
     fontWeight="$normal"
     lineHeight="$sm"
     mb={10}
     sx={{
       color: "$textLight700",
       _dark: {
         color: "$textDark200",
       },
     }}
   >
     Data Evento: {moment(item.dataEvento).format('DD/MM/YYYY')}
   </Text>
     </HStack>
      
      <Text mb={10} color={'$black'} fontSize={13} >
       {item.descricao}
      </Text>
      <Button onPress={() => handleVizualizar(item.id)} bg='#AA7E39'>
      {/* <Button onPress={handleClose} bg='#AA7E39'> */}
      <ButtonText>Ver informações do evento</ButtonText>
      </Button>
    
    </Card>

    
        
      );




  return (
    <SafeAreaView  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='white'>
    
    <StatusBar hidden/>

   
    <AnimatedBox   w={'100%'} h={'100%'}>


<ScrollView>
<AnimatedBox  alignItems="center" justifyContent="center">



<Box  w={'100%'} h={260} bg='#EDE9E4' marginHorizontal={30}>

<Box h={'auto'}>


<Text color={'#AA7E39'} marginTop={70} marginHorizontal={30} fontSize={15}>Olá</Text>

<Text color={'#AA7E39'} marginTop={8} marginHorizontal={30} fontWeight='bold' fontSize={15}>{nome} {sobrenome}</Text>


<Avatar alignSelf="flex-end" margin={10} marginTop={-40} bgColor="$coolGray500" size="md" borderRadius="$full">
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



<Text marginBottom={5} color={'#AA7E39'} fontWeight={'$bold'}>Eventos públicos:</Text>





</Center>

<FlatList
                   data={data}
                   renderItem={renderItem}
                   keyExtractor={item => String(item.id)}
                   extraData={data}
                   scrollEnabled={false}
                   />

</AnimatedBox>
</ScrollView>












</AnimatedBox>
  


      
    </SafeAreaView>
  );
}


function EventsScreen({route}) {
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

  const [dataEvento, setDataEvento] = useState([]);
  const id_usuario = route.params.obj.id
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  // const [dayy, setDayy] = useState('')
      useEffect(()=>{
          axios.get(`http://192.168.15.11:8085/api/readEvents/dates/${id_usuario}`)
           // axios.get(`http://10.0.2.2:8085/api/readEventsDates`)
          .then(response =>{
              //Ordenar os dados pelo id em ordem crescent
            
              setData(response.data);
              
          })
          .catch(error => {
              console.log(JSON.stringify(error));
          });

      },[]);



      const renderItem = ({item})=>
      
      
        (
    
          <Actionsheet h="$150" isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
          <ActionsheetBackdrop />
          <ActionsheetContent h={150} zIndex={999}>
            <ActionsheetDragIndicatorWrapper w={'100%'}>
              <ActionsheetDragIndicator  />
            </ActionsheetDragIndicatorWrapper>
            <ScrollView>
            <ActionsheetItem w={'100$'} alignSelf="center">
              <Text fontSize={19} fontWeight="bold" color="#AA7E39">Informações do evento</Text>
            </ActionsheetItem>
            <ActionsheetItem w={'100$'} alignSelf="center">
              <Text fontSize={13} fontWeight="light" color="#AA7E39">Clique nas informações para edita-la</Text>
            </ActionsheetItem>
            <ActionsheetItem w={'50$'} alignSelf="center">
              <Text color="#AA7E39" fontWeight="bold" fontSize={19}>Nome do evento: </Text>
              <Text color="#AA7E39" fontSize={18}>{item.nomeEvento}</Text>
              
            </ActionsheetItem>

            <Animated.Image
                style={{marginBottom: 15, height: 240, width: 315, borderRadius: 0, alignSelf: 'center'}}
                alt="imagemEvento"
                source={{
                 uri: `data:image/jpeg;base64,${item.imagemBase64}`
                  }}
                />


          <Text color="#AA7E39" fontWeight="bold" alignSelf="center" fontSize={19}>Descrição do evento: </Text>
              <Text color="#AA7E39" alignSelf="center" fontSize={15}>{item.descricao}</Text>      
          <Text marginTop={10} color="#AA7E39" fontWeight="bold" alignSelf="center" fontSize={19}>Data do evento: </Text>
              <Text color="#AA7E39" alignSelf="center" fontSize={20}>{moment(item.dataEvento).format('DD/MM/YYYY')}</Text> 
     
            </ScrollView>
      
          </ActionsheetContent>
        </Actionsheet>
         
  
      
          
        );

  const nextDate = data;
  
  let mark = {};
  
  nextDate.forEach(day => {
    mark[day] = {
     marked: true
      
    };
  });

  const handleEvento = async (dayy) => {
    
    try {
      const response = await axios.get(`http://192.168.15.11:8085/api/readEventsByDate/${dayy}`);
  
      //Ordenar os dados pelo id em ordem crescente
      const sortData = response.data.sort((a, b) => a.id - b.id);
      

      if (response.data == '') {
        setData2(['Nenhum evento encontrado']);
      }
      else {
        setShowActionsheet(true)
        setData2(sortData);
      }
      
  
      
    } catch (error) {
      console.log(JSON.stringify(error));
    }

    
  };

  console.log(data2)

  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(!showActionsheet)
  return (
    <SafeAreaView  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='white'>

      <Center h={'100%'} marginTop={-290}>
        <Box h={'auto'} w={'100%'} marginTop={-130} marginBottom={10} alignItems="center">
          <Image
            size="xl"
            w={150}
            source={logo}
            alt="logo"
            />
        </Box>

        <Text color={'#AA7E39'} fontSize={24} fontWeight='$bold' marginVertical={0}>MEUS EVENTOS</Text>
      </Center>

     
      

      <Center alignItems="center" justifyContent="center" marginTop={-290}>
      <FlatList
                   data={data2}
                   renderItem={renderItem}
                   keyExtractor={item => String(item.id)}
                   extraData={data2}
                   scrollEnabled={false}
                   />
      <Calendar 
      theme={{
        backgroundColor: 'white',
        calendarBackground: '#white',
        textSectionTitleColor: '#AA7E39',
        selectedDayBackgroundColor: '#AA7E39',
        selectedDayTextColor: '#ffffff',
        todayTextColor: 'black',
        dotColor: '#AA7E39',
        dayTextColor: 'black',
        textDisabledColor: 'gray',
        monthTextColor: '#AA7E39',
        textMonthFontWeight: 'bold',
        arrowColor: "#AA7E39",
        
        
      }}
      style={{
      borderWidth: 2,
      borderColor: '#AA7E39',
      backgroundColor: 'white',
      width: 340,
      height: 355
  }}
      onDayPress={day => {
        handleEvento(day.dateString)
        // setShowActionsheet(true)
        
      }}
      markedDates={
      mark
      }
    />
      </Center>

  </SafeAreaView>
  );
}

function CreateEventScreen({navigation,route}){

  

  const { id, nome, sobrenome, email, senha } = route.params.obj;
  const userData = route.params.obj

  const imageBg = route.params.randomElement


  const AnimatedText = Animated.createAnimatedComponent(Text)
  const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)


  React.useEffect(() => {
    BounceInLeft.duration(100)
    .delay(900)
    .randomDelay()
    .reduceMotion(ReduceMotion.Never)
    .withCallback((finished) => {
      console.log(`finished without interruptions: ${finished}`);
    });
  }, []);
  

  



const [dataEvento, setDataEvento] = React.useState('');
  const ref = React.useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date('2022-05-31'));
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const AnimatedButton = Animated.createAnimatedComponent(Button);

  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(scale.value * 1.2, { duration: 900 }),
      -1,
      true
    );
  }, []);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));



  const [imagem, setImagem] = useState(null);
  const [nomeEvento, setNomeEvento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nConvidados, setNConvidados] = useState('');
  const [horaEvento] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setnumero] = useState('');
  const [value, setValue] = React.useState('');
  const [privacidade, setPrivacidade] = React.useState('');

  
  const handleImageLibraryLaunch = async () => {
    const options = {
        mediaType: 'photo',
    };

    try {
        const response = await launchImageLibrary(options);
        console.log('pickedFile', response);

        // Verifica se a imagem foi selecionada com sucesso
        if (response.assets && response.assets.length > 0) {
            const image = response.assets[0];
            setImagem(image);
        } else {
            console.log('Nenhuma imagem selecionada.');
        }
    } catch (error) {
        console.error('Erro ao selecionar a imagem:', error);
    }
};

const enviarEventoParaApi = async () => {
  console.log(value)
  try {

    
      // Verifica se os campos obrigatórios foram preenchidos
      if (!imagem) {
          Alert.alert('Preencha a imagem do evento');
          return;
      }
      if (!nomeEvento || !teste || !selectedDate || !value) {
          Alert.alert('Todos os campos são obrigatórios.');
          return;
      }

      const imageData = await RNFS.readFile(imagem.uri, 'base64');

    const data = {
      idUsuario: id,
      nomeEvento: nomeEvento,
      descricao: descricao,
      dataEvento: dataEvento,
      horaEvento: selectedDate.toLocaleTimeString(),
      privacidade: value,
      rua: rua,
      nConvidados: nConvidados,
      bairro: bairro,
      numero:numero,
      imagemBase64: imageData
  };
      
      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
      };

      // URL da sua API para enviar os dados e a imagem
      // const apiUrl = 'http://192.168.15.7:8085/api/register/evento';
      const apiUrl = 'http://192.168.15.11:8085/api/register/evento';

  
      const response = await axios.post(apiUrl, data, config);
      console.log('Resposta da API:', response.data);


      // Retorna para a página inicial
      navigation.push('Home',  { userData });
  } catch (error) {
      console.error('Erro ao enviar os dados e a imagem para a API:', error);

      if (error.response.status === 401) {
          Alert.alert('E-mail já cadastrado na base de dados. Tente com um e-mail diferente.');
      } else {
          // Caso contrário, exibe uma mensagem genérica de erro
          Alert.alert('Erro ao enviar os dados. Por favor, tente novamente mais tarde.');
      }
  }
};




  return (
    
    <SafeAreaView flex={1} >

      
        <Animated.View entering={FadeInDown} style={{backgroundColor: 'black', flex: 1}} alignItems="center">
          
        <Button opacity={1} onPress={() => navigation.push('Home',  { userData })} alignSelf="flex-start" variant="link" w={50} h={50} position="absolute" >
       <Icon w={30} h={30} color={'white'} as={ArrowLeftIcon} />
       </Button>
       
      
       <ScrollView zIndex={1} h={1000} showsVerticalScrollIndicator={false}>
              <Box  marginVertical={25} alignItems="center">
                <Text marginVertical={15} fontSize={15} color={"white"} fontWeight={'$bold'}>Imagem do Evento</Text>
                <Button onPress={handleImageLibraryLaunch} w={320} h={220} variant="link">
                <Avatar bgColor={'$white'} borderWidth={1} borderRadius={10} w={280} h={200} borderColor="$black">
                  <AvatarImage w={'100%'} h={'100%'} borderRadius={10} alt="imgEvento" source={imagem ? { uri: imagem.uri } : require('../../../src/img/img.png')}/>
                </Avatar>
                </Button>
                <Button onPress={() => {setImagem(null);}} w={320} h={20} variant="link">
                <Text fontSize={12} color="$red500" fontWeight={'bold'}>Limpar </Text>
                <ButtonIcon color="$red500" as={CircleX} />
                </Button>
                
                <Box marginTop={20} marginHorizontal={5} alignItems="flex-start">

                <Text marginVertical={0} fontSize={15} color={"white"} fontWeight={'$bold'}>Informações do Evento:</Text>


                <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text  fontSize={13} color={"white"} fontWeight={'$bold'}>Nome do evento: </Text>
                <Icon as={Pencil} color="white" w={12} h={15} />
                </HStack>
                <Input
                  marginTop={0}
                  borderRadius={12}
                  bg='#FFFF'
                  w={'90%'}
                  h={50}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  
                  >
                  <InputField value={nomeEvento} onChangeText={setNomeEvento}  $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'}  />
                </Input>

                <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text  fontSize={13} color={"white"} fontWeight={'$bold'}>Descrição do evento: </Text>
                <Icon as={AlignJustify} color="white" w={12} h={15} />
                </HStack>
                <Input
                  justifyContent="flex-start"
                  borderRadius={12}
                  bg='#FFFF'
                  w={'90%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  
                  
                  >
                  <InputField value={descricao} onChangeText={setDescricao} justifyContent="flex-start" multiline $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'}  />
                </Input>
                <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text  fontSize={13} color={"white"} fontWeight={'$bold'}>Data do evento: </Text>
                <Icon as={CalendarDaysIcon} color="white" w={15} h={20} />
                </HStack>
                
                  <MaskInput
                  value={dataEvento}
                  onChangeText={setDataEvento}
                  placeholder=" ____/____/______"
                  placeholderTextColor={'#A87B34'}
                  style={{backgroundColor: 'white', borderRadius: 10, borderWidth: 0.7, borderColor: '#CECDCD', width: 'auto', color: '#A87B34', fontWeight: 'bold', fontSize: 14, textAlign: 'auto',}}
                  mask={Masks.DATE_DDMMYYYY}
                  
                  />
                <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text  fontSize={13} color={"white"} fontWeight={'$bold'}>Hora do evento: </Text>
                <Icon as={ArrowBigRight} color="white" w={15} h={20} />
                <AnimatedButton style={[scaleStyles]} w={20} h={20} alignItems="center" justifyContent="center" variant="link" onPress={showDatePicker}><ButtonIcon color="white" as={Clock} /></AnimatedButton>
                </HStack>
                
             
         
          
        <DateTimePickerModal
          date={selectedDate ? new Date(selectedDate) : undefined}
          isVisible={datePickerVisible}
          mode="time"
          locale=""
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color:"white" }}>
          {selectedDate ? selectedDate.toLocaleTimeString() : 'Horário não selecionado'}
        </Text>

        <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text  fontSize={13} color={"white"} fontWeight={'$bold'}>Número de convidados: </Text>
                <Icon as={MailQuestionIcon} color="white" w={12} h={15} />
                </HStack>
                <Input
                  marginTop={0}
                  borderRadius={12}
                  bg='#FFFF'
                  w={'20%'}
                  h={50}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  
                  >
                  <InputField keyboardType="numeric" value={nConvidados} onChangeText={setNConvidados}  $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'}  />
                </Input>
            
          


<Text  marginTop={20}  fontSize={15} color={"white"} fontWeight={'$bold'}>Local do evento:</Text>

<HStack marginTop={20} justifyContent="center" alignContent="center">
  <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Rua: </Text>
  <Icon as={StretchVertical} color="white" w={12} h={15} />
</HStack>

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
   <InputField value={rua} onChangeText={setRua}  $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'}  />
 </Input>

 <HStack marginTop={20} justifyContent="center" alignContent="center">
  <Text  fontSize={13} color={"white"} fontWeight={'$bold'}>Bairro: </Text>
  <Icon as={Building2} color="white" w={12} h={15} margin={1} />
</HStack>

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
   <InputField value={bairro} onChangeText={setBairro} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'}  />
 </Input>

 <HStack marginTop={20} justifyContent="center" alignContent="center">
  <Text  fontSize={13} color={"white"} fontWeight={'$bold'}>Número: </Text>
  <Icon as={House} color="white" w={12} h={15} />
</HStack>

<Input
  
   
   borderRadius={12}
   bg='#FFFF'
   w={'20%'}
   h={50}
   variant="outline"
   size="md"
   isDisabled={false}
   isInvalid={false}
   isReadOnly={false}
   $focus-borderColor={'#A87B34'}
   
   >
   <InputField value={numero} onChangeText={setnumero} keyboardType="numeric"  $focus-borderColor={'#A87B34'} fontSize={14} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'}  />
 </Input>


 <HStack marginTop={20} justifyContent="center" alignContent="center">
  <Text  fontSize={13} color={"white"} fontWeight={'$bold'}>Privacidade: </Text>
  <Icon as={LockKeyhole} color="white" w={12} h={15} />
</HStack>

<Box marginTop={10} w={200}>
<SegmentedButtons
        value={value}
        theme={{ colors: { secondaryContainer: '#A87B34' } }}
        onValueChange={setValue}
        buttons={[
          {
            value: 'Privado',
            label: 'Privado',
            checkedColor:'white',
            uncheckedColor:'white',
            showSelectedCheck: true,
          },
          {
            value: 'Público',
            label: 'Público',
            checkedColor:'white',
            uncheckedColor:'white',
            showSelectedCheck: true,
          },
        ]}
      />
</Box>





              
                </Box>
                
                      

                
                
                  
                

                </Box>
                
                
              
            </ScrollView>

        {/* <AnimatedImageBackground style={{zIndex: -1, opacity: 0.6, position: "absolute"}}  alignItems="center" flex={1} w={'100%'} h={750} source={{uri:'https://miro.medium.com/v2/resize:fit:1400/1*kU6biOtrNaTtAfvRHPMcrg.gif'}}> */}

        <Box alignSelf="flex-end"  w={'55%'} marginTop={5} flexDirection="row">
<Button       
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => navigation.push('Home',  { userData }) 
                
              }
            >
              <ButtonText color="white">Cancelar</ButtonText>
            </Button>

            <Button
              
              size="sm"
              action="positive"
              bg={'#A87B34'}
              borderWidth="$0"
              onPress={enviarEventoParaApi}
            >
              <ButtonText>Criar Evento</ButtonText>
            </Button>

</Box>

           

        <AnimatedImageBackground style={{zIndex: -1, opacity: 0.4, position: "absolute"}}  alignItems="center" flex={1} w={'100%'} h={750} source={{uri:imageBg}}>
        

      
        </AnimatedImageBackground>
        {/* <AnimatedImageBackground style={{zIndex: -1, opacity: 0.5, position: "absolute"}}  alignItems="center" blurRadius={1} flex={1} w={'100%'} h={750} source={{uri:randomElement}}>
        
        
        
       
      
        </AnimatedImageBackground> */}



       
        </Animated.View>
     
      
     
      
    </SafeAreaView>
  )
}



const Tab = createBottomTabNavigator();
export default function Home({navigation, route}) {
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(true)
  const obj = route.params.userData
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


  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];
    return randomElement;
}

const array = [

'https://miro.medium.com/v2/resize:fit:1400/1*kU6biOtrNaTtAfvRHPMcrg.gif',
'https://blog.poesie.com.br/wp-content/uploads/2014/11/02-ideia-foto-noivado-casamento.gif',
'https://www.paperlesspost.com/blog/wp-content/uploads/01_Blog_KidsBirthdayPartyIdeas_ChildrenBlowingOutCandles.png'

];


const randomElement = getRandomElement(array);

  
 
  return (
    
    <Tab.Navigator

    tabBar={props => <CustomBottomTabBar {...props} />}
 
   
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
        height: 55,
        backgroundColor: 'white',
        borderColor: '#EDE9E4',
        
      },
      tabBarActiveTintColor: '#AA7E39',
      tabBarInactiveTintColor: '#AA7E39',
      
      
        
    
      
    }
    
    )}
  >
    <Tab.Screen initialParams={{obj}} options={{headerShown: false}} name="Página Inicial" component={HomeScreen} />
    <Tab.Screen initialParams={{ obj, randomElement }}
     options={{headerShown: false, tabBarStyle: {
      display: "none",
    }, tabBarIcon: ({focused, color, size}) => {
            return (
            
              
              <KeyboardAvoidingView>
                  <AnimatedBox style={[scaleStyles]} >
                
                <Box  alignSelf="center"  alignItens="center" justifyContent="center" marginBottom={40} >
               
                <Center w={60} h={60} bg={'#AA7E39'} rounded={"$full"}>
                <Icon as={PartyPopper} color="white" size="xl" />
                </Center>
                
                
               
                </Box>
                
                
               
              </AnimatedBox>
              
              </KeyboardAvoidingView>
              

              
             
             


            );
          },
          
          }} name="Criar Evento"  component={CreateEventScreen} />
    <Tab.Screen initialParams={{ obj }} options={{headerShown: false}} name="Eventos" component={EventsScreen} />

  </Tab.Navigator>


    
  )
}

