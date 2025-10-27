import {User} from './User.ts';
import {BullyingResponse} from './index.ts';

export type ParamListBase = {
  Home: undefined;
  ReportNavigator: undefined;
  Feedback: undefined;
  AccountNavigator: undefined;
  HasilReport: undefined;
};

export type ParamListReport = {
  Report: {questions: any[]};
  ReportDetail: {bullyResponse?: BullyingResponse};
  Soal: undefined;
  HasilReport: undefined;
  EditProfil: {user: User};
};

export type ParamListAccount = {
  Account: undefined;
  EditProfil: {user: User};
};
