import React, { useState,useEffect} from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import { GejalaService } from '../services/api/GejalaService';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../components/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
const { width } = Dimensions.get('screen')

export default function ListGejala(props : any) {
    const [datas, setdatas] = useState([])
    const [Loading, setLoading] = useState(true)
    const [DataTable, setDataTable] = useState({
        tableHead: ['ID', 'Kode Gejala', 'Nama Gejala', 'Nilai'],
        tableData: [
            ['1', 'G1', 'Gejala 1', '0.8'],
            ['2', 'G2', 'Gejala 2', '0.5'],
            ['3', 'G3', 'Gejala 3', '0.5'],
            ['4', 'G4', 'Gejala 4', '0.7'],
            ['5', 'G5', 'Gejala 5', '0.7']
        ]
    })

    useEffect(() => {
        getAll()
    }, [])

    const getAll = () =>{
        setLoading(true)
        GejalaService.GetAll().then((resp)=>{
            if(resp) setLoading(false)
            console.log('list gejala',resp);
            let re = resp.data
            let datas : any = [];
            for (let i = 0; i < re.length; i++) {
                const e = re[i];
                datas.push(
                    e.id,
                    e.kode_gejala,
                    e.nama_gejala,
                    e.nilai
                )
            }

            let ne_arr = re.map((i:any)=>i.kode_gejala)
            // console.log('datas',ne_arr);
            
            // console.log('datas',datas);
            
        })
    }


    return (
        <View style={styles.content}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <View style={styles.top}>
                <Text style={styles.title}>List Gejala</Text>
            </View>
            <View style={styles.card}>
                    <Text style={{ marginTop: 20, fontWeight: 'bold' }}></Text>
                    {Loading && [0,1,2,3].map((v:any)=>(
                        <LoadingSkeleton/>
                    )) }
                    {!Loading && 
                    <ScrollView style={styles.container}>
                        <Table borderStyle={{ borderWidth: 2, borderColor: Colors.primary() }}>
                            <Row data={DataTable.tableHead} style={styles.head} textStyle={styles.textHeader} />
                            <Rows data={DataTable.tableData} textStyle={styles.text} />
                        </Table>
                    </ScrollView>
                    }
                
                    <View style={styles.cardBottom}>
                        <LinearGradient colors={Colors.orangeGraien()} style={styles.cardDetail}>
                            <Text style={styles.text1}>22</Text>
                            <Text style={styles.text2}>Jml Gejala</Text>
                            <View style={styles.round}>
                                    
                            </View>
                        </LinearGradient>
                        <LinearGradient colors={Colors.blueGradien()} style={styles.cardDetail}>
                            <Text style={styles.text1}>8.0</Text>
                            <Text style={styles.text2}>Nilai tertinggi</Text>
                            <View style={styles.round}>
                            </View>
                        </LinearGradient>
                    </View>
            </View>
            
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.btnBack}>
                <Icon name='arrow-back-circle-outline' size={40} />
            </TouchableOpacity>
        </View>
    )
}

const LoadingSkeleton = ()=>{
    return(
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='space-between'>
                <SkeletonPlaceholder.Item width={90} height={50} />
                <SkeletonPlaceholder.Item width={90} height={50} />
                <SkeletonPlaceholder.Item width={90} height={50} />
                <SkeletonPlaceholder.Item width={90} height={50} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='space-between' marginTop={5} marginBottom={6}>
                <SkeletonPlaceholder.Item width={90} height={30} />
                <SkeletonPlaceholder.Item width={90} height={30} />
                <SkeletonPlaceholder.Item width={90} height={30} />
                <SkeletonPlaceholder.Item width={90} height={30} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({
    text1 :{
        fontWeight :'bold',
        color :'white',
        fontSize: 30,
        marginLeft : 20,
        marginTop : 20
    },
    text2 :{
        color: 'white',
        marginLeft: 20,
        marginBottom : -30
    },
    round :{
        height : 100,
        width : 100,
        backgroundColor :'white',
        opacity : 0.5,
        borderRadius : 100,
        bottom : -50,
        left :-20
    },
    cardDetail:{
     height : 120,
     width : width/2.3,
     borderRadius : 20
    },
    cardBottom:{
        padding : 10,
        borderRadius : 10,
        flexDirection :'row',
        justifyContent :"space-around"
    },
    title: {
        fontSize :20,
        fontWeight :'bold'
    },
    top : {
        flex : 1,
        justifyContent : 'center',
        alignItems :'center'
    },
    content: {
        flex : 1,
        flexDirection :'column',
        backgroundColor : 'lightgrey'
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
        borderTopLeftRadius : 20
    },
    card :{
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
        flex : 5,

    },
    container: {
         padding: 6, paddingTop: 10,
         shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.6
    },

})


