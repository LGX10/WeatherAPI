import fs from 'fs/promises';
import path from 'node:path';

const searchHistoryPath = path.join(__dirname, 'searchHistory.json');

// TODO: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(searchHistoryPath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(searchHistoryPath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  public async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  public async addCity(name: string): Promise<void> {
    const cities = await this.getCities();
    const newCity = new City(Date.now().toString(), name);
    cities.push(newCity);
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  public async removeCity(id: string): Promise<void> {
    let cities = await this.getCities();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();

