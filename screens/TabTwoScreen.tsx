
import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen({navigation}) {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>A Custom Method of Discarding Items</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.3)" />
      <Text style={styles.subtitle}>
        For cases with severely limited memory, we often cannot rely on predefined, built in functions to perform our task adequately. For this, we can use a method of discarding content once the user has scrolled past it, and loading it back in if the user scrolls up again. 
      </Text>
      <Text style={styles.subtitle2}>
        The primary challenge in this method is to ensure that the content is discarded in such a manner that the scroll position of the user does not jump ie, the user must not be displaced. The solution to this problem is to perform the action of deleting items from the list at the precise moment that a new piece of content reaches the top of the list, and apprpriately repositioning the top of the user's scroll window to avoid any breaks. 
      </Text>
      <Button
        title="Demo"
        onPress={() => navigation.navigate('MyMethod')}
      />
    </View>
    <Text style={styles.content}>For the purpose of this demonstration, I've used an open-source random user generator API (https://randomuser.me/) as a means to simulate a never ending feed of content. This API returns a random user name, email ID and an image. I've set the seed value of the start to be fixed so as to get the same results everyime.</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginRight: 28,
    marginLeft: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    padding: 8,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 8,
  },
  subtitle2: {
    fontSize: 16,
    padding: 8,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 8,
  },
  content: {
    textAlign: 'center',
    fontSize: 11,
    padding: 8,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 12,
  },
  separator: {
    marginVertical: 30,
    height: 3,
    width: '80%',
  },
});
