import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from './Item'

const DATA_students = [
    'первый оболтус', 
    'второй оболтус', 
    'третий оболтус',
    'четвёртый оболтус', 
    'пятый оболтус', 
    'шестой оболтус',
    'седьмой оболтус', 
    'восьмой оболтус', 
    'девятый оболтус',
]

export default function Shuedle({ weekDays, Change, handleVisibleModal }) {
    useEffect(() => {
        getData();
    }, [Change])
    const [CH, setCH] = useState();

    const [isChange, setIsChange] = useState(true)

    const onClickHandler = (index, name) => {
        var changeble = CH;
        changeble[index].lessons = [...changeble[index].lessons, { name: name, students: DATA_students }]
        setCH(changeble);
        storeData(CH);
        setIsChange(!isChange)
    }

    const RenderItem = ({ item, index }) => (
        <Item day={new Date(item.day)} lessons={item.lessons} Index={index} onClickHandler={onClickHandler} handleVisibleModal={handleVisibleModal} />
    );

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
            console.log('я сохранился')
        } catch (e) {
            console.log('ошибка сохранения')
        }
    }
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            if (jsonValue != null) {
                setCH(JSON.parse(jsonValue))
            }
            else {
                setCH(
                    weekDays.map(day => ({
                        day: day,
                        lessons: [
                            // {
                            //   name: 'химия',
                            //   students: []
                            // },
                            // {
                            //   name: 'физра',
                            //   students: []
                            // }
                        ]
                    }))
                );
            }
            console.log('я прочитал')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('ошибка чтения')
        }
    }
    return (
        <FlatList
            data={CH}
            renderItem={RenderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={isChange}
        />

    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})