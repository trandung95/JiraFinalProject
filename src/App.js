import './App.css';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import HomeTemplate from './templates/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import { JiraTemplate } from './templates/HomeTemplate/JiraTemplate';
import Jira from './pages/HomePage/Jira';
import CreateProject from './pages/CreateProject/CreateProject';
import ProjectManagement from './pages/ProjectManagement/ProjectManagement';
import DrawerPopUp from './components/Jira/Modal/DrawerPopUp';



export const history = createBrowserHistory();


function App() {
  return (
    <Router history={history}>
      <DrawerPopUp />
      <Switch>
        <HomeTemplate exact path={'/home'} component={HomePage} />
        <UserLoginTemplate exact path={'/login'} Component={Login} />
        <JiraTemplate exact path={'/register'} Component={Register} />
        <JiraTemplate exact path='/jira' Component={Jira} />
        <JiraTemplate exact path='/createproject' Component={CreateProject} />
        <JiraTemplate exact path='/projectmanagement' Component={ProjectManagement} />
        <JiraTemplate exact path='/projectdetail/:projectId' Component={Jira} />

        <JiraTemplate exact path='/' Component={ProjectManagement} />
      </Switch>
    </Router>
  );
}

export default App;
