import React from "react";
import Navigation from "../../components/navigation/Navigation";

function Dashboard() {
  return (
    <>
      <div className="layout">
        <Navigation />
        <main>
          <header>
            <h1>Dashboard</h1>
            {/* Admin & Hr */}
            <p>
              Manage employees, departments, and activities, including totals,
              active staff, recent hires, events, and onboarding, with options
              to create users and events.
            </p>

            {/* For the employee */}
            <p>
              View total employees, your department info, absences/leave, and
              recent activities like hires, events, and orientations.
            </p>
          </header>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
