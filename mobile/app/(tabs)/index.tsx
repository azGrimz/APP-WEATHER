import { Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import "../../style/global.css"
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { fetchWeatherForecast } from '@/API/weather';
import { weatherImages } from '@/constants/weatherTypes';
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={17} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabOneScreen() {
  const [locations, setLocations] = useState([1,2,3])
  const [weather, setWeather] = useState<any>({});
  const handleLocation = () =>{
    setLocations([]);
    fetchWeatherForecast({
      cityName: 'São Vicente, São Paulo',
      days:'7'
    }).then(data =>{
      setWeather(data);
    })
  }
  useEffect(() => {
    handleLocation();
  }, []);
  


  const {current, location} = weather

  return (
    <View className='flex-1 relative' >
      <StatusBar style="light" backgroundColor="transparent" translucent={true} />
      <Image blurRadius={70} source={require('../../assets/images/bg.png')} className='absolute h-full w-full' />

      <SafeAreaView className='flex flex-1' >
        <View className='mx-4 justify-around flex flex-1  mb-2'>
          <Text className="text-white text-center text-2xl font-bold mt-10" >{`${location?.name}`}, 
            <Text className='text-lg font-semibold '>
              {" "+`${location?.country}`}
            </Text>
          </Text>
          <View className="flex-row justify-center " style={{ backgroundColor: "transparent" }} >
            <Image
              source={weatherImages[current?.condition?.text]} className='w-52 h-52'/>
          </View>
          <View className="space-y-2" >
          <Text className='text-center font-bold text-white text-6xl ml-5 mt-10'>
              {`${current?.temp_c}`}&#176;
            </Text>
            <Text className="text-center text-xl tracking-widest text-white">
              {`${current?.condition?.text}`}
            </Text>
          </View>

          <View className="flex-row justify-between mx-4">
        {/* Wind */}
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../../assets/images/wind.png')}
            className="h-6 w-6"
          />
          <Text className="text-white font-semibold text-base">32km</Text>
        </View>
    
        {/* Humidity */}
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../../assets/images/drop.png')}
            className="h-6 w-6"
          />
          <Text className="text-white font-semibold text-base">23%</Text>
        </View>
    
        {/* Sunrise */}
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../../assets/images/sun.png')}
            className="h-6 w-6"
          />
          <Text className="text-white font-semibold text-base">6:05 AM</Text>
        </View>
    </View>

          <View className=' space-y-3 ' style={{marginBottom:50 }}>
            <View className='flex-row items-center mx-5 space-x-2 mb-5'>
              <TabBarIcon name="calendar" color="white"  />
              <Text className='text-white text-base ml-2'>Daily forecast</Text>
            </View>
            <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal:15}}
            showsHorizontalScrollIndicator={false}>

            {
              weather?.forecast?.forecastday?.map((item: any, index: number) => {
                let date = new Date(item.date);
                let options = { weekday: 'long' } as const;
                let dayName = date.toLocaleDateString('en-US', options);
                dayName = dayName.split(',')[0];
                
                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
                  >
                    <Image
                      source={weatherImages[item?.day?.condition?.text] || weatherImages['other']}
                      className="h-11 w-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })
            }

            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
