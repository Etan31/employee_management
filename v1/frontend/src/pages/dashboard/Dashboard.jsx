import React from "react";
import Navigation from "../../components/navigation/Navigation";
import IcView from "../../icons/ic-view.svg";

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

          <div className="stats-group">
            <div className="stats total-employee-stat">
              <h2>Total employee</h2>
              <span>102</span>
            </div>
            <div className="stats total-department-stat">
              <h2>Total department</h2>
              <span>12</span>
            </div>
            <div className="stats active-employee-stat">
              <h2>Active employee</h2>
              <span>40</span>
            </div>
          </div>

          <div className="logs-group">
            <div className="logs upcoming-event">
              <ul>
                <li>
                  <div className="event-info">
                    <h3>Event Title</h3>
                    
                    <div className="date-time">
                      <span className="date">Oct 12,2025</span>{" "}
                      <span className="separator">-</span>{" "}
                      <span className="time">2:00pm</span>
                    </div>

                    <p className="discription">
                      Norem ipsum consectetur adipiscing elit.dolor sit amet,
                      consectetur adipiscing Norem ipsum consectetur adipiscing
                      elit.dolor adipiscing sit{" "}
                      <span className="ellipsis">...</span>
                    </p>
                  </div>
                  <button className="btn view-event">
                    <img src={IcView} alt="view button" />
                  </button>
                </li>
              </ul>
            </div>
            <div className="logs recent-activity"></div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
