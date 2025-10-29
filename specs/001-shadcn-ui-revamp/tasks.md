# Tasks: Revamp Application with shadcn/ui

**Input**: Design documents from `/Users/abdallahali/workspace/clarity-experiement/specs/001-shadcn-ui-revamp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize shadcn/ui components in `frontend/src/components/ui/`
- [X] T002 Configure `tailwind.config.js` to include `shadcn/ui` paths in `frontend/tailwind.config.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

<!-- No specific foundational tasks identified for this feature -->

---

## Phase 3: User Story 1 - Consistent UI across application (Priority: P1) 🎯 MVP

**Goal**: Display a list of customers with their basic details using `shadcn/ui` components.

**Independent Test**: The application should display all UI elements using `shadcn/ui` components, and there should be no raw `div`s or other basic HTML elements used for structural or interactive purposes where a `shadcn/ui` component exists.

### Implementation for User Story 1

- [X] T003 [US1] Replace `CustomerListPage`'s raw HTML elements with `shadcn/ui` components in `frontend/src/pages/CustomerListPage.tsx`.
- [X] T004 [P] [US1] Replace `CustomerListItem`'s raw HTML elements with `shadcn/ui` components in `frontend/src/components/CustomerListItem.tsx`.
- [X] T005 [US1] Replace `CustomerDetailsPage`'s raw HTML elements with `shadcn/ui` components in `frontend/src/pages/CustomerDetailsPage.tsx`.

### Tests for User Story 1

- [ ] T006 [P] [US1] Update unit tests for `CustomerListPage` to reflect `shadcn/ui` components in `frontend/src/pages/CustomerListPage.test.tsx`.
- [ ] T007 [P] [US1] Update unit tests for `CustomerListItem` to reflect `shadcn/ui` components in `frontend/src/components/CustomerListItem.test.tsx`.
- [ ] T008 [P] [US1] Update unit tests for `CustomerDetailsPage` to reflect `shadcn/ui` components in `frontend/src/pages/CustomerDetailsPage.test.tsx`.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T009 Review and refine the UI for visual appeal and usability, ensuring all elements are `shadcn/ui` components.
- [ ] T010 Perform a final round of testing to ensure no regressions and consistent UI.

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: Must be completed before any other phase.
- **User Story 1 (Phase 3)**: Depends on Setup completion.
- **Polish (Phase 4)**: Depends on all other phases being complete.

## Suggested MVP Scope

- User Story 1 - Consistent UI across application
