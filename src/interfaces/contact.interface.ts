export interface IContact {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
  picture: string | undefined;
  latitude: number;
  longitude: number;
}

export interface IUpdateContact extends Partial<IContact> {}
