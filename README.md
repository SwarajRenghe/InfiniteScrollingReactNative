# InfiniteScrollingReactNative
A simple proof-of-concept prototype showcasing an infinite scrolling mechanism in React Native.

The demo is of a small, cross platform POC app built in React Native. The associated videos provide an in depth walkthropugh.

The main code files are the [hyper optimised FlatList](https://github.com/SwarajRenghe/InfiniteScrollingReactNative/blob/main/screens/OptimisedFlatList.tsx) and the [custom method of discarding items](https://github.com/SwarajRenghe/InfiniteScrollingReactNative/blob/main/screens/MyMethod.tsx). Both these code files form the bulk of the logic of the app, and have extensive code documentation.

### Method 1
## Hyper Optimised FlatList
For a lot of use cases, the highly performant FlatList component within React Native is often a great choice - especially upon tuning some specific parameters. After some experimentation and appropriate assumptions, I tinkered with a few specific parameters like windowSize, removeClippedSubviews, disableVirtualization, lightweight item rendering etc. These parameters were picked to optimise for consuming a low memory footprint.

### Method 2
## Custom Method of Discarding Items
For cases with severely limited memory, we often cannot rely on predefined, built in functions to perform our task adequately. For this, we can use a method of discarding content once the user has scrolled past it, and loading it back in if the user scrolls up again. The primary challenge in this method is to ensure that the content is discarded in such a manner that the scroll position of the user does not jump ie, the user must not be displaced. The solution to this problem is to perform the action of deleting items from the list at the precise moment that a new piece of content reaches the top of the list, and apprpriately repositioning the top of the user's scroll window to avoid any breaks. 

## App Screenshots

`For the purpose of this demonstration, I've used an open-source random user generator API (https://randomuser.me/) as a means to simulate a never ending feed of content. This API returns a random user name, email ID and an image. I've set the seed value of the start to be fixed so as to get the same results everyime.`


