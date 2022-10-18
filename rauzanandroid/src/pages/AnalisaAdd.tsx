import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput,ActivityIndicator, StatusBar } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import { GejalaService } from '../services/api/GejalaService';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../components/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import DropDownPicker from "react-native-custom-dropdown";
import { AnalisaService } from '../services/api/AnalisaService';
import RNPickerSelect from 'react-native-picker-select';
import { GenService } from '../services/gen/GenService';
import * as Animatable from 'react-native-animatable';
import { ApiServices } from '../services/api/ApiServices';


const { width,height } = Dimensions.get('screen')

export default function AnalisaAdd(props: any) {
    const [Bobot, setBobot] = useState([
        { label: 'Tidak Yakin', value: '1' },
    ])
    const [datas, setdatas] = useState([])
    const [Loading, setLoading] = useState(true)
    const [Lazy, setLazy] = useState(false)
    const [loadChange, setloadChange] = useState(false)
    const [Select, setSelect] = useState()
    const [Body, setBody] = useState([])
    const [selectedItems, setselectedItems] = useState([])
    const [ListGejala, setListGejala] = useState([{ label: 'Select Gejala', value: 'null',tidak:false,ya:false }])
    const [selectedItem, setselectedItem] = useState([])
    const [DateQ, setDateQ] = useState([
        {
            "id": "1",
            "kode_gejala": "G1",
            "nama_gejala": "Gejala 1",
            "nilai": "0.8"
        },
        {
            "id": "2",
            "kode_gejala": "G1",
            "nama_gejala": "Gejala 1",
            "nilai": "0.8"
        },
    ])


    useEffect(() => {
        getAll()
    }, [])

    const getAll = () => {
        setLoading(true)
        GejalaService.GetAll().then((resp) => {
            if (resp) setLoading(false)
            console.log(resp);
            let re = resp.data
            let datas: any = [];
            setDateQ(re)
           let new_arr = []
            setListGejala([])
            for (let i = 0; i < re.length; i++) {
                const e = re[i];
                new_arr.push({
                    label: e.nama_gejala,
                    value: e.id,
                    tidak: false,
                    ya : false
                })

            }
            setListGejala(new_arr)
        })
        // GejalaService.GetBobot().then((res)=>{
        //     let dat = res.data;
        //     const new_data = [];
        //     for (let i = 0; i < dat.length; i++) {
        //         const e = dat[i];
        //         new_data.push({ label: e.keterangan, value: e.bobot})
        //     }
        //     setBobot(new_data)
        // })
    }

    const submit = () =>{
            
            GenService.getStorage('userdata').then((resp)=>{
            console.log('usereata',resp);
            let datas = ListGejala;
            let arr : any = [];
            for (let i = 0; i < datas.length; i++) {
                const e = datas[i];
                if(e.ya== true){
                    arr.push(e.value)
                }
            }
            if(arr.length == 0)return GenService.alertErr('Tidak ada gejala satu pun yang anda pilih sehingga tidak bisa di analisa pastikan ada salah satu gejala yang anda alami.')
            setLazy(true)
            let selected = JSON.stringify(arr);
            let sel1 = selected.slice(1,-1);
            let body = {
                user_id : resp.id,
                nama : resp.name,
                gejala : sel1
            }
            console.log(`body`, body);
                 ApiServices.postData(body,'/add-analisa').then((resp)=>{
                if(resp) setLazy(false);
                if(resp.status ==='success'){
                    GenService.alertSuccess('Data Analisa Berhasil di simpan..');
                    props.navigation.replace('Dashboard');
                }else{
                    GenService.alertErr(resp.message)
                }
                console.log('RESPONSE',resp);
            })
        })

    }

   const optTidak = (i:any)=>{
        let datas = ListGejala;
        datas[i].tidak = true;
        datas[i].ya = false;
       setloadChange(true)
        setTimeout(() => {
            setListGejala(datas);
            setloadChange(false)
        }, 0);

   }

   const optYa = (i:any)=>{
       let datas = ListGejala;
       datas[i].ya = true;
       datas[i].tidak = false;
       setloadChange(true)
       setTimeout(() => {
           setListGejala(datas);
           setloadChange(false)
       }, 0);
   }




    return (
        <View style={styles.content}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <View style={styles.top}>
                <Text style={styles.title}>Analisa Baru</Text>
            </View>
            <View style={styles.card}>
                
                    <View style={styles.question}>
                        <View style={styles.tHeader}>
                            <Icon name='information-circle-outline' size={25}/>
                            <Text style={{ fontSize:13,flexWrap:'wrap' }}>Silahkan jawab gejala apa saja yang di alami</Text>  
                        </View>
                        <ScrollView>
                        {Loading && [0, 1, 2, 3, 4, 5, 6,7,8].map((v: any,i) => (<LoadingSkeleton />))}
                        
                        {!Loading && ListGejala.map((v:any,i:any)=>(
                            <LinearGradient key={i} colors={Colors.orangeGraien()} style={[styles.cardDetail]}>
                                <Text style={[styles.text1, { marginBottom: 3 }]}>Pertanyaan {i+1}</Text>

                                <View style={styles.contentCard}>
                                    <Text style={{ color: 'black', textAlign: 'justify',fontSize:16 }}>
                                       {v.label}
                                    </Text>
                                    {!loadChange ?
                                    <View style={styles.opt}>
                                        <TouchableOpacity onPress={()=>optTidak(i)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 18, marginRight: 5, color: v.tidak?'green':'gray',fontWeight:v.tidak?'bold':'normal' }}>Tidak</Text>
                                            <Icon name={v.tidak ?'checkmark-circle':'ellipse-outline'} size={20} color={v.tidak?'green':'gray'} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={()=>optYa(i)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 18, marginRight: 5, color: v.ya ? 'green' : 'gray', fontWeight: v.ya ? 'bold' : 'normal' }}>Ya</Text>
                                                <Icon name={v.ya ? 'checkmark-circle' : 'ellipse-outline'} size={20} color={v.ya ? 'green' : 'gray'} />
                                        </TouchableOpacity>
                                    </View>:<View style={[styles.opt]}/>}
                                </View>
                                {/* <DropDownPicker
                                    items={ListGejala}
                                    dropDownMaxHeight={height/1.5}
                                    multiple={true}
                                    multipleText="%d items have been selected."
                                    min={0}
                                    max={10}
                                    containerStyle={{ height: 45, width: width / 1.3, marginVertical: 7, alignSelf: 'center' }}
                                    defaultValue={1}
                                    itemStyle={{justifyContent: 'flex-start'}}
                                    onChangeItem={item => {setselectedItem(item)}}
                                /> */}
                            </LinearGradient>
                        ))
                           
                            }
                        <View style={styles.cardBottom}>
                            <TouchableOpacity onPress={() => submit()}>
                                <LinearGradient colors={Colors.orangeGraien()} style={[styles.cardDetail, { height: 60 }]}>
                                    {Lazy && <View><ActivityIndicator size='large' color='white' /><Text style={{ color: 'white' }}>Submit Data...</Text></View>}
                                    {!Lazy && <Text style={styles.text1}>ANALISA SEKARANG</Text>}
                                    <View style={styles.round}>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                        
                    </View>
              
               
                
            </View>

            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.btnBack}>
                <Icon name='arrow-back-circle-outline' size={40} />
            </TouchableOpacity>
        </View>
    )
}

const LoadingSkeleton = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item  alignItems="center" marginTop={10} >
                <SkeletonPlaceholder.Item width={width} height={50} borderRadius={10}/>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({
    contentCard:{
        padding: 10, 
        backgroundColor: 'white', 
        marginHorizontal:7,
        marginVertical:5,
        borderBottomRightRadius:15,
        borderBottomLeftRadius: 15
    },
    opt:{
        height:50,
        marginTop:10,
        // margin:10,
        flexDirection:'row',
        padding: 10,
        backgroundColor:'lightgrey',
        justifyContent:'space-around',
        borderBottomRightRadius:15,
        borderBottomLeftRadius: 15
    },
    select:{
        backgroundColor:'white',
        height : 30,
        justifyContent :'center',
        alignItems:'center',
        // padding : 10,
        fontSize: 8,
        borderRadius: 10,
        width: width/1.4,
        alignSelf:'center'
    },
    inputQ: {
        // height: 90,
        width : '50%',
        marginRight :10,
        // borderRadius: 15,
        // paddingHorizontal: 20, 
        // zIndex: 1
    },
    tHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems :'center',
        borderWidth : 3,
        borderColor : Colors.primary(),
        borderRadius : 10,
        backgroundColor : 'lightgreen',
        height : 50,
        padding :10
    },
    tBody: {
        flexDirection :'column',
        justifyContent :'space-between',
        padding : 10,
        alignItems :'center',
        backgroundColor : 'lightblue',
        borderRadius : 10,
        height : 60,
        marginVertical : 5,
        zIndex : 1
    },
    question: {
        padding: 10,
        flex : 1
    },
    text1: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        // marginLeft: 20,
        marginTop: 10
    },
    text2: {
        color: 'white',
        marginLeft: 20,
        marginBottom: -30
    },
    round: {
        height: 200,
        width: 200,
        backgroundColor: 'white',
        opacity: 0.4,
        borderRadius: 100,
        bottom: -5,
        left: -80
    },
    cardDetail: {
        // height: 60,
        width: width/1.2,
        borderRadius: 20,
        alignItems:'center',
        alignSelf:'center',
        marginTop:10
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.secondary()
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


