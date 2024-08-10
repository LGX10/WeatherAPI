import { Router, Request, Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Ensure the weather data is fetched asynchronously
    const weatherData = await WeatherService.getWeatherByCityName(city);
    await HistoryService.addCity(city);
    return res.status(200).json(weatherData);
  } catch (error) {
    // Improved error logging for better debugging
    console.error('Error fetching weather data:', error.message);
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json(cities);
  } catch (error) {
    console.error('Error retrieving search history:', error.message);
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await HistoryService.removeCity(id);
    return res.status(200).json({ message: 'City removed from search history' });
  } catch (error) {
    console.error('Error removing city from search history:', error.message);
    return res.status(500).json({ error: 'Failed to remove city from search history' });
  }
});

export default router;
