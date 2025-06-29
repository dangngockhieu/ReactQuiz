import App from './App';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManagerUser from './components/Admin/Content/ManageUser/ManagerUser';
import DashBoard from './components/Admin/Content/ManageUser/DashBoard';
import Login from './components/Auth/Login';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from './components/Auth/SignUp';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/ManageQuiz/ManageQuiz';
import Questions from './components/Admin/Content/ManageQuestion/Questions';
const NotFound = () => {
    return (
        <div className="container mt-5 alert alert-danger" role="alert">
          404. Not found data with your curent URL
        </div>
    )
    }
const Layout = (props)=>{
    return(
        <>
          <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/admins" element={<Admin />} >
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManagerUser />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>  
      <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
      />
        </>
    )
}
export default Layout;