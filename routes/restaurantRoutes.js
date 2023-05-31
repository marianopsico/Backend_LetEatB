import { Router } from "express";
import  Restaurant  from '../Models/Restaurant.js';

const restaurantRoutes = Router();

restaurantRoutes.get("/", async (req, res) =>{

    const restaurants = await Restaurant.findAll()
    res.json(restaurants)
})

restaurantRoutes.post('/', async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
});

restaurantRoutes.put('/:restaurantID', async (req, res) => {
    await Restaurant.update(req.body, {
        where: { id: req.params.restaurantID }
    })
    res.json( { success: 'Se ha modificado!' });
})

restaurantRoutes.delete('/:restaurantID', async (req,res) => {
    await Restaurant.destroy({
        where: { id: req.params.restaurantID }
    });
    res.json({ success: 'Se ha borrado el restaurant!' })
})

export default restaurantRoutes;