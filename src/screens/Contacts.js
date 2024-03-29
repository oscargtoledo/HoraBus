// ./screens/Contact.js

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import APIClient from '../utils/APIClient';
import * as Clipboard from 'expo-clipboard';
import {
  useTheme,
  TextInput,
  Button,
  Surface,
  IconButton,
  Text,
  Snackbar,
} from 'react-native-paper';
const Contact = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [usernameText, setUsernameText] = useState('Anònim');
  const [inputText, setInputText] = useState('');

  const windowHeight = Dimensions.get('window').height;

  const sendFeedback = async (alias, content) => {
    await APIClient.post('/feedback', { alias: alias, feedback: content })
      .then(function (response) {
        // console.log(response);
        if (response.status == 201) {
          console.log('success');
          alert("El feedback s'ha enviat correctament", 'My Alert Msg', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK' },
          ]);
          setUsernameText('Anònim');
          setInputText('');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [currentName, setName] = React.useState('');
  const [currentMessage, setMessage] = React.useState('');
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };
  // prettier-ignore
  const handleSubmit = e => {
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'data-netlify': 'true',
      },
      body: encode({
        'form-name': 'contact',
        'name': usernameText,
        'message': inputText,
      }),
    };
    console.log(fetchConfig);
    fetch('/', fetchConfig)
      .then((e) => {
        alert("El feedback s'ha enviat correctament", 'My Alert Msg', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK' },
        ]);
        setUsernameText('Anònim');
        setInputText('');
      })
      .catch(error => alert(error));

    e.preventDefault();
  };

  return (
    <Surface style={styles.center}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >

        <Text style={{ alignSelf: 'center' }}>
          Comparteix l'app amb aquest link!
        </Text>
        <IconButton
          icon="link-variant"
          theme={theme}
          // color={'red'}
          size={40}
          style={{
            alignSelf: 'center',
            backgroundColor: theme?.colors.accent,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
          onPress={() => {
            onToggleSnackBar();
            Clipboard.setString('https://horabus.netlify.app');
          }}
        />
      </View>
      <View style={{ flex: 7, width: '100%', alignItems: 'center' }}>
        <TextInput
          style={[{ margin: 10, textAlign: 'center' }]}
          label={'Nom'}
          mode={'flat'}
          onChangeText={text => setUsernameText(text)}
          value={usernameText}
          theme={{ colors: { primary: theme?.colors.text } }}
        ></TextInput>

        <TextInput
          multiline={true}
          textAlignVertical="top"
          style={[{ margin: 10, width: '90%', height: windowHeight / 2 }]}
          theme={{ colors: { primary: theme?.colors.text } }}
          mode={'flat'}
          label={'Contingut'}
          onChangeText={text => setInputText(text)}
          value={inputText}
        ></TextInput>
        <Button
          mode={'contained'}
          // onPress={() => sendFeedback(usernameText, inputText)}
          onPress={() => handleSubmit()}
        >
          Enviar
        </Button>

        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'OK',
          }}
        >
          <Text>Link copiat!</Text>
        </Snackbar>
      </View>
    </Surface>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  });

export default Contact;
