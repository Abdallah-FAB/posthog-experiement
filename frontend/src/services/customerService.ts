import type { Customer } from '../types/customer';

const generateMockCustomers = (count: number): Customer[] => {
  const customers: Customer[] = [];
  for (let i = 1; i <= count; i++) {
    customers.push({
      customerId: `CUST-${String(i).padStart(3, '0')}`,
      fullName: `Customer Name ${i}`,
      email: `customer${i}@example.com`,
      phone: `555-123-${String(i).padStart(4, '0')}`,
      address: {
        street: `${i} Main St`,
        city: `Anytown`,
        state: `CA`,
        zip: `90210`,
      },
      accountType: i % 2 === 0 ? 'Savings' : 'Checking',
      accountBalance: parseFloat((Math.random() * 10000).toFixed(2)),
      creditScore: Math.floor(Math.random() * (850 - 300 + 1)) + 300,
      ssn: `***-**-${String(i).padStart(4, '0')}`,
      dob: `19${String(
        Math.floor(Math.random() * (99 - 50 + 1)) + 50
      )}-${String(Math.floor(Math.random() * 12) + 1).padStart(
        2,
        '0'
      )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    });
  }
  return customers;
};

export const getCustomers = async (): Promise<Customer[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockCustomers(10)); // Generate 10 mock customers
    }, 500);
  });
};

export const getCustomerById = async (
  id: string
): Promise<Customer | undefined> => {
  const customers = await getCustomers();
  return customers.find((customer) => customer.customerId === id);
};
