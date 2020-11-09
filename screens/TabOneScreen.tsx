import * as React from 'react';
import { StyleSheet, Button, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default function TabOneScreen({navigation}) {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>A Hyper Optimised FlatList</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.3)" />
      <Text style={styles.subtitle}>
        For most use cases, the highly performant FlatList component within React Native is often a great choice - especially upon tuning some specific parameters. After some experimentation and appropriate assumptions, I tinkered with a few specific parameters like windowSize, removeClippedSubviews, disableVirtualization, lightweight item rendering etc.
      </Text>
      <Button
        title="Demo"
        onPress={() => navigation.navigate('OptimisedFlatList')}
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    padding: 8,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 12,
  },
  smallSubtitle: {
    fontSize: 12,
    padding: 8,
    marginRight: 12,
    marginLeft: 12,
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
