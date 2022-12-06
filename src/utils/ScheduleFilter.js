import React from 'react';
import { View } from 'react-native';
import {
    useTheme,
    Appbar,
    TouchableRipple,
    Checkbox,
    Switch,
    Button,
    ToggleButton,
    Text,
} from 'react-native-paper';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import usePreferences from '../preferences/usePreferences';

function ScheduleFilter(props) {
    const theme = useTheme();
    const { isHidingUnselected, toggleHideSelected } = usePreferences();
    return (
        <View
            // style={{
            //     flex: 1,
            //     flexDirection: 'column',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            // }}
        >
            {/* <Text style={{ color: theme?.colors.text, textAlign: 'center' }}>Filtrar parades</Text>
            <Switch
                onValueChange={() => toggleHideSelected()}
                color={'red'}
                value={isHidingUnselected}
            ></Switch> */}
            <TouchableRipple
                onPress={() => toggleHideSelected()}
                rippleColor={theme?.colors.backdrop}
                style={{backgroundColor: theme?.colors.accent, padding: 3, borderRadius: 5 }}
            >
                <View style={{ flex:1, flexDirection:'row', alignItems:'center'}}>
                    <Text>Escollir{'\n'}parades</Text>
                    <Checkbox
                        status={isHidingUnselected ? 'checked' : 'unchecked'}
                        uncheckedColor={theme?.colors.primary}
                        color={theme?.colors.primary}
                    />
                </View>
            </TouchableRipple>


            {/* <ToggleButton
                style={{ flex: 1, flexDirection: 'row', alignItems:'stretch', alignSelf: 'stretch' }}
                icon={() =>
                    <View style={{ backgroundColor: '#000000', alignSelf: 'center', padding: 12 }}>
                        <Text style={{ color: '#ffffff' }}>
                            Sample text here
                        </Text>
                    </View>
                }
                value="bluetooth"
                status={isHidingUnselected ? 'checked' : 'unchecked'}
                onPress={() => toggleHideSelected()}
            /> */}
        </View>
    );
}


export { ScheduleFilter };
