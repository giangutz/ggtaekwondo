import React from "react";

const page = () => {
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 px-16 py-8">
        <h1 className="mb-6 text-3xl font-semibold">Dashboard</h1>

        {/* Announcements Section */}
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Announcements</h2>
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <li>
                <a href="#" className="block p-4 hover:bg-gray-50">
                  <p className="truncate text-sm font-medium text-indigo-600">
                    Welcome to the new semester!
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Make sure to check your course schedules and syllabus.
                  </p>
                </a>
              </li>
              {/* More announcements */}
            </ul>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Your Courses</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Course Card */}
            <div className="overflow-hidden bg-white p-6 shadow sm:rounded-lg">
              <h3 className="mb-2 text-lg font-semibold text-indigo-600">
                Introduction to Psychology
              </h3>
              <p className="mb-4 text-sm text-gray-500">Professor Jane Doe</p>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
              >
                Go to course →
              </a>
            </div>
            {/* More courses */}
          </div>
        </div>

        {/* Calendar Section */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Deadlines</h2>
          <div className="overflow-hidden bg-white p-6 shadow sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              <li className="flex py-4">
                <div className="ml-3">
                  <p className="text-sm font-medium text-indigo-600">
                    Research Paper
                  </p>
                  <p className="text-sm text-gray-500">Due: May 30, 2023</p>
                </div>
              </li>
              {/* More deadlines */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
