import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import CustomerDetailsPage from './CustomerDetailsPage';
import * as customerService from '../services/customerService';
import type { Customer } from '../types/customer';

// Mock the customer service
vi.mock('../services/customerService', () => ({
  getCustomerById: vi.fn(),
}));

const mockCustomer: Customer = {
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
};

describe('CustomerDetailsPage', () => {
  it('renders loading state initially', () => {
    vi.mocked(customerService.getCustomerById).mockReturnValueOnce(
      new Promise(() => {})
    ); // Never resolve
    render(
      <MemoryRouter initialEntries={['/customers/CUST-001']}>
        <Routes>
          <Route
            path='/customers/:customerId'
            element={<CustomerDetailsPage />}
          />
        </Routes>
      </MemoryRouter>
    );
    expect(
      screen.getByText(/loading customer details.../i)
    ).toBeInTheDocument();
  });

  it('renders customer details after data is fetched', async () => {
    vi.mocked(customerService.getCustomerById).mockResolvedValueOnce(
      mockCustomer
    );
    render(
      <MemoryRouter initialEntries={['/customers/CUST-001']}>
        <Routes>
          <Route
            path='/customers/:customerId'
            element={<CustomerDetailsPage />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/customer details/i)).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email:')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('Phone:')).toBeInTheDocument();
      expect(screen.getByText('111-222-3333')).toBeInTheDocument();
      expect(
        screen.queryByText(/loading customer details.../i)
      ).not.toBeInTheDocument();
    });
  });

  it('renders "Customer not found" when customerId does not exist', async () => {
    vi.mocked(customerService.getCustomerById).mockResolvedValueOnce(undefined);
    render(
      <MemoryRouter initialEntries={['/customers/CUST-999']}>
        <Routes>
          <Route
            path='/customers/:customerId'
            element={<CustomerDetailsPage />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/customer not found./i)).toBeInTheDocument();
      expect(
        screen.queryByText(/loading customer details.../i)
      ).not.toBeInTheDocument();
    });
  });
});
