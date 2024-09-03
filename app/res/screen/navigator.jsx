import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import LoginScreen from './Log-page/LoginScreen';
import SigninScreen from './Sign-Page/SigninScreen';
import HomeScreen from './Home-page/home';
import StartScreen from './StartScreen/StartScreen';


export default function StartNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Start'>
                <Stack.Screen options={{headerShown: false}} name="Start" component={StartScreen} />
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                <Stack.Screen options={{headerShown: false}} name="SignIn" component={SigninScreen} />
                <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}