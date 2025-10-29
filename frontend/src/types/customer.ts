export interface Customer {
  customerId: string;
  fullName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  accountType: string;
  accountBalance: number;
  creditScore: number;
  ssn: string;
  dob: string;
}
