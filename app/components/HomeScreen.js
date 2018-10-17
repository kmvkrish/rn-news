import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, ToastAndroid } from 'react-native';

import Article from './Article';

import { NewsAPI } from '../news';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        loading: true,
        articles: []
        };
        this.newsApi = new NewsAPI();
    }

    static navigationOptions = {
        title: "Headlines",
    };

    handleClick = (article) => {
        const { title,
            url,
            urlToImage,
            publishedAt,
            content,
            source,
            author
        } = article;
        this.props.navigation.navigate('ArticleContent', {title, url, urlToImage, publishedAt,
            content, source, author});
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

        if (loading) {
            return (
                <View style={styles.main} >
                    <ActivityIndicator size="large" style={styles.activityIndicator} />
                </View>
            )
        } else {
            return (
                <View>
                    <FlatList
                        data={articles}
                        renderItem={({ item }) => <Article article={item} handleClick={this.handleClick} />}
                        keyExtractor={item => item.url}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#F5F5F5",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    activityIndicator: {
        color: "#538AE4"
    },
    text: {
        color: "#000",
        fontSize: 24
    },
});
