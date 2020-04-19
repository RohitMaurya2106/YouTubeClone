import React,{useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, FlatList, ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import MiniCard from '../components/MiniCard'
import Constant from 'expo-constants'
import {useTheme} from "@react-navigation/native"
import {useSelector,useDispatch} from 'react-redux'
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyBzfBiJ4esBn9GoDo5lpu4ngtWzn_jflZQ


const SearchScreen=({navigation})=>{
    const {colors}=useTheme()
    const mycolor=colors.iconColor
    const [value,setValue]=useState("")
    //const [miniCardData,setMiniCard] = useState([])
    const dispatch = useDispatch()
    const miniCardData=useSelector(state=>{
        return state.cardData
    })
    const [loading,setLoading]= useState(false)
    const fetchData = ()=>{
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyBzfBiJ4esBn9GoDo5lpu4ngtWzn_jflZQ`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.items)
            setLoading(false)
            dispatch({type:"add",payload:data.items})
            //setMiniCard(data.items)
        })
    }
    return(
        <View style={{flex:1,marginTop:Constant.statusBarHeight}}>
            <View style={{
                flexDirection:"row",
                padding:5,
                justifyContent:"space-around",
                elevation:5,
                backgroundColor:colors.headerColor
            }}>
                <Ionicons
                style={{color:mycolor}}
                name="md-arrow-back" size={32} 
                onPress={()=>navigation.goBack()}
                />
                <TextInput
                style={{
                    width:"70%",
                    backgroundColor:"#e6e6e6"
            }}
                value={value}
                onChangeText={(text)=>setValue(text)}
                />
                <Ionicons style={{color:mycolor}} name="md-send" size={32} onPress={()=>fetchData()}/>
            </View>
            {loading ?<ActivityIndicator size="large" style={{marginTop:10}} color="red"/>:null}
        <FlatList
        data={miniCardData}
        renderItem={({item})=>{
            return <MiniCard
            videoId={item.id.videoId}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            />
        }}
        keyExtractor={item=>item.id.videoId}
        />
        </View>
    )
}
export default SearchScreen