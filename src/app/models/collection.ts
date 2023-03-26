import { IModel } from './model';
export interface ICollection {
  id?: number;
  name: string;
  accountable: string;
  season: string;
  brand: string;
  budget: number;
  release: string;
  models: number;
  active: boolean;
}
