
export interface Customer {

  id: string;
  firstName: string;
  lastName: string;
  status: statusType;
  email: string;
  phone?: string;

}


export type statusType = 'active' | 'pending' | 'inactive';
