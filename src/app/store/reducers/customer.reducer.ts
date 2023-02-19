import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as CustomerActions from '../actions/customer.actions';
import { Customer, statusType } from '../../models/customer.model';
import { v4 as uuidv4 } from 'uuid';
export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: string | null;
  ids: string[];
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
  selectId: (customer: Customer) => customer.id,
  sortComparer: false,
});

export const initialCustomerState: CustomerState = adapter.getInitialState({
  selectedCustomerId: null,
  ids: [],
  customerList: []
});



export const customerReducer = createReducer(
  initialCustomerState,

  on(CustomerActions.loadCustomersSuccess, (state, { customers }) =>
  adapter.setAll(customers, { ...state, ids: customers.map(c => c.id) })
),
  on(CustomerActions.addCustomerSuccess, (state, { customer }) =>
    adapter.addOne(customer, state)
  ),
  on(CustomerActions.updateCustomerSuccess, (state, { customer }) =>
    adapter.updateOne({ id: customer.id, changes: customer }, state)
  ),
  on(CustomerActions.deleteCustomerSuccess, (state, { customerId }) =>
    adapter.removeOne(customerId, state)
  ),
  on(CustomerActions.initCustomerState, (state) => {
    let customers: Customer[] = [];
    const storedCustomers = localStorage.getItem('customers');

    if (!storedCustomers) {
      const possibleStatuses: statusType[] = ['active', 'inactive', 'pending'];
      for (let i = 1; i <= 20; i++) {
        const randomIndex = Math.floor(Math.random() * 3);
        const status = possibleStatuses[randomIndex];

        customers.push({
          id: uuidv4(),
          firstName: `John ${i}`,
          lastName: `Doe ${i}`,
          status: status,
          email: `customer${i}@example.com`,
          phone: `123-456-${i.toString().padStart(2, '0')}`,
        });
      }
      localStorage.setItem('customers', JSON.stringify(customers));
    } else {
      customers = JSON.parse(storedCustomers);
    }

    return adapter.setAll(customers, state);
  })
);
