// ./screens/About.js

import { ThemeProvider } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// import {  } from "react-native-gesture-handler";
import {
  Button,
  useTheme,
  Surface,
  ActivityIndicator,
  Divider,
  Text,
  TouchableRipple,
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
    retrieveData();
    setRefreshing(false);
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
    <Surface style={{ flexGrow: 1, flexDirection: 'column' }}>
      {/* <Text>{JSON.stringify(schedules)}</Text> */}
      {/* <Text>This is the selection screen</Text> */}
      {/* {console.log(generateRouteButtons())} */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          padding: 10,
        }}
      >
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
        />
      </ScrollView>
    </Surface>
  );
};

const ScheduleList = ({ items, isLoading, navigation }) => {
  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          height: 0,
          marginHorizontal: 20,
          backgroundColor: 'green',
        }}
      >
        {items.map((item, index) => {
          return (
            // <Button
            //   key={item._id}
            //   mode="contained"
            //   onPress={() =>
            //     navigation.navigate('Horari', {
            //       routeId: item._id,
            //     })
            //   }
            //   style={{ margin: 2 }}
            // >
            //   {item.routeName}
            // </Button>
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

const ScheduleButton = ({ scheduleData, navigation }) => {
  const theme = useTheme();
  return (
    <Surface
      style={{
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        // flexShrink: 1,
        // flexGrow: 1,
        // flexBasis: 100,
        minHeight: 100,
        margin: 3,
        paddingLeft: 10,

        backgroundColor: theme?.colors.primary,
      }}
    >
      <View
        style={{
          flex: 10,
          flexShrink: 1,
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
          flex: 2,
          flexGrow: 1,
          padding: 2,
          justifyContent: 'center',
        }}
      >
        {/* <Button
          mode="contained"
          contentStyle={{ height: 100 }}
          labelStyle={{ textAlign: 'center', textAlignVertical: 'center' }}
          onPress={() => {}}
          icon="arrow-right-bold"
          
        /> */}

        <TouchableRipple
          // rippleColor="red"
          style={{
            flex: 1,
            aspectRatio: 1,

            // height: 100,
            // width: 100,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme?.colors.primary,
            borderRadius: 50,
          }}
          onPress={() => {
            navigation.navigate('Horari', {
              routeId: scheduleData._id,
            });
          }}
        >
          {/* <TouchableRipple rippleColor="red"> */}
          <Icon
            name={'chevron-right'}
            size={30}
            color={theme?.colors.text}
            disabledStyle={{ backgroundColor: 'green' }}
          />
        </TouchableRipple>
        {/* </TouchableOpacity> */}
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
