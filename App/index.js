import React from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    View,
    RefreshControl,
} from 'react-native';

import { client } from './graphql/client';
import { TopHeadlines } from './graphql/queries';
import { ArticleRow } from './components/ArticleRow';

const styles = StyleSheet.create({
    headerText: {
        color: '#ff8d01',
        fontWeight: 'bold',
        fontSize: 40,
        paddingHorizontal: 10,
        marginBottom: 30,
        //marginTop: 10,
    },
    buttonContainer: {
        justifyContent: "center",
        flexDirection: 'row'
    },
    buttonText: {
        color: '#ff8d01',
        fontSize: 25,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    selectedButtonText: {
        color: 'black',
    },
});

class App extends React.Component {
    state = {
        articles: [],
        loading: true,
        topic: 1,
        isRefreshing: true,
    };

    componentDidMount() {
        this.requestTopHeadlines();
    }

    requestTopHeadlines = () => {
        if (this.state.topic == 1) {
            client
                .query({
                    query: TopHeadlines,
                    variables: { category: 'technology' },
                })
                .then(response => {
                    console.log('response', response);
                    this.setState({
                        loading: response.loading,
                        isRefreshing: false,
                        articles: response.data.headlines.articles,
                    });
                })
                .catch(err => {
                    console.log('error', err);
                });
        } else if (this.state.topic == 2) {
            client
                .query({
                    query: TopHeadlines,
                    variables: { category: 'sports' },
                })
                .then(response => {
                    console.log('response', response);
                    this.setState({
                        loading: response.loading,
                        isRefreshing: false,
                        articles: response.data.headlines.articles,
                    });
                })
                .catch(err => {
                    console.log('error', err);
                });
        } else if (this.state.topic == 3) {
            client
                .query({
                    query: TopHeadlines,
                    variables: { category: 'business' },
                })
                .then(response => {
                    console.log('response', response);
                    this.setState({
                        loading: response.loading,
                        isRefreshing: false,
                        articles: response.data.headlines.articles,
                    });
                })
                .catch(err => {
                    console.log('error', err);
                });
        } else {
            client
                .query({
                    query: TopHeadlines,
                    variables: { category: 'general' },
                })
                .then(response => {
                    console.log('response', response);
                    this.setState({
                        loading: response.loading,
                        isRefreshing: false,
                        articles: response.data.headlines.articles,
                    });
                })
                .catch(err => {
                    console.log('error', err);
                });
        }
    };

    renderFooter = () => {
        if (this.state.loading) {
            return <ActivityIndicator size="large" />;
        }

        return null;
    };

    onTechPress = () => {
        this.setState({
            topic: 1,
        });
        // this.requestTopHeadlines();
    }
    onSportPress = () => {
        this.setState({
            topic: 2,
        });
        //   this.requestTopHeadlines();
    }
    onGeneralPress = () => {
        this.setState({
            topic: 3,
        });
        //  this.requestTopHeadlines();
    }
    onRefresh() {
        this.setState({ isRefreshing: true });
        this.requestTopHeadlines();
    }
    onScroll() {

    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.onTechPress}>
                        <Text style={[styles.buttonText, this.state.topic == 1 ? { color: 'black' } : { color: '#ff8d01' }]}>Technology</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.onSportPress}>
                        <Text style={[styles.buttonText, this.state.topic == 2 ? { color: 'black' } : { color: '#ff8d01' }]}>Sports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.onGeneralPress}>
                        <Text style={[styles.buttonText, this.state.topic == 3 ? { color: 'black' } : { color: '#ff8d01' }]}>Business</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.articles}
                    ListHeaderComponent={
                        <Text style={styles.headerText}>Top Headlines</Text>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    renderItem={({ item, index }) => (
                        <ArticleRow index={index} {...item} />
                    )}
                    keyExtractor={item => `${item.publishedAt}-${item.title}`}
                    ListFooterComponent={this.renderFooter()}
                    onEndReached={this.onScroll}
                />
            </SafeAreaView >
        );
    }
}

export default App;