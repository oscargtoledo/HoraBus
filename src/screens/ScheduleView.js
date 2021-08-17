// ./screens/About.js

import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Button,
  VirtualizedList,
  FlatList,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
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

// import {
//   Table,
//   TableWrapper,
//   Row,
//   Rows,
//   Col,
//   Cols,
//   Cell,
// } from 'react-native-table-component';

import { PinchGestureHandler, State } from 'react-native-gesture-handler';
var classNames = require('classnames');
import usePreferences from '../preferences/usePreferences';
import PreferencesContext from '../preferences/context';

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
  const { isHidingUnselected, toggleHideSelected } = usePreferences();
  return (
    <Surface
      style={{
        flex: 1,
        textAlign: 'center',
        // justifyContent: 'center',
        // alignContent: 'center',
        //backgroundColor: theme?.colors.primary,
        backgroundColor: 'yellow',
        // width: 30,
        flexDirection: 'column',
        // justifyContent: 'center',  PREVIOUS

        // alignItems: 'stretch',
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
                flexGrow: 1,
                textAlign: 'center',
                // margin: 3,
                // minHeight: 100,
                padding: 10,

                // width: 100,
                // backgroundColor: 'red',
                alignContent: 'center',
                // minHeight: 10,
              },
              isHidingUnselected
                ? hourIndex % 2
                  ? { backgroundColor: theme?.colors.primaryLight }
                  : { backgroundColor: theme?.colors.primary }
                : selected
                ? { backgroundColor: theme?.colors.columnAccent }
                : hourIndex % 2
                ? { backgroundColor: theme?.colors.primaryLight }
                : { backgroundColor: theme?.colors.primary },
            ]}
          >
            {hour != '' ? hour : '-'}
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
    let screenHeight = Dimensions.get('window').height;
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
          <Surface style={{ flex: 1, justifyContent: 'center' }}>
            <Surface
              style={{
                backgroundColor: theme?.colors.primaryDark,
                alignContent: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                }}
              >
                {scheduleData.routeName}
              </Text>
            </Surface>

            <PreferencesContext.Consumer>
              {({ isHidingUnselected, toggleHideSelected }) =>
                !isHidingUnselected ? (
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <ScrollView
                      horizontal
                      contentContainerStyle={{
                        flexGrow: 1,
                        alignContent: 'center',
                      }}
                    >
                      <View style={{ flex: 1 }} id="horizontalContainer">
                        <View
                          id="stopNameRow"
                          style={{
                            flex: 1,

                            flexDirection: 'row',
                            // alignItems: 'stretch',
                            justifyContent: 'space-between',
                          }}
                        >
                          {scheduleData.stops.map((stop, stopIndex) => {
                            return (
                              <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.selectColumn(stopIndex)}
                                style={[
                                  {
                                    flex: 1,
                                    flexGrow: 1,
                                    flexShrink: 1,
                                    flexBasis: 0,
                                    flexWrap: 'wrap',

                                    // flex: 1,
                                    // alignContent: 'center',
                                    // flexDirection: 'row',
                                    justifyContent: 'center', //Centered horizontally
                                    alignItems: 'center', //Centered vertically
                                  },
                                  this.state.selectedColumns.includes(stopIndex)
                                    ? {
                                        backgroundColor:
                                          theme?.colors.columnAccent,
                                      }
                                    : {},
                                ]}
                                key={stopIndex}
                              >
                                <Text>{stop}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                        <View
                          style={{
                            flex: 15,
                          }}
                        >
                          <ScrollView
                            style={{}}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                              height: 0,
                              flexDirection: 'row',
                            }}
                          >
                            {scheduleData.hours.map((hours, hoursIndex) => {
                              if (isHidingUnselected) {
                                if (
                                  this.state.selectedColumns.includes(
                                    hoursIndex
                                  )
                                )
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
                              } else {
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
                              }
                            })}
                          </ScrollView>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                ) : (
                  //   </View>
                  // </View>
                  <Surface>
                    <ScrollView horizontal>
                      <Surface
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          // justifyContent: 'center',
                          justifyContent: 'space-around',
                          // alignContent: 'center',
                          // alignContent: 'space-around',
                          backgroundColor: 'black',
                          alignItems: 'stretch',
                          // width: 1000,
                          height: 60,
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
                                  ? {
                                      backgroundColor:
                                        theme?.colors.columnAccent,
                                    }
                                  : {},
                              ]}
                              key={stopIndex}
                            >
                              {stop}
                            </Text>
                          );
                        })}
                      </Surface>
                    </ScrollView>
                    <ScrollView horizontal>
                      <ScrollView>
                        <Surface
                          style={[
                            {
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'center',
                            },
                            Dimensions.get('window').width <
                            styles.tableElement.width *
                              this.state.selectedColumns.length
                              ? { backgroundColor: 'green' }
                              : { width: Dimensions.get('window').width },
                          ]}
                        >
                          {scheduleData.hours.map((hours, hoursIndex) => {
                            if (this.state.selectedColumns.includes(hoursIndex))
                              return (
                                <Surface>
                                  <Text
                                    style={[
                                      {
                                        // flex: 1, padding: 7
                                        // ...styles.TableText,
                                        ...styles.tableElement,
                                        // alignSelf: 'center',
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        flex: 1,
                                        height: 40,
                                      },
                                    ]}
                                    key={hoursIndex * 20 + 1}
                                    onPress={() =>
                                      this.selectColumn(hoursIndex)
                                    }
                                  >
                                    {scheduleData.stops[hoursIndex]}
                                  </Text>
                                  <CustomRow
                                    key={hoursIndex}
                                    index={hoursIndex}
                                    item={hours}
                                    // selectedColumns={this.state.selectedColumns}
                                    selected={this.state.selectedColumns.includes(
                                      hoursIndex
                                    )}
                                  />
                                </Surface>
                              );
                          })}
                        </Surface>
                      </ScrollView>
                    </ScrollView>
                  </Surface>
                )
              }
            </PreferencesContext.Consumer>
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
