import React, { useState } from 'react'
import { View, Text,Image, SafeAreaView, StyleSheet, Dimensions, TextInput, TouchableOpacity,ActivityIndicator, StatusBar } from 'react-native'
import { Colors } from '../components/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { GenService } from '../services/gen/GenService';
import { AuthService } from '../services/api/AuthService';


const { width } = Dimensions.get('screen')

export default function Login(props: any) {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Loading, setLoading] = useState(false)
    const [hidePass, sethidePass] = useState(true)
    const [regShow, setregShow] = useState(true)
    const [Eye, setEye] = useState('eye')
    const navigation = props.navigation;


    const doLogin = () =>{
        if (Username === '') return GenService.alertErr('Kolom Email tidak boleh kosong')
        if (Password === '') return GenService.alertErr('Password tidak boleh kosong')
        let body = { email: Username, password: Password }
        setLoading(true)
        console.log(body);
        AuthService.Login(body).then((resp)=>{
            console.log(resp);
            if(resp) setLoading(false)
            if(resp.status == 'success'){
                let udata = JSON.stringify(resp.data)
                GenService.saveStorage('userdata',udata)
                navigation.replace('Dashboard')
            }else{
                GenService.alertErr(resp.message)
            }
            
        })
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <View style={{ flex: 1 }} >
                <View style={styles.top1}></View>
                <View style={styles.top2}></View>
            </View>
            {/* content */}
            <View style={styles.body}>
                <View style={{ marginBottom: 30, marginLeft: 20 }}>
                    {/* <Image source={require('../assets/logo.png')} style={[styles.logo,{bottom: 20, width:130,height:130,alignSelf:'flex-end',right:20,position:'absolute'}]}/> */}
                    <Text style={styles.textLogo}>M.I.D</Text>
                    <Text style={{ fontSize: 20, marginRight: 20,color:'black' }}>Mental Illness Detection</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.input1}>
                        <Icon name='mail-outline' size={25} style={{ marginRight: 15 }} />
                        <TextInput placeholder='Email' style={styles.textInput1} onChangeText={(v) => setUsername(v)} />
                    </View>
                    <View style={{ backgroundColor: Colors.primary(), height: 2 }}></View>
                    {/* btn login */}
                    <TouchableOpacity style={styles.btnInput} onPress={() => doLogin()}>
                        {!Loading && <Icon name='checkmark-circle' size={40} color='white' /> }
                        {Loading && <ActivityIndicator size={40} color="white"/>}
                    </TouchableOpacity>
                    <View style={styles.input2}>
                        <Icon name='lock-closed-outline' size={25} style={{ marginRight: 15 }} />
                        <TextInput placeholder='Password' secureTextEntry={hidePass} onChangeText={(v) => setPassword(v)} style={styles.textInput2} />
                        <TouchableOpacity style={{ zIndex:10 }} onPress={() => {
                            !hidePass ? sethidePass(true) : sethidePass(false)
                            Eye == 'eye-off' ? setEye('eye') : setEye('eye-off')
                            }}>
                            <Icon name={Eye} size={20} color='gray' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            
            {/* content end */}
            <View style={{ flex: 1 }}>
                <View style={styles.bottom2}></View>
                <View style={styles.bottom1}></View>
            </View>
            <TouchableOpacity style={styles.btnReg} onPress={() => props.navigation.push('Register')}>
                <View >
                    <Text style={styles.textReg}>Register</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    textLogo : {
        fontSize: 35, 
        fontWeight: 'bold', 
        color: Colors.primary(),
        fontFamily: 'Times New Roman',
        textShadowColor: 'white',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    logo:{
        resizeMode : 'contain',
        height:120,
        width : 120,
        marginTop : -70
    },
    textReg: {
        color: Colors.primary(),
        fontWeight: 'bold',
        fontSize: 18

    },
    btnReg: {
        // marginTop : 50,
        bottom : 10,
        width: 150,
        height: 70,
        alignSelf:'flex-end',
        backgroundColor: 'white',
        elevation: 4,
        borderTopLeftRadius:50,
        borderBottomLeftRadius :50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.2
    },
    btnInput: {
        height: 70,
        width: 70,
        borderRadius: 70,
        position: 'absolute',
        backgroundColor: Colors.primary(),
        right: -30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.6,
        zIndex:10
    },
    textInput1: {
        color: 'black',
        width: width / 2
    },
    textInput2: {
        color: 'black',
        width: width / 2
    },
    input1: {
        height: 70,
        // backgroundColor: '#F7F8F8',
        borderRadius: 15,
        flexDirection: 'row',
        paddingHorizontal: 20,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    input2: {
        height: 70,
        // backgroundColor: '#F7F8F8',
        borderRadius: 15,
        flexDirection: 'row',
        paddingHorizontal: 20,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        height: width / 2 / 1.3,
        width: width / 1.2,
        backgroundColor: 'white',
        borderTopEndRadius: 100,
        borderBottomEndRadius: 100,
        justifyContent: 'center',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.2
    },
    body: {
        flex: 1,

    },
    bottom1: {
        backgroundColor: Colors.primary(),
        height: width / 1.2,
        width: width / 1.2,
        borderRadius: width / 2,
        position: 'absolute',
        bottom: -width / 1.5,
        right: -width / 10,
        
    },
    bottom2: {
        backgroundColor: Colors.secondary(),
        height: width / 1.4,
        width: width / 1.4,
        borderRadius: width / 2,
        bottom: -130,
        right: -width / 1.4,
    },

    top1: {
        backgroundColor: Colors.primary(),
        height: width / 1.2,
        width: width / 1.2,
        borderRadius: width / 2,
        top: -width / 1.8
    },
    top2: {
        backgroundColor: Colors.secondary(),
        height: width / 1.4,
        width: width / 1.4,
        borderRadius: width / 2,
        top: -width / 0.90,
        left: -100
    },
})
