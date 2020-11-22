export interface Railway{
  id: string;
  name: string;
  type: string;
  state: string;
}
export class RailwaysList{
  static railways: Railway[] = [];
}
