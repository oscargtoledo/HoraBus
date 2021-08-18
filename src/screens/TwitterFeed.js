import React, { useState, useEffect } from 'react';
import { Text, Surface, useTheme, withTheme } from 'react-native-paper';
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-web-webview';
function TwitterFeed(props) {
  const dark = props.theme?.dark;
  let JS =
    '<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>';

  let source =
    JS +
    '<a class="twitter-timeline"' +
    (dark ? 'data-theme="dark"' : '') +
    'href="https://twitter.com/BusGarraf?ref_src=twsrc%5Etfw">Carregant Twitts...</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> ';
  console.log(dark);
  return <WebView source={{ html: source }} javaScriptEnabled={true} />;
}

export default withTheme(TwitterFeed);
