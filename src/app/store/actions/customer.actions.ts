import { createAction, props } from '@ngrx/store';
import { Customer } from '../../models/customer.model';

export const initCustomerState = createAction(
  '[Customer API] Init Customer State'
);

// Load Customers
export const loadCustomers = createAction(
  '[Customer List] Load Customers'
);

export const loadCustomersSuccess = createAction(
  '[Customer API] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customer API] Load Customers Failure',
  props<{ error: string }>()
);

// Add Customer
export const addCustomer = createAction(
  '[Customer List] Add Customer',
  props<{ customer: Customer  }>()
);

export const addCustomerSuccess = createAction(
  '[Customer API] Add Customer Success',
  props<{ customer: Customer }>()
);

export const addCustomerFailure = createAction(
  '[Customer API] Add Customer Failure',
  props<{ error: string }>()
);

// Update Customer
export const updateCustomer = createAction(
  '[Customer List] Update Customer',
  props<{ customer: Customer }>()
);

export const updateCustomerSuccess = createAction(
  '[Customer API] Update Customer Success',
  props<{ customer: Customer }>()
);

export const updateCustomerFailure = createAction(
  '[Customer API] Update Customer Failure',
  props<{ error: string }>()
);

// Delete Customer
export const deleteCustomer = createAction(
  '[Customer List] Delete Customer',
  props<{ customerId: string }>()
);

export const deleteCustomerSuccess = createAction(
  '[Customer API] Delete Customer Success',
  props<{ customerId: string }>()
);

export const deleteCustomerFailure = createAction(
  '[Customer API] Delete Customer Failure',
  props<{ error: string }>()
);
