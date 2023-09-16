import { IShop } from '../Shop/interface';

export interface IDeleteEventData {
  shopId: string;
  eventId: string;
}

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  category: string;
  startDate: Date;
  endDate: Date;
  status: string;
  tags: string;
  price: number;
  discountPercentage: number;
  discountPrice: number;
  stock: number;
  images: File[];
  shop: IShop;
  sold_out: number;
}

export interface IEventState {
  isEventsLoading: boolean;
  allEvents: IEvent[];
  shopEvents: IEvent[];
  eventError: null | string;
  eventMessage: string;
}
