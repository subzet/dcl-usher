import axios from 'axios';

import { PlaceData } from '../model';

class PlacesService {
  private baseUrl = 'https://places.decentraland.org/api';

  public async getPlace(placeId: string): Promise<PlaceData | void> {
    try {
      const response = await axios.get(`${this.baseUrl}/places/${placeId}`);

      return response.data.data;
    } catch {
      console.log(`Error while getting place`);
      return;
    }
  }
}

export const placesService = new PlacesService();
