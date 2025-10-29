import React, { useEffect, useState } from 'react';
import { getCustomers } from '../services/customerService';
import type { Customer } from '../types/customer';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { usePostHog } from 'posthog-js/react';

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'raw' | 'masked'>('masked');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const posthog = usePostHog();

  function maskCustomerId(id: string) {
    if (!id) return '';
    const visible = id.slice(-4);
    return `••••••${visible}`;
  }

  function maskFullName(name: string) {
    if (!name) return '';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return `${parts[0].slice(0, 1)}•••`;
    const first = parts[0];
    const lastInitial = parts[parts.length - 1].slice(0, 1);
    return `${first} ${lastInitial}.`;
  }

  function maskEmail(email: string) {
    if (!email || !email.includes('@')) return '•••@•••';
    const [local, domain] = email.split('@');
    const visibleLocal = local.slice(0, 1);
    const hidden = '•••';
    return `${visibleLocal}${hidden}@${domain}`;
  }

  function maskPhone(phone: string) {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 4) return '••••';
    const last4 = digits.slice(-4);
    return `••• •• •• ${last4}`;
  }

  function getDisplayedId(id: string) {
    return viewMode === 'raw' ? id : maskCustomerId(id);
  }

  function getDisplayedName(name: string) {
    return viewMode === 'raw' ? name : maskFullName(name);
  }

  function getDisplayedEmail(email: string) {
    return viewMode === 'raw' ? email : maskEmail(email);
  }

  function getDisplayedPhone(phone: string) {
    return viewMode === 'raw' ? phone : maskPhone(phone);
  }

  function maskAddress(address: Customer['address']) {
    if (viewMode === 'raw')
      return `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;
    const maskedStreet =
      '••• ' + (address.street.split(' ').slice(1).join(' ') || 'Street');
    return `${maskedStreet}, ${address.city}, ${address.state}, ${address.zip}`;
  }

  function maskAccountBalance(balance: number) {
    return viewMode === 'raw' ? `$${balance.toFixed(2)}` : '$••••';
  }

  function maskCreditScore(score: number) {
    return viewMode === 'raw' ? String(score) : '•••';
  }

  function maskSSN(ssn: string) {
    if (viewMode === 'raw') return ssn;
    return ssn.replace(/\d(?!\d{0,3}$)/g, '•');
  }

  function maskDob(dob: string) {
    if (viewMode === 'raw') return dob;
    const year = dob.slice(0, 4);
    return `${year}-••-••`;
  }

  function openModal(customer: Customer) {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  }

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <Card className='border-muted bg-background/60 backdrop-blur'>
        <CardHeader className='flex flex-row items-center justify-between gap-3'>
          <CardTitle>Customer List</CardTitle>
          <div className='inline-flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setViewMode('masked')}
              className={`h-8 rounded-md px-3 text-sm font-medium transition-colors ${
                viewMode === 'masked'
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Masked
            </button>
            <button
              type='button'
              onClick={() => setViewMode('raw')}
              className={`h-8 rounded-md px-3 text-sm font-medium transition-colors ${
                viewMode === 'raw'
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Raw
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className='space-y-3'>
              <Skeleton className='h-[20px] w-[200px]' />
              <Skeleton className='h-[20px] w-[250px]' />
              <Skeleton className='h-[20px] w-[150px]' />
            </div>
          ) : customers.length === 0 ? (
            <p>No customers found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.customerId}>
                    <TableCell>
                      <button
                        type='button'
                        onClick={() => {
                          openModal(customer);
                          posthog.capture('customerClicked', {
                            customer_id: customer.customerId,
                            rm_id: 'rm-id-123',
                          });
                        }}
                        className='underline-offset-4 hover:underline'
                      >
                        {getDisplayedId(customer.customerId)}
                      </button>
                    </TableCell>
                    <TableCell>{getDisplayedName(customer.fullName)}</TableCell>
                    <TableCell>{getDisplayedEmail(customer.email)}</TableCell>
                    <TableCell>{getDisplayedPhone(customer.phone)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open: boolean) => (open ? null : closeModal())}
      >
        <DialogContent>
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle>Customer Details</DialogTitle>
                <DialogDescription>
                  Complete profile information
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-3'>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>
                    Customer ID
                  </div>
                  <div className='col-span-2 text-sm font-medium'>
                    {getDisplayedId(selectedCustomer.customerId)}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>Full Name</div>
                  <div className='col-span-2 text-sm'>
                    {getDisplayedName(selectedCustomer.fullName)}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>Email</div>
                  <div className='col-span-2 text-sm'>
                    {getDisplayedEmail(selectedCustomer.email)}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>Phone</div>
                  <div className='col-span-2 text-sm'>
                    {getDisplayedPhone(selectedCustomer.phone)}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>Address</div>
                  <div className='col-span-2 text-sm'>
                    {maskAddress(selectedCustomer.address)}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>
                    Account Type
                  </div>
                  <div className='col-span-2 text-sm'>
                    {selectedCustomer.accountType}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>
                    Account Balance
                  </div>
                  <div className='col-span-2 text-sm'>
                    {maskAccountBalance(selectedCustomer.accountBalance)}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>
                    Credit Score
                  </div>
                  <div className='col-span-2 text-sm'>
                    {maskCreditScore(selectedCustomer.creditScore)}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>SSN</div>
                  <div className='col-span-2 text-sm'>
                    {maskSSN(selectedCustomer.ssn)}
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='text-sm text-muted-foreground'>
                    Date of Birth
                  </div>
                  <div className='col-span-2 text-sm'>
                    {maskDob(selectedCustomer.dob)}
                  </div>
                </div>
              </div>
              <div className='mt-4 flex justify-end gap-2'>
                <DialogClose asChild>
                  <Button variant='secondary'>Close</Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerListPage;
