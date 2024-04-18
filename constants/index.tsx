export const headerLinks = [
  {
    label: "Home",
    route: "/",
    allowedUsers: ['Student', 'Admin']
  },
  {
    label: "Create Event",
    route: "/events/create",
    allowedUsers: ['Admin']
  },
  {
    label: "Dashboard",
    route: "/dashboard",
    allowedUsers: ['Student', 'Admin']
  },
  // {
  //   label: "Packages",
  //   route: "/packages/create",
  //   allowedUsers: ['Admin']
  // }
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
