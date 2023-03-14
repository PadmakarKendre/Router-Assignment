import { NavLink, Outlet } from "react-router-dom";
import { FaDashcube, FaProjectDiagram } from "react-icons/fa";

const Dashboard = () => {
  const data = [
    {
      name: "Login",
      path: "/login",
    },
    {
      path: "/dashboard",
      locale: "dashboard",
      name: "Dashboard",
      icon: "dashboard",
      exact: true, // This route will only work for /dashboard. For dashboard/analysis or other this component will not be rendered
      component: "pages/dashboard",
      children: [
        {
          path: "/dashboard/analysis",
          locale: "dashboard.analysis",
          name: "analysis",
          exact: true,
          accessTO: ["admin"], // Allow only admins to view this menu and access this page
        },
        {
          path: "/dashboard/monitor",
          locale: "dashboard.monitor",
          name: "monitor",
          exact: true,
        },
        {
          path: "/dashboard/workplace",
          locale: "dashboard.workplace",
          name: "workplace",
          exact: true,
        },
      ],
    },
    {
      path: "/projects",
      locale: "projects",
      name: "Projects",
      icon: "projects",
      redirect: "/projects/list", //Redirect /projects to /projects/list
      children: [
        {
          path: "/projects/list",
          locale: "projects.list",
          name: "Projects",
          icon: "projects",
          exact: true,
        },
        {
          path: "/projects/:id",
          locale: "projects.details",
          name: "Project Details",
          hideInMenu: true,
          icon: "projects",
          key: "projects",
          exact: true,
        },
        {
          path: "/projects/:id/settings",
          locale: "projects.settings",
          icon: "settings",
          name: "Settings",
          parentKey: "details",
          exact: true,
        },
      ],
    },
    {
      path: "*",
      component: "./404",
    },
  ];
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    };
  };
  const iconsList = [{ dashboard: FaDashcube, projects: FaProjectDiagram }];
  const renderIcon = (icon, index) => {
    const Icon = icon;
    return (
      <span className="y" key={index}>
        <Icon />
      </span>
    );
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <ul className="list-group">
            {data.map((item) => {
              return item.children ? (
                <div className="list-group-item">
                  <li className="list-group-item" key={item.path}>
                    <span>
                      {iconsList.map((icon, index) =>
                        renderIcon(icon[item.icon], index)
                      )}
                    </span>
                    {item.name}
                  </li>
                  <ul>
                    {item.children.map((inner) => (
                      <li className="list-group-item" key={inner.path}>
                        <NavLink style={navLinkStyles} to={inner.path}>
                          {inner.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <li className="list-group-item" key={item.path}>
                  <NavLink style={navLinkStyles} to={item.path}>
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-md-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
