// ./screens/About.js

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import APIClient from '../utils/APIClient'

const ScheduleSelector = ({ navigation }) => {
  const [schedules, setSchedules] = useState([])

  const retrieveData = async () => {
    try {
      const { data } = await APIClient.get("/schedules/names")
      setSchedules(data);
    } catch (ex) {
      console.log(ex);
      console.log({ ...ex });
    }
  }

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <View style={styles.center}>
      <Text>{JSON.stringify(schedules)}</Text>
      <Text>This is the selection screen</Text>
      <Button title="Go to About Screen" onPress={() => navigation.navigate("Schedule Viewer")} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default ScheduleSelector;