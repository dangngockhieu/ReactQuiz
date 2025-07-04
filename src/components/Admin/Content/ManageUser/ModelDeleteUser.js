import { deleteUser } from '../../../../services/apiService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { useTranslation} from 'react-i18next';
const ModelDeleteUser = (props) => {
  const { t } = useTranslation();
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
          <Modal.Title>{t('manageUser.deleteUser1')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('manageUser.deleteUser2')}<b>{dataDelete && dataDelete.email ? dataDelete.email: ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('manageUser.cancle')}
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            {t('manageUser.confirm')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelDeleteUser;