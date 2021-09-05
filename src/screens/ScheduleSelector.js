// ./screens/About.js
import 'react-native-gesture-handler';
import { ThemeProvider } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native-web-refresh-control';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  ShineOverlay,
} from 'rn-placeholder';

import {
  Button,
  useTheme,
  Surface,
  ActivityIndicator,
  Text,
  Card,
  Title,
  Paragraph,
  Avatar,
  TouchableRipple,
  IconButton,
} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import APIClient from '../utils/APIClient';

const ScheduleSelector = ({ navigation }) => {
  const theme = useTheme();
  const [schedules, setSchedules] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
      const result = await APIClient.get('/schedules/names');
      console.log(result.data);
      setSchedules(result.data);
      setRefreshing(false);
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
      {/* </ScrollView> */}
    </Surface>
  );
};

const ScheduleList = ({ items, isLoading, navigation, onRefresh }) => {
  return isLoading ? (
    // return true ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={{ flex: 1 }}>
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
        {/* <TouchableRipple
          style={{
            flex: 1,
            // aspectRatio: 1,

            // borderWidth: 1,
            // borderColor: 'rgba(0,0,0,0.2)',
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: theme?.colors.primary,
            // borderRadius: 50,
          }}
          onPress={() => {
            navigation.navigate('Horari', {
              routeId: scheduleData._id,
            });
          }}
        >
          <Icon
            name={'chevron-right'}
            size={30}
            color={theme?.colors.text}
            disabledStyle={{ backgroundColor: 'green' }}
          />
        </TouchableRipple> */}
        <IconButton
          icon="chevron-right"
          theme={theme}
          // color={'red'}
          size={40}
          style={{
            alignSelf: 'center',
            backgroundColor: theme?.colors.primaryLight,
          }}
          onPress={() => {
            navigation.navigate('Horari', {
              routeId: scheduleData._id,
            });
          }}
        ></IconButton>
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
