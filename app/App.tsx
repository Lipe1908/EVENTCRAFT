
import React from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

import StartNavigator from './res/screen/navigator';
import LoginScreen from './res/screen/Log-page/LoginScreen';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StartNavigator/>
    </GluestackUIProvider>
  );
};



// import * as React from 'react';
// import { View, Button, StyleSheet, Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Animated from 'react-native-reanimated';

// const Stack = createNativeStackNavigator();

// function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//       <Animated
//         source={{ uri: 'https://picsum.photos/id/39/200' }}
//         style={{ width: 300, height: 300 }}
//         sharedTransitionTag="tag"
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//       <Animated.Image
//         source={{ uri: 'https://picsum.photos/id/39/200' }}
//         style={{ width: 100, height: 100 }}
//         sharedTransitionTag="tag"
//       />
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });