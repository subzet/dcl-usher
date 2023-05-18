import axios from 'axios';

import { SceneModel } from '../model/scene';

class SceneService {
  private checkTile(tile: string) {
    const isValidTile = tile.match(/(-?\d+),(-?\d+)/);

    if (!isValidTile) {
      throw new Error(`Invalid tile, ${tile} is not a valid coordinate`);
    }
  }

  public getByBaseTile = async (baseTile: string): Promise<any> => {
    this.checkTile(baseTile);

    return SceneModel.findOne({ base: baseTile });
  };

  public getFromCatalyst = async (tile: string): Promise<any> => {
    this.checkTile(tile);

    const catalystData = await axios.post(
      'https://peer.decentraland.org/content/entities/active',
      { pointers: [tile] }
    );

    return catalystData.data[0].metadata;
  };
}

export const sceneService = new SceneService();
