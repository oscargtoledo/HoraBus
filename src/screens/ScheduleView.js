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

const ScheduleTableRowData = React.memo(({}) => {
  const theme = useTheme();
});

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
                {/* Stops names header */}
                <DataTable.Header
                  style={{
                    backgroundColor: theme?.colors.primary,
                  }}
                >
                  {scheduleData.stops.map((item, index) => {
                    return (
                      <DataTable.Title
                        style={[
                          {
                            ...styles.TableText,
                          },
                          // index == this.state.selectedColumn
                          this.state.selectedColumns.includes(index)
                            ? { backgroundColor: theme?.colors.columnAccent }
                            : {},
                        ]}
                        key={index}
                        onPress={() => this.selectColumn(index)}
                      >
                        <Text>{item}</Text>
                      </DataTable.Title>
                    );
                  })}
                </DataTable.Header>
                {/* Stops names header */}

                <ScrollView>
                  {scheduleData.hours.map((item, index) => {
                    return (
                      <ScheduleTableRow
                        item={item}
                        index={index}
                        selectedColumns={this.state.selectedColumns}
                      />
                    );
                    // return (
                    // <DataTable.Row
                    //   key={index}
                    //   style={
                    //     index % 2 == 0
                    //       ? { backgroundColor: theme?.colors.primaryLight }
                    //       : { backgroundColor: theme?.colors.accent }
                    //   }
                    // >
                    //   {item.map((item2, index2) => {
                    //     return (
                    //       <DataTable.Cell
                    //         style={[
                    //           { ...styles.TableText },
                    //           // index2 == this.state.selectedColumn
                    //           this.state.selectedColumns.includes(index2)
                    //             ? {
                    //                 backgroundColor:
                    //                   theme?.colors.columnAccent,
                    //                 opacity: 0.8,
                    //               }
                    //             : {},
                    //         ]}
                    //         key={index * 100 + index2}
                    //       >
                    //         {item2}
                    //       </DataTable.Cell>
                    //     );
                    //   })}
                    // </DataTable.Row>

                    // );
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
