import {ParamListBase} from '@react-navigation/native';
import {IUpdateContact} from './contact.interface';

export interface RootStackParamList extends ParamListBase {
  Demo: undefined;
  Contacts: undefined;
  ContactDetails: {contactId: number};
  AddContact: undefined;
  EditContact: {
    contactId: number;
    onContactUpdate: (updatedContact: IUpdateContact) => void;
  };
}
