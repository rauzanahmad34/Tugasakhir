import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
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

export default function DetailsAnalisa(props: any) {
    const param = props.route.params;
    const [datas, setdatas] = useState([])
    const [Loading, setLoading] = useState(true)
    const [Rank, setRank] = useState([])
    const [Gejala, setGejala] = useState([])
    const [Penyakit, setPenyakit] = useState([])

    const [ShowGejala, setShowGejala] = useState(true)
    const [ShowHasil, setShowHasil] = useState(false)

    

    useEffect(() => {
        // getDetail()
        console.log(`param`, param);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const getDetail = () => {
        setLoading(true)
        AnalisaService.getDetails(param.id).then((resp) => {
            console.log('details', resp);
            if (resp) setLoading(false)
            setGejala(resp.data.detailData.hasil_analisa.gejala)
            setPenyakit(resp.data.detailData.hasil_analisa.penyakit)
            // setRank(resp.data.rank)
            let data_rank = resp.data.rank
            let rank : any = []
            for (let i = 0; i < data_rank.length; i++) {
                const e = data_rank[i];
                rank.push({
                    rank : e
                })
            }
            console.log('rank',rank);
            setRank(rank)

        })
    }


    return (
        <View style={styles.content}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
            <View style={styles.top}>
                <Text style={styles.title}>Detail Analisa</Text>
                <Text style={{ color:'black' }}>Tgl : {param.created_at}</Text>
            </View>
            <View style={styles.card}>
                <ScrollView>
                <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                {/* <TouchableOpacity style={styles.titleDetail1} onPress={() => {
                                    setShowGejala(true)
                                    setShowHasil(false)
                                }}>
                                <Text style={{ color: 'white' }}>Diagnosa Gejala</Text>
                            </TouchableOpacity> */}
                                <TouchableOpacity style={[styles.titleDetail2]} onPress={() => {
                                    setShowGejala(false)
                                    setShowHasil(true)
                                }}>
                                <Text style={{ color: 'white' }}>Hasil Akhir</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.titleDetail2}><Text style={{ color: 'white' }}>Hasil Akhir</Text></View> */}
                 
                            <LinearGradient colors={Colors.blueGradien()} style={styles.cardPenyakit}>
                                <View style={styles.tHead}>
                                    <Text style={styles.textHead}>Nama Penyakit :</Text>
                                    <Text style={[styles.textHead,{fontSize:17}]}>{param.nama_penyakit}</Text>
                                </View>
                                <View style={styles.tBody2}>
                                    <Text style={{ color:'black' }}>Kode Penyakit : </Text>
                                    <Text style={{ marginRight: 20,color:'black',fontWeight:'bold' }}>{param.kode_penyakit}</Text>
                                </View>
                                <View style={styles.tBody2}>
                                    <Text style={{ color:"black" }}>Penyebab :</Text>
                                    <Text style={{ marginRight: 20,color:'black'}}>{param.penyebab}</Text>
                                </View>
                                <View style={styles.tBody2}>
                                    <Text style={{ color:'black',fontWeight:'bold' }}>Solusi :</Text>
                                    <Text style={{ marginRight: 20,color:'black',textAlign:'justify',width:200 }}>{param.solusi}</Text>
                                </View>

                                {/* <View style={styles.cardBottom}>
                                    <LinearGradient colors={Colors.orangeGraien()} style={styles.cardDetail}>
                                        <Text style={styles.text1}>{param.percentage.toFixed(2)}%</Text>
                                        <Text style={styles.text2}>Persentase Hasil Analisa</Text>
                                        <View style={styles.round}></View>
                                    </LinearGradient>
                                    <LinearGradient colors={Colors.blueGradien()} style={styles.cardDetail}>
                                        <Text style={styles.text1}>{param.percentage.toFixed(3)}</Text>
                                        <Text style={styles.text2}>Nilai Rank</Text>
                                    </LinearGradient>
                                </View> */}
                            </LinearGradient>
                </View>
                </ScrollView>
                
            </View>

            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.btnBack}>
                <Icon name='arrow-back-circle-outline' size={40} color={'black'}/>
            </TouchableOpacity>
        </View>
    )
}

const LoadingSkeleton = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item alignItems="center" marginTop={10} >
                <SkeletonPlaceholder.Item width={width/1.2} marginHorizontal={10} borderRadius={10} height={width/2.4} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({
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
        color:'black'
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightgrey'
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


    },
    container: {
        padding: 6, paddingTop: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.6
    },

})


