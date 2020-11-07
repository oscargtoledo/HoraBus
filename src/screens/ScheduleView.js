// ./screens/About.js

import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet, Button } from 'react-native';
import {
  Surface,
  DataTable,
  Text,
  useTheme,
  withTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { back } from 'react-native/Libraries/Animated/src/Easing';
import APIClient from '../utils/APIClient';
var classNames = require('classnames');

class ScheduleTable extends React.Component {}

class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schedule: null, selectedColumn: null };
  }
  componentDidMount() {
    // console.log("mounted")
    this.retrieveSchedule().then(externalData => {
      this.setState({ schedule: externalData[0] });
    });
  }
  async retrieveSchedule() {
    try {
      const { routeId } = this.props.route.params;
      const { data } = await APIClient.get('/schedules/' + routeId);
      // this.setState({ schedule: data[0] })
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }

  selectColumn(index) {
    if (index == this.state.selectedColumn) {
      this.setState({ selectedColumn: null });
    } else {
      this.setState({ selectedColumn: index });
    }
    console.log(index);
  }

  render() {
    // this.retrieveSchedule()
    const scheduleData = this.state.schedule;
    console.log(scheduleData === null);
    const isFetching = scheduleData === null;
    const { theme } = this.props;
    return (
      <Surface style={styles.center}>
        {isFetching ? (
          // <Text>loading</Text>
          <ActivityIndicator size="large" />
        ) : (
          <Surface style={{ overflow: 'scroll' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: theme?.colors.primaryDark,
              }}
            >
              {scheduleData.routeName}
            </Text>
            <ScrollView horizontal style={{ flexWrap: 'wrap' }}>
              <DataTable
                style={{
                  width: 1000,
                  flex: 1,
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  flexGrow: 1,
                }}
              >
                <DataTable.Header
                  style={{
                    backgroundColor: theme?.colors.primary,
                  }}
                >
                  {/* {
                    scheduleData.stops.map((item, index) => {
                      return <DataTable.Title style={{ ...styles.TableText, flex: 1, flexWrap: 'wrap', margin: 5 }} key={index}>{item.name}</DataTable.Title>
                    })
                  } */}
                  {scheduleData.stops.map((item, index) => {
                    return (
                      <DataTable.Title
                        style={[
                          {
                            ...styles.TableText,
                            // flex: 1,
                            // flexGrow: 1,
                            // flexWrap: 'wrap',
                            // flexGrow: 1,
                            // width: 500,
                            // flexDirection: 'row',
                            // margin: 5,
                            // paddingRight: 10,
                            // paddingLeft: 10,
                          },
                          index == this.state.selectedColumn
                            ? { backgroundColor: theme?.colors.columnAccent }
                            : {},
                        ]}
                        key={index}
                        onPress={() => this.selectColumn(index)}
                      >
                        <Text
                        // style={{ flex: 1, flexWrap: 'wrap', flexShrink: 1 }}
                        >
                          {item}
                        </Text>
                      </DataTable.Title>
                    );
                  })}
                </DataTable.Header>
                <ScrollView>
                  {/* {
                    scheduleData.stops[0].hours.map((item, index) => {
                      return (
                        <DataTable.Row key={index} style={(index % 2 == 0) ? {} : { backgroundColor: theme?.colors.primary }}>
                          {
                            scheduleData.stops.map((item2, index2) => {
                              return <DataTable.Cell style={{ ...styles.TableText, flex: 1, flexWrap: 'wrap' }} key={index * 100 + index2}>{item2.hours[index]}</DataTable.Cell>
                            })
                          }
                        </DataTable.Row>
                      )
                    })
                  } */}
                  {scheduleData.hours.map((item, index) => {
                    return (
                      <DataTable.Row
                        key={index}
                        style={
                          index % 2 == 0
                            ? { backgroundColor: theme?.colors.primaryLight }
                            : { backgroundColor: theme?.colors.accent }
                        }
                      >
                        {
                          item.map((item2, index2) => {
                            return (
                              <DataTable.Cell
                                style={[
                                  { ...styles.TableText },
                                  index2 == this.state.selectedColumn
                                    ? {
                                        backgroundColor:
                                          theme?.colors.columnAccent,
                                        opacity: 0.8,
                                      }
                                    : {},
                                ]}
                                key={index * 100 + index2}
                              >
                                {item2}
                              </DataTable.Cell>
                            );
                          })
                          // <DataTable.Cell>{item}</DataTable.Cell>
                          // console.log(item)
                        }
                      </DataTable.Row>
                    );
                  })}
                </ScrollView>
              </DataTable>
            </ScrollView>
          </Surface>
        )}
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    // display: flex,
    padding: 18,
    paddingTop: 35,
    // backgroundColor: '#ffffff'
    // alignItems: 'center'
    justifyContent: 'space-around',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    // backgroundColor: '#ffe0f0'
  },
  TableText: {
    // margin: 10,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: 0,
    flexGrow: 2,
    flexWrap: 'wrap',
  },
});
export default withTheme(ScheduleView);
