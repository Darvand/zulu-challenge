import { PESOS_TO_USD } from '@wallets/wallets.constants';

export class WalletsUtils {
  static pesosToUsd(pesos: number): number {
    return pesos / PESOS_TO_USD;
  }

  static UsdToPesos(dollars: number): number {
    return dollars * PESOS_TO_USD;
  }
}
