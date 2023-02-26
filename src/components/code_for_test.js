// import { StatusBar } from 'expo-status-bar';
// import {eachWeekOfInterval, eachDayOfInterval, addDays, format} from 'date-fns';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   RefreshControl,
//   FlatList,
//   SectionList,
//   SafeAreaView,
//   DatePickerIOS,
//   Pressable,
// } from 'react-native'
// import React, {useState, useEffect} from 'react';

// export default function App() {













//   const [DATA, setDATA] = useState([
//     'Lesson'
//       , 'Lesson'
//       , 'Lesson'
//       , 'Lesson'
//       , 'Lesson'
//       , 'Lesson'
//       , 'Lesson'
//       , 'Lesson'
//       , 'Lesson'
//   ]);
//   const onClickHandler = () => {
//     setDATA([...DATA,
//       'lesson'
//     ]);
//   }



//   var result = eachWeekOfInterval({
//     start: new Date(),
//     end: new Date()
//   },
//   {
//     weekStartsOn: 1,
//   })

//   const Result_Days = [{
//     data: eachDayOfInterval({
//       start: result[0],
//       end: addDays(result[0], 6)
//     })
//   }]













//   var result_Days = eachDayOfInterval({
//     start: result[0],
//     end: addDays(result[0], 6)
//   })
//   const [CH, setCH] = useState(new Map());


//   useEffect(() => {
//     result_Days.map(day => setCH(new Map(CH.set({title: 'ch', data: day,}))));

//     // setCH(result_Days.map(day => ({
//     //   title: day,
//     //   data: 1,
//     // })));
//   }, []);




//   return (
//     <SafeAreaView>
//       <View>
//         <SectionList
//           keyExtractor={(item, index) => index.toString()}
//           sections={CH}
//           renderItem={({ item, index }) => (
//           <View>
//             <Text>{format(item, 'EEEE')}</Text>
//             <Text>{format(item, 'LLLL')} {item.getDate()}</Text> 
//           </View >
//           )}
//         /> 
//         {/* {() => result_Days.map((day, index) =>
//           setCH([...CH,
//           {
//             date: day,
//             lessons: ['asfv'],
//           }]),
//         )} */}
//       {/*  <SectionList
//           keyExtractor={(item, index) => index.toString()}
//           sections={CH}
//           renderItem={({ item, index }) => (
//           <View >
//             <Text>{item}</Text>
//             {/* <Text>{format(item.date, 'EEEE')}</Text>
//             <Text>{format(item.date, 'LLLL')} {item.date.getDate()}</Text> 
//           </View >
//           )}
//         /> */}
//       </View>
//       <View style={styles.headtext}>
//         <Text>Расписание</Text>
//       </View>
//       <SectionList
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item, index) => index.toString()}
//         sections={Result_Days}
//         renderItem={({ item, index }) =>(
//           <View style={styles.container}>
//               <View style={styles.date}>
//                 <Text>{format(item, 'EEEE')}</Text>
//                 <Text>{format(item, 'LLLL')} {item.getDate()}</Text>
//                 {/* <Text>{day.toDateString()}</Text> */}
//               </View>
//               <View style={styles.lessons_box}>

//                   {DATA.map((number, index) =>
//                     <View style={styles.lessons}>
//                       <Text key={index}>{number} {index}</Text> 
//                     </View>
//                   )}

//                 {/* <SectionList
//                   keyExtractor={(item, index) => index.toString()}
//                   sections={DATA}
//                   scrollEnabled={false}
//                   // renderSectionHeader={({section}) => (
//                   //   <View>
//                   //     <Text>{section.title}</Text>
//                   //   </View>
//                   // )} 
//                   renderItem={({ item, index }) => (
//                   <View style={styles.lessons}>
//                    <Text>{item} {index}</Text> 
//                   </View >
//                     )}
//                 /> */}
//                 <Pressable onPress={onClickHandler}>
//                   <Text>I'm pressable! {'\n'}кликни чтобы добавить </Text>
//                 </Pressable>
//               </View>
//             </View>


//         )}
//       />

//     </SafeAreaView> 
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     // alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderTopWidth: 1,
//   },
//   headtext: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },

//   date: {
//     width: '40%',
//     backgroundColor: '#B0E0E6',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },

//   lessons_box: {
//     width: '60%',
//     // flex: 1,
//     // backgroundColor: '#DCDCDC',
//     // alignItems: 'center',
//   },

//   lessons: {

//     // backgroundColor: '#DCDCDC',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: '#DCDCDC',
//   },

// });
import { StatusBar } from 'expo-status-bar';
import { eachWeekOfInterval, eachDayOfInterval, addDays, format, toDate} from 'date-fns';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  SectionList,
  SafeAreaView,
  DatePickerIOS,
  Pressable,
  Alert,
  TextInput,
  Button,
} from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Modal from './src/components/Modal';

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
  const [isChange, setIsChange] = useState(true)

  const Item = ({ day, lessons, Index }) => (
    <View style={styles.containers}>
      <View style={styles.date}>
        <Text>{format(day, 'EEEE')}{'\n'}({format(day, 'LLLL')} {day.getDate()})</Text>
      </View>
      <View style={styles.lessons_box}>
        <FlatList
          // horizontal={true}
          data={lessons}
          keyExtractor={(item, index) => Index.toString() + index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.lessons}>
              <Text style={{ textAlign: "center", }}>{item.name}</Text>
            </View>
          )
          }
        />
        <Pressable onPress={() => { onButtonPress(Index) }}>
          <Text style={{ textAlign: "center", }}>I'm pressable!{'\n'}кликни чтобы добавить </Text>
        </Pressable>
        {/* <Button title='Open ModaL' onPress={() => {setStudents(lessons[0].students); handleVisibleModal(); }} /> */}
      </View>
    </View>
  );
  const onClickHandler = (index, name) => {
    var changeble = CH;
    changeble[index].lessons = [...changeble[index].lessons, { name: name, students: ['первый оболтус', 'второй оболтус', 'третий оболтус'] }]
    // if (changeble[index].lessons[0].name == 'изменённый урок') {
    //   changeble[index].lessons[0].name = 'новый изменённый урок';
    // }
    // else {
    //   changeble[index].lessons[0].name = 'изменённый урок';
    // }
    setCH(changeble);
    storeData(CH);
    setIsChange(!isChange)
  }
  const [Students, setStudents] = useState();

  const onButtonPress = (Index) => {
    Alert.prompt(
      "Enter your class",
      "Enter your password to claim your $1.5B in lottery winnings",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: className => onClickHandler(Index, className)
        }
      ]
      // "secure-text"
    );
  };


  const RenderItem = ({ item, index }) => (
    <Item day={new Date(item.day)} lessons={item.lessons} Index={index} />
  );

  const [CH, setCH] = useState(
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
  // const [modalVisible, setModalVisible] = useState(false);

  const [visible, setVisible] = useState(false);

  const handleVisibleModal = () => {
    setVisible(true);
  }

  const handleClose = () => {
    setVisible(false);
  }





  return (
    <View style={styles.container}>
      
      <SafeAreaView>
        <FlatList
          data={CH}
          renderItem={RenderItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={isChange}
        />
        <Button title='Open ModaL' onPress={getData} />
        {/* <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View> */}


      </SafeAreaView>
      {/* <Modal
        visible={visible}
        options={{ type: 'slide', from: 'bottom' }}
        duration={500}
        onClose={handleClose}
        students={Students} /> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  containers: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    borderTopWidthы: 1,
  },
  headtext: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  date: {
    width: '40%',
    backgroundColor: '#B0E0E6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  lessons_box: {
    width: '60%',
    flex: 1,
    // backgroundColor: '#DCDCDC',
    // alignItems: 'center',
  },
  lessons: {
    backgroundColor: '#fff',
    // backgroundColor: '#DCDCDC',
    // alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DCDCDC',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});