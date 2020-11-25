// ./screens/About.js

import { ThemeProvider } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
} from 'react-native';
// import {  } from "react-native-gesture-handler";
import { Button, useTheme, Surface } from 'react-native-paper';
import APIClient from '../utils/APIClient';

const ScheduleSelector = ({ navigation }) => {
  const theme = useTheme();
  const [schedules, setSchedules] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const retrieveData = async () => {
    try {
      const { data } = await APIClient.get('/schedules/names');
      setSchedules(data);
    } catch (ex) {
      console.log(ex);
      console.log({ ...ex });
    }
  };

  const onRefresh = () => {
    retrieveData();
    setRefreshing(false);
  };

  useEffect(() => {
    retrieveData();
  }, []);

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
        {schedules.map((item, index) => {
          return (
            <Button /*style={{ backgroundColor: theme?.colors.accent }}*/
              key={item._id}
              mode="contained"
              onPress={() =>
                navigation.navigate('Schedule Viewer', {
                  routeId: item._id,
                  routeName: item.routeName,
                })
              }
              style={{ margin: 2 }}
            >
              {item.routeName}
            </Button>
          );
        })}
        {/* <Button key={2} mode="contained" title="Go to About Screen" onPress={() => navigation.navigate("Schedule Viewer")} /> */}
      </ScrollView>
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
