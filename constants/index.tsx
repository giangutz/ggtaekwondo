export const headerLinks = [
  {
    label: "Home",
    route: "/",
    allowedUsers: ["Admin", "Student"],
  },
  {
    label: "Create Event",
    route: "/events/create",
    allowedUsers: ["Admin"],
  },
  {
    label: "Dashboard",
    route: "/dashboard",
    allowedUsers: ["Admin", "Student"],
  },
  {
    label: "Manage Gym",
    route: "/managegym",
    allowedUsers: ["Admin"],
  },
  // {
  //   label: "Manage Users",
  //   route: "/users",
  //   allowedUsers: ["Admin"],
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
