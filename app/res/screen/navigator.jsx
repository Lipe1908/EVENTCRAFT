import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import LoginScreen from './Log-page/LoginScreen';
import SigninScreen from './Sign-Page/SigninScreen';
import HomeScreen from './Home-page/home';
import StartScreen from './StartScreen/StartScreen';
import Evento from './Expanded-event-page/ExpEventScreen';

export default function StartNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Start'>
                <Stack.Screen options={{headerShown: false}} name="Start" component={StartScreen} />
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                <Stack.Screen options={{headerShown: false}} name="SignIn" component={SigninScreen} />
                <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
                <Stack.Screen options={{headerShown: false}} name="Evento" component={Evento} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
    
