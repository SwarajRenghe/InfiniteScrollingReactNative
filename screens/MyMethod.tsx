import React, { Component } from 'react';

import { StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';

import { ListItem, Image } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;

const visibleWindowSize = 30;

class MyMethod extends Component {
    // A reference to the scroll position of the list, which we will use later to reposition the user in the list
    flatListRef: FlatList<any> | null;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            information: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            currentInformationSize: 0,
            toBeDeletedIndex: 15,
        }
    }

    /**
     * Run once when the component mounts the virtual DOM. Here, we make the first request.
     * @param  {[none]}     []
     * @return {[none]}     []
     */
    componentDidMount() {
        this.makeRemoteRequest (false);
    }

    /**
     * The function that makes the API call, and sets the state with the new content.
     * @param  {[boolean]}    reset  [If false, then the newly loaded data is appended to our existing data. If true, then the entire existing data is reset (useful for a complete screen refresh on a swipe down at the top - to load in brand new data)]
     * @return {[none]}       []
     */
    makeRemoteRequest = (reset) => {
        console.log ("reset is", reset)
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
                }, () => {
                    // console.log (this.state.currentInformationSize)
                    // if (this.state.currentInformationSize > visibleWindowSize) {
                    //     console.log ("now removing first 10 element")
                    //     this.setState ({information: [...this.state.information.slice(20)]});
                    //     this.flatListRef.scrollToOffset({ animated: false, offset: 0 });
                    // }
                    // if (this.state.currentInformationSize > 20) {
                        // this.setState ({
                        //     information: this.state.information.slice (8, this.state.currentInformationSize),
                        //     currentInformationSize: this.state.information.length
                        // })
                    // }
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
            this.makeRemoteRequest (true);
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
                <ActivityIndicator animating size="large" style={{ paddingVertical: 20, borderTopWidth: 1 }}/>
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
     * The function to delete a specific piece of content from the list. This function updates the state. In this case, our list contains user, and the Email ID is the unique identifier. This function currently runs at O(N), but can be optimised to run in O(1), as we would ideally delete only the top of the list.
     * @param  {[string]}   emailID  [The unique identifier for the piece of content that is out of the view of the user's screen]
     * @return {[none]}     []
     */
    deleteItemById = emailID => {
        const filteredData = this.state.information.filter(item => item.email !== emailID);
        this.setState({ information: filteredData });
    }

    /**
     * A callback function - when the user is nearing the end of the list, we make another API call in the background, and concatenate it to the existing list to give the illusion of an infinitely scrolling list.
     * @param  {[none]}     []
     * @return {[none]}     []
     */
    handleLoadMore = () => {
        console.log("making request")
        this.setState ({
            page: this.state.page + 1,
        }, () => {
            this.makeRemoteRequest (false);
        })
    }

    /**
     * A callback function - when the user's list contents change. We track the exact position of a new piece of content aligning with the top of the list, and delete the element to the top. In the same instant, we also reposition the user's scroll list. 
     * @param  {[list of items]}    viewableItems [currently visible items on the screen, even partially]
     * @param  {[list of items]}    changed       [items that have been rendered on the previous pass]
     * @return {[none]}     []
     */
    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems.map(x => x.index)[0] == this.state.toBeDeletedIndex) {
            // this.setState ({
            //     information: this.state.information.slice (1, this.state.currentInformationSize),
            //     currentInformationSize: this.state.information.length
            // }, () => {
            //     this.flatListRef.scrollToIndex({ animated: false, index: 1 })
            //     console.log ("now it is ", this.state.information.map(x => x.index))
            // })
            this.deleteItemById (this.state.information[0].email);
            // this.flatListRef.scrollToIndex({ animated: false, index: 14 })
            this.state.toBeDeletedIndex++;
            this.flatListRef.scrollToIndex({ animated: false, index: this.state.toBeDeletedIndex-2 })
        }
        // console.log("Visible items are", viewableItems.map(x => x.index));
        // console.log("Changed in this iteration", changed.map(x => x.index));
      }

    /**
     * The Main Render method
     * @param  {[none]}     []
     * @return {[none]}     []
     */
    render() {
        return (
            <>
                <Text style={styles.mainTitle}>
                    For the purpose of clarity in this demo, I do not handle the task of re-adding the content back to the user's list, primarily because showcasing the unique method of deleting items becomes quite difficult.
                </Text>
                <Text style={styles.mainTitle}>
                    Adding that functionality is a straightforward task, however. We can use a relevant data structure like a stack to track the IDs of the items the user has already seen, and use the same unique method of discarding items from the bottom (and adding the content back on top of the list), once the user begins scrolling up.
                </Text>
                <View style={styles.container}>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                </View>
                <FlatList 
                    ref={(ref) => { this.flatListRef = ref; }}
                    data={this.state.information} 
                    renderItem={this.renderFlatListItem} 
                    keyExtractor={item => item.email}                       // assigning a unique key to each item.
                    ListFooterComponent={this.renderFooter}                 // Renders the footer component at the bottom of the list.
                    onEndReached={this.handleLoadMore}                      // Loads in more content as the user is nearing the end
                    refreshing={this.state.refreshing}                      // A simple state boolean to display a loading indicator when the user refreshes
                    onRefresh={this.handleRefresh}                          // Makes an API call and resets the FlatList
                    onEndReachedThreshold={2}                               // The threshold at which new items are loaded
                    onViewableItemsChanged={this.onViewableItemsChanged }   // called when the visible items in the list changes
                    />
            </>
        )
    }
}

export default MyMethod;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTitle: {
        fontSize: 14,
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
