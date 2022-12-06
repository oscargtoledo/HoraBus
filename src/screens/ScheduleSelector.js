// ./screens/About.js
import 'react-native-gesture-handler';
// import { ThemeProvider } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native-web-refresh-control';
// import {
//   Placeholder,
//   PlaceholderMedia,
//   PlaceholderLine,
//   Fade,
//   ShineOverlay,
// } from 'rn-placeholder';

import {
  Button,
  useTheme,
  Surface,
  ActivityIndicator,
  Text,
  // Card,
  // Title,
  // Paragraph,
  Avatar,
  // TouchableRipple,
  Snackbar,
  // Portal,
  // Modal,
} from 'react-native-paper';
// import { Icon } from 'react-native-elements';
import APIClient from '../utils/APIClient';
import Icon from '@mdi/react';
import { mdiChevronRightCircle } from '@mdi/js';
const ScheduleSelector = ({ navigation }) => {
  const theme = useTheme();
  const [schedules, setSchedules] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  // const retrieveData = async () => {
  //   try {
  //     const { data } = await APIClient.get('/schedules/names');
  //     setSchedules(data);
  //     console.log(data);
  //   } catch (ex) {
  //     console.log(ex);
  //     console.log({ ...ex });
  //   }
  // };

  const onRefresh = () => {
    setRefreshing(true);
    // retrieveData();
    // setRefreshing(false);
  };

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const result = await APIClient.get('/schedules/names');
        // console.log(result.data);
        setSchedules(result.data);
        setRefreshing(false);
      } catch (e) {
        // console.log(e);
        setHasError(true);
        setRefreshing(false);
      }
    };
    retrieveData();
    // retrieveData();
  }, [refreshing]);

  // const generateRouteButtons = () => {
  //   const routeButtons = [];
  //   for (const e in schedules) {
  //     routeButtons.push(<Button title={e.routeName}></Button>)
  //   }
  //   return routeButtons;
  // }
  return (
    <Surface
      style={{
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: theme?.colors.background
      }}
    >
      {/* <Text>{JSON.stringify(schedules)}</Text> */}
      {/* <Text>This is the selection screen</Text> */}
      {/* {console.log(generateRouteButtons())} */}
      {/* <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          padding: 10,
        }}
      > */}
      <Snackbar
        visible={hasError}
        duration={2000}
        onDismiss={() => setHasError(false)}
        action={{
          label: 'OK',
        }}
        wrapperStyle={
          {
            // height: window.innerHeight,
          }
        }
      >
        <Text>Hi ha hagut un error al carregar els horaris.</Text>
      </Snackbar>

      <Button
        mode="contained"
        style={{ margin: 5 }}
        onPress={() => setRefreshing(true)}
      >
        Recarregar Horaris
      </Button>
      <ScheduleList
        isLoading={refreshing}
        items={schedules}
        navigation={navigation}
        onRefresh={onRefresh}
      />
    </Surface>
  );
};

const ScheduleList = ({ items, isLoading, navigation, onRefresh }) => {
  return isLoading ? (
    // return true ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={{ flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          height: 0,
          marginHorizontal: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {items.map((item, index) => {
          return (
            <ScheduleButton
              key={item._id}
              scheduleData={item}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const LeftContent = props => <Avatar.Icon icon="chevron-right" />;

const ScheduleButton = ({ scheduleData, navigation }) => {
  const theme = useTheme();

  return (
    <Surface
      style={{
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        minHeight: 100,
        margin: 3,
        paddingLeft: 10,

        backgroundColor: theme?.colors.primary,
      }}
    >
      <View
        style={{
          flex: 2,
          flexShrink: 1,
          flexGrow: 1,
          padding: 5,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            // flex: 1,
            textAlign: 'left',
            textAlignVertical: 'center',
          }}
        >
          {scheduleData.routeName}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexShrink: 1,
          padding: 2,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{ height: '100%' }}
          onPress={() => {
            navigation.navigate('Horari', {
              routeId: scheduleData._id,
            });
          }}
        >
          <Icon
            path={mdiChevronRightCircle}
            color={theme?.colors.accent}
          ></Icon>
        </TouchableOpacity>
        {/* <IconButton
          icon="chevron-right"
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
            navigation.navigate('Horari', {
              routeId: scheduleData._id,
            });
          }}
        ></IconButton> */}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default ScheduleSelector;
