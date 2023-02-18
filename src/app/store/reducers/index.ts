import { ActionReducerMap } from '@ngrx/store';
import { CustomerState, customerReducer } from './customer.reducer';

export interface AppState {
  customers: CustomerState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: customerReducer
};
