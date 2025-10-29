# Tasks: Customer List and Details View

**Input**: Design documents from `/Users/abdallahali/workspace/clarity-experiement/specs/001-customer-list-view/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Vite + React + TypeScript project in `frontend/`
- [X] T002 [P] Install shadcn/ui and other dependencies in `frontend/`
- [X] T003 [P] Configure `tailwind.css` in `frontend/`
- [X] T004 Create project structure in `frontend/src/` (components, pages, services)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T005 Define the `Customer` type in `frontend/src/types/customer.ts` based on `data-model.md`
- [X] T006 Create a mock data service in `frontend/src/services/customerService.ts` to generate and provide customer data.
- [X] T007 Set up routing in `frontend/src/main.tsx` to handle navigation between pages.

---

## Phase 3: User Story 1 - View Customer List (Priority: P1) 🎯 MVP

**Goal**: Display a list of customers with their basic details.

**Independent Test**: The application should render a list of customers on the initial page load.

### Implementation for User Story 1

- [X] T008 [US1] Create the `CustomerListPage` component in `frontend/src/pages/CustomerListPage.tsx`
- [X] T009 [P] [US1] Create a `CustomerListItem` component in `frontend/src/components/CustomerListItem.tsx` to display basic customer details.
- [X] T010 [US1] Implement the customer list view in `CustomerListPage.tsx`, fetching data from the mock data service.
- [X] T011 [US1] Add a loading state and empty state to the `CustomerListPage.tsx`.

### Tests for User Story 1

- [X] T012 [P] [US1] Write unit tests for the `CustomerListPage` component in `frontend/src/pages/CustomerListPage.test.tsx`.
- [X] T013 [P] [US1] Write unit tests for the `CustomerListItem` component in `frontend/src/components/CustomerListItem.test.tsx`.

---

## Phase 4: User Story 2 - View Customer Details (Priority: P2)

**Goal**: Display all details for a selected customer.

**Independent Test**: Clicking a customer on the list should navigate to a new page that displays all the details of that customer.

### Implementation for User Story 2

- [X] T014 [US2] Create the `CustomerDetailsPage` component in `frontend/src/pages/CustomerDetailsPage.tsx`.
- [X] T015 [US2] Implement the customer details view in `CustomerDetailsPage.tsx`, displaying all customer information.
- [X] T016 [US2] Add a loading state for the customer details in `CustomerDetailsPage.tsx`.

### Tests for User Story 2

- [X] T017 [P] [US2] Write unit tests for the `CustomerDetailsPage` component in `frontend/src/pages/CustomerDetailsPage.test.tsx`.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T018 [P] Review and refine the UI for visual appeal and usability.
- [X] T019 [P] Add documentation to the code.
- [X] T020 Perform a final round of testing.

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: Must be completed before any other phase.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Story 1 (Phase 3)**: Depends on Foundational completion.
- **User Story 2 (Phase 4)**: Depends on Foundational completion.
- **Polish (Phase 5)**: Depends on all other phases being complete.
