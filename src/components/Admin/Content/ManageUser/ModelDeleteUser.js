import { deleteUser } from '../../../../services/apiService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
const ModelDeleteUser = (props) => {
  const {show, setShow, dataDelete} = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async() => {
      let data = await deleteUser(dataDelete.id);
      if(data && data.EC === 0) {
          toast.success("Delete user successfully");
          handleClose(); 
          props.setCurrentPage(1);
          await props.fetchListUsersWithPaginate(1);
  } 
  if(data && data.EC !== 0) {
    toast.error(data.message);
  }
}

  return (
    <>
      <Modal show={show} 
      onHide={handleClose}
      backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user. email : <b>{dataDelete && dataDelete.email ? dataDelete.email: ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelDeleteUser;