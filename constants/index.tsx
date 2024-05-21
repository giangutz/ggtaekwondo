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
  {
    label: "Manage Users",
    route: "/admin/users",
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


export const testimonials = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
];


export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const coachExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Mobile App Dev - JSM Tech",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance App Dev Project",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const heroWords = ["Discover", "Build", "Unlock"];

export const companies = [
  {
    id: 1,
    name: "Philippine Sports Commission",
    img: "/assets/images/psc.png",
  },
  {
    id: 2,
    name: "Philippine Olympic Committee",
    img: "/assets/images/poc.png",
  },
  {
    id: 3,
    name: "Milo Philippines",
    img: "/assets/images/milo.png",
  },
  {
    id: 4,
    name: "Philippine Taekwondo Association",
    img: "/assets/images/pta.png",
  },
  {
    id: 5,
    name: "World Taekwondo Federation",
    img: "/assets/images/wtf.png",
  },
];

export const adminLinks = [
  {
    label: "Attendance",
    route: "/admin/attendance",
  },
  {
    label: "Student Packages",
    route: "/admin/student-packages",
  },
  {
    label: "Transactions",
    route: "/admin/transactions",
  },
  {
    label: "Events",
    route: "/admin/events",
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

export const paidInList = ["GCASH", "Cash", "Bank Transfer"];

export const classes = ["Beginner", "Novice", "Advanced", "Elite"];
