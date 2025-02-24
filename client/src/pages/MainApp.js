import React, { useState } from "react";
import "../styles/MainApp.css";
import Profile from "./Profile";
import Feed from "./Feed";
import Messages from "./Messages";
import Marketplace from "./Marketplace";
import Events from "./Events";
import Search from "./Search";
import Notifications from "./Notifications";
import About from "./About";

const MainApp = () => {
  const [activeTab, setActiveTab] = useState("Feed");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "Feed":
        return <Feed />;
      case "Messages":
        return <Messages />;
      case "Marketplace":
        return <Marketplace />;
      case "Events":
        return <Events />;
      case "Search":
        return <Search />;
      case "Notifications":
        return <Notifications />;
      case "About":
        return <About />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="main-app">
      <aside className="sidebar">
        <div className="sidebar-header">
            <h1>EliteTriangle.com</h1>
         </div>
        <ul className="nav-list">
          <li
            className={activeTab === "Profile" ? "active" : ""}
            onClick={() => setActiveTab("Profile")}
          >
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </li>
          <li
            className={activeTab === "Feed" ? "active" : ""}
            onClick={() => setActiveTab("Feed")}
          >
            <i className="fas fa-home"></i>
            <span>Feed</span>
          </li>
          <li
            className={activeTab === "Messages" ? "active" : ""}
            onClick={() => setActiveTab("Messages")}
          >
            <i className="fas fa-envelope"></i>
            <span>Messages</span>
          </li>
          <li
            className={activeTab === "Marketplace" ? "active" : ""}
            onClick={() => setActiveTab("Marketplace")}
          >
            <i className="fas fa-store"></i>
            <span>Marketplace</span>
          </li>
          <li
            className={activeTab === "Events" ? "active" : ""}
            onClick={() => setActiveTab("Events")}
          >
            <i className="fas fa-calendar-alt"></i>
            <span>Events</span>
          </li>
          <li
            className={activeTab === "Search" ? "active" : ""}
            onClick={() => setActiveTab("Search")}
          >
            <i className="fas fa-search"></i>
            <span>Search</span>
          </li>
          <li
            className={activeTab === "Notifications" ? "active" : ""}
            onClick={() => setActiveTab("Notifications")}
          >
            <i className="fas fa-bell"></i>
            <span>Notifications</span>
          </li>
          <li
            className={activeTab === "About" ? "active" : ""}
            onClick={() => {window.location.href = "/learn-more";}}
          >
            <i className="fas fa-info-circle"></i>
            <span>About</span>
          </li>
          <li onClick={() => setActiveTab("Logout")}>
            <i className="fas fa-sign-out-alt"></i>
            <span>
                <a href="/logout" style={{ textDecoration: "none", color: "inherit" }}>Logout</a>
            </span>
          </li>
        </ul>
      </aside>
      <main className="content">{renderContent()}</main>
    </div>
  );
};

export default MainApp;
