
import React, { useEffect, useState } from "react";
import { View, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, AddIcon, ArrowLeftIcon, Avatar, AvatarImage, Badge, BadgeIcon, BadgeText, CalendarDaysIcon, Center, CloseIcon, HStack, MenuItemLabel, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectPortal, StatusBar, TooltipContent, TooltipText, VStack, } from '@gluestack-ui/themed';
import { Button, ButtonText, ButtonIcon, ButtonSpinner, } from "@gluestack-ui/themed";
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogFooter, AlertDialogBody, Input, InputField, } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import axios from 'axios';
import { Icon } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { Box, SafeAreaView, Image, ImageBackground } from '@gluestack-ui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from '@gluestack-ui/themed';
import { withTiming, useAnimatedStyle, withRepeat, useSharedValue, BounceInLeft, ReduceMotion, FadeInDown, } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { AvatarFallbackText } from "@gluestack-ui/themed";
import teste from '../../../src/img/evento1.png'
import { useIsFocused } from '@react-navigation/native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { AlignJustify, Pencil, Clock, StretchVertical, Building2, House, ArrowBigRight, CircleX, LockKeyhole, MailQuestionIcon, PartyPopper, GlobeIcon, CircleAlert, SearchIcon, LogOut, IdCard, PuzzleIcon, PaintBucket, SettingsIcon, PersonStandingIcon, ChevronDownIcon, SlidersHorizontal, } from "lucide-react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ActivityIndicator, SegmentedButtons } from 'react-native-paper';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RNFS from 'react-native-fs';
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import moment from "moment";
import CustomBottomTabBar from "../../props/customTabBar";
import { Actionsheet } from "@gluestack-ui/themed";
import { ActionsheetDragIndicatorWrapper } from "@gluestack-ui/themed";
import { ActionsheetItem } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spinner } from "@gluestack-ui/themed";
import logo from '../../../src/img/logo.png'
import { InputSlot } from "@gluestack-ui/themed";
import { InputIcon } from "@gluestack-ui/themed";
import api from "../../props/api";
import Carousel from 'react-native-snap-carousel';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Menu } from "@gluestack-ui/themed";
import { MenuItem } from "@gluestack-ui/themed";
import { ButtonGroup } from "@gluestack-ui/themed";
import { SelectTrigger } from "@gluestack-ui/themed";
import { SelectInput } from "@gluestack-ui/themed";
import { SelectItem } from "@gluestack-ui/themed";
import { Tooltip } from "@gluestack-ui/themed";
function HomeScreen({ navigation, route }) {



  const [refreshing, setRefreshing] = React.useState(false);



  const { id, nome, sobrenome, email, senha, imagemBase64 } = route.params.obj;



  const { width: screenWidth } = Dimensions.get('window');

  const cards = [
    {
      id: 1,
      image: 'https://isep.org.br/wp-content/uploads/2021/02/sp_criancas_festa_aniversario_bacana-1.jpeg',
      text1: 'Planeje seus eventos',
      text2: 'Da melhor maneira!'


    },
    {
      id: 2,
      image: require('../../../src/img/101-Of-Planning-An-Unforgettable-Kids-Birthday-Party.jpg'),
      text1: 'Seus aniversários',
      text2: 'Mais organizados e divertidos!'

    },
    {
      id: 3,
      image: 'https://i.em.com.br/IQ1l_dkc9VYK5P8PW-EaTphOuF4=/790x/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/21/1496049/uma-cor-que-esta-totalmente-proibida-para-as-convidadas-de-acordo-com-a-etiqueta-de-casamento-e-o-branco-que-esta-reservado-para-as-noivas-a-nao-ser-que-o-casamento-seja-na-praia_1_55583.jpg',
      text1: 'Seu casamento',
      text2: 'Mais romântico e perfeito!'

    },
    {
      id: 4,
      image: 'https://cdn.prod.website-files.com/636d4036709c50b9ac704e98/65b157c74e6fb6c92b778c37_eventos-inovacao-tecnologia_2024_numerik.jpg',
      text1: 'Seus shows e festas',
      text2: 'Alucinantes e inesquecíveis!'

    },


  ]

  const MyCarousel = ({ data }) => {
    const renderItem = ({ item, color }) => (
      <AnimatedBox style={[scaleBoxStyles]} alignSelf="center" alignItems="center" marginTop={50}>

        <Image
          opacity={1}
          position="absolute"
          h={160}
          borderRadius={20}
          w={'90%'}
          source={item.image}
          alt="logo"
        />

        <Image
          tintColor={'black'}
          position="absolute"
          opacity={0.5}
          h={160}
          borderRadius={20}
          w={'90%'}
          source={item.image}
          alt="logo"
        />


        <Text bg={'red'} position="absolute" fontWeight={"$extrabold"} fontSize={15} color={'white'} marginTop={105}> Comece Já! </Text>
        <Text marginTop={40} fontWeight={"$extrabold"} fontSize={25} color={'white'} position="absolute">{item.text1}</Text>
        <Text marginTop={70} fontWeight={"$extrabold"} fontSize={20} color={'white'} position="absolute">{item.text2}</Text>



      </AnimatedBox>
    );

    return (
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout={'stack'}
        layoutCardOffset={5}
        autoplay={true}
        autoplayDelay={0}
        autoplayInterval={3000}
        loop={true}
      />
    );
  };
  const [dataUser, setDataUser] = useState({})

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



  const handleVizualizar = (id) => {
    navigation.push('Evento', { id })
  };





  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(!showActionsheet)
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)


  const renderItem = ({ item }) =>

  (


    <Card w={350} p="$5" borderRadius="$lg" marginTop={0} m="$3">


      <>
        <AlertDialog
          isOpen={showAlertDialog}
          onClose={() => {
            setShowAlertDialog(false);
            setIsLoading(false);

          }}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent bg='#EDE9E4'>
            <AlertDialogHeader>
              <Heading color='#A87B34' size="lg">Você não tem acesso a esse evento!</Heading>
              <AlertDialogCloseButton>

              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text size="sm">
                Esse evento foi colocado como privado e você não tem acesso a essas informações!
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Center space="lg">
                <Button
                  variant="outline"
                  borderColor={'#A87B34'}
                  onPress={() => {
                    setShowAlertDialog(false)
                    setIsLoading(false);
                  }}
                >
                  <ButtonText color={'#A87B34'}>OK</ButtonText>
                </Button>
              </Center>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
      {isPriv && item.id_usuario != dataUser.id ? <>
        <Animated.Image
          blurRadius={20}
          style={{ marginBottom: 15, height: 240, width: 315, borderRadius: 9, alignSelf: 'center', }}
          alt="imagemEvento"
          source={{
            uri: `data:image/jpeg;base64,${item.imagemBase64}`
          }}
        />
      </> : <><Animated.Image
        blurRadius={0}
        style={{ marginBottom: 15, height: 240, width: 315, borderRadius: 9, alignSelf: 'center', }}
        alt="imagemEvento"
        source={{
          uri: `data:image/jpeg;base64,${item.imagemBase64}`
        }}
      /></>}

      <HStack justifyContent="center">
        <Heading size="md" fontFamily="$heading">
          {item.nomeEvento}
        </Heading>
      </HStack>
      <Center>
        {item.id_usuario == id ?
          <>
            <Badge size="md" variant="solid" borderRadius="$none" action="success">
              <BadgeIcon as={CircleAlert} marginHorizontal="$1" />
              <BadgeText fontWeight="bold">Seu Evento</BadgeText>

            </Badge>
          </>
          :
          <>
          </>
        }
      </Center>
      <HStack alignItems="center" justifyContent="center">
        {isPriv && item.id_usuario != dataUser.id ? <>
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
            Data do evento: ##/##/####
          </Text>
        </> : <>

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
            Data do Evento: {moment(item.dataEvento).format('DD/MM/YYYY')}
          </Text>
        </>}

      </HStack>

      {isPriv && item.id_usuario != dataUser.id ? <>
        <Text mb={10} color={'$gray'} fontSize={13}>
          Descrição Indisponivel devido a privacidade do evento!
        </Text>
      </> : <><Text mb={10} color={'$black'} fontSize={13}>
        {item.descricao}
      </Text></>}

      {isPriv
        ?
        <>
          {item.id_usuario == id ?
            <>
              <Button onPress={() => handleVizualizar(item.id)} bg='#AA7E39'>
                <ButtonText>Ver informações do evento</ButtonText>
              </Button>
            </>
            :
            <>
              <Button onPress={() => setShowAlertDialog(true)} bg='white' borderColor={'#AA7E39'} borderWidth={0.8}>
                <HStack>
                  <ButtonText color="gray">Evento Privado</ButtonText>
                  <Icon marginHorizontal={5} as={LockKeyhole} color="gray" w={13} h={15} />
                </HStack>
              </Button>
            </>
          }
        </>
        :
        <>
          <Button onPress={() => handleVizualizar(item.id)} bg='#AA7E39'>
            <ButtonText>Ver informações do evento</ButtonText>
          </Button>
        </>
      }
    </Card>



  );





  const [isLogged, setIsLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPPic, setIsLoadingPPic] = useState(true)
  const [isPriv, setIsPriv] = useState(false)
 

  const [value, setValue] = useState('Público');

  React.useEffect(() => {

    if (value === 'Público') {
      setIsLoading(true)
      //  axios.get(`http://192.168.15.10:8085/api/readEvents`)
      api.get(`/api/readEvents`)
        .then(response => {
          //Ordenar os dados pelo id em ordem crescente
          const sortData = response.data.sort((a, b) => a.id - b.id);

          if (response.data == '') {
            setIsLoading(true)
          }
          else {

            setData(sortData);
            setIsLoading(false)
            setIsPriv(false)
          }


        })
        .catch(error => {

        });
    }
    else if (value === 'Privado') {
      setIsLoading(true)
      setIsPriv(true)
      api.get(`/api/readEventsPriv`)
        // axios.get(`http://192.168.15.10:8085/api/readEventsPriv`)
        .then(response => {

          const sortData = response.data.sort((a, b) => a.id - b.id);
          if (response.data == '') {
            setIsLoading(true)
          }

          else {


            setData(sortData);
            setIsLoading(false)


          }


        })
        .catch(error => {
          console.log(error);
        });
    }
    else if (value === 'Meus') {
      setIsLoading(true)
      //  axios.get(`http://192.168.15.10:8085/api/readEventsUser/${id}`)
      api.get(`/api/readEventsUser/${id}`)
        .then(response => {
          //Ordenar os dados pelo id em ordem crescente
          const sortData = response.data.sort((a, b) => a.id - b.id);

          if (response.data == '') {
            setIsLoading(true)
          }
          else {
            setData(sortData);
            setIsLoading(false)
            setIsPriv(false)
          }


        })
        .catch(error => {

        });
    }


  }, [value, refreshing]);


  React.useEffect(() => {
    setIsLoadingPPic(true)
    api.get(`/api/readUser/${id}`)
      .then(responseUser => {

        setDataUser(responseUser.data[0]);
        setIsLoadingPPic(false)

      })
      .catch(error => {

      });


  }, [refreshing]);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {

      setRefreshing(false);

    }, 500);
  }, []);


  return (

    <SafeAreaProvider>
      <SafeAreaView alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg='white'>

        <StatusBar hidden />


        <AnimatedBox w={'100%'} h={'100%'}>


          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } showsVerticalScrollIndicator={false}>
            <AnimatedBox alignItems="center" justifyContent="center">



              <Box w={'100%'} h={230} bg='#EDE9E4' marginHorizontal={30}>


                <Box alignSelf="center" w={'100%'}>

                  <Box marginHorizontal={25} marginTop={40} marginRight={'35%'} alignSelf="flex-start">
                    <VStack>
                      <Text color={'#AA7E39'} fontSize={15}>Olá</Text>

                      <Text color={'#AA7E39'} fontWeight='bold' fontSize={15}>{dataUser.nome} {dataUser.sobrenome}</Text>
                    </VStack>
                  </Box>
                  <Box position="absolute" marginVertical={40} alignSelf="flex-end">

                    <Menu
                      placement="bottom"
                      trigger={({ ...triggerProps }) => {
                        return (
                          <Button w={30} marginHorizontal={15} variant="link" {...triggerProps} >
                            {isLoadingPPic ? <><Spinner color={'#AA7E39'} alignSelf="center" /></> : <><Avatar bgColor="$coolGray500" size="md" borderRadius="$full">
                              {dataUser.imagemBase64 != '' ? <><AvatarImage alt="profile-pic" source={{ uri: `data:image/jpeg;base64,${dataUser.imagemBase64}` }} /></> : <><AvatarFallbackText color={'white'}>{dataUser.nome}</AvatarFallbackText></>}
                            </Avatar></>}

                          </Button>
                        )
                      }}
                    >
                      <MenuItem key="Settings" textValue="Settings" onPress={() => navigation.navigate('Perfil')}>
                        <Icon as={IdCard} size="sm" mr="$2" />
                        <MenuItemLabel size="sm">Ver Perfil</MenuItemLabel>
                      </MenuItem>
                      <MenuItem key="Add account" textValue="Add account" onPress={() => navigation.push('SignIn')}>
                        <Icon as={AddIcon} size="sm" mr="$2" />
                        <MenuItemLabel size="sm">Add account</MenuItemLabel>
                      </MenuItem>
                      <MenuItem key="Sair" textValue="Sair" onPress={async () => {
                        await AsyncStorage.removeItem("id");
                        navigation.push('Start')
                      }}>
                        <Icon color={'red'} as={LogOut} size="sm" mr="$2" />
                        <MenuItemLabel color={'red'} size="sm">Sair</MenuItemLabel>
                      </MenuItem>
                    </Menu>


                  </Box>
                </Box>


                <Box marginTop={0} h={400}>
                  <MyCarousel data={cards} />
                </Box>
              </Box>



              <Center position="relative" marginTop={90} h={'auto'}>
                <Text marginBottom={5} color={'#AA7E39'} fontWeight={'$bold'}>Explorar eventos:</Text>


                <SegmentedButtons
                  style={{ width: '90%', borderColor: 'green', }}
                  value={value}
                  density="small"
                  theme={{ colors: { secondaryContainer: '#A87B34' } }}
                  onValueChange={setValue}
                  buttons={[
                    {
                      value: 'Público',
                      label: 'Eventos Públicos',
                      labelStyle: {
                        fontSize: 10
                      },
                      checkedColor: 'white',
                      uncheckedColor: '#A87B34',
                      showSelectedCheck: true,
                    },
                    {
                      value: 'Privado',
                      label: 'Eventos Privados',
                      labelStyle: {
                        fontSize: 10
                      },
                      checkedColor: 'white',
                      uncheckedColor: '#A87B34',
                      showSelectedCheck: true,
                    },
                    {
                      value: 'Meus',
                      label: 'Meus Eventos',
                      labelStyle: {
                        fontSize: 10
                      },
                      checkedColor: 'white',
                      uncheckedColor: '#A87B34',
                      showSelectedCheck: true,
                    },

                  ]}
                />




              </Center>

              {isLoading ? <>
                <Spinner marginVertical={10} alignSelf="center" color={'#AA7E39'} size={"large"} />
                <Text fontSize={12} color={'#AA7E39'} fontWeight={'light'}>Nenhum evento encontrado</Text>
              </> :
                <>
                  <FlatList
                    style={{ marginVertical: 25 }}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                    extraData={data}
                    scrollEnabled={false}
                  />
                </>
              }



            </AnimatedBox>
          </ScrollView>












        </AnimatedBox>

      </SafeAreaView>

    </SafeAreaProvider>

  );
}
function SearchScreen({ navigation, route }) {


  const { id, nome, sobrenome, email, senha } = route.params.obj;
  const [filter, setFilter] = useState('events')
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const fetchAllEvents = async () => {
    try {
      if (filter === "events") {
        const response = await api.get('/api/readEvents');
        setAllEvents(response.data);
        setResults(response.data[0]);
      }
      else {
        const response = await api.get('/api/readColaborators');
        setAllEvents(response.data);
        setResults(response.data[0]);
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
    setIsLoading(false)
  }, [filter]);

  useEffect(() => {
    if (filter === 'events') {
      if (searchQuery) {
        const filteredResults = allEvents.filter(event =>
          event.nomeEvento.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredResults);
      }
      else {
        setResults(allEvents);
      }
    }
    else {
      if (searchQuery) {
        const filteredResults = allEvents.filter(event =>
          event.nome.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredResults);
      }
      else {
        setResults(allEvents);
      }
    }

  }, [searchQuery, allEvents]);



  const renderItem = ({ item }) => (

    <Card flexDirection="row" w={'95%'} padding={0} borderRadius="$lg" m="$3">

      <Animated.Image
        style={{ height: 160, width: 170, borderTopRightRadius: 0, borderTopLeftRadius: 7, borderBottomLeftRadius: 7, borderBottomRightRadius: 0, alignSelf: 'center' }}
        alt="imagemEvento"
        source={{
          uri: `data:image/jpeg;base64,${item.imagemBase64}`
        }}
      />
      <VStack justifyContent="center" w={'50%'} alignSelf="">



        <Center w={'100%'}>

          <Text fontSize={15} fontWeight="bold"> {item.nomeEvento}
          </Text>
          {item.id_usuario == id ?
            <>
              <Badge size="md" variant="solid" borderRadius="$none" action="success">
                <BadgeIcon as={CircleAlert} marginHorizontal="$1" />
                <BadgeText fontWeight="bold">Seu Evento</BadgeText>

              </Badge>
            </>

            :
            <>

            </>
          }

          <HStack alignItems="center" justifyContent="center">
            <Text

              fontSize="$sm"
              fontStyle="normal"
              fontFamily="$heading"
              fontWeight="$normal"
              lineHeight="$sm"
              mb={5}
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
              N° Convidados: {item.nConvidados}
            </Text>
          </HStack>

          <Button onPress={() => handleVizualizar(item.id)} bg="#A87B34">

            <ButtonText>
              Vizualizar
            </ButtonText>
          </Button>
        </Center>




      </VStack>


    </Card>


  );
  const renderItem2 = ({ item }) => (

    <Card flexDirection="row" w={'100%'} padding={10} borderRadius={20}>

      <Image
        rounded={"$full"}
        style={{ height: 130, width: 130, alignSelf: 'center', marginHorizontal: 5 }}
        alt="imagemColaborador"
        source={{
          uri: `data:image/jpeg;base64,${item.imagemBase64}`
        }}
      />
      <VStack justifyContent="center" w={'60%'} alignSelf="">



        <Center w={'100%'}>

          <Text fontSize={15} fontWeight="bold"> {item.nome}
          </Text>


          <HStack alignItems="center" justifyContent="center">
            <Text

              fontSize="$sm"
              fontStyle="normal"
              fontFamily="$heading"
              fontWeight="$normal"
              lineHeight="$sm"
              mb={5}
              sx={{
                color: "$textLight700",
                _dark: {
                  color: "$textDark200",
                },
              }}
            >
              Sobrenome: {item.sobrenome}
            </Text>
          </HStack>


          <HStack alignItems="center" justifyContent="center">
            <Text

              fontSize="$sm"
              fontStyle="normal"
              fontFamily="$heading"
              fontWeight="$normal"
              lineHeight="$sm"
              mb={5}
              sx={{
                color: "$textLight700",
                _dark: {
                  color: "$textDark200",
                },
              }}
            >
              Telefone: {item.telefone}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="center">
            <Text

              fontSize="$sm"
              fontStyle="normal"
              fontFamily="$heading"
              fontWeight="$normal"
              lineHeight="$sm"

              sx={{
                color: "$textLight700",
                _dark: {
                  color: "$textDark200",
                },
              }}
            >
              Categoria: {item.categoria}
            </Text>


          </HStack>
          <HStack alignItems="center" justifyContent="center">
            <Text

              fontSize="$sm"
              fontStyle="normal"
              fontFamily="$heading"
              fontWeight="$normal"
              lineHeight="$sm"

              sx={{
                color: "$textLight700",
                _dark: {
                  color: "$textDark200",
                },
              }}
            >
              Descrição:
            </Text>


          </HStack>
          <Menu
            placement="top"
            trigger={({ ...triggerProps }) => {
              return (
                <Button h="$5.5" variant="link" {...triggerProps}>
                  <ButtonText color="#A87B34">Ver</ButtonText>
                </Button>
              );
            }}
          >
            <MenuItem flexDirection="column" h={'auto'} key="Community" textValue="Community">
              <Text alignSelf="center" fontWeight={'bold'}>Descrição desse colaborador:</Text>
              <Text fontWeight={'light'}>{item.descricao}</Text>
            </MenuItem>
          </Menu>

          {item.id_usuario == id ?
            <>
              <Badge size="md" m="$1" variant="solid" borderRadius="$none" action="success">
                <BadgeIcon as={CircleAlert} marginHorizontal="$1" />
                <BadgeText fontWeight="bold">Você</BadgeText>

              </Badge>
            </>

            :
            <>

            </>
          }

        </Center>




      </VStack>


    </Card>


  );

  const handleVizualizar = (id) => {
    navigation.push('Evento', { id })
  };

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);



  return (
    <SafeAreaView alignItens='center' justifyContent="center" w={'100%'} h={'100%'} bg="white" >




      <Box w={'100%'} h={'100%'}>


        <ScrollView>
          <Center bg='#EDE9E4' marginBottom={0} h={'auto'} justifyContent="center">
            <Text alignSelf="flex-start" marginHorizontal={30} marginTop={30} fontSize={20} fontWeight="bold" color="#A87B34">PESQUISAR EVENTOS...
            </Text>
            <Text alignSelf="flex-start" marginHorizontal={30} marginTop={10} marginBottom={30} fontSize={15} fontWeight="light" color="#A87B34">Encontre o evento e colaborador que quiser na Eventcraft
            </Text>
            <Input

              borderRadius={19}
              alignSelf="flex-Start"
              width={'85%'}
              height={50}
              marginTop={0}
              marginBottom={40}
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              $focus-borderColor={'#A87B34'}
              borderWidth={0}
              bg="white"
            >
              <InputSlot marginHorizontal={'$2'}>
                <InputIcon color="#A87B34" as={SearchIcon} />
              </InputSlot>
              <InputField placeholderTextColor={"#A87B34"} placeholder="Pesquisar.." value={searchQuery} onChangeText={setSearchQuery} />
              <InputSlot marginHorizontal={'$4'}>

                <Menu
                  placement="bottom"
                  trigger={({ ...triggerProps }) => {
                    return (
                      <Button variant="link" {...triggerProps}>
                        <Icon color="#A87B34" as={SlidersHorizontal} />
                      </Button>
                    );
                  }}
                >
                  <MenuItem onPress={() => setFilter('colaborator')} key="Colaborators" textValue="Community">
                    <Icon as={GlobeIcon} size="sm" mr='$2' />
                    <MenuItemLabel size='sm'>
                      Colaboradores
                    </MenuItemLabel>
                  </MenuItem>
                  <MenuItem onPress={() => setFilter('events')} key="Events" textValue="Plugins">
                    {/* PuzzleIcon is imported from 'lucide-react-native' */}
                    <Icon as={PuzzleIcon} size="sm" mr='$2' />
                    <MenuItemLabel size='sm'>
                      Eventos
                    </MenuItemLabel>
                  </MenuItem>
                </Menu>
              </InputSlot>
            </Input>
          </Center>


          <Box bg="white" borderRadius={25} alignSelf="center" marginTop={-20}>
            {filter === 'colaborator' ? <>
              <AnimatedFlatList
                data={results}
                renderItem={renderItem2}
                keyExtractor={item => String(item.id)}
                scrollEnabled={false}
              />
            </> : <>
              <AnimatedFlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                scrollEnabled={false}
              />
            </>}

          </Box>





        </ScrollView>




      </Box>




    </SafeAreaView>
  );
}



function EventsScreen({ navigation, route }) {
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
  const [isLoading, setIsLoading] = useState(false);
  const [dataEvento, setDataEvento] = useState([]);
  const id_usuario = route.params.obj.id
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [idEvento, setIdEvento] = useState('');
  // const [dayy, setDayy] = useState('')
  useEffect(() => {
    // axios.get(`http://192.168.15.10:8085/api/readEvents/dates/${id_usuario}`)
    api.get(`/api/readEvents/dates/${id_usuario}`)
      .then(response => {
        //Ordenar os dados pelo id em ordem crescent

        setData(response.data);

      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });

  }, []);

  const [showModal, setShowModal] = useState(false)

  const DeleteEvent = async (id) => {
    try {
      setIsLoadingDelete(true)
      // const response = await axios.delete(`http://192.168.15.10:8085/api/deleteEvent/${id}`);
      const response = await api.delete(`/api/deleteEvent/${id}`);
      if (response.status) {
        console.log("Evento deletado")
      }
      setShowActionsheet(false)
      navigation.push('Home', { userData })
      setIsLoadingDelete(false)

    } catch (error) {
      console.log(error);
    }


  };

  const [formData, setFormData] = useState({
    id: '',
    nomeEvento: '',
    dataEvento: '',
    descricao: '',
    nConvidados: '',
    id_usuario: '',
    privacidade: '',
    imagemBase64: '',
    horaEvento: '00:00:00'

  });

  const handleEvento = async (dayy) => {

    try {

      const response = await api.get(`/api/readEventsByDate/${dayy}/${id_usuario}`);
      // const response = await axios.get(`http://192.168.15.10:8085/api/readEventsByDate/${dayy}/${id_usuario}`);

      //Ordenar os dados pelo id em ordem crescente
      const sortData = response.data.sort((a, b) => a.id - b.id);


      if (response.data == '') {

        setShowAlertDialog(true);
      }
      else {
        setImagem(null)
        setData2(sortData);
        setFormData({
          id: response.data[0].id,
          nomeEvento: response.data[0].nomeEvento,
          descricao: response.data[0].descricao,
          nConvidados: response.data[0].nConvidados,
          dataEvento: moment(response.data[0].dataEvento).format('DD/MM/YYYY'),
          id_usuario: response.data[0].id_usuario,
          imagemBase64: response.data[0].imagemBase64,
          privacidade: response.data[0].privacidade,
          horaEvento: response.data[0].horaEvento,

        })
        setShowActionsheet(true)



      }



    } catch (error) {
      console.log(JSON.stringify(error));
    }


  };

  const userData = route.params.obj
  const [value, setValue] = React.useState(formData.privacidade);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imagem, setImagem] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = (date) => {
    setSelectedDate(null);
    setSelectedDate(date);
    setFormData({
      id: formData.id,
      nomeEvento: formData.nomeEvento,
      descricao: formData.descricao,
      nConvidados: formData.nConvidados,
      dataEvento: formData.dataEvento,
      id_usuario: formData.id_usuario,
      imagemBase64: formData.imagemBase64,
      privacidade: formData.privacidade,
      horaEvento: moment(date).format('hh:mm:ss A')
    });


    hideDatePicker();
  };
  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(!showActionsheet)
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
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const enviarEventoParaApi = async () => {
    try {
      setIsLoading(true)
      const imageeData = imagem ? await RNFS.readFile(imagem.uri, 'base64') : formData.imagemBase64;
      const dataaa = {
        nomeEvento: formData.nomeEvento,
        descricao: formData.descricao,
        nConvidados: formData.nConvidados,
        dataEvento: formData.dataEvento,
        id_usuario: formData.id_usuario,
        imagemBase64: imageeData,
        privacidade: formData.privacidade,
        horaEvento: formData.horaEvento,
        id: formData.id,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const apiUrl = '/api/edit/evento';
      const response = await api.put(apiUrl, dataaa, config);
      console.log('Resposta da API:', response.data);
      setShowActionsheet(false)
      navigation.push('Home', { userData });
    } catch (error) {

      // if (error.response.status === 401) {
      //     Alert.alert('E-mail já cadastrado na base de dados. Tente com um e-mail diferente.');
      // } else {
      //     // Caso contrário, exibe uma mensagem genérica de erro
      //     Alert.alert('Erro ao enviar os dados. Por favor, tente novamente mais tarde.');
      // }
    }
  };

  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const renderItem = ({ item }) =>


  (

    <Actionsheet h="$150" isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h={150} zIndex={999}>
        <ActionsheetDragIndicatorWrapper w={'100%'}>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ScrollView marginBottom={30} showsVerticalScrollIndicator={false}>

          <View w={'100$'} alignSelf="center">
            <Text fontSize={19} fontWeight="bold" color="#AA7E39">Informações do evento</Text>
          </View>
          <ActionsheetItem w={'100$'} alignSelf="center">
            <Text fontSize={13} fontWeight="light" color="#AA7E39">Clique nas informações para edita-las</Text>
          </ActionsheetItem>

          <ActionsheetItem w={'auto'} alignSelf="center" onPress={handleImageLibraryLaunch}>
            <Animated.Image
              style={{ marginBottom: 15, height: 240, width: 315, borderRadius: 10, alignSelf: 'center' }}
              alt="imagemEvento"
              source={imagem ? { uri: imagem.uri } : { uri: `data:image/jpeg;base64,${item.imagemBase64}` }}
            />
          </ActionsheetItem>


          <ActionsheetItem w={'50$'} alignSelf="center">
            <VStack w={'100%'} space="xs">
              <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Nome do evento:</Text>
              <Input
                borderRadius={12}
                bg='#FFFF'
                w={'100%'}
                h={50}
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                $focus-borderColor={'#A87B34'}

              >
                <InputField onChangeText={(text) => handleInputChange('nomeEvento', text)} value={formData.nomeEvento} $focus-borderColor={'#A87B34'} fontSize={12} color='#A87B34' fontWeight='$bold' placeholder={item.nomeEvento} placeholderTextColor={'black'} />
              </Input>
            </VStack>

          </ActionsheetItem>

          <ActionsheetItem w={'50$'} alignSelf="center">
            <VStack w={'100%'} space="xs">
              <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Descrição do evento:</Text>
              <Input
                borderRadius={12}
                bg='#FFFF'
                w={'100%'}
                h={'auto'}
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                $focus-borderColor={'#A87B34'}
                justifyContent="flex-start"
              >
                <InputField multiline onChangeText={(text) => handleInputChange('descricao', text)} value={formData.descricao} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder={item.descricao} placeholderTextColor={'black'} />
              </Input>
            </VStack>

          </ActionsheetItem>
          <ActionsheetItem w={'50$'} alignSelf="center">
            <VStack w={'100%'} space="xs">
              <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Data do evento:</Text>
              <MaskInput
                value={formData.dataEvento}
                onChangeText={(text) => handleInputChange('dataEvento', text)}
                placeholder={moment(item.dataEvento).format('DD/MM/YYYY')}
                placeholderTextColor={'black'}
                style={{ backgroundColor: 'white', borderRadius: 10, borderWidth: 0.7, borderColor: '#CECDCD', width: 'auto', color: '#A87B34', fontWeight: 'bold', fontSize: 12, textAlign: 'auto', }}
                mask={Masks.DATE_DDMMYYYY}

              />
            </VStack>

          </ActionsheetItem>
          <ActionsheetItem w={'50$'} alignSelf="center">
            <VStack w={'100%'} space="xs">
              <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Número de convidados:</Text>
              <Input
                borderRadius={12}
                bg='#FFFF'
                w={'100%'}
                h={'auto'}
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                $focus-borderColor={'#A87B34'}
                justifyContent="flex-start"
              >
                <InputField keyboardType="numeric" onChangeText={(text) => handleInputChange('nConvidados', text)} value={formData.nConvidados.toString()} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder={item.nConvidados.toString()} placeholderTextColor={'black'} />
              </Input>
            </VStack>

          </ActionsheetItem>


          <ActionsheetItem w={'50$'} alignSelf="center">
            <VStack w={'100%'} space="xs">
              <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Hora do evento:</Text>
              <DateTimePickerModal
                date={selectedDate ? new Date(selectedDate) : undefined}
                isVisible={datePickerVisible}
                mode="time"
                locale="br"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                is24Hour
              />

              <HStack>
                <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 20, color: "#A87B34" }}>
                  {selectedDate ? formData.horaEvento : item.horaEvento}
                </Text>
                <Button w={20} h={25} alignItems="center" justifyContent="center" variant="link" onPress={showDatePicker}><ButtonIcon color="#A87B34" as={Clock} /></Button>
              </HStack>

            </VStack>

          </ActionsheetItem>

          <ActionsheetItem w={'50$'} alignSelf="center">
            <VStack w={'100%'} space="xs">
              <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Privacidade do evento:</Text>
              <SegmentedButtons
                value={formData.privacidade}
                theme={{ colors: { secondaryContainer: '#A87B34' } }}
                onValueChange={(value) => handleInputChange('privacidade', value)}
                buttons={[
                  {
                    value: 'Privado',
                    label: 'Privado',
                    checkedColor: 'white',
                    uncheckedColor: '#A87B34',
                    showSelectedCheck: true,
                  },
                  {
                    value: 'Público',
                    label: 'Público',
                    checkedColor: 'white',
                    uncheckedColor: '#A87B34',
                    showSelectedCheck: true,
                  },
                ]}
              />
            </VStack>

          </ActionsheetItem>

          <Box alignSelf="center" w={'50%'}>
            <Button onPress={() => DeleteEvent(item.id)} marginVertical={10} borderColor="red" bg="white">
              {isLoadingDelete && <ButtonSpinner color={'red'} />}
              <ButtonText fontSize={12} color={'red'}>{isLoadingDelete ? "" : "Deletar Evento"}</ButtonText>
            </Button>
          </Box>


        </ScrollView>

        <Box h={37} w={'100%'} backgroundColor={'$white'} position="absolute" bottom={0}>
          <Box alignSelf="flex-end" w={'55%'} flexDirection="row">
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => setShowActionsheet(false)

              }
            >
              <ButtonText color="black">Cancelar</ButtonText>
            </Button>

            <Button
              w={120}
              size="sm"
              action="positive"
              bg={'#A87B34'}
              borderWidth="$0"
              onPress={enviarEventoParaApi}
            >
              {isLoading && <ButtonSpinner color={'white'} />}
              <ButtonText>{isLoading ? "" : "Editar Evento"}</ButtonText>
            </Button>

          </Box>
        </Box>


      </ActionsheetContent>
    </Actionsheet>




  );

  const nextDate = data;

  let mark = {};

  nextDate.forEach(day => {
    mark[day] = {
      marked: true

    };
    mark[moment(new Date()).format("YYYY-MM-DD")] = {
      selected: true
    }
  });


  const [clickedDate, setclickedDate] = useState('')

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  const [data3, setData3] = useState([])


  React.useEffect(() => {

    api.get(`/api/readEventsUser/${id_usuario}`)
      .then(response => {
        //Ordenar os dados pelo id em ordem crescente
        const sortData = response.data.sort((a, b) => a.id - b.id);

        setData3(sortData);

      })
      .catch(error => {
        console.log(error)
      });

  }, []);

  const renderItem2 = ({ item }) =>

  (


    <Card w={350} p="$5" borderRadius="$lg" margin={10}>

      <Animated.Image
        style={{ marginBottom: 15, height: 240, width: 315, borderRadius: 9, alignSelf: 'center' }}
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
      <Center>


        <Badge size="md" variant="solid" borderRadius="$none" action="success">
          <BadgeIcon as={CircleAlert} marginHorizontal="$1" />
          <BadgeText fontWeight="bold">Seu Evento</BadgeText>

        </Badge>

      </Center>
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

      <Button onPress={() => handleEvento(moment(item.dataEvento).format('YYYY-MM-DD'))} bg='#AA7E39'>
        <ButtonText>Editar Evento</ButtonText>
      </Button>


    </Card>



  );



  return (
    <SafeAreaView flex={1} alignItens='center' bg='#EDE9E4'>
      <ScrollView>
        <>
          <AlertDialog position="absolute"
            isOpen={showAlertDialog}
            onClose={() => {
              setShowAlertDialog(false);


            }}
          >
            <AlertDialogBackdrop />
            <AlertDialogContent bg='#EDE9E4'>
              <AlertDialogHeader>
                <Heading color='#A87B34' size="lg">Nenhum evento encontrado nessa data!</Heading>
                <AlertDialogCloseButton>

                </AlertDialogCloseButton>
              </AlertDialogHeader>
              <AlertDialogBody>
                <Text size="sm">
                  Deseja criar um evento nessa data?
                </Text>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Center flexDirection="row" space="lg">

                  <Button
                    marginHorizontal={10}
                    variant="outline"
                    borderColor={'#A87B34'}
                    onPress={() => {
                      setShowAlertDialog(false)
                    }}
                  >
                    <ButtonText color={'#A87B34'}>Não, obrigado</ButtonText>
                  </Button>

                  <Button

                    variant="outline"
                    borderColor={'#A87B34'}
                    onPress={() => {
                      navigation.navigate('Criar Evento', { clickedDate })
                      setShowAlertDialog(false)
                    }}
                  >
                    <ButtonText color={'#A87B34'}>Sim</ButtonText>
                  </Button>
                </Center>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </>
        <Center>

          <Box flexDirection="row" alignItems="center">
            <Text color={'#AA7E39'} marginHorizontal={10} fontSize={24} fontWeight='$bold' marginVertical={0}>MEUS EVENTOS</Text>
            <Image
              size="md"
              w={100}
              source={logo}
              alt="logo"
            />
          </Box>
          <Text fontSize={15} fontWeight={'light'} color={'#AA7E39'}>Gerencie seus eventos criados na Eventcraft!!</Text>

        </Center>




        <Center borderRadius={22} mt={30} bgColor={'white'}>
          <FlatList
            data={data2}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            extraData={data2}
            scrollEnabled={false}
          />

          <Text mt={30} color={'#AA7E39'} fontSize={20} fontWeight='$bold'>Calendário de eventos:</Text>
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
              marginTop: 2,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#AA7E39',
              backgroundColor: 'white',
              width: 340,
              height: 355
            }}
            onDayPress={day => {
              handleEvento(day.dateString)
              setclickedDate(moment(day.dateString).format('DD/MM/YYYY'))
            }}

            markedDates={mark}
          />
          <Center mt={15} w={'100%'}>
            <Text color={'#AA7E39'} fontSize={20} fontWeight='$bold' marginTop={15} marginBottom={5}>Vizualize seus eventos:</Text>
            <FlatList
              data={data3}
              renderItem={renderItem2}
              keyExtractor={item => String(item.id)}
              extraData={data3}
              scrollEnabled={false}
            />
          </Center>

        </Center>
      </ScrollView>



    </SafeAreaView>
  );
}

function ProfileScreen({ navigation, route }) {
  const { id, nome, sobrenome, email, senha, imagemBase64 } = route.params.obj;
  const obj = route.params.obj;
  const userData = route.params.obj;
  const [isLoading, setIsLoading] = useState(true);
  let [img, setImg] = useState('');
  let [img2, setImg2] = useState('');
  const [dataUser, setDataUser] = useState({})
  useEffect(() => {

    //  axios.get(`http://192.168.15.10:8085/api/readEvents`)
    api.get(`/api/readUser/${id}`)
      .then(responseUser => {

        setDataUser(responseUser.data[0]);

        setIsLoading(false)
      })
      .catch(error => {

      });


  }, [img, isLoading]);
  const handleCameraLaunch = async () => {
    const options = {
      mediaType: 'photo',
    };

    try {
      const response = await launchImageLibrary(options);
      console.log('pickedFile', response);

      // Verifica se a imagem foi capturada com sucesso
      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        setImg(image)
        const imageData = await RNFS.readFile(image.uri, 'base64');
        const dataa = {
          imagemBase64: imageData,
          id: id
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const apiUrl = '/api/edit/profile-pic';
        const Send = await api.put(apiUrl, dataa, config);

        console.log('Resposta da API:', Send.data);
        setIsLoading(false)
      } else {
        console.log('Nenhuma imagem capturada.');
      }
    } catch (error) {
      console.error('Erro ao capturar a imagem:', error);
    }
  };

  const [showAlertDialogProfile, setShowAlertDialogProfile] = React.useState(false)
  const [showAlertDialogPassWord, setShowAlertDialogPassWord] = React.useState(false)
  const [showAlertDialogColaborator, setShowAlertDialogColaborator] = React.useState(false)
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    sobrenome: '',
    email: '',
  });
  const [formData3, setFormData3] = useState({
    senhaAtual: '',
    senha: '',
    id: id,
  });
  const [formData2, setFormdata2] = useState({
    id: '',
    nome: '',
    sobrenome: '',
    descricao: '',
    telefone: '',
    categoria: '',
    imagemBase64: '',
    id_usuario: id
  });
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleInputChange2 = (name, value) => {
    setFormdata2({ ...formData2, [name]: value });
  };
  const handleInputChange3 = (name, value) => {
    setFormData3({ ...formData3, [name]: value });
  };

  const handleEditProfile = async () => {
    setFormData({
      id: dataUser.id,
      nome: dataUser.nome,
      sobrenome: dataUser.sobrenome,
      email: dataUser.email
    })

    setShowAlertDialogProfile(true)


  }

  const handleCameraLaunchColaborator = async () => {
    const options = {
      mediaType: 'photo',
    };

    try {
      const response = await launchImageLibrary(options);
      console.log('pickedFile', response);

      // Verifica se a imagem foi capturada com sucesso
      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        setImg2(image)
        const imageColaborator = await RNFS.readFile(image.uri, 'base64');
        setFormdata2({
          id: '',
          nome: formData2.nome,
          sobrenome: formData2.sobrenome,
          descricao: formData2.descricao,
          telefone: formData2.telefone,
          categoria: formData2.categoria,
          imagemBase64: imageColaborator,
          id_usuario: id
        })
      } else {
        console.log('Nenhuma imagem capturada.');
      }
    } catch (error) {
      console.error('Erro ao capturar a imagem:', error);
    }
  };
  const handleRegisterColaborator = async () => {

    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const apiUrl = '/api/register/colaborator';
      const response = await api.post(apiUrl, formData2, config);
      console.log('Resposta da API:', response.data);
      setShowAlertDialogColaborator(false)
      navigation.push('Home', { userData })
    } catch (error) {

      console.log(error)
    }


  }

  const enviarProfileInfo = async () => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const apiUrl = '/api/edit/profile';
      const response = await api.put(apiUrl, formData, config);
      console.log('Resposta da API:', response.data);
      setShowAlertDialogProfile(false)
      navigation.push('Home', { userData })
    } catch (error) {

      console.log(error)
    }
  }

  const [isError, setIsError] = useState(false)

  const handleChangePassWord = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const apiUrl2 = '/api/edit/password';
      const response = await api.put(apiUrl2, formData3, config);


      if (response.status == 200) {
        setShowAlertDialogPassWord(false)
        setShowAlertDialogProfile(false)
        navigation.push('Login')
      }

    } catch (error) {
      setIsError(true)
    }
  }
  return (
    <SafeAreaView bg="#EDE9E4" >
      <>
        <AlertDialog
          isOpen={showAlertDialogPassWord}
          onClose={() => {
            setShowAlertDialogPassWord(false)
          }}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading size="lg">Alterar sua senha</Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>

              <VStack w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Senha atual:</Text>
                <Input
                  borderRadius={12}
                  bg='#FFFF'
                  w={'100%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={isError}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  justifyContent="flex-start"

                >
                  <InputField onChangeText={(text) => handleInputChange3('senhaAtual', text)} value={formData3.senhaAtual} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color={isError ? 'red' : '#A87B34'} fontWeight='$bold' placeholder={'Insira sua senha atual:'} placeholderTextColor={isError ? 'red' : '$coolGray500'} />
                </Input>
                {isError ? <><Text color={'red'} fontWeight={'bold'} fontSize={11}>Senha atual incorreta</Text></> : <></>}
              </VStack>
              <VStack mt={5} w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Nova senha:</Text>
                <Input
                  borderRadius={12}
                  bg='#FFFF'
                  w={'100%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  justifyContent="flex-start"
                >
                  <InputField secureTextEntry onChangeText={(text) => handleInputChange3('senha', text)} value={formData3.senha} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder={'Insira sua nova senha:'} placeholderTextColor={'$coolGray500'} />
                </Input>
              </VStack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup space="lg">
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={() => {
                    setShowAlertDialogPassWord(false)
                  }}
                >
                  <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button
                  bg="#A87B34"
                  onPress={handleChangePassWord}
                >
                  <ButtonText>Alterar senha</ButtonText>
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
      <>
        <AlertDialog
          isOpen={showAlertDialogProfile}
          onClose={() => {
            setShowAlertDialogProfile(false)
          }}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading size="lg">Editar Perfil</Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>

              <VStack w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Nome do Usuário:</Text>
                <Input
                  borderRadius={12}
                  bg='#FFFF'
                  w={'100%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  justifyContent="flex-start"
                >
                  <InputField onChangeText={(text) => handleInputChange('nome', text)} value={formData.nome} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder={formData.nome} placeholderTextColor={'black'} />
                </Input>
              </VStack>
              <VStack mt={5} w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Sobrenome do Usuário:</Text>
                <Input
                  borderRadius={12}
                  bg='#FFFF'
                  w={'100%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  justifyContent="flex-start"
                >
                  <InputField onChangeText={(text) => handleInputChange('sobrenome', text)} value={formData.sobrenome} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder={formData.sobrenome} placeholderTextColor={'black'} />
                </Input>
              </VStack>
              <VStack mt={5} w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Email do Usuário:</Text>
                <Input
                  borderRadius={12}
                  bg='#FFFF'
                  w={'100%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  justifyContent="flex-start"
                >
                  <InputField onChangeText={(text) => handleInputChange('email', text)} value={formData.email} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder={formData.email} placeholderTextColor={'black'} />
                </Input>
                <Button onPress={() => setShowAlertDialogPassWord(true)} variant="link">
                  <ButtonText color={'#A87B34'} fontSize={12}>Alterar senha</ButtonText>
                  <ButtonIcon m={'$1'} color={'#A87B34'} size={'sm'} as={LockKeyhole} />
                </Button>
              </VStack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup space="lg">
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={() => {
                    setShowAlertDialogProfile(false)
                  }}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                  bg="#A87B34"
                  onPress={enviarProfileInfo}
                >
                  <ButtonText>Editar</ButtonText>
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
      <>
        <AlertDialog
          isOpen={showAlertDialogColaborator}
          onClose={() => {
            setShowAlertDialogColaborator(false)
          }}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading size="lg">Criar perfil de colaborador de eventos</Heading>
              <AlertDialogCloseButton>
                <Icon as={CloseIcon} />
              </AlertDialogCloseButton>
            </AlertDialogHeader>
            <AlertDialogBody>

              <TouchableOpacity onPress={handleCameraLaunchColaborator} style={{ alignItems: 'center', marginVertical: 10 }}>

                <Avatar bg={'$coolGray500'} w={150} h={150}>
                  {img2 ? <>
                    <AvatarImage alt="colboratorImg" source={{ uri: img2.uri }} />
                  </> : <>
                    <AvatarFallbackText fontSize={65}>{dataUser.nome}</AvatarFallbackText>
                  </>}

                </Avatar>
              </TouchableOpacity>
              <VStack w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Nome de colaborador:</Text>
                <Input
                  borderRadius={12}
                  bg='#FFFF'
                  w={'100%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  justifyContent="flex-start"
                >
                  <InputField onChangeText={(text) => handleInputChange2('nome', text)} value={formData2.nome} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'black'} />
                </Input>
              </VStack>
              <VStack w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Sobrenome de colaborador:</Text>
                <Input
                  borderRadius={12}
                  bg='#FFFF'
                  w={'100%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  justifyContent="flex-start"
                >
                  <InputField onChangeText={(text) => handleInputChange2('sobrenome', text)} value={formData2.sobrenome} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'black'} />
                </Input>
              </VStack>
              <VStack mt={5} w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Descrição de colaborador:</Text>
                <Input
                  borderRadius={12}
                  bg='#FFFF'
                  w={'100%'}
                  h={'auto'}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  $focus-borderColor={'#A87B34'}
                  justifyContent="flex-start"
                >
                  <InputField multiline onChangeText={(text) => handleInputChange2('descricao', text)} value={formData2.descricao} $focus-borderColor={'#A87B34'} fontSize={12} justifyContent="flex-start" alignItems="flex-start" color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'black'} />
                </Input>
              </VStack>
              <VStack mt={5} w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Telefone de contato:</Text>
                <MaskInput
                  value={formData2.telefone}
                  onChangeText={(text) => handleInputChange2('telefone', text)}
                  placeholder="(##) #####-####"
                  placeholderTextColor={'gray'}
                  style={{ backgroundColor: 'white', borderRadius: 10, borderWidth: 0.7, borderColor: '#CECDCD', width: 'auto', color: '#A87B34', fontWeight: 'bold', fontSize: 14, textAlign: 'auto', }}
                  mask={Masks.BRL_PHONE}

                />
              </VStack>

              <VStack mt={5} w={'100%'} space="xs">
                <Text color='#A87B34' fontSize={13} fontWeight="bold" lineHeight={'$xs'}>Categoria de colaborador:</Text>
                <Select onValueChange={(text) => handleInputChange2('categoria', text)} mt={2}>
                  <SelectTrigger variant="outline" size="md" >
                    <SelectInput
                      placeholder="Categoria" placeholderTextColor={'black'} />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Decoração" value="Decoração" />
                      <SelectItem label="Comida" value="Comida" />
                      <SelectItem
                        label="Entretenimento"
                        value="Entretenimento"
                      />
                      <SelectItem
                        label="Segurança"
                        value="Segurança"
                      />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>



            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup space="lg">
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={() => {
                    setShowAlertDialogProfile(false)
                  }}
                >
                  <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button
                  bg="#A87B34"
                  onPress={handleRegisterColaborator}
                >
                  <ButtonText>Cadastrar-se</ButtonText>
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
      <ScrollView height={'100%'} >

        <Text alignSelf="center" fontWeight="bold" color="#A87B34" marginVertical={10} fontSize={35}>MEU PERFIL</Text>
        <Box>
          {isLoading ?
            <>
              <Box justifyContent="center" alignSelf="center" w={250} h={250} bg={'white'} rounded={'$full'} alignItems="center" marginVertical={40}>
                <Spinner color={'#A87B34'} size={"large"} />
              </Box>
            </>
            : <>
              <TouchableOpacity onPress={handleCameraLaunch} style={{ alignItems: 'center', marginVertical: 20 }}>

                <Avatar bg={'$coolGray500'} w={250} h={250}>
                  <AvatarFallbackText fontSize={65}>{dataUser.nome}</AvatarFallbackText>
                  {dataUser.imagemBase64 || img ?
                    <>
                      <AvatarImage
                        alt="Profile-Picture"
                        source={
                          img ? { uri: img.uri } :
                            { uri: `data:image/jpeg;base64,${dataUser.imagemBase64}` }
                        }
                      />
                    </>
                    :
                    <>

                    </>}

                </Avatar>
              </TouchableOpacity>
            </>
          }

          <Box borderTopRightRadius={20} borderTopLeftRadius={20} borderBottomRightRadius={0} borderBottomLeftRadius={0} alignItens="center" paddingBottom={15} bg={'white'}>
            <Text mt={10} alignSelf="center" color='#A87B34' fontWeight={'bold'}>Informações do usuário:</Text>
            <Input
              alignSelf="center"
              borderRadius={12}
              bg='#FFFF'
              w={'80%'}
              h={50}
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={true}
              $focus-borderColor={'#A87B34'}
              marginTop={10}
            >
              <InputSlot flexDirection="row" marginHorizontal={10}>
                <Text fontSize={12.5} color='#A87B34' fontWeight='$bold'>NOME: </Text>
                <Text fontSize={12.5} fontWeight='$bold'>{dataUser.nome}</Text>
              </InputSlot>
              <InputField $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholderTextColor={'#A87B34'} />
            </Input>
            <Input
              alignSelf="center"
              borderRadius={12}
              bg='#FFFF'
              w={'80%'}
              h={50}
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={true}
              $focus-borderColor={'#A87B34'}
              marginTop={10}
            >
              <InputSlot flexDirection="row" marginHorizontal={10}>
                <Text fontSize={12.5} color='#A87B34' fontWeight='$bold'>SOBRENOME: </Text>
                <Text fontSize={12.5} fontWeight='$bold'>{dataUser.sobrenome}</Text>
              </InputSlot>
              <InputField $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
            </Input>
            <Input
              alignSelf="center"
              borderRadius={12}
              bg='#FFFF'
              w={'80%'}
              h={50}
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={true}
              $focus-borderColor={'#A87B34'}
              marginTop={10}
            >
              <InputSlot flexDirection="row" marginHorizontal={10}>
                <Text fontSize={12.5} color='#A87B34' fontWeight='$bold'>EMAIL: </Text>
                <Text fontSize={12.5} fontWeight='$bold'>{dataUser.email}</Text>
              </InputSlot>
              <InputField $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
            </Input>
            <Input
              alignSelf="center"
              borderRadius={12}
              bg='#FFFF'
              w={'80%'}
              h={50}
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={true}
              $focus-borderColor={'#A87B34'}
              marginTop={10}
            >
              <InputSlot flexDirection="row" marginHorizontal={10}>
                <Text fontSize={12.5} color='#A87B34' fontWeight='$bold'>SENHA: </Text>
                <Icon as={LockKeyhole} />
              </InputSlot>
              <InputField secureTextEntry $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
            </Input>
            <Button onPress={handleEditProfile} borderRadius={10} bg='#A87B34' m={15}>
              <ButtonText>Editar Perfil</ButtonText>
            </Button>
            <Button onPress={() => setShowAlertDialogColaborator(true)} variant="link" borderRadius={10} >
              <ButtonText color='$green600'>Registrar-se como colaborador de eventos</ButtonText>
              <ButtonIcon marginLeft={"$1"} mt={"$0.9"} color="$green600" as={IdCard} />
            </Button>
            <Button onPress={async () => {
              await AsyncStorage.removeItem("id");
              navigation.push('Start')
            }
            } variant="link" borderRadius={10} m={5}>
              <ButtonText m={"$2"} color="red">Sair</ButtonText>
              <ButtonIcon color="red" as={LogOut} />
            </Button>
          </Box>
        </Box>
      </ScrollView>

    </SafeAreaView>
  );
}


function CreateEventScreen({ navigation, route }) {



  const { id, nome, sobrenome, email, senha } = route.params.obj;
  const userData = route.params.obj
  const clickedDate = route.params.clickedDate
  const imageBg = route.params.randomElement


  const AnimatedText = Animated.createAnimatedComponent(Text)
  const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)
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
    try {

      setIsLoading(true)
      // Verifica se os campos obrigatórios foram preenchidos
      if (!imagem) {
        Alert.alert('Preencha a imagem do evento');
        setIsLoading(false)
        return;
      }
      if (!nomeEvento || !selectedDate || !value) {
        Alert.alert('Todos os campos são obrigatórios.');
        setIsLoading(false)
        return;
      }

      const imageData = await RNFS.readFile(imagem.uri, 'base64');
      const dataEventoo = clickedDate ? clickedDate : dataEvento
      const data = {
        idUsuario: id,
        nomeEvento: nomeEvento,
        descricao: descricao,
        dataEvento: dataEventoo,
        horaEvento: moment(selectedDate).format('hh:mm:ss A'),
        privacidade: value,
        rua: rua,
        nConvidados: nConvidados,
        bairro: bairro,
        numero: numero,
        imagemBase64: imageData
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // URL da sua API para enviar os dados e a imagem

      // const apiUrl = 'http://192.168.15.10:8085/api/register/evento';
      const apiUrl = '/api/register/evento';


      const response = await api.post(apiUrl, data, config);
      console.log('Resposta da API:', response.data);


      // Retorna para a página inicial
      navigation.push('Home', { userData });
      setIsLoading(false)
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


  const [isLoading, setIsLoading] = useState(false)


  return (

    <SafeAreaView flex={1} >


      <Animated.View entering={FadeInDown} style={{ backgroundColor: 'black', flex: 1 }} alignItems="center">


        <ScrollView zIndex={1} h={1000} showsVerticalScrollIndicator={false}>
          <Box marginVertical={0} alignItems="center">
            <Button onPress={handleImageLibraryLaunch} w={"100%"} h={250} variant="link">
              <Image w={'100%'} h={'100%'} borderRadius={0} alt="imgEvento" source={imagem ? { uri: imagem.uri } : require('../../../src/img/img.png')} />
            </Button>
            <Button mt={5} onPress={() => { setImagem(null); }} w={320} h={20} variant="link">
              <Text fontSize={12} color="$red500" fontWeight={'bold'}>Limpar </Text>
              <ButtonIcon color="$red500" as={CircleX} />
            </Button>

            <Box marginTop={20} marginHorizontal={5} alignItems="flex-start">

              <Text marginVertical={0} fontSize={15} color={"white"} fontWeight={'$bold'}>Informações do Evento:</Text>


              <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Nome do evento: </Text>
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
                <InputField value={nomeEvento} onChangeText={setNomeEvento} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
              </Input>

              <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Descrição do evento: </Text>
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
                <InputField value={descricao} onChangeText={setDescricao} justifyContent="flex-start" multiline $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
              </Input>
              <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Data do evento: </Text>
                <Icon as={CalendarDaysIcon} color="white" w={15} h={20} />
              </HStack>

              <MaskInput
                value={clickedDate ? clickedDate : dataEvento}
                onChangeText={setDataEvento}
                placeholder=" ____/____/______"
                placeholderTextColor={'#A87B34'}
                style={{ backgroundColor: 'white', borderRadius: 10, borderWidth: 0.7, borderColor: '#CECDCD', width: 'auto', color: '#A87B34', fontWeight: 'bold', fontSize: 14, textAlign: 'auto', }}
                mask={Masks.DATE_DDMMYYYY}

              />
              <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Hora do evento: </Text>
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

              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: "white" }}>
                {selectedDate ? selectedDate.toLocaleTimeString() : 'Horário não selecionado'}
              </Text>

              <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Número de convidados: </Text>
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
                <InputField keyboardType="numeric" value={nConvidados} onChangeText={setNConvidados} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
              </Input>




              <Text marginTop={20} fontSize={15} color={"white"} fontWeight={'$bold'}>Local do evento:</Text>

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
                <InputField value={rua} onChangeText={setRua} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
              </Input>

              <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Bairro: </Text>
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
                <InputField value={bairro} onChangeText={setBairro} $focus-borderColor={'#A87B34'} fontSize={12.5} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
              </Input>

              <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Número: </Text>
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
                <InputField value={numero} onChangeText={setnumero} keyboardType="numeric" $focus-borderColor={'#A87B34'} fontSize={14} color='#A87B34' fontWeight='$bold' placeholder="" placeholderTextColor={'#A87B34'} />
              </Input>


              <HStack marginTop={20} justifyContent="center" alignContent="center">
                <Text fontSize={13} color={"white"} fontWeight={'$bold'}>Privacidade: </Text>
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
                      checkedColor: 'white',
                      uncheckedColor: 'white',
                      showSelectedCheck: true,
                    },
                    {
                      value: 'Público',
                      label: 'Público',
                      checkedColor: 'white',
                      uncheckedColor: 'white',
                      showSelectedCheck: true,
                    },
                  ]}
                />
              </Box>






            </Box>








          </Box>



        </ScrollView>

        <Box alignSelf="flex-end" w={'55%'} marginTop={5} flexDirection="row">
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => navigation.push('Home', { userData })

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
            {isLoading && <ButtonSpinner color={'white'} />}
            <ButtonText>{isLoading ? "" : "Criar Evento"}</ButtonText>
          </Button>

        </Box>



        <AnimatedImageBackground style={{ zIndex: -1, opacity: 0.4, position: "absolute" }} alignItems="center" flex={1} w={'100%'} h={750} source={{ uri: imageBg }}>

        </AnimatedImageBackground>




      </Animated.View>




    </SafeAreaView>
  )
}
const Tab = createBottomTabNavigator();
export default function Home({ navigation, route }) {
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
          else if (route.name === 'Search-Page') {
            iconName = focused
              ? 'search'
              : 'search-outline';
          }
          else if (route.name === 'Perfil') {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }
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
      <Tab.Screen initialParams={{ obj }} options={{ headerShown: false }} name="Página Inicial" component={HomeScreen} />
      <Tab.Screen initialParams={{ obj }} options={{ headerShown: false }} name="Search-Page" component={SearchScreen} />
      <Tab.Screen initialParams={{ obj, randomElement }}
        options={{
          headerShown: false, tabBarStyle: {
            display: "none",
          }, tabBarIcon: ({ focused, color, size }) => {
            return (
              <KeyboardAvoidingView>
                <AnimatedBox style={[scaleStyles]} >
                  <Box alignSelf="center" alignItens="center" justifyContent="center" marginBottom={40} >

                    <Center w={60} h={60} bg={'#AA7E39'} rounded={"$full"}>
                      <Icon as={PartyPopper} color="white" size="xl" />
                    </Center>
                  </Box>
                </AnimatedBox>
              </KeyboardAvoidingView>
            );
          },
        }} name="Criar Evento" component={CreateEventScreen} />
      <Tab.Screen initialParams={{ obj }} options={{ headerShown: false }} name="Eventos" component={EventsScreen} />
      <Tab.Screen initialParams={{ obj }} options={{ headerShown: false }} name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

