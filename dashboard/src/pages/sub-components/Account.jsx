

import React, { useState } from 'react';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  return (
    <main className="ml-8 sm:ml-4 min-h-screen flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto max-w-6xl mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] gap-6">
        <nav className="flex flex-col gap-4 text-sm text-muted-foreground ">
          <button
            className={`w-full text-left py-2 px-4 ${selectedComponent === "Profile" ? "font-semibold text-primary" : ""}`}
            onClick={() => setSelectedComponent("Profile")}
          >
            Profile
          </button>

          <button
            className={`w-full text-left py-2 px-4 ${selectedComponent === "Update Profile" ? "font-semibold text-primary" : ""}`}
            onClick={() => setSelectedComponent("Update Profile")}
          >
            Update Profile
          </button>

          <button
            className={`w-full text-left py-2 px-4 ${selectedComponent === "Update Password" ? "font-semibold text-primary" : ""}`}
            onClick={() => setSelectedComponent("Update Password")}
          >
            Update Password
          </button>
        </nav>
        <div className="flex-1">
          {(() => {
            switch (selectedComponent) {
              case "Profile":
                return <Profile />;
              case "Update Profile":
                return <UpdateProfile />;
              case "Update Password":
                return <UpdatePassword />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </main>
  );
};

export default Account;
