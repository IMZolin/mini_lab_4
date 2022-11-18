import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { Input, Button, Text, Avatar } from 'react-native-elements';
import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { deafultPicURL } from '../utils';
import { collection } from 'firebase/firestore';
import {Ionicons} from "@expo/vector-icons";



const ProfileScreen = ({ navigation }) => {
    const signOut = () => {
        auth.signOut().then(()=> {
            navigation.replace("Login");
        });
    };
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.main_container}>
                <Avatar size="large" rounded source={{ uri: auth?.currentUser?.photoURL }}></Avatar>
                <View style={styles.texts}>
                    <Text UserInfo style={{fontSize: 30, color: "#01a81a"}}>{auth.currentUser.displayName}</Text>
                    <Text style={{fontSize: 20}}>Email:<Text UserInfo style={{color:"#7CB9E8"}}> {auth.currentUser.email}</Text></Text>
                </View>
            </View>
            <TouchableOpacity onPress={signOut}>
                <Text style={{fontSize: 20, color:"red", textDecorationLine: "underline"}}>Sign out</Text>
            </TouchableOpacity>
        </View>

    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        /*justifyContent: "center",*/
        padding: 10,
        backgroundColor: 'white',
    },
    main_container:{
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderColor: '#01a81a',
        borderRadius: 15,
        borderWidth: 2
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300
    },
    texts: {
        alignItems: "center",
        justifyContent: "center",
    }

});
