// ./screens/Contact.js

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import APIClient from '../utils/APIClient';
import { useTheme, TextInput, Button, Surface } from 'react-native-paper';
import {} from 'react-native-web';
const Contact = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [usernameText, setUsernameText] = useState('Anònim');
  const [inputText, setInputText] = useState('');
  const windowHeight = Dimensions.get('window').height;

  const sendFeedback = async (alias, content) => {
    await APIClient.post('/feedback', { alias: alias, feedback: content })
      .then(function (response) {
        console.log(response);
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

  return (
    <Surface style={styles.center}>
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
        // style={[
        //   {
        //     ...styles.textInputCentered,
        //     // width: '90%',
        //     // flexGrow: 1,
        //     // height: windowHeight / 2,
        //     // backgroundColor: 'red',
        //   },
        // ]}

        mode={'flat'}
        label={'Contingut'}
        onChangeText={text => setInputText(text)}
        value={inputText}
      ></TextInput>
      <Button
        mode={'contained'}
        onPress={() => sendFeedback(usernameText, inputText)}
      >
        Enviar
      </Button>
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
