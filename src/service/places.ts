import axios from 'axios';

import { PlaceData } from '../model';

class PlacesService {
  private baseUrl = 'https://places.decentraland.org/api';

  public async getPlace(placeId: string): Promise<PlaceData> {
    const response = await axios.get(`${this.baseUrl}/places/${placeId}`);

    return response.data.data;
  }
}

export const placesService = new PlacesService();
