import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from './ParamListBase.ts';

export type ScreenProps<ParamList extends ParamListBase> = {
    route: RouteProp<ParamList, keyof ParamList>;
    navigation: any;
  };