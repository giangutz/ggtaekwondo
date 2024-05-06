// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
  role: string;
  class: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== PACKAGE PARAMS

export type CreatePackageParams = {
  studentId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  path: string;
};

export type UpdatePackageParams = {
  packageId: string;
  updatedPackageData: {
    name: string;
    startDate: Date;
    endDate: Date | undefined;
    isActive: boolean;
    studentId: string;
    path: string;
  };
};

export type GetPackageByIdParams = {
  userId: string;
};

export type GetPackagesByUserParams = {
  studentId: string;
};

export type DeletePackageParams = {
  packageId: string;
};

// ====== ATTENDANCE PARAMS
export type CreateAttendanceParams = {
  class: string;
  trainingDate: Date;
  students: { studentId: string; status: string }[];
};

export type UpdateAttendanceParams = {
  _id: string;
  classId: string;
  trainingDate: Date;
  students: { studentId: string; status: string }[];
};

export type getAttendanceByIdParams = {
  attendanceId: string;
};

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    // imageUrl: string
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    // price: string
    // isFree: boolean
    // url: string
  };
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    // imageUrl: string
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    // price: string
    // isFree: boolean
    // url: string
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  // price: string
  // isFree: boolean
  // imageUrl: string
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  // url: string
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  // price: string;
  // isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  eventId: string;
  buyerId: string;
  createdAt: Date;
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ====== TRANSACTION PARAMS ====== //
export type CreateTransactionParams = {
  studentId?: string;
  packageId?: string;
  createdBy: string | undefined;
  attendanceId?: string;
  amount: number;
  remarks?: string;
  transactionDate: Date;
  transactionType: string;
  incomeSource?: string;
  expenseCategory?: string;
  paidIn: string;
};

export type UpdateTransactionParams = {
  _id: string;
  updatedTransactionData: {
    studentId?: string;
    packageId?: string;
    attendanceId?: string;
    amount: number;
    remarks?: string;
    transactionDate: Date;
    transactionType: string;
    incomeSource?: string;
    expenseCategory?: string;
    paidIn: string;
  };
};

// ====== DASHBOARD PARAMS ====== //
export type GetAttendanceByStudentParams = {
  studentId: string;
  query: string;
  limit: number;
  page: number;
};