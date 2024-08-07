import { link } from "fs";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
    allowedUsers: ["admin", "student", "parent"],
  },
  {
    label: "Create Event",
    route: "/events/create",
    allowedUsers: ["admin"],
  },
  {
    label: "Parent Dashboard",
    route: "/dashboard/parent",
    allowedUsers: ["parent"],
  },
  {
    label: "Student Dashboard",
    route: "/dashboard",
    allowedUsers: ["student"],
  },
  // {
  //   label: "Learn",
  //   route: "/lms/dashboard",
  //   allowedUsers: ["student", "admin"],
  // },
  {
    label: "Admin Dashboard",
    route: "/admin/dashboard",
    allowedUsers: ["admin"],
    subMenu: [
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
      {
        label: "Users",
        route: "/admin/users",
      },
    ],
  },
];

export const lmsLinks = [
  {
    route: "/lms/dashboard",
    label: "Dashboard",
  },
  {
    route: "/lms/courses",
    label: "Courses",
  },
  {
    route: "/lms/assignments",
    label: "Assignments",
  },
  {
    route: "/lms/grades",
    label: "Grades",
  },
  {
    route: "/lms/settings",
    label: "Settings",
  },
]

export const testimonials = [
  {
    quote:
      "My kids love Grit & Glory! Coaches are amazing, with tons of experience. They focus on both physical & mental development, teaching valuable life skills that go beyond kicks & punches. Highly recommend!",
    name: "Susan Gallardo",
    title: "Parent of a Student",
    image: "/assets/images/susan-review.png",
  },
  {
    quote:
      "Grit & Glory builds confidence in my kids! Coaches help them develop & improve, not just physically. They even win competitions! A fantastic taekwondo program!",
    name: "Dobbie Bartolini",
    title: "Parent of a Student",
    image: "/assets/images/dobs-review.jpg",
  },
  {
    quote:
      "Grit & Glory is amazing! Coaches, with tons of experience, focus on both my kids' physical & mental development, building confidence & teaching valuable life skills. They're even winning competitions! Highly recommend for a fantastic taekwondo program!",
    name: "Susan Gallardo",
    title: "Parent of a Student",
    image: "/assets/images/susan-review.png",
  },
  {
    quote:
      "Grit & Glory is perfect for strength & discipline! Coaches, with high-level experience, push my kids to improve. It's more than physical - they build confidence & teach humility.",
    name: "Dobbie Bartolini",
    title: "Parent of a Student",
    image: "/assets/images/dobs-review.jpg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/assets/icons/fb.svg",
    link: "https://www.facebook.com/gritandglorytkd",
  },
  {
    id: 2,
    img: "/assets/icons/ig.svg",
    link: "https://www.instagram.com/tkd.gg",
  },
  {
    id: 3,
    img: "/assets/icons/tiktok.svg",
    link: "https://www.tiktok.com/@gngtkd",
  },
];

export const sampleContent = [
  {
    title: "Title 1",
    description: "This is the description for Title 1",
    content: <p>This is some sample content for Title 1</p>,
  },
  {
    title: "Title 2",
    description: "This is the description for Title 2",
    content: <p>This is some sample content for Title 2</p>,
  },
  {
    title: "Title 3",
    description: "This is the description for Title 3",
    content: <p>This is some sample content for Title 3</p>,
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
  // {
  //   id: 3,
  //   name: "Milo Philippines",
  //   img: "/assets/images/milo.png",
  // },
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
  {
    label: "Users",
    route: "/admin/users",
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
  paid: false,
};

export const trialDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  age: "",
  opt: false,
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
  "Others"
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

// export const classes = ["Beginner", "Novice", "Advanced", "Elite"];

export const studentClasses = [
  {
    _id: "66207be86158c0a046d55438",
    name: "Beginner",
    days: [
      "Saturday",
      "Sunday",
      "Wednesday"
    ]
  },
  {
    _id: "66207c016158c0a046d55439",
    name: "Novice",
    days: [
      "Tuesday",
      "Thursday",
      "Saturday"
    ]
  },
  {
    _id: "66207c0b6158c0a046d5543a",
    name: "Advanced",
    days: [
      "Monday",
      "Wednesday",
      "Saturday",
      "Sunday"
    ]
  }
];

export const allClasses = [
  {
    _id: "66207be86158c0a046d55438",
    name: "Beginner",
    days: [
      "Saturday",
      "Sunday",
      "Wednesday"
    ]
  },
  {
    _id: "66207c016158c0a046d55439",
    name: "Novice",
    days: [
      "Tuesday",
      "Thursday",
      "Saturday"
    ]
  },
  {
    _id: "66207c0b6158c0a046d5543a",
    name: "Advanced",
    days: [
      "Monday",
      "Wednesday",
      "Saturday",
      "Sunday"
    ]
  },
  {
    _id: "6656db0f29a5e96a14037962",
    name: "N/A"
  }
];

export const roles = [
  {
    _id: "6626ffe2ca9888dab9ebdd31",
    name: "student",
  },
  {
    _id: "662700b1ca9888dab9ebdd3d",
    name: "admin",
  },
  {
    _id: "662702ceca9888dab9ebdd9f",
    name: "parent",
  }
];