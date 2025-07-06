import { deleteQuiz } from '../../../../services/apiService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { useTranslation} from 'react-i18next';
const DeleteQuiz = (props) => {
  const { t } = useTranslation();
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
          <Modal.Title>{t('admin.title3a')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('admin.title3b')}<b>{dataDelete && dataDelete.name ? dataDelete.name: ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('admin.cancle')}
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
            {t('admin.confirm')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteQuiz;