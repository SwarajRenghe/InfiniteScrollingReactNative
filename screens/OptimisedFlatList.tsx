import React, { Component } from 'react';

import { StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';

import { ListItem, Image } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;

const visibleWindowSize = 30;

class OptimisedFlatList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            information: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        }
    }

    /**
     * Run once when the component mounts the virtual DOM. Here, we make the first request.
     * @param  {[none]}     []
     * @return {[none]}     []
     */
    componentDidMount() {
        this.makeRemoteRequest(false);
    }

    /**
     * The function that makes the API call, and sets the state with the new content.
     * @param  {[boolean]}    reset  [If false, then the newly loaded data is appended to our existing data. If true, then the entire existing data is reset (useful for a complete screen refresh on a swipe down at the top - to load in brand new data)]
     * @return {[none]}       []
     */
    makeRemoteRequest = (reset) => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?page=${page}&results=10&seed=${seed}`
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    information: reset == false ? [...this.state.information, ...res.results] : res.results,
                    currentInformationSize: this.state.information.length,
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                })
            })
            .catch(error => {
                this.setState({ error: error, loading: false, refreshing: false });
            })
    }

    /**
     * When the user swipes down from the top of the list. Makes a new API call, and resets the entire list.
     * @param  {[none]}     []
     * @return {[none]}     []
     */
    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true,
            seed: 1
        }, () => {
            this.makeRemoteRequest(true);
        })
    }

    /**
     * Ideally, we would not like the user reach the footer area of the list as it breaks the illusion of an infinitely scrolling list of content. This is a placeholder to handle the edge case of reaching the footer - it renders a simple loading animation.
     * @param  {[none]}     []
     * @return {[none]}     []
     */
    renderFooter = () => {
        return (
            <>
                <ActivityIndicator animating size="large" style={{ paddingVertical: 20, borderTopWidth: 1 }} />
            </>
        )
    }

    /**
     * A Callback function for the FlatList - this function renders the Name, Email ID and the Image of a single user.
     * @param  {[user Object { name.first, name.last, email } ]}   item  [Contains the JSON object with user details]
     * @return {[none]}       []
     */
    renderFlatListItem = ({ item }) => {
        return (
            <>
                <ListItem containerStyle={{ backgroundColor: "black" }} >
                    <ListItem.Content>
                        <ListItem.Title style={{ color: "white" }}>{`${item.name.first} ${item.name.last}`}</ListItem.Title>
                        <ListItem.Subtitle style={{ color: "white" }}>{item.email}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <Image
                    source={{ uri: item.picture.large }}
                    style={{ width: windowWidth, height: 200 }}
                />
            </>
        )
    }

    /**
     * A callback function - when the user is nearing the end of the list, we make another API call in the background, and concatenate it to the existing list to give the illusion of an infinitely scrolling list.
     * @param  {[none]}     []
     * @return {[none]}     []
     */
    handleLoadMore = () => {
        console.log("making request")
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.makeRemoteRequest(false);
        })
    }

    /**
     * The Main Render method
     * @param  {[none]}     []
     * @return {[none]}     []
     */
    render() {
        return (
            <>
                <Text style={styles.mainTitle}>This is a normal flatlist implementation. We can see that we can keep scrolling without ever touching the bottom of the list. Also, if we were to rapidly scroll up, we can see the content being loaded in again (as the render had been discarded).</Text>
                <View style={styles.container}>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                </View>
                <FlatList
                    ref={(ref) => { this.flatListRef = ref; }}
                    data={this.state.information}
                    renderItem={this.renderFlatListItem}
                    keyExtractor={item => item.email}           // assigning a unique key to each item.
                    ListFooterComponent={this.renderFooter}     // Renders the footer component at the bottom of the list.
                    onEndReached={this.handleLoadMore}          // Loads in more content as the user is nearing the end
                    refreshing={this.state.refreshing}          // A simple state boolean to display a loading indicator when the user refreshes
                    onRefresh={this.handleRefresh}              // Makes an API call and resets the FlatList
                    onEndReachedThreshold={8}                   // A threshold to make a background API call and update the list silently
                    removeClippedSubviews={true}                // Unmount components that are off of the window.
                    windowSize={4}                              // Controls how many "invisible" items will be kept rendered
                />
            </>
        )
    }
}

export default OptimisedFlatList;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTitle: {
        fontSize: 18,
        padding: 12,
        paddingTop: 16
    },
    list: {
        padding: 8,
    },
    bgblack: {
        backgroundColor: 'black',
    },
    separator: {
        marginVertical: 8,
        height: 1,
        width: '80%',
    },
});
