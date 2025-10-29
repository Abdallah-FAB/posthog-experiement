import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import CustomerListPage from './CustomerListPage';
import * as customerService from '../services/customerService';
import type { Customer } from '../types/customer';

// Mock the customer service
vi.mock('../services/customerService', () => ({
  getCustomers: vi.fn(),
}));

const mockCustomers: Customer[] = [
  {
    customerId: 'CUST-001',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '111-222-3333',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '90210',
    },
    accountType: 'Checking',
    accountBalance: 1000.0,
    creditScore: 750,
    ssn: '***-**-1234',
    dob: '1980-01-01',
  },
  {
    customerId: 'CUST-002',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '444-555-6666',
    address: {
      street: '456 Oak Ave',
      city: 'Otherville',
      state: 'NY',
      zip: '10001',
    },
    accountType: 'Savings',
    accountBalance: 2500.5,
    creditScore: 800,
    ssn: '***-**-5678',
    dob: '1990-05-15',
  },
];

describe('CustomerListPage', () => {
  it('renders loading state initially', () => {
    vi.mocked(customerService.getCustomers).mockReturnValueOnce(
      new Promise(() => {})
    ); // Never resolve
    render(
      <BrowserRouter>
        <CustomerListPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading customers.../i)).toBeInTheDocument();
  });

  it('renders customer list after data is fetched', async () => {
    vi.mocked(customerService.getCustomers).mockResolvedValueOnce(
      mockCustomers
    );
    render(
      <BrowserRouter>
        <CustomerListPage />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /customer list/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /customer id/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /full name/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /email/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /phone/i })).toBeInTheDocument();

      expect(screen.getByRole('link', { name: 'CUST-001' })).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('111-222-3333')).toBeInTheDocument();

      expect(screen.getByRole('link', { name: 'CUST-002' })).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
      expect(screen.getByText('444-555-6666')).toBeInTheDocument();

      expect(
        screen.queryByText(/loading customers.../i)
      ).not.toBeInTheDocument();
    });
  });

  it('renders empty state when no customers are found', async () => {
    vi.mocked(customerService.getCustomers).mockResolvedValueOnce([]);
    render(
      <BrowserRouter>
        <CustomerListPage />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/no customers found./i)).toBeInTheDocument();
      expect(
        screen.queryByText(/loading customers.../i)
      ).not.toBeInTheDocument();
    });
  });
});