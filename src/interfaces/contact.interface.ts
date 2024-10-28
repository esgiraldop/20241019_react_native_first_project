export interface IContact {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
  picture: string | undefined;
}

export interface IUpdateContact extends Partial<IContact> {}
