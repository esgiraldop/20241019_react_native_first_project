export interface IContact {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
  picture: string;
}

export interface IUpdateContact extends Partial<IContact> {}
