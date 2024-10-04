
import React, {useEffect, useState} from "react";
import {View, Alert} from 'react-native';
import { ArrowLeftIcon, Avatar, AvatarImage, CalendarDaysIcon, Center, Checkbox, CheckboxIndicator, CloseIcon, HStack, Link, Modal, ModalBody, ScrollView, StatusBar,} from '@gluestack-ui/themed';
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

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Card } from '@gluestack-ui/themed';
import { withTiming, withSpring, useAnimatedStyle, withRepeat, useSharedValue, BounceInLeft, StretchInX, ReduceMotion, BounceInDown, BounceInUp, FadeInUp, FadeInLeft, FadeInDown } from 'react-native-reanimated';
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

function HomeScreen({navigation, route}) {

  const enteringAnimation = new Keyframe({
    0: {
      transform: [
        { translateX: -200 },
      ]
    },
    25: {
      transform: [
        { translateX: -150 },
      ]
    },
 
    50: {
      transform: [
        { translateX: -100 },
      ]
      
    },
    75: {
      transform: [
        { translateX: -50 },
      ],
      
    },

    100: {
      transform: [
        { translateX: 0 },
      ]
      
    },
  }).duration(200);
  

 


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
          axios.get(`http://10.0.2.2:8085/api/readEvents`)
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
          navigation.navigate('Evento', {id})
      };


     
      

      const renderItem = ({item})=>
      
      (

        
         
        <Card w={350} p="$5" borderRadius="$lg" m="$3">
      <Image
        mb="$6"
        h={240}
        w={400}
        borderRadius="$md"
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
      <Button bg='#AA7E39'>
      <ButtonText>Ver informações do evento</ButtonText>
      </Button>
    
    </Card>
        
      );




  return (
    <SafeAreaView  alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='white'>
    
    <StatusBar hidden/>

   
    <AnimatedBox  w={'100%'} h={'100%'}>


<ScrollView>
<AnimatedBox  alignItems="center" justifyContent="center">



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



<Text color={'#AA7E39'} fontWeight={'$bold'}>Eventos públicos:</Text>





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

function CreateEventScreen({navigation,route}){

  

  const { id, nome, sobrenome, email, senha } = route.params.obj;
  const userData = route.params.obj


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
  

  

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];
    return randomElement;
}

const array = [

'https://cdn.firstcry.com/education/2022/12/29111202/101-Of-Planning-An-Unforgettable-Kids-Birthday-Party.jpg',
'https://www.brides.com/thmb/o6H4hJ-Fc0qHMhI6Lf9VoZXHgqg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/marriage-definition-wedding-exit-toss-recirc-getty-images-1dc6f223ad7b4e249cf9bf3c8e317148.jpg',
'https://www.brides.com/thmb/o6H4hJ-Fc0qHMhI6Lf9VoZXHgqg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/marriage-definition-wedding-exit-toss-recirc-getty-images-1dc6f223ad7b4e249cf9bf3c8e317148.jpg',
'https://aloalobahia.com/images/p/trezeromeia_aloalobahia.JPG',
'https://blog.minhasinscricoes.com.br/wp-content/uploads/2022/02/conferencia.png',
'https://alphaconvites.com.br/wp-content/uploads/2023/01/festa-antes-formatura-scaled-1.jpg',
'https://www.fashionbubbles.com/wp-content/uploads/2021/12/festa-de-natal-da-empresa.jpg'
];


const randomElement = getRandomElement(array);

const [showModal, setShowModal] = useState(false)

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
  console.log(privacidade)
      

      // Configuração da requisição Axios
      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
      };

      // URL da sua API para enviar os dados e a imagem
      const apiUrl = 'http://10.0.2.2:8085/api/register/evento';

      // Dados a serem enviados para a API
      
      console.log(data)
      // Envia os dados e a imagem para a API usando Axios
      const response = await axios.post(apiUrl, data, config);
      console.log('Resposta da API:', response.data);

      // Limpa o formulário após o envio dos dados
      
      setShowModal(false);

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

<Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop/>
        <ModalContent w={'100%'} h={'100%'}>
          <ModalHeader >
            <Heading marginLeft={110} alignSelf="center" color={"#A87B34"} size="lg">Criar Novo Evento</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <ScrollView>
              <Box  marginTop={25} alignItems="center">
                <Text marginVertical={15} fontSize={15} color={"#A87B34"} fontWeight={'$bold'}>Imagem do Evento</Text>
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

                <Text marginVertical={0} fontSize={15} color={"#A87B34"} fontWeight={'$bold'}>Informações do Evento:</Text>


                <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text  fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Nome do evento: </Text>
                <Icon as={Pencil} color="#A87B34" w={12} h={15} />
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
                <Text  fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Descrição do evento: </Text>
                <Icon as={AlignJustify} color="#A87B34" w={12} h={15} />
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
                <Text  fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Data do evento: </Text>
                <Icon as={CalendarDaysIcon} color="#A87B34" w={15} h={20} />
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
                <Text  fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Hora do evento: </Text>
                <Icon as={ArrowBigRight} color="#A87B34" w={15} h={20} />
                <AnimatedButton style={[scaleStyles]} w={20} h={20} alignItems="center" justifyContent="center" variant="link" onPress={showDatePicker}><ButtonIcon color="#A87B34" as={Clock} /></AnimatedButton>
                </HStack>
                
             
         
          
        <DateTimePickerModal
          style={{backgroundColor:'red'}}
          date={selectedDate ? new Date(selectedDate) : undefined}
          isVisible={datePickerVisible}
          mode="time"
          locale=""
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color:"#A87B34" }}>
          {selectedDate ? selectedDate.toLocaleTimeString() : 'Horário não selecionado'}
        </Text>

        <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text  fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Número de convidados: </Text>
                <Icon as={MailQuestionIcon} color="#A87B34" w={12} h={15} />
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
            
          


<Text  marginTop={20}  fontSize={15} color={"#A87B34"} fontWeight={'$bold'}>Local do evento:</Text>

<HStack marginTop={20} justifyContent="center" alignContent="center">
  <Text fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Rua: </Text>
  <Icon as={StretchVertical} color="#A87B34" w={12} h={15} />
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
  <Text  fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Bairro: </Text>
  <Icon as={Building2} color="#A87B34" w={12} h={15} margin={1} />
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
  <Text  fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Número: </Text>
  <Icon as={House} color="#A87B34" w={12} h={15} />
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
  <Text  fontSize={13} color={"#A87B34"} fontWeight={'$bold'}>Privacidade: </Text>
  <Icon as={LockKeyhole} color="#A87B34" w={12} h={15} />
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
            uncheckedColor:'#A87B34',
            showSelectedCheck: true,
          },
          {
            value: 'Público',
            label: 'Público',
            checkedColor:'white',
            uncheckedColor:'#A87B34',
            showSelectedCheck: true,
          },
        ]}
      />
</Box>


              
                </Box>
                
                      

                
                
                  
                

                </Box>
                
                
              
            </ScrollView>
            
            
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              bg={'#A87B34'}
              borderWidth="$0"
              onPress={enviarEventoParaApi
                
              }
            >
              <ButtonText>Criar Evento</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



      



      <ScrollView>
        <Animated.View entering={FadeInDown} style={{backgroundColor: 'black'}} alignItems="center">
          
       <AnimatedImageBackground  alignItems="center" opacity={0.5} flex={1} w={'100%'} h={750} source={{uri:randomElement}}>
        
       </AnimatedImageBackground>
       <Button onPress={() => navigation.push('Home',  { userData })} alignSelf="flex-start" variant="link" w={50} h={50} position="absolute" >
       <Icon w={30} h={30} color={'white'} as={ArrowLeftIcon} />
       </Button>
       <Animated.View  entering={StretchInX} alignItems="center" marginTop={330} position="absolute">
       <AnimatedText  fontWeight={'$bold'} color={'#FFFF'} fontSize={20}>COMECE A PLANEJAR SEUS EVENTOS!</AnimatedText>
       </Animated.View>
       <Animated.View entering={StretchInX} marginTop={390} position="absolute">
        <Button onPress={() => setShowModal(true)} variant="outline" borderWidth={1.5} borderColor={'#A87B34'} >
        <ButtonText  fontWeight={'$bold'} color={'white'}>CRIAR EVENTO </ButtonText>
        <ButtonIcon color={'white'} as={AddIcon} />
        </Button>
       </Animated.View>
       

       
        </Animated.View>
      </ScrollView>
      
     
      
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
    <Tab.Screen initialParams={{ obj }}
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

