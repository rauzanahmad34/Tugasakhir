import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Table, Row, Rows } from 'react-native-table-component';
import { GejalaService } from '../services/api/GejalaService';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../components/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { AnalisaService } from '../services/api/AnalisaService';
import { GenService } from '../services/gen/GenService';
const { width } = Dimensions.get('screen')

export default function ListHistory(props: any) {
    const param = props.route.params;
    const [datas, setdatas] = useState([])
    const [Loading, setLoading] = useState(true)
    const [History, setHistory] = useState([])

    

    useEffect(() => {
        getHistory()
      
    }, [])

    const getHistory = () => {
        setLoading(true)
        GenService.getStorage('userdata').then((res) => {
            AnalisaService.getHistory(res.id).then((resp) => {
                if (resp) setLoading(false)
                console.log('History', resp);
                if(resp.status != 'failed'){
                    let data_his = resp.data
                    let new_data = data_his.reverse()
                    setHistory(new_data)
                }else{
                    GenService.alertErr(resp.message)
                }
                
            })
        })
    }


    return (
        <View style={styles.content}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'}/>
            <View style={styles.top}>
                <Text style={styles.title}>History Analisa</Text>
            </View>
            <View style={styles.card}>
                <ScrollView>
                    {Loading && [0, 1, 2, 3, 4, 5,6,7,8].map((v) => (
                        <LoadingSkeleton />
                    ))}
                    {!Loading &&
                        History.map((v: any, i) => (
                            <Animatable.View animation='bounceIn' delay={i * 200} key={i} style={styles.cardList}>
                                <Text style={{ color:'black' }}>Tgl Analisa :</Text>
                                <Text style={{ color:'black' }}>{v.created_at.slice(0, 10)}</Text>
                                <TouchableOpacity style={styles.btnDetail} onPress={() => props.navigation.push('Details', v)}>
                                    {/* <TouchableOpacity style={styles.btnDetail} onPress={()=>null}> */}
                                    <Text style={{ color: 'white' }}>Lihat Detail</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        ))
                    }
                    {History.length == 0 &&
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Animatable.Image source={require('../assets/nodata.png')} style={{ width: 70, height: 70 }} />
                            <Text>Belum ada history</Text>
                            <TouchableOpacity style={styles.btn} onPress={() => props.navigation.push('AnalisaAdd')}>
                                <Text style={styles.textBtn}>Diagnosa sekarang</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollView>
                
            </View>

            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.btnBack}>
                <Icon name='arrow-back-circle-outline' size={40} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const LoadingSkeleton = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item alignItems="center" marginTop={10} >
                <SkeletonPlaceholder.Item width={width / 1.2} height={50} borderRadius={10} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 15,
        padding: 15,
        backgroundColor: Colors.primary(),
        borderRadius: 20
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
        zIndex: 10
    },
    textBtn: {
        color: 'white',
        fontWeight: 'bold'
    },
    btnDetail: {
        height: 30,
        width: 100,
        backgroundColor: Colors.secondary(),
        justifyContent: 'center',
        borderRadius: 10,
        alignItems: 'center'
    },
    textTitle:{
        fontWeight:'bold',
        width: 85
    },
    titleDetail1: {
        backgroundColor: Colors.primary(),
        height: 40,
        width: 120,
        paddingTop: 5,
        alignItems: 'center',
        marginBottom: -30,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        marginTop: 20,
        marginLeft: 10,
    },
    titleDetail2: {
        backgroundColor: '#5672d8',
        height: 40,
        width: 120,
        paddingTop: 5,
        alignItems: 'center',
        marginBottom: -30,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        marginTop: 20,
        marginLeft: 10,
    },
    textHead: {
        fontWeight: 'bold',
        color: 'white',
        fontSize:14
    },
    tHead: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        padding: 10,

    },
    tBody: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        flexWrap:'wrap'
    },
    tBody2: {
        flexDirection: 'row',
        padding: 10,
        margin: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent :'space-between',
        flexWrap:'wrap'
    },
    cardGejala: {
        width: width / 1.1,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 20
    },
    cardPenyakit: {
        width: width / 1.1,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 20,
        padding :15
    },
    text1: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 28,
        marginLeft: 20,
        marginTop: 20
    },
    text2: {
        color: 'white',
        marginLeft: 20,
        marginBottom: -30
    },
    round: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        opacity: 0.5,
        borderRadius: 100,
        bottom: -50,
        left: -20
    },
    cardDetail: {
        height: 100,
        width: width /1.2,
        borderRadius: 20
    },
    cardBottom: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.primary()
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.primary()
    },
    btnBack: {
        marginLeft: 10,
        marginTop: 50,
        position: 'absolute'
    },
    head: { height: 40, backgroundColor: Colors.secondary() },
    text: { margin: 6 },
    textHeader: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        borderTopLeftRadius: 20
    },
    card: {
        height: '120%',
        width: width / 1,
        backgroundColor: 'white',
        borderTopEndRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomEndRadius: 50,
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        paddingHorizontal: 10,
        flex: 5,
        paddingTop:20,


    },
    container: {
        padding: 6, paddingTop: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.6
    },

})


