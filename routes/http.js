const Home = require("../controllers/http/HomeController.js");
const Auth = require("../controllers/http/AuthController.js");
const User = require("../controllers/http/UserController.js");
const Dashboard = require("../controllers/http/DashboardController.js");
const Planning = require("../controllers/http/PlanningController.js");
const Salle = require("../controllers/http/SalleController.js");
const Module = require("../controllers/http/ModuleController.js");
const Project = require("../controllers/http/ProjectController.js");
const configRoute = [
  { method: "GET", path: "/", controller: Home.getAll },
  { method: "POST", path: "/webhook", controller: Home.webhook },
  { method: "GET", path: "/info", controller: Home.info },

  /*--- AUTH ---*/
  { method: "POST", path: "/auth/login", controller: Auth.login },
  { method: "POST", path: "/auth/register", controller: Auth.register },
  {
    method: "POST",
    path: "/auth/forgetpassword",
    controller: Auth.forgetPassword,
  },
  { method: "POST", path: "/auth/reset", controller: Auth.resetPassword },
  /*--- AUTH ---*/

  /*--- User ---*/
  { method: "GET", path: "/user/info", role: ["*"], controller: User.info },
  { method: "PUT", path: "/user/lang", role: ["*"], controller: User.lang },
  /*--- User ---*/

  /*--- Planning ---*/
  { method: "GET", path: "/planning", controller: Planning.getAll },
  {
    method: "POST",
    path: "/planning",
    controller: Planning.create,
  },
  { method: "DELETE", path: "/planning/:id", controller: Planning.remove },
  /*--- Planning ---*/

  /*--- dashbord ---*/
  {
    method: "GET",
    path: "/dashbord/users",
    controller: Dashboard.users,
  },
  {
    method: "PUT",
    path: "/dashbord/user/:id",
    controller: Dashboard.updateUser,
  },
  {
    method: "GET",
    path: "/dashbord/user/:id",
    controller: Dashboard.getUser,
  },
  {
    method: "GET",
    path: "/dashbord/intervenant",
    controller: Dashboard.getIntervenant,
  },

  /*--- dashbord ---*/

  /*--- Salle ---*/
  { method: "GET", path: "/salle", controller: Salle.getAll },
  { method: "DELETE", path: "/salle/:id", controller: Salle.remove },
  { method: "POST", path: "/salle", controller: Salle.create },
  { method: "GET", path: "/salle/notused", controller: Salle.getNotUsed },
  /*--- Salle ---*/

  /*--- Module ---*/
  { method: "GET", path: "/module", controller: Module.getAll },
  { method: "DELETE", path: "/module/:id", controller: Module.remove },
  { method: "GET", path: "/module/:id", controller: Module.getOne },
  { method: "POST", path: "/module", controller: Module.create },
  /*--- Module ---*/

  /*--- Project ---*/
  { method: "PUT", path: "/project/:id", controller: Project.create },
  {
    method: "GET",
    path: "/project/:id/:idproject",
    controller: Project.getOne,
  },
  {
    method: "DELETE",
    path: "/project/:id/:idproject",
    controller: Project.remove,
  },
  {
    method: "PUT",
    path: "/project/:id/:idproject",
    controller: Project.update,
  },
  {
    method: "PUT",
    path: "/project/:id/:idproject/:iduser",
    controller: Project.addNote,
  },
  {
    method: "GET",
    path: "/project/all",
    controller: Project.getAll,
  },
  // { method: "GET", path: "/project", controller: Project.getAll },
  /*--- Project ---*/
];

module.exports = [
  (app) => {
    for (const key in configRoute) {
      switch (configRoute[key].method) {
        case "GET":
          app.get(configRoute[key].path, configRoute[key].controller);
          break;
        case "POST":
          app.post(configRoute[key].path, configRoute[key].controller);
          break;
        case "PUT":
          app.put(configRoute[key].path, configRoute[key].controller);
          break;
        case "DELETE":
          app.delete(configRoute[key].path, configRoute[key].controller);
          break;
        default:
          break;
      }
    }
  },
  configRoute,
];
