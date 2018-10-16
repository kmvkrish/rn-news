/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';

import  { createStackNavigator } from 'react-navigation';

import HomeScreen from './app/components/HomeScreen';

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
},{
    navigationOptions: {
        headerStyle: {
          backgroundColor: "#38AC60",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerBackTitleVisible: false
    }
});

export default class App extends Component {
    render() {
        return <RootStack />
    }
}