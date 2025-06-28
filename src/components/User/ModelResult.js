import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModelResult = (props) => {
  const {show, setShow, dataModel} = props;
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} 
      onHide={handleClose}
      backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total Question: <b>{dataModel.countTotal}</b></div>
          <div>Total Correct Answer: <b>{dataModel.countCorrect}</b></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelResult;