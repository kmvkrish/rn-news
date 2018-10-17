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
import ArticleContent from './app/components/ArticleContent';
import SourceArticles from './app/components/SourceArticles';

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    ArticleContent: {
        screen: ArticleContent
    },
    SourceArticles: {
        screen: SourceArticles
    }
},{
    navigationOptions: {
        headerStyle: {
          backgroundColor: "#538AE4",
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