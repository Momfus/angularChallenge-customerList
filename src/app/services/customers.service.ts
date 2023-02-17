import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Customer, statusType } from '../models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customers$ = new BehaviorSubject<Customer[]>([]);
  private readonly LOCAL_STORAGE_KEY = 'customers'; // Just a helper, I use readonly because the object could change in runtime (in other case, i will use const)

  constructor() {
    let persistedCustomers: string | null = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    if( persistedCustomers ) {
      this.customers$.next( JSON.parse(persistedCustomers) );
    } else {
      this.generateDummyCustomers();
      persistedCustomers = JSON.stringify(this.customers$.value);
    }
  }

  private generateDummyCustomers(): void {

    const possibleStatuses: statusType[] = ['active', 'inactive', 'pending'];
    const dummyCustomers: Customer[] = [];

    for( let i = 1; i <= 20; i++) {

      const randomIndex = Math.floor(Math.random() * 3);
      const status = possibleStatuses[randomIndex];

      dummyCustomers.push({
        id: uuidv4(),
        firstName: `Jhon ${i}`,
        lastName: `Doe ${i}`,
        status: status,
        email: `customer${i}@example.com`,
        phone: `123-456-${i.toString().padStart(2, '0')}`
      });

    }

    this.customers$.next(dummyCustomers);
    this.saveToLocalStorage(dummyCustomers);

  }

  private saveToLocalStorage( customers: Customer[]): void {

    localStorage.setItem( this.LOCAL_STORAGE_KEY, JSON.stringify(customers) )

  }




}
