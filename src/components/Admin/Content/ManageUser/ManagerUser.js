import ModelCreateUser from "./ModelCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useEffect,useState } from 'react';
import { getAllUsers, getUserWithPaginate } from '../../../../services/apiService';
import ModelUpdateUser from "./ModelUpdateUser";
import ModelViewUser from "./ModelViewUser";
import ModelDeleteUser from "./ModelDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManagerUser = (props) =>{
    const LIMIT_USER = 7;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const[showModelCreateUser, setshowModelCreateUser]=useState(false);
    const[showModelUpdateUser, setshowModelUpdateUser]=useState(false);
    const[showModelViewUser, setshowModelViewUser]=useState(false);
    const[showModelDeleteUser, setshowModelDeleteUser]=useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUsers, setListUsers] = useState([]);
    useEffect(() =>{
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);
    const fetchListUsers=async () =>{
      let res = await getAllUsers();
      if(res.EC === 0){
        setListUsers(res.DT);
      }
    }
    const fetchListUsersWithPaginate=async (page) =>{
      let res = await getUserWithPaginate(page, LIMIT_USER);
      if(res.EC === 0){
        setListUsers(res.DT.users);
        setPageCount(res.DT.totalPages);
      }
    }
    const handleClickBtnUpdate = (user) => {
        setshowModelUpdateUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnView = (user) => {
        setshowModelViewUser(true);
        setDataUpdate(user);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
        setshowModelUpdateUser(false);
    }
    const handleClickBtnDelete = (user) => {
        setshowModelDeleteUser(true);
        setDataDelete(user);
    }
    return(
        <div className="manage-user-container">
            <div className="title ">
                Manage Users
            </div> 
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={()=>setshowModelCreateUser(true)}
                    ><FcPlus/>Add new users</button>
                </div>
                <div className="table-users-container">
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModelCreateUser show={showModelCreateUser}
                setShow={setshowModelCreateUser}
                fetchListUsers={fetchListUsers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}/>
        
                <ModelUpdateUser show={showModelUpdateUser}
                setShow={setshowModelUpdateUser}
                dataUpdate={dataUpdate}
                fetchListUsers={fetchListUsers}
                resetUpdateData={resetUpdateData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}/>

                <ModelViewUser show={showModelViewUser}
                setShow={setshowModelViewUser}
                dataUpdate={dataUpdate}/>

                <ModelDeleteUser show={showModelDeleteUser}
                setShow={setshowModelDeleteUser}
                dataDelete={dataDelete}
                fetchListUsers={fetchListUsers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}/>
            </div>       
        </div>
    )
}
export default ManagerUser;