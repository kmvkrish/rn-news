import React, { Component } from 'react';

import { View, Linking, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class Article extends Component {
    constructor(props) {
        super(props);
    }

    checkAndOpenUrl = (url) => {
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    }

    render() {
        const { title,
                description,
                url,
                urlToImage,
                publishedAt,
                content,
                source,
                author
        } = this.props.article;

        const time = moment(publishedAt || moment.now()).fromNow();

        const { noteStyle, featuredTitleStyle, textStyle, dividerStyle } = styles;

        return (
            <TouchableNativeFeedback useForeground onPress={() => this.checkAndOpenUrl(url)}>
                <Card
                    image={{uri: urlToImage}}
                    title={title}
                    titleNumberOfLines={2}
                >
                    <Text style={textStyle}>
                        {description}
                    </Text>
                    <Divider style={dividerStyle}/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
                        <Text style={noteStyle}>{time}</Text>
                    </View>
                </Card>
            </TouchableNativeFeedback>
        )

    }
}

const styles = StyleSheet.create({
    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },
    /*titleStyle: {
        marginHorizontal: 5,
        textShadowColor: '#00000f',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 3
    },*/
    dividerStyle: {
        backgroundColor: "#dfe6e9"
    },
    textStyle: {
        marginBottom: 10,
        fontSize: 14
    },
});