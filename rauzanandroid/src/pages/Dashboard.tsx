import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native'
import { Colors } from '../components/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { GenService } from '../services/gen/GenService';
import { AuthService } from '../services/api/AuthService';
import { Table, Row, Rows } from 'react-native-table-component';
import { GejalaService } from '../services/api/GejalaService';
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable';
import { AnalisaService } from '../services/api/AnalisaService';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { ApiServices } from '../services/api/ApiServices';
const { width } = Dimensions.get('screen')
import HTMLView from 'react-native-htmlview';

export default function Dashboard(props: any) {
    const [UserData, setUserData] = useState({ name: '' })
    const [countGejala, setcountGejala] = useState(0)
    const [countAnalisa, setcountAnalisa] = useState(0)
    const [endKey, setendKey] = useState(0)

    const [History, setHistory] = useState([])
    const [ListBerita, setListBerita] = useState([])
    const [Loading, setLoading] = useState(false)
    const [countBobot, setcountBobot] = useState(0)

    useEffect(() => {
        GenService.getStorage('userdata').then((res) => {
            console.log('userdata', res);
            setUserData(res)
            // getDatas()
            getHistory()
            getBerita();
        });

    }, [])

    // const getDatas = () => {
    //     GejalaService.GetAll().then((resp) => {
    //         console.log('list gejala', resp);
    //         let datas = resp.data;
    //         setcountGejala(datas.length)
    //     })
    // }

    const getBerita = ()=> {
        setLoading(true)
        ApiServices.GetData('/get-list-berita').then((resp)=>{
            if(resp){
                setLoading(false);
                setListBerita(resp.data);
            }

        })
    }

    const getHistory = () =>{
        setLoading(true)
        GenService.getStorage('userdata').then((res)=>{
            AnalisaService.getHistory(res.id).then((resp)=>{
                if(resp) setLoading(false)
                console.log('History',resp);
                if (resp.status != 'failed'){
                    let data_his = resp.data
                    let new_data = data_his.reverse()
                    setHistory(new_data)
                    setendKey(new_data[0])
                    setcountAnalisa(data_his.length)
                }else{
                    
                }
                
            })
        })
    }

    const doLogout = () => {
        Alert.alert(
            "Logout",
            "Anda yakin ingin keluar aplikasi ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        GenService.clearStorage();
                        props.navigation.replace('Login')
                    }
                }
            ]
        );


    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <StatusBar translucent backgroundColor={'transparent'}/>
            <View style={{ flex: 1 }} >
                <Animatable.View animation='bounceIn' style={styles.top1}></Animatable.View>
                <Animatable.View animation='bounceIn' delay={100} style={styles.top2}></Animatable.View>
            </View>
            {/* content */}
            <View style={styles.body}>
                <TouchableOpacity style={{ padding: 20, position: 'absolute', marginTop: -100 }} onPress={() => doLogout()}>
                    <Icon name='power' size={30} color='white' />
                </TouchableOpacity>
                <Animatable.View animation='bounceIn' delay={200} style={{ marginBottom: 30, marginLeft: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold',color:'black' }}>Hai, {UserData.name}</Text>
                    <Text style={{ color:'black' }}>Selamat datang</Text>
                </Animatable.View>
                <Animatable.View animation='bounceIn' delay={300} style={styles.person}>
                    <Icon name="person-circle-outline" size={100} color={Colors.secondary()} style={{ opacity: 0.5 }} />
                </Animatable.View>

                <View style={styles.card}>
                    <Animatable.View animation='fadeIn' delay={500} style={styles.search}>
                        <TouchableOpacity style={{ padding: 10 }}>
                            <Icon name='search' size={20} />
                        </TouchableOpacity>
                        <TextInput placeholder='Search..' style={{ width: '100%' }} />
                    </Animatable.View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Animatable.View animation='bounceIn' delay={400}>
                            {countAnalisa != 0 ? 
                            // <TouchableOpacity onPress={() => props.navigation.push('Details',endKey)}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ListHistory')}>
                                <LinearGradient colors={Colors.orangeGraien()} style={styles.cardMenu1}>
                                    <Text style={[styles.txtMenu, { fontSize: 30, fontWeight: 'bold' }]}>{countAnalisa}</Text>
                                    <Text style={styles.txtMenu}>History Analisa</Text>
                                    <View style={styles.roundMenu}>
                                        <Icon name='list-circle-outline' size={50} color={'white'} style={{ position: 'absolute', right: 20 }} />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            :
                                <View>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('ListHistory')}>
                                    <LinearGradient colors={Colors.orangeGraien()} style={styles.cardMenu1}>
                                        <Text style={[styles.txtMenu, { fontSize: 30, fontWeight: 'bold' }]}>{countAnalisa}</Text>
                                        <Text style={styles.txtMenu}>History Analisa</Text>
                                        <View style={styles.roundMenu}>
                                            <Icon name='list-circle-outline' size={50} color={'white'} style={{ position: 'absolute', right: 20 }} />
                                        </View>
                                    </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            }
                        </Animatable.View>
                        <Animatable.View animation='bounceIn' delay={700}>
                            <TouchableOpacity onPress={() => props.navigation.push('AnalisaAdd')}>
                            {/* <TouchableOpacity onPress={() => null}> */}
                                <LinearGradient colors={Colors.orangeGraien()} style={styles.cardMenu2}>
                                    <Text style={[styles.txtMenu, { fontSize: 20, fontWeight: 'bold' }]}>Diagnosa Sekarang</Text>
                                    {/* <Text style={styles.txtMenu}></Text> */}
                                    <View style={styles.roundMenu}>
                                        <Icon name='add-circle-outline' size={50} color={'white'} style={{ position: 'absolute', right: 20 }} />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                    <Animatable.View animation='bounceIn' delay={600} style={styles.history}>
                        <View style={{ flexDirection:'row' }}>
                            <Icon name='newspaper-outline' size={20} color='black'/>
                            <Text style={{ marginLeft: 5, fontWeight: 'bold',color:'black' }}>Headline News</Text>
                        </View>
                        {/* <View>
                            <TouchableOpacity style={{ position:'absolute',right:20 }} onPress={()=>getHistory()}>
                                <Icon name='refresh-circle' size={30} color={Colors.primary()}/>
                            </TouchableOpacity>
                        </View> */}
                    </Animatable.View>
                    <ScrollView style={styles.tableList} horizontal={true}>
                        {Loading && [0,1,2,3,4,5].map((v)=>(
                            <LoadingSkeleton />
                        ))}
                        {!Loading && ListBerita.map((v:any,i:any)=>(
                            <TouchableOpacity style={styles.cardNews} onPress={() => props.navigation.navigate('DetailNews',v)}>
                                <Image source={require('../assets/news2.png')} style={styles.imgNews} />
                                <View style={styles.textNews}>
                                    <Text style={styles.titleNews}>{v.judul}</Text>
                                </View>
                                {/* <Text style={styles.textHeadline}>
                                    {v.isi}</Text> */}
                               
                            </TouchableOpacity>
                        ))} 
                    </ScrollView>
                </View>
            </View>

            {/* content end */}
            <View style={{ flex: 1 }}>
                {/* <View style={styles.bottom2}></View>
                <View style={styles.bottom1}></View> */}
            </View>

        </View>
    )
}

const LoadingSkeleton = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item alignItems="center" marginTop={10} >
                <SkeletonPlaceholder.Item width={width/1.8} marginRight={10} height={200} borderRadius={20} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({
    p: {
        top: 0,
        textAlign: 'justify',
        // marginBottom:-70,
        marginTop: 3,
        marginBottom: 3,
        fontSize: 14,
        color: 'black'
    },
    titleNews:{
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: 18,
        left:5,
        top:3

    },
    textHeadline:{
        color:'black',
        position:'absolute',
        bottom:5,
        left:5,
        right:5,
        alignSelf:'center',
        textAlign:'justify'
    },
    cardNews:{
        borderRadius:20,
        height:220,
        width:width/1.8,
        elevation:3,
        backgroundColor:'white',
        marginLeft:10,
        
    },
    imgNews:{
        width:width/1.8,
        height:220,
        resizeMode:'cover',
        borderTopRightRadius:20,
        borderTopLeftRadius:20
    },
    textNews:{
        position:'absolute',
        backgroundColor:'white',
        width:width/1.8,
        bottom:0,
        opacity:0.7,
        height:60
    },
    textBtn:{
        color:'white',
        fontWeight:'bold'
    },
    btn:{
        marginTop:15,
        padding:15,
        backgroundColor: Colors.primary(),
        borderRadius:20
    },
    btnDetail: {
        height: 30,
        width: 70,
        backgroundColor: Colors.secondary(),
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center'
    },
    cardList: {
        height: 50,
        width: width / 1.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'lightgrey',
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginBottom: 10,
        zIndex:10
    },
    tableList: {
        padding: 5
    },
    history: {
        flexDirection: 'row',
        justifyContent :'space-between',
        padding: 20,
        zIndex :10
    },
    search: {
        height: 40,
        width: width / 1.2,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignSelf: 'center',
        marginTop: 20,

    },
    roundMenu: {
        backgroundColor: 'white',
        height: 120,
        width: 120,
        borderRadius: 100,
        opacity: 0.4,
        left: -30,
        bottom: -30
    },
    txtMenu: {
        color: 'white',
        marginLeft: 10,
        marginTop: 10,
        fontSize: 14,
        marginBottom: -15
    },
    cardMenu1: {
        height: width / 3,
        width: width / 3,
        borderRadius: 20,
        marginTop: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.6,
        zIndex: 10


    },
    cardMenu2: {
        height: width / 3,
        width: width / 3,
        borderRadius: 20,
        marginTop: 10,
        // elevation: 5
    },
    person: {
        position: 'absolute',
        right: 29,
        top: -100
    },
    container: { flex: 1, padding: 6, paddingTop: 10, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: Colors.secondary() },
    text: { margin: 6 },
    textHeader: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
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
        alignItems: 'center'
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
        height: '120%',
        width: width / 1,
        backgroundColor: 'white',
        borderTopEndRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomEndRadius: 50,
        // justifyContent: 'center',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        paddingHorizontal: 10,
        // flexDirection :'row'
    },
    body: {
        flex: 3,

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

