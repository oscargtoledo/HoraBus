// ./screens/About.js

import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Surface,
  Text,
  useTheme,
  withTheme,
  ActivityIndicator,
} from 'react-native-paper';
import APIClient from '../utils/APIClient';
import { ScheduleFilter } from '../utils/ScheduleFilter';
import TextTicker from 'react-native-text-ticker'

// import {
//   Table,
//   TableWrapper,
//   Row,
//   Rows,
//   Col,
//   Cols,
//   Cell,
// } from 'react-native-table-component';

import { State } from 'react-native-gesture-handler';

import usePreferences from '../preferences/usePreferences';
import PreferencesContext from '../preferences/context';

const CustomRow = ({ item, index, selected, extraStyle = false, stopName }) => {
  const theme = useTheme();
  const { isHidingUnselected, toggleHideSelected } = usePreferences();
  return (
    <Surface
      style={[
        {
          flex: 1,
          textAlign: 'center',
          shadowOpacity: 0,
          // flexGrow: 1,
          // flexShrink: 1,
          // alignContent: 'center',
          // alignSelf: 'center',
          //backgroundColor: theme?.colors.primary,
          // backgroundColor: 'yellow',
          // width: 30,
          flexDirection: 'column',
          // justifyContent: 'center',  PREVIOUS

          // alignItems: 'stretch',
          // width: 0,
          // margin: 10,
          // flexGrow: 2,
          // flexWrap: 'wrap',
        },
        [
          extraStyle
            ? { flexBasis: 200, flexGrow: 1, flexShrink: 1, flex: 0 }
            : {},
        ],
      ]}
    >
      {/* {stopName != null && (
        <Text
          style={[
            {
              backgroundColor: theme?.colors.surface,
              // flex: 1,
              textAlignVertical: 'center',
              textAlign: 'center',
              height: 40,
              textAlignVertical: 'center',
              // padding: 10,
            },
          ]}
        >
          {stopName}
        </Text>
      )} */}

      {item.map((hour, hourIndex) => {
        // if (hourIndex < 3)
        return (
          <Text
            key={index * 10 + hourIndex}
            style={[
              {
                ...styles.tableElement,
                // flexGrow: 1,
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
      fetchError: false,
      selectedColumn: null,
      scheduleScale: 1,
      selectedColumns: [],
    };
  }
  componentDidMount() {
    this.retrieveSchedule().then(externalData => {
      const data = externalData;
      setTimeout(
        data => {
          this.setState({ schedule: data });
        },
        200,
        data
      );
    });
    // .then(externalData => {
    //   this.setState({ schedule: externalData });
    // });
    // this._getAndRenderSchedule();
  }
  async retrieveSchedule() {
    try {
      const { routeId } = this.props.route.params;
      const { data } = await APIClient.get('/schedules/' + routeId);
      const { theme } = this.props;
      // this.setState({ schedule: data[0] });
      this.props.navigation.setOptions({ title: data[0].routeName });
      this.props.navigation.setOptions({
        headerTitle: (props) =>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
            // flex: 1,
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
            <Text
              style={{
                flex: 1,
                // flexShrink: 1,
                // flexBasis:0,
                textAlign: 'center',
                color: theme?.colors.text,
                fontSize: 18,
                fontWeight: 500
              }}
              // duration={3000}
              // loop
              // bounce
              // repeatSpacer={50}
              // marqueeDelay={1000}
              >
              {data[0].routeName}
            </Text>
            <ScheduleFilter />
          </View>,
      });
      return data[0];
    } catch (ex) {
      this.setState({ fetchError: true });
    }
  }

  componentDidUpdate() {
    // console.log(this.state.selectedColumns);
  }

  selectColumn(index) {
    // console.log('Selected ' + index);
    var ind = this.state.selectedColumns.indexOf(index);
    // console.log('index = ' + ind);
    if (ind !== -1) {
      var temp = this.state.selectedColumns;
      temp.splice(ind, 1);

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

  regularSchedule() {
    const { theme } = this.props;
    const scheduleData = this.state.schedule;
    return (
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
                        padding: 3,
                        justifyContent: 'center', //Centered horizontally
                        alignItems: 'center', //Centered vertically
                      },
                      this.state.selectedColumns.includes(stopIndex)
                        ? {
                          backgroundColor: theme?.colors.columnAccent,
                        }
                        : {},
                    ]}
                    key={stopIndex}
                  >
                    <Text style={{ textAlign: 'center' }}>{stop}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                flex: 10,
              }}
            >
              <ScrollView
                style={{}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  height: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                {scheduleData.hours.map((hours, hoursIndex) => {
                  return (
                    <CustomRow
                      key={hoursIndex}
                      index={hoursIndex}
                      item={hours}
                      // selectedColumns={this.state.selectedColumns}
                      selected={this.state.selectedColumns.includes(hoursIndex)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  filteringSchedule() {
    const { theme } = this.props;
    const scheduleData = this.state.schedule;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={{
              flexGrow: 1,
              alignContent: 'center',
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
                      padding: 3,
                      justifyContent: 'center', //Centered horizontally
                      alignItems: 'center', //Centered vertically
                    },
                    this.state.selectedColumns.includes(stopIndex)
                      ? {
                        backgroundColor: theme?.colors.columnAccent,
                      }
                      : {},
                  ]}
                  key={stopIndex}
                >
                  <Text style={{ textAlign: 'center' }}>{stop}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              // height: 0,
              flexDirection: 'column',
              // justifyContent: 'center',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              {this.state.selectedColumns.map((id, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.selectColumn(id)}
                    style={[
                      {
                        flex: 1,
                        flexGrow: 1,
                        flexShrink: 1,
                        flexBasis: 0,
                        flexWrap: 'wrap',
                        padding: 3,
                        justifyContent: 'center', //Centered horizontally
                        alignItems: 'center', //Centered vertically
                      },
                    ]}
                    key={id}
                  >
                    <Text style={{ textAlign: 'center' }}>
                      {scheduleData.stops[id]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <ScrollView
              style={{}}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                height: 0,
                flexDirection: 'row',
                // justifyContent: 'center',
              }}
            >
              {scheduleData.hours.map((hours, hoursIndex) => {
                return (
                  this.state.selectedColumns.includes(hoursIndex) && (
                    <CustomRow
                      key={hoursIndex}
                      index={hoursIndex}
                      item={hours}
                      extraStyle={true}
                      // selectedColumns={this.state.selectedColumns}
                      selected={this.state.selectedColumns.includes(hoursIndex)}
                    />
                  )
                );
              })}
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    // this.retrieveSchedule()
    const isFetching = this.state.schedule === null;
    // const isFetching = false;
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
          <ActivityIndicator size="large" />
        ) : this.state.fetchError ? (
          <Text>Aquest horari no existeix</Text>
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
                {this.state.schedule.title}
              </Text>
            </Surface>

            <PreferencesContext.Consumer>
              {({ isHidingUnselected, toggleHideSelected }) =>
                isHidingUnselected
                  ? this.filteringSchedule()
                  : this.regularSchedule()
              }
            </PreferencesContext.Consumer>
          </Surface>
        )}
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
  },
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
