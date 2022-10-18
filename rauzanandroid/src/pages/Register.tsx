import React, { useState, useEffect } from 'react'
import { ScrollView,View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, TextInput,ActivityIndicator, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../components/Colors'
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from "react-native-custom-dropdown";
import { AuthService } from '../services/api/AuthService';
import { GenService } from '../services/gen/GenService';

const { width } = Dimensions.get('screen')

const Register = (props: any) => {
    const [Fullname, setFullname] = useState('')
    const [Username, setUsername] = useState('')
    const [Phone, setPhone] = useState('')
    const [Password, setPassword] = useState('')
    const [Pertanyaan, setPertanyaan] = useState('N')
    const [Jawaban, setJawaban] = useState('')
    const [Loading, setLoading] = useState(true)
    const [hidePass, sethidePass] = useState(true)
    const [Question, setQuestion] = useState([
        { label: 'Select Questions', value: 'select' },
        { label: 'Siapakah nama ibu kandung saya.?', value: 'nama_ibu' },
    ])
    const [Eye, setEye] = useState('eye')
    const countries = ["Siapakah nama ibu kandung saya.?", "Siapakah nama ibu kandung saya.?", "Siapakah nama ibu kandung saya.?"]

    useEffect(() => {
    }, [])


    const onSubmit = () => {
        if (Fullname == '') return GenService.alertErr('Nama tidak boleh kosong');
        if (Username == '') return GenService.alertErr('Email tidak boleh kosong')
        if (Phone == '') return GenService.alertErr('No telepon tidak boleh kosong')
        if (Password == '') return GenService.alertErr('Password tidak boleh kosong');
        setLoading(false)
        let body = {name:Fullname,email:Username,password:Password,phone:Phone}
        AuthService.Signup(body).then((resp)=>{
            console.log(resp);
            if (resp) setLoading(true);
            if (resp.status == 'success'){
                GenService.alertSuccess('Register berhasil, silahkan login dengn user yang sudah terdaftar')
                props.navigation.goBack()
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
            <View style={styles.body}>

                <View style={{ marginBottom: 20, marginLeft: 20 }}>
                    <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Register</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.input1}>
                        <Icon name='person-outline' size={25} style={{ marginRight: 15 }} />
                        <TextInput placeholderTextColor='gray' placeholder='Nama' style={styles.textInput1} onChangeText={(v) => setFullname(v)} />
                    </View>
                    <View style={{ backgroundColor: Colors.primary(), height: 2 }}></View>
                    <View style={styles.input1}>
                        <Icon name='call-outline' size={25} style={{ marginRight: 15 }} />
                        <TextInput keyboardType='number-pad' placeholderTextColor='gray' placeholder='No Tlpn' style={styles.textInput1} onChangeText={(v) => setPhone(v)} />
                    </View>
                    <View style={{ backgroundColor: Colors.primary(), height: 2 }}></View>
                    <View style={styles.input1}>
                        <Icon name='mail-outline' size={25} style={{ marginRight: 15 }} />
                        <TextInput keyboardType='email-address' placeholderTextColor='gray' placeholder='Email' style={styles.textInput1} onChangeText={(v) => setUsername(v)} />
                    </View>
                  
                    <View style={{ backgroundColor: Colors.primary(), height: 2 }}></View>
                    {/* btn login */}
                    <TouchableOpacity style={styles.btnInput} onPress={() => onSubmit()}>
                        {!Loading && <ActivityIndicator size={50} color='white'/>}
                        {Loading && <Icon name='ios-checkmark-circle' size={40} color='white'/>}
                    </TouchableOpacity>

                    <View style={[styles.input2,{zIndex:10}]}>
                        <Icon name='lock-closed-outline' size={25} style={{ marginRight: 15 }} />
                        <TextInput placeholderTextColor='gray' placeholder='Password' secureTextEntry={hidePass} onChangeText={(v) => setPassword(v)} style={styles.textInput2} />
                        <TouchableOpacity onPress={() => {
                            !hidePass ? sethidePass(true) : sethidePass(false)
                            Eye == 'eye-off' ? setEye('eye') : setEye('eye-off')
                        }}>
                            <Icon name={Eye} size={20} color='gray' />
                        </TouchableOpacity>
                    </View>

                </View>
                {/* <TouchableOpacity onPress={() => props.navigation.push('Register')}>
                    <View style={styles.btnReg}>
                        <Text style={styles.textReg}>Register</Text>
                    </View>
                </TouchableOpacity> */}
            </View>

            {/* <View style={{ flex: 1 }}>
                <View style={styles.bottom2}></View>
                <View style={styles.bottom1}></View>
            </View> */}
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.btnBack}>
                <Icon name='arrow-back-circle-outline' size={40} />
            </TouchableOpacity>


        </View>

    )
}

export default Register

const styles = StyleSheet.create({
    textReg: {
        color: Colors.primary(),
        fontWeight: 'bold',
        fontSize: 18

    },
    btnReg: {
        // top : 50,
        width: 150,
        height: 70,
        backgroundColor: 'white',
        elevation: 4,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
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
        zIndex :10
    },
    textInput1: {
        color: 'black',
        width: width / 2
    },
    textInput2: {
        color: 'black',
        width: width / 2
    },
    inputQ: {
        height: 90,
        borderRadius: 15,
        paddingHorizontal: 20, zIndex: 10
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
        height: 300,
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
    btnBack: {
        marginLeft: 10,
        marginTop: 50,
        position: 'absolute'
    },
    body: {
        flex: 3,
        // backgroundColor:'red'
    },
    bottom1: {
        backgroundColor: Colors.primary(),
        height: width / 1.2,
        width: width / 1.2,
        borderRadius: width / 2,
        position: 'absolute',
        bottom: -width / 1.7,
        right: width / 10,
    },
    bottom2: {
        backgroundColor: Colors.secondary(),
        height: width / 1.4,
        width: width / 1.4,
        borderRadius: width / 2,
        bottom: -width / 10,
        left: -width / 2.8
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
        right: -width / 2
    },
})