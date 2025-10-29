import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerById } from '../services/customerService';
import type { Customer } from '../types/customer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label'; // Import Label

const CustomerDetailsPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      setLoading(true);
      if (customerId) {
        const data = await getCustomerById(customerId);
        setCustomer(data);
      }
      setLoading(false);
    };

    fetchCustomerDetails();
  }, [customerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-[20px] w-[200px]" />
            <Skeleton className="h-[20px] w-[250px]" />
            <Skeleton className="h-[20px] w-[150px]" />
          </div>
        ) : !customer ? (
          <p>Customer not found.</p>
        ) : (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="customerId">Customer ID:</Label>
              <p id="customerId" className="text-sm font-medium leading-none">{customer.customerId}</p>
            </div>
            <div>
              <Label htmlFor="fullName">Full Name:</Label>
              <p id="fullName" className="text-sm text-muted-foreground">{customer.fullName}</p>
            </div>
            <div>
              <Label htmlFor="email">Email:</Label>
              <p id="email" className="text-sm text-muted-foreground">{customer.email}</p>
            </div>
            <div>
              <Label htmlFor="phone">Phone:</Label>
              <p id="phone" className="text-sm text-muted-foreground">{customer.phone}</p>
            </div>
            <div>
              <Label htmlFor="address">Address:</Label>
              <p id="address" className="text-sm text-muted-foreground">
                {customer.address.street}, {customer.address.city}, {customer.address.state}, {customer.address.zip}
              </p>
            </div>
            <div>
              <Label htmlFor="accountType">Account Type:</Label>
              <p id="accountType" className="text-sm text-muted-foreground">{customer.accountType}</p>
            </div>
            <div>
              <Label htmlFor="accountBalance">Account Balance:</Label>
              <p id="accountBalance" className="text-sm text-muted-foreground">${customer.accountBalance.toFixed(2)}</p>
            </div>
            <div>
              <Label htmlFor="creditScore">Credit Score:</Label>
              <p id="creditScore" className="text-sm text-muted-foreground">{customer.creditScore}</p>
            </div>
            <div>
              <Label htmlFor="ssn">SSN:</Label>
              <p id="ssn" className="text-sm text-muted-foreground">{customer.ssn}</p>
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth:</Label>
              <p id="dob" className="text-sm text-muted-foreground">{customer.dob}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerDetailsPage;