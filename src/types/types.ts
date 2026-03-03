import { type Database, type Tables } from "./supabase";
import type { BaseSyntheticEvent, ReactElement, ReactNode } from "react";
import type { RegisterOptions } from "react-hook-form";

export type NumericValue = number;

export type StringValue = string;

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  avatar?: string;
}

export interface FakeCabinType {
  id: string;
  name: string;
  image: string;
  capacity: number;
  price: number;
  discount: string | null;
}

export interface MockCabinProps {
  mockCabins: Cabin[];
}

export interface FakeGuestType {
  name: string;
  email: string;
  nationalId?: string;
  country?: string;
  countryFlag?: string;
  phone?: string;
}

export interface BookingDates {
  start: string;
  end: string;
  nights: number;
}

export interface FakeBookingType {
  id: string;
  status: "checked-in" | "checked-out" | "unconfirmed";
  cabins: {
    name: string;
    image: string;
  };
  guests: {
    name: string;
    email: string;
  };
  dates: BookingDates;
  numGuests: number;
  cabinPrice: number;
  totalPaid: number;
  breakfastPrice?: number;
  hasBreakfast?: boolean;
  isPaid?: boolean;
}

// export interface BookingRowProps {
//   booking: Booking;

// }

export interface BookingTableProps {
  bookings: Booking[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}
// ==========================================
// COMPONENT PROPS
// ==========================================
//'ghost' | 'danger'
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  display?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export interface ErrorFallbackProps {
  apiError?: string;
}

export interface CloseBtnProp {
  onCloseModal?: () => void;
}

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void; // Received via cloneElement from Modal.Window
}

export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

export interface BadgeProps {
  status: BookingStatus;

  variant?: boolean;
  children?: React.ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  variant?: "default" | "white";
}

export interface FilterProps {
  filterField: string;
  options: SelectOption[];
}

export interface SortByProps {
  options: SelectOption[];
}

// export interface HeaderProps {
//   title: string;
//   description?: string;
//   showBackButton?: boolean;
//   onBack?: () => void;
//   showSearch?: boolean;
//   searchPlaceholder?: string;
//   onSearch?: (value: string) => void;
//   filterOptions?: SelectOption[];
//   filterField?: string;
//   sortOptions?: SelectOption[];
//   actionButton?: React.ReactNode;
//   showDarkToggle?: boolean;
// }

export interface HeaderProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  // actionButton?: React.ReactNode;
}

export interface ModalProps {
  children: React.ReactNode;
}

export interface ModalOpenProps {
  children: ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  opens: string;
}

export interface ModalWindowProps {
  children: ReactElement<{ onCloseModal?: () => void }>;
  name: string;
}
export interface ModalSubComponentProps {
  children: ReactNode;
  className?: string;
}

// This type connects the static properties to the main Modal component
export interface ModalComponent extends React.FC<ModalProps> {
  Open: React.FC<ModalOpenProps>;
  Window: React.FC<ModalWindowProps>;
  Header: React.FC<ModalSubComponentProps>;
  Body: React.FC<ModalSubComponentProps>;
  Footer: React.FC<ModalSubComponentProps>;
}

export interface MenusProps {
  children: React.ReactNode;
}

export interface MenusToggleProps {
  id: string;
}

export interface MenusListProps {
  id: string;
  children: React.ReactNode;
}

export interface MenusActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string;
  disabled?: boolean;
}

export interface TableProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}
export interface TablePaginationProps {
  startIndex: number;
  endIndex: number;
  totalCount: number;
  onPrevious?: () => void;
  onNext?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
}

export interface AddCabinFormProps {
  onCloseModal?: () => void;
}

// ==========================================
// FORM TYPES
// ==========================================

export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}
// types.ts

export interface FormProps {
  children: ReactNode;
  onSubmit?: (e?: BaseSyntheticEvent) => Promise<void> | void;
  className?: string;
}

export interface FormSuccessProps {
  message?: string;
  className?: string;
}

export interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean | string;
  className?: string;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  validation?: RegisterOptions;
  className?: string;
}

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  validation?: RegisterOptions;
}

export interface FormFileInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  name: string;
  validation?: RegisterOptions;
}

export interface FormPasswordProps extends Omit<FormInputProps, "type"> {}

export interface FormCheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  name: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface FormErrorProps {
  message?: string;
  className?: string;
}
// The Component Interface to link static properties
export interface FormComponent extends React.FC<FormProps> {
  Row: React.FC<FormFieldProps>;
  Field: React.FC<FormFieldProps>;
  Label: React.FC<FormLabelProps>;
  Input: React.FC<FormInputProps>;
  TextArea: React.FC<FormTextareaProps>;
  FileInput: React.FC<FormFileInputProps>;
  Password: React.FC<FormPasswordProps>;
  Checkbox: React.FC<FormCheckboxProps>;
  Actions: React.FC<FormFieldProps>;
  Error: React.FC<FormErrorProps>;
  Success: React.FC<FormSuccessProps>;
}
// ==========================================
// PAGE COMPONENT PROPS
// ==========================================

export interface CreateUserProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export interface UpdateUserProfileProps {
  user: User;
  onUpdate?: (data: Partial<User>) => void;
}

export interface UpdatePasswordProps {
  onUpdate?: () => void;
}

export interface BookingDetailProps {
  booking: Booking;
  onCheckIn: (data: CheckInData) => Promise<void>;
  onCancel: () => void;
}

export interface CheckInData {
  bookingId: string;
  breakfastIncluded: boolean;
  totalAmount: number;
}

// ==========================================
// UTILITY TYPES
// ==========================================

export type Theme = "light" | "dark";

export type SortDirection = "asc" | "desc";

export interface Position {
  x: number;
  y: number;
}

// ==========================================
// CONTEXT TYPES
// ==========================================

export interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

export interface MenusContextType {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: Position | null;
  setPosition: (position: Position | null) => void;
}

// ==========================================
// API/DATA TYPES
// ==========================================

export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  totalPages: number;
}

export interface SupabaseError {
  message: string;
  code: string;
}

// types/cabin.ts
export interface CabinProps {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}
export interface CabinApiType {
  cabin: CabinProps;
}

// Extract the Row types for your main tables
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
export type Settings = Database["public"]["Tables"]["settings"]["Row"];

// Extract the Update/Insert types (useful for Mutations)
export type UpdateBooking = Database["public"]["Tables"]["bookings"]["Update"];
export type InsertBooking = Database["public"]["Tables"]["bookings"]["Insert"];

export interface CabinRowProps {
  cabin: Cabin; // Using my shortcut here!
  // onCloseModal?: () => void;
}

export interface CabinRowMobileProps {
  cabin: Tables<"cabins">;
  mutate: (id: number) => void;
  isPending: boolean;
}

export interface CabinsResponse {
  //may not use
  data: CabinProps[];
  count: number | null;
}

export interface BookingsResponse {
  //may not use
  data: Booking[];
  count: number | null;
}

export interface CabinFormData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

export type FilterValueType = {
  field: string;
  value: string;
} | null;
export type SortbyObjType = {
  field: string;
  direction: string;
};

export interface GetbookingsFilter {
  filter?: FilterValueType | null;
  sortBy?: SortbyObjType;
  page: number;
}

export interface BookingDetailType {
  created_at: string;
  id: number;
  startDate: string; // ISO Date strings

  endDate: string;
  numNights: number;
  numGuests: number;
  extraPrice: number;
  cabinPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabins: {
    name: string;
    image: string;
    regularPrice: number;
    discount: number;
  };
  guests: {
    email: string;
    fullName: string;
    nationalID: string;
    nationality: string;
    image: string;
  };
}

export interface BookingWithDetails {
  id: number;
  startDate: string; // ISO Date strings
  endDate: string;
  numNights: number;
  numGuests: number;
  extraPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string | null;
  cabins: {
    name: string;
    image: string;
  };
  guests: {
    email: string;
    fullName: string;
  };
}
export interface BookingRowProps {
  booking: BookingWithDetails;
}
export interface BookingRowDetailsProps {
  booking: BookingWithDetails;
  mutate: (id: number) => void;
  isPending: boolean;
}

export type BookingpageType = {
  created_at: string;
  id: number;
  startDate: string; // ISO Date strings
  endDate: string;
  numNights: number;
  numGuests: number;
  extraPrice: number;
  cabinPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabins: {
    name: string;
    image: string;
    regularPrice: number;
  };
  guests: {
    email: string;
    fullName: string;
    nationalID: string;
    nationality: string;
    image: string;
  };
};
export interface BookingDetailHeroProps {
  booking: BookingDetailType;
  onCancel: () => void;
}

export interface Guest {
  fullName: string;
  nationality: string;
  countryFlag: string;
}

// 2. Define the final shape of the returned data
export interface TodaysActivity {
  id: number;
  status: string;
  hasBreakfast: boolean;
  numNights: number;
  guests: Guest; // This matches my .select()
}

export type SettingsType = Pick<
  Settings,
  | "id"
  | "maxBookingLength"
  | "minBookingLength"
  | "breakfastPrice"
  | "maxGuestsPerBooking"
>;

//settingprop type
export interface UpdateHotelSettingsProps {
  settings?: Pick<
    Settings,
    | "id"
    | "maxBookingLength"
    | "minBookingLength"
    | "breakfastPrice"
    | "maxGuestsPerBooking"
  >;
}
export type recentBooking = Pick<
  Booking,
  | "id"
  | "created_at"
  | "startDate"
  | "endDate"
  | "numNights"
  | "cabinPrice"
  | "extraPrice"
  | "status"
  | "totalPrice"
>[];

export interface DurationProps {
  recentBookings: recentBooking;
}
export interface DurationData {
  duration: string;
  value: number;
  color: string;
}

export interface DurationChartDataProps {
  id: number | null;
  created_at: string | null;
  startDate: string | null;
  endDate: string | null;
  numNights: number | null;
  totalPrice: number | null;
}
