import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';

import { Card, Text, Button, Divider } from 'react-native-elements';

import moment from 'moment';

export default class ArticleContent extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title", 'Article Content')
        };
    };

    showArticlesForSource = (source) => {
        this.props.navigation.push('SourceArticles', {source});
    }

    render() {
        const { navigation } = this.props;
        const source = navigation.getParam('source');
        const time = moment(navigation.getParam('publishedAt') || moment.now()).fromNow();
        return (
            <View style={styles.main}>
                <Card
                    image={{uri: navigation.getParam('urlToImage')}}
                >
                    <Text h5>{navigation.getParam('title')}</Text>
                    <Divider style={styles.dividerStyle} />
                    <Text style={styles.articleContentStyle}>{navigation.getParam('content')}</Text>
                    <Divider style={styles.dividerStyle} />
                    <View style={styles.articleFooterStyle}>
                        <TouchableNativeFeedback onPress={() => this.showArticlesForSource(source)}>
                            <Text>{source.name}</Text>
                        </TouchableNativeFeedback>
                        <Text>{time}</Text>
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#f5f5f5",
    },
    dividerStyle: {
        backgroundColor: "#dfe6e9"
    },
    articleContentStyle: {
        marginBottom: 10,
        fontSize: 14
    },
    articleFooterStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});