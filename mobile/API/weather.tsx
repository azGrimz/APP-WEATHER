import axios, { AxiosRequestConfig } from 'axios';

// Definindo a chave da API
const API_KEY = '15bdd92754594ac7890220308241308';

// Tipos para os parâmetros
interface WeatherParams {
    cityName: string;
    days: string;
}

interface LocationParams {
    cityName: string;
}



const apiEndpoint = (params: WeatherParams): string =>
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationEndpoint = (params: LocationParams): string =>
    `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`;


const apiCall = async (endpoint: string): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: 'GET',
        url: endpoint
    };
    
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log('Error:', err);
        return null;
    }
}

// Funções para buscar a previsão do tempo e localizar cidades
export const fetchWeatherForecast = (params: WeatherParams): Promise<any> => {
    return apiCall(apiEndpoint(params));
}

export const fetchLocations = (params: LocationParams): Promise<any> => {
    return apiCall(locationEndpoint(params));
}
