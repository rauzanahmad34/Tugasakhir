import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, StatusBar, Image,Alert } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import { GejalaService } from '../services/api/GejalaService';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../components/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { AnalisaService } from '../services/api/AnalisaService';
import { GenService } from '../services/gen/GenService';
import HTMLView from 'react-native-htmlview';
const { width } = Dimensions.get('screen')

export default function DetailNews(props: any) {
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
        // Alert.alert(JSON.stringify(param))
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])



    return (
        <View style={styles.content}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
            <View style={styles.top}>
                <Image source={require('../assets/news2.png')} style={{ width:width,resizeMode:'contain' }}/>
                <Text style={styles.title}>News Title</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.bannerTitle}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{param.judul}</Text>
                    <Text style={{ color: 'black', fontSize: 13, fontStyle: 'italic' }}>{param.created_at}</Text>
                </View>
                <ScrollView>
                    <View style={{ padding:10}}>
                        {/* <Text style={{ color:'black',textAlign:'justify' }}>
                        {param.isi}
                    </Text> */}
                        <HTMLView
                            value={param.isi.replace(/(\r\n|\n|\r)/gm, '')}
                            stylesheet={styles}
                        />
                    </View>
                    
                </ScrollView>
                
            </View>

            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.btnBack}>
                <Icon name='arrow-back-circle' size={40} color='white'/>
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
    p: {
        top: 0,
        textAlign: 'justify',
        // marginBottom:-70,
        marginTop: 3,
        marginBottom: 3,
        fontSize: 14,
        color: 'black'
    },
    bannerTitle:{
        backgroundColor:'white',
        opacity:0.8,
        paddingHorizontal:20,
        paddingVertical:10,
        marginTop:-60
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
        fontWeight: 'bold'
    },
    top: {
        flex: 2,
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


