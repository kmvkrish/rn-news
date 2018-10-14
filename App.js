/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, ToastAndroid, StatusBar, StatusBarProps } from 'react-native';

import Article from './app/components/Article';

import { NewsAPI } from './app/news';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articles: []
    };
    this.newsApi = new NewsAPI();
  }

  async componentDidMount() {
      try {
          const headlines = await this.newsApi.getTopHeadlines();
          this.setState({
            loading: false,
            articles: headlines.articles
          });
      } catch (err) {
          this.setState({
              loading: false,
              article: []
          });
          if (Platform.OS === "android") {
              ToastAndroid.show("Failed to get headlines", ToastAndroid.SHORT);
          }
      }
  }

  render() {
      const { loading, articles } = this.state;

      return (
          <View style={styles.main} >
              <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#36AC60" translucent = {true}/>
              { loading ?
                <ActivityIndicator size="large" style={styles.activityIndicator} />:
                <FlatList
                  data={articles}
                  renderItem={({ item }) => <Article article={item} />}
                  keyExtractor={item => item.url}
              />
              }
          </View>
      )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  activityIndicator: {
    color: "#38AC60"
  },
  text: {
    color: "#000",
    fontSize: 24
  },
});
