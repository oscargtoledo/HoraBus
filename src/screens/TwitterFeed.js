import React, { useState, useEffect } from 'react';
import { Text, View, Surface } from 'react-native-paper';
import { WebView } from 'react-native-webview';
class TwitterFeed extends React.Component {
  render() {
    return <WebView source={{ uri: 'https://twitter.com/BusGarraf' }} />;
  }
}

export default TwitterFeed;
