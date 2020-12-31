// ./screens/About.js

import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  View,
  StyleSheet,
  Button,
  VirtualizedList,
  FlatList,
  Image,
  Animated,
} from 'react-native';
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

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

import { PinchGestureHandler, State } from 'react-native-gesture-handler';
var classNames = require('classnames');
import usePreferences from '../preferences/usePreferences';

const ScheduleTableRow = ({ item, index, selectedColumns }) => {
  const theme = useTheme();
  return (
    // <Text>e</Text>

    <DataTable.Row
      key={index}
      style={
        index % 2 == 0
          ? { backgroundColor: theme?.colors.primaryLight }
          : { backgroundColor: theme?.colors.accent }
      }
    >
      {item.map((item2, index2) => {
        return (
          <DataTable.Cell
            style={[
              { ...styles.TableText },
              // index2 == this.state.selectedColumn
              selectedColumns.includes(index2)
                ? {
                    backgroundColor: theme?.colors.columnAccent,
                    opacity: 0.8,
                  }
                : {},
            ]}
            key={index * 100 + index2}
          >
            {item2}
          </DataTable.Cell>
        );
      })}
    </DataTable.Row>
  );
};

const CustomRow = ({ item, index, selected }) => {
  const theme = useTheme();
  return (
    <Surface
      style={{
        flex: 1,
        textAlign: 'center',
        // justifyContent: 'center',
        // alignContent: 'center',
        backgroundColor: 'green',

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        // width: 0,
        // margin: 10,
        // flexGrow: 2,
        // flexWrap: 'wrap',
      }}
    >
      {item.map((hour, hourIndex) => {
        // if (hourIndex < 3)
        return (
          <Text
            key={index * 10 + hourIndex}
            style={[
              {
                ...styles.tableElement,
                flex: 1,
                textAlign: 'center',
                // margin: 3,
                // minHeight: 100,
                padding: 10,
                // width: 100,
                // backgroundColor: 'red',
                alignContent: 'center',
              },
              selected
                ? { backgroundColor: theme?.colors.columnAccent }
                : hourIndex % 2
                ? { backgroundColor: theme?.colors.primaryLight }
                : { backgroundColor: theme?.colors.primary },
            ]}
          >
            {hour}
          </Text>
        );
      })}
    </Surface>
  );
};

class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: null,
      selectedColumn: null,
      scheduleScale: 1,
      selectedColumns: [],
    };
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
  componentDidUpdate() {
    console.log(this.state.selectedColumns);
  }
  // selectColumn(index) {
  //   if (index == this.state.selectedColumn) {
  //     this.setState({ selectedColumn: null });
  //   } else {
  //     this.setState({ selectedColumn: index });
  //   }
  //   console.log(index);
  // }
  selectColumn(index) {
    // if (index == this.state.selectedColumn) {
    //   this.setState({ selectedColumn: null });
    // } else {
    //   this.setState({ selectedColumn: index });
    // }
    console.log('Selected ' + index);
    var ind = this.state.selectedColumns.indexOf(index);
    console.log('index = ' + ind);
    if (ind !== -1) {
      var temp = this.state.selectedColumns;
      temp.splice(ind, 1);
      console.log('temp = ' + temp);
      this.setState(prevState => ({
        selectedColumns: temp,
      }));
    } else {
      this.setState(prevState => ({
        selectedColumns: [...prevState.selectedColumns, index],
      }));
    }

    // console.log(index);
  }

  scale = new Animated.Value(1);
  onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: this.scale },
      },
    ],
    {
      useNativeDriver: true,
    }
  );
  onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  // render() {
  //   // this.retrieveSchedule()
  //   const scheduleData = this.state.schedule;
  //   const isFetching = scheduleData === null;
  //   const { theme } = this.props;
  //   return (
  //     <Surface style={styles.center}>
  //       {isFetching ? (
  //         // <Text>loading</Text>
  //         <ActivityIndicator size="large" />
  //       ) : (
  //         <PinchGestureHandler
  //           onGestureEvent={() => {
  //             this.onZoomEvent;
  //             console.log(this.scale);
  //           }}
  //           onHandlerStateChange={this.onZoomStateChange}
  //         >
  //           <View>
  //             <Animated.Image
  //               style={{ transform: [{ scale: this.scale }] }}
  //               source={require('../../assets/icon.png')}
  //             ></Animated.Image>
  //           </View>
  //         </PinchGestureHandler>
  //       )}
  //     </Surface>
  //   );
  // }

  render() {
    // this.retrieveSchedule()
    const scheduleData = this.state.schedule;
    const isFetching = scheduleData === null;
    const { theme } = this.props;

    return (
      // <Surface style={styles.center}>
      <Surface
        style={{
          flex: 1,
          // flexDirection: 'row',
          // justifyContent: 'flex-end',
          // alignItems: 'center',
          // textAlign: 'center',
        }}
      >
        {isFetching ? (
          // <Text>loading</Text>
          <ActivityIndicator size="large" />
        ) : (
          <Surface style={{ flex: 1 }}>
            <Surface
              style={{
                backgroundColor: theme?.colors.primaryDark,
                alignContent: 'center',
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 20 }}>
                {scheduleData.routeName}
              </Text>
            </Surface>
            <ScrollView horizontal>
              <Surface>
                <Surface
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    justifyContent: 'space-around',
                    // alignContent: 'center',
                    // alignContent: 'space-around',
                    alignItems: 'stretch',
                    // width: 1000,
                  }}
                >
                  {scheduleData.stops.map((stop, stopIndex) => {
                    return (
                      <Text
                        onPress={() => this.selectColumn(stopIndex)}
                        style={[
                          {
                            // flex: 1, padding: 7
                            // ...styles.TableText,
                            ...styles.tableElement,
                            // alignSelf: 'center',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            flex: 1,
                          },
                          this.state.selectedColumns.includes(stopIndex)
                            ? { backgroundColor: theme?.colors.columnAccent }
                            : {},
                        ]}
                        key={stopIndex}
                      >
                        {stop}
                      </Text>
                    );
                  })}
                </Surface>
                <Surface
                  style={{
                    flex: 20,
                    flexDirection: 'row',
                    // backgroundColor: 'blue',
                  }}
                >
                  <ScrollView contentContainerStyle={{}}>
                    <Surface
                      style={{
                        flex: 1,

                        flexDirection: 'row',
                        backgroundColor: 'red',
                        // alignItems: 'stretch',
                      }}
                    >
                      {scheduleData.hours.map((hours, hoursIndex) => {
                        // if (
                        //   this.state.selectedColumns.includes(hoursIndex) &&
                        //   isHidingUnselected
                        // )
                        return (
                          <CustomRow
                            key={hoursIndex}
                            index={hoursIndex}
                            item={hours}
                            // selectedColumns={this.state.selectedColumns}
                            selected={this.state.selectedColumns.includes(
                              hoursIndex
                            )}
                          />
                        );
                      })}
                    </Surface>
                  </ScrollView>
                </Surface>

                {/* <Surface style={{ flex: 1 }}>
              <ScrollView>
                {scheduleData.hours.map((hours, hoursIndex) => {
                  return (
                    <CustomRow
                      key={hoursIndex}
                      index={hoursIndex}
                      item={hours}
                      selectedColumns={this.state.selectedColumns}
                    />
                  );
                })}
              </ScrollView>
            </Surface> */}

                {/* 

             */}
              </Surface>
            </ScrollView>
          </Surface>
        )}
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  tableElement: {
    width: 100,
  },
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
    // textAlignVertical: 'center',
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    width: 100,
    // flexGrow: 2,
    // flexWrap: 'wrap',
  },
});
export default withTheme(ScheduleView);
