import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Pressable, Alert } from 'react-native'
import { format } from 'date-fns';


export default function Item({ day, lessons, Index, onClickHandler, handleVisibleModal }) {
    const onButtonPress = (Index) => {
        Alert.prompt(
            "Enter your class",
            "Enter your password to claim your $1.5B in lottery winnings",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: className => onClickHandler(Index, className)
                }
            ]
        );
    };

    return (
        <View style={styles.one_item}>
            <View style={styles.date}>
                <Text>{format(day, 'EEEE')}{'\n'}({format(day, 'LLLL')} {day.getDate()})</Text>
            </View>
            <View style={styles.lessons_box}>
                <FlatList
                    data={lessons}
                    keyExtractor={(item, index) => Index.toString() + index.toString()}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={() => { handleVisibleModal(item.students, item.name) }}>
                            <View style={styles.lessons}>
                                <Text style={{ textAlign: "center", }}>{item.name}</Text>
                            </View>
                        </Pressable>
                    )}
                />
                <Pressable onPress={() => { onButtonPress(Index) }}>
                    <Text style={{ textAlign: "center", }}>I'm pressable!{'\n'}кликни чтобы добавить </Text>
                </Pressable>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    one_item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    date: {
        flex: 2,
        backgroundColor: '#B0E0E6',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    lessons_box: {
        flex: 3,
        // alignItems: 'center',
    },
    lessons: {
        justifyContent: "center",
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
        width: '90%',
        minHeight: 50,
        borderRadius: 10,
        backgroundColor: '#FFDEAD',
        // borderBottomWidth: 1,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderColor: '#DCDCDC',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 3,
    },


    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headtext: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
})