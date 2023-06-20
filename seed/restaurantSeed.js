import { Restaurant } from "../Models/index.js";
import geolib from 'geolib';

const myLocation = { latitude: -34.59013068218553, longitude: -58.38129205182199 }; // Tu ubicación actual, ajusta las coordenadas según corresponda

const generateRandomCoordinate = (min, max) => {
  return Math.random() * (max - min) + min;
};

const generateRandomRestaurant = () => {
  const latitude = generateRandomCoordinate(-34.705, -34.527);
  const longitude = generateRandomCoordinate(-58.524, -58.350);


  const randomName = "Restaurant " + Math.floor(Math.random() * 100); // Genera un nombre aleatorio para el restaurante
  const randomWap = Math.floor(Math.random() * 100000000); // Genera un número de teléfono aleatorio
  const randomStateId = Math.floor(Math.random() * 3) + 1; // Genera un stateId aleatorio entre 1 y 3

  return {
    title: randomName,
    distancia: null, // Inicialmente la distancia es null
    wap: randomWap,
    coordinate: {
      latitude,
      longitude,
    },
    stateId: randomStateId
  };
};

const restaurantSeed = async () => {
  try {
    const restaurants = [];

    for (let i = 0; i < 100; i++) {
      const restaurant = generateRandomRestaurant();
      const distance = geolib.getDistance(myLocation, restaurant.coordinate) / 1000; // Calcula la distancia en kilómetros
      restaurant.distancia = distance.toFixed(2); // Redondea la distancia a 2 decimales
      restaurants.push(restaurant);
    }

    await Restaurant.bulkCreate(restaurants);
  } catch (error) {
    console.log(error.message);
  }
};

export default restaurantSeed;

