import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, Subject } from 'rxjs';
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
  private customerChanges$ = new Subject<Customer>();

  private readonly LOCAL_STORAGE_KEY = 'customers'; // Just a helper, I use readonly because the object could change in runtime (in other case, i will use const)

  constructor(private store: Store<AppState>) {

    this.store.dispatch(initCustomerState())
    const storedCustomers = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this.customers$.next(JSON.parse(storedCustomers ?? '[]'));


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

    const newCustomer = {
      ...customer,
      id: uuidv4(),
    }
    const customersWithNew: Customer[] = this.customers$.value.concat(
      newCustomer
    );

    this.customers$.next(customersWithNew);
    this.customerChanges$.next(newCustomer);
    this.saveToLocalStorage(customersWithNew);
  }

  updateCustomer(customer: Customer): void {

    const customerWithUpdated: Customer[] = this.customers$.value.map((cust) =>
      cust.id === customer.id ? customer : cust
    );

    this.customers$.next(customerWithUpdated);
    this.customerChanges$.next(customer);
    this.saveToLocalStorage(customerWithUpdated);
  }

  deleteCustomer(id: string): void {

    const currentCustomers = this.customers$.value;

    const customerToDelete = currentCustomers.find(c => c.id === id);
    if (!customerToDelete) {
      return;
    }

    const customerWithoutDeleted: Customer[] = currentCustomers.filter(
      (customer) => customer.id !== id
    );
    this.customers$.next(customerWithoutDeleted);
    this.customerChanges$.next(customerToDelete);
    this.saveToLocalStorage(customerWithoutDeleted);
  }

  get customerChanges(): Observable<Customer> {
    return this.customerChanges$.asObservable();
  }

}
