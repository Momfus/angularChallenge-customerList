import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../models/customer.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers/index';
import { initCustomerState } from '../store/actions/customer.actions';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customers$ = new BehaviorSubject<Customer[]>([]);
  private readonly LOCAL_STORAGE_KEY = 'customers'; // Just a helper, I use readonly because the object could change in runtime (in other case, i will use const)

  constructor(private store: Store<AppState>) {
    this.store.dispatch(initCustomerState());
  }

  private saveToLocalStorage(customers: Customer[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(customers));
  }

  getCustomers(): Observable<Customer[]> {
    return new Observable((obs) => {
      obs.next(this.customers$.getValue());
      obs.complete();
    });
  }

  getCustomerById(id: string): Observable<Customer | undefined> {
    return this.customers$.pipe(
      map((customers) => customers.find((customer) => customer.id === id))
    );
  }

  createCustomer(customer: Customer): void {
    const customersWithNew: Customer[] = this.customers$.value.concat({
      ...customer,
      id: uuidv4(),
    });

    this.customers$.next(customersWithNew);
    this.saveToLocalStorage(customersWithNew);
  }

  updateCustomer(customer: Customer): void {
    const customerWithUpdated: Customer[] = this.customers$.value.map((cust) =>
      cust.id === customer.id ? customer : cust
    );

    this.customers$.next(customerWithUpdated);
    this.saveToLocalStorage(customerWithUpdated);
  }

  deleteCustomer(id: string): void {
    const customerWithoutDeleted: Customer[] = this.customers$.value.filter(
      (customer) => customer.id !== id
    );
    this.customers$.next(customerWithoutDeleted);
    this.saveToLocalStorage(customerWithoutDeleted);
  }
}
