import {ParamListBase} from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Demo: undefined;
  Contacts: undefined;
  ContactDetails: {contactId: string};
  AddContact: undefined;
  EditContact: undefined;
}
