import React, { useState } from 'react'
import { StyleSheet, View, Pressable, Text, SafeAreaView, ScrollView } from 'react-native'
import { eachWeekOfInterval, eachDayOfInterval, addDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import Schuedle from './src/components/schuedle';
import Modal from './src/components/Modal';

var week = eachWeekOfInterval({
  start: new Date(),
  end: new Date()
},
  {
    weekStartsOn: 1,
  })

var weekDays = eachDayOfInterval({
  start: week[0],
  end: addDays(week[0], 6)
})

export default function App() {
  const [Change, setChange] = useState(true)

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      setChange(!Change)
      console.log('Done.')
    } catch (e) {
      console.log('not done.')
    }
  }
  const [visible, setVisible] = useState(false);

  const handleVisibleModal = (students, lesson) => {
    setStudents(students);
    setLesson(lesson);
    setVisible(true);
  }

  const handleClose = () => {
    setVisible(false);
  }

  const [Students, setStudents] = useState([]);
  const [lesson, setLesson] = useState('');
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView >
        <Schuedle weekDays={weekDays} Change={Change} handleVisibleModal={handleVisibleModal}/>
      </SafeAreaView>
      
      <View style={styles.Container}>
        <Pressable onPress={clearAll}>
          <Feather name="trash" size={45} color="black" />
        </Pressable>
      </View>
      <Modal
        visible={visible}
        options={{ type: 'slide', from: 'bottom' }}
        duration={500}
        onClose={handleClose}
        lesson ={lesson}
        students={Students} />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'red',
    position: 'absolute',
    left: '5%',
    bottom: '5%',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // alignContent: 'center',
  },
})