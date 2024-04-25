export const headerLinks = [
  {
    label: "Home",
    route: "/",
    allowedUsers: ["6626ffe2ca9888dab9ebdd31", "662700b1ca9888dab9ebdd3d"],
  },
  {
    label: "Create Event",
    route: "/events/create",
    allowedUsers: ["662700b1ca9888dab9ebdd3d"],
  },
  {
    label: "Dashboard",
    route: "/dashboard",
    allowedUsers: ["6626ffe2ca9888dab9ebdd31", "662700b1ca9888dab9ebdd3d"],
  },
  {
    label: "Manage Attendance",
    route: "/attendance",
    allowedUsers: ["662700b1ca9888dab9ebdd3d"],
  },
  {
    label: "Manage Users",
    route: "/users",
    allowedUsers: ["662700b1ca9888dab9ebdd3d"],
  },
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
