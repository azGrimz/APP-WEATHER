import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';//
import { Text, View } from 'react-native';
import "../../style/global.css"
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { fetchLocations, fetchWeatherForecast } from '@/API/weather';
import { weatherImages } from '@/constants/weatherTypes';
//import EditScreenInfo from '@/components/EditScreenInfo';
//import { Text, View } from '@/components/Themed';
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={17} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabTwoScreen() {

    const [showSearch, toggleSearch] = useState(false)
    const [locations, setLocations] = useState([])
    const [searchTimeout, setSearchTimeout] = useState<any>();
    const [weather, setWeather] = useState<any>({});
    const [loading,setLoading] = useState(false);
    const handleLocation = (loc: any) => {
        setLocations([]);
        toggleSearch(false)
        setLoading(true)
        fetchWeatherForecast({
            cityName: loc.name,
            days: '1'
        }).then(data => {
            setWeather(data);
            setLoading(false)
        })
    }

    const handleSearch = (value: string) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        if (value.length > 2) {
            // Define um novo timer para realizar a busca após 500ms
            const timeout = setTimeout(() => {
                fetchLocations({ cityName: value }).then(data => {
                    setLocations(data)
                });
            }, 500); // Aqui você pode ajustar o tempo de debounce

            // Salva o timer no estado para que possa ser limpo na próxima execução
            setSearchTimeout(timeout);
        }
    }


    const { current, location } = weather
    return (
        <View className='flex-1 relative'>
            <StatusBar style="light" />
            <Image blurRadius={70} source={require('../../assets/images/bg.png')} className='absolute h-full w-full' />
            <SafeAreaView className='flex flex-1'>
                <View style={{ height: '7%', marginTop: 50 }} className='mx-4 relative z-50'>


                    {showSearch ? (
                        // código a ser exibido quando showSearch é verdadeiro
                        <View className='flex-row justify-end items-center rounded-full'
                            style={{ backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}>
                            <TextInput
                                onChangeText={handleSearch}
                                placeholder="Search"
                                placeholderTextColor={'lightgray'}
                                className='pl-6 flex-1 text-base text-white' style={{ height: 45 }} />
                            <TouchableOpacity style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                padding: 7,
                                borderRadius: 30,
                                marginRight: 3,
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} className='rounded-full p-3 m-1' onPress={() => toggleSearch(!showSearch)}>
                                <TabBarIcon name="search" color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // código a ser exibido quando showSearch é falso
                        <View className='flex-row justify-end items-center rounded-full'>
                            <TouchableOpacity style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                padding: 7,
                                borderRadius: 30,
                                marginRight: 3,
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} className='rounded-full p-3 m-1'
                                onPress={() => toggleSearch(!showSearch)}>
                                <TabBarIcon name="search" color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                    {
                        locations.length > 0 && showSearch ? (
                            <View className='absolute w-full top-16 rounded-3xl' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                {
                                    locations.map((loc: any, index: number) => {
                                        let showBorder = index + 1 != locations.length;


                                        //console.log("Loc object:", loc);

                                        return (
                                            <TouchableOpacity
                                                key={String(loc.id) || String(index)}
                                                onPress={() => handleLocation(loc)}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    borderWidth: 0,
                                                    padding: 10,
                                                    paddingLeft: 16,
                                                    paddingRight: 16,
                                                    marginBottom: 5,
                                                    borderBottomWidth: showBorder ? 1 : 0,
                                                    borderBottomColor: 'gray'
                                                }}
                                            >
                                                <TabBarIcon name="map-marker" color="lightgray" />
                                                <Text className='text-lg ml-2' style={{ color: 'lightgray' }}>
                                                    {loc.name ? `${loc.name}, ${loc.region}, ${loc.country}` : "Localização desconhecida"}
                                                </Text>
                                            </TouchableOpacity>

                                        );
                                    })
                                }
                            </View>
                        ) : null
                    }
                </View>
                <View className='space-y-5 mt-5 relative'>

                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        showsVerticalScrollIndicator={false}>



                        {loading  ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <View className=' p-6 rounded-xl w-90' style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-white text-5xl'>{`${current?.temp_c}`}&#176;</Text>
                                <Image
                                    source={weatherImages[current?.condition?.text] || weatherImages['other']} // substitua pelo caminho do seu ícone de chuva
                                    style={{ width: 80, height: 80 }}
                                />
                            </View>
                            {
                                weather?.forecast?.forecastday?.map((item: any) => {
                                    return (
                                        <Text className='text-white text-sm mt-2'>H: {`${item.day?.maxtemp_c}`}&#176;  L: {`${item.day?.maxtemp_c}`}&#176;</Text>
                                    )
                                })
                            }

                            <Text className='text-white text-lg mt-4'>{`${location?.name}`}, {`${location?.country}`}</Text>
                            <Text className='text-gray-300 text-sm mt-2'>{`${current?.condition?.text}`}</Text>
                        </View>
                        )}
                             

                    </ScrollView>
                </View>




            </SafeAreaView>

        </View>
    );
}

