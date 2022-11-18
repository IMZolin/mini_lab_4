import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { Avatar, Input, ListItem } from 'react-native-elements';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';

const FindChatScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatName", '!=', ""));
        const unsubscribe = onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                let flag = true;
                for (let i = 0; i < input.length; i++) {
                    if (doc.data().chatName[i] != input[i]) {
                        flag = false;
                    }
                }
                if (flag) {
                    chats.push({
                        id: doc.id,
                        data: doc.data()
                    });
                }
            });
            console.log(chats);
            setChats(chats);
        });
        return unsubscribe;
    }, [input])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "PolyChat",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black"},
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity style={{ marginLeft: 10 }}
                                      onPress={navigation.goBack}>
                        <Text>Back</Text>
                    </TouchableOpacity>

                </View>
            ),
            headerRight: () => (
                <View style={{ marginLeft: 20}}>
                    <Input placeholder='Enter a chat name' onChangeText={(text) => setInput(text)} ></Input>
                </View>
            )
        })
    }, [navigation])
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", { id, chatName, })
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

export default FindChatScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width:"100%"
    }
})
