export const headerLinks = [
  {
    label: "Home",
    route: "/",
    allowedUsers: ["admin", "student"],
  },
  {
    label: "Create Event",
    route: "/events/create",
    allowedUsers: ["admin"],
  },
  {
    label: "Dashboard",
    route: "/dashboard",
    allowedUsers: ["student"],
  },
  {
    label: "Admin Dashboard",
    route: "/admin/dashboard",
    allowedUsers: ["admin"],
  },
  // {
  //   label: "Manage Users",
  //   route: "/admin/manageusers",
  //   allowedUsers: ["admin"],
  // },
  // {
  //   label: "Manage Gym",
  //   route: "/managegym",
  //   allowedUsers: ["admin"],
  // },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};

export const attendanceDefaultValues = {
  students: [],
  trainingDate: new Date(),
};

export const packageDefaultValues = {
  classId: "", // Add this line
  studentId: "",
  availPackage: "",
  startDateTime: new Date(Date.now()),
  classesPerWeek: "",
};

export const transactionDefaultValues = {
  studentId: "",
  packageId: "",
  attendanceId: "",
  expenseCategory: "",
  incomeSource: "",
  remarks: "",
  amount: "",
  transactionDate: new Date(),
  paidIn: "",
  transactionType: "",
};

export const TransactionType = ["Income", "Expense"];

export const IncomeSource = [
  "Membership",
  "Package",
  "Per Session Fee",
  "Equipments",
  "Competition",
  "Promotional Exam",
  // Add more sources as needed
];

export const ExpenseCategory = [
  "Rent",
  "Renovations",
  "Equipments",
  "Head Coach Salary",
  "Assistant Coach Salary",
  "Electricity",
  "Marketing",
  "Others",
  // Add more categories as needed
];

export const paidInList = [
  "GCASH",
  "Cash",
  "Bank Transfer",
]

export const classes = [
  "Beginner",
  "Novice",
  "Advanced",
  "Elite",
]