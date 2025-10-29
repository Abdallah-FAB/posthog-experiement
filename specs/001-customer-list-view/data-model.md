# Data Model: Customer

This document describes the data model for the Customer entity.

## Customer

Represents a bank customer.

### Attributes

| Attribute | Type | Description |
|---|---|---|
| customerId | string | Unique identifier for the customer. |
| fullName | string | The full name of the customer. |
| email | string | The customer's email address. |
| phone | string | The customer's phone number. |
| address | object | The customer's physical address. |
| address.street | string | Street address. |
| address.city | string | City. |
| address.state | string | State. |
| address.zip | string | Zip code. |
| accountType | string | The type of bank account (e.g., Checking, Savings). |
| accountBalance | number | The current balance of the account. |
| creditScore | number | The customer's credit score. |
| ssn | string | The customer's Social Security Number. |
| dob | string | The customer's Date of Birth. |
