import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert, FlatList } from 'react-native';

import Article from './Article';

import { NewsAPI } from '../news';

export default class SourceArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            articles: []
        };

        this._isComponentMounted = false;

        this.newsapi = new NewsAPI();
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: "Articles for - " + navigation.getParam("source").name
        }
    }

    handleClick = (article) => {
      const { title,
          url,
          urlToImage,
          publishedAt,
          content,
          source,
          author
      } = article;
      this.props.navigation.push('ArticleContent', {title, url, urlToImage, publishedAt,
           content, source, author});
    }

    async componentDidMount() {
        this._isComponentMounted = true;
        const source = this.props.navigation.getParam('source');
        try {
            const articles = await this.newsapi.getArticlesForSource(source.id);
            if (this._isComponentMounted) {
                this.setState({
                    loading: false,
                    articles: articles.articles
                });
            }
        } catch( error ) {
            if (this._isComponentMounted) {
                this.setState({
                    loading: false,
                    articles: []
                });
            }
            Alert.alert('Error', 'Could not fetch articles', [{
                text: 'OK',
                onPress: () => console.log(`Could not fetch articles for source ${source.name}`)
            }], {
                cancelable: false
            });
        }
    }

    render() {
        const {loading, articles} = this.state;

        if (loading) {
            return (
                <View style={styles.main}>
                    <ActivityIndicator size="large" color="#538AE4" />
                </View>
            )
        } else {
            return (
                <View>
                    <FlatList
                        data={articles}
                        renderItem={({ item }) => <Article article={item} handleClick={this.handleClick} />}
                        keyExtractor={(item, index) => { return item.url; }}
                    />
                </View>
            );
        }
    }

    componentWillUnmount() {
        this._isComponentMounted = false;
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#F5F5F5",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});