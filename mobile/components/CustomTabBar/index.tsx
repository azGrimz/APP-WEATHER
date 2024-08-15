import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
//import Ionicons from '@react-native-vector-icons/ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
type CustomTabBarProps = BottomTabBarProps;

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    const iconName = options.tabBarIcon;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name,merge:true, params: undefined });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                     const color = isFocused ? 'white' : 'white';
                        const TabBarIcon = options.tabBarIcon;
                    return (
                        <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.buttonTab}
                        >
                            <View style={{alignItems: 'center', padding:4,}}> 
                                <View style={[styles.innerButton, {backgroundColor: isFocused ? "#116979" : "transparent"} ]}>
                                {TabBarIcon && TabBarIcon({   color, size: 24, focused: isFocused })}
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    content: {
        borderRadius: 99,
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? 38 : 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: "rgba(8,49,57,255)",
        borderWidth:0.5,
        borderColor:'#116979',
        gap: 25,
       
    } as ViewStyle,
    buttonTab: {
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    innerButton: {
        padding: 8,
        borderRadius: 99,
    } as ViewStyle,
});

export default CustomTabBar;