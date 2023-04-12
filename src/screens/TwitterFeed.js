import React, { useState, useEffect } from 'react';
import { Text, Surface, useTheme, withTheme, Button, ActivityIndicator } from 'react-native-paper';
import { View, Platform, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-web-webview';
function TwitterFeed(props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadedWebView = () => {
    setHasLoaded(true)
  }

  const dark = props.theme?.dark;
  let JS =
    '<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>';

  let source =
    JS +
    '<a class="twitter-timeline"' +
    (dark ? 'data-theme="dark"' : '') +
    'href="https://twitter.com/BusGarraf?ref_src=twsrc%5Etfw"></a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> ';
  return (
    <Surface style={styles.container}>
      {/* <Text>Aquesta funció esta trencada pel moment, clica el seguent link per obrir twitter:</Text>
      <Button mode="contained" onPress={() => Linking.openURL('https://twitter.com/BusGarraf')}>Twitter</Button> */}

      <WebView source={{ html: source }} javaScriptEnabled={true} onLoad={() => loadedWebView()}></WebView>
      {!hasLoaded &&
        <View
        style={{position: "absolute"}}>
          <ActivityIndicator size="large"/>
          <Text>Carregant Twitter...</Text>
        </View>
      }
    </Surface>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginWebView: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
  },
});

export default withTheme(TwitterFeed);
