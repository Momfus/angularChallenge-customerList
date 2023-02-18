import { ActionReducerMap } from '@ngrx/store';
import { CustomerState, customerReducer, adapter } from './customer.reducer';

export interface AppState {
  customers: CustomerState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: customerReducer
};

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors((state: AppState) => state.customers);
