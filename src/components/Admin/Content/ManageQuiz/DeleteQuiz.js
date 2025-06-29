import { deleteQuiz } from '../../../../services/apiService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
const DeleteQuiz = (props) => {
  const {show, setShow, dataDelete} = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteQuiz = async() => {
      let data = await deleteQuiz(dataDelete.id);
      if(data && data.EC === 0) {
          toast.success("Delete quiz successfully");
          handleClose(); 
          await props.fetchQuiz();
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
          <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this quiz? Name : <b>{dataDelete && dataDelete.name ? dataDelete.name: ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteQuiz;