import { Restaurant } from "../Models/index.js";

const generateRandomCoordinate = (min, max) => {
  return Math.random() * (max - min) + min;
};

const generateRandomRestaurant = () => {
  const latitude = generateRandomCoordinate(-34.705, -34.527);
  const longitude = generateRandomCoordinate(-58.524, -58.350);

  const randomName = "Restaurant " + Math.floor(Math.random() * 100); // Genera un nombre aleatorio para el restaurante
  const randomWap = Math.floor(Math.random() * 100000000); // Genera un número de teléfono aleatorio
  const randomStateId = Math.floor(Math.random() * 3) + 1; // Genera un stateId aleatorio entre 1 y 3

  const coordinate = {
    latitude: parseFloat(latitude.toFixed(15)),
    longitude: parseFloat(longitude.toFixed(15)),
  };

  return {
    title: randomName,
    wap: randomWap,
    coordinate,
    stateId: randomStateId
  };
};

const restaurantSeed = async () => {
  try {
    const restaurants = [];

    for (let i = 0; i < 30; i++) {
      const restaurant = generateRandomRestaurant();
      restaurants.push(restaurant);
    }

    await Restaurant.bulkCreate(restaurants);
    console.log('Restaurantes creados exitosamente');
  } catch (error) {
    console.log(error.message);
  }
};

export default restaurantSeed;
