import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation} from 'react-i18next';
const ModelResult = (props) => {
  const { t } = useTranslation();

  const {show, setShow, dataModel, setIsShowAnswer} = props;
  const handleClose = () => setShow(false);
  const handleShowAnswer = () => {
    setShow(false);
    setIsShowAnswer(true); // Hiện đáp án
  };
  return (
    <>
      <Modal show={show} 
      onHide={handleClose}
      backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t('user.result')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{t('user.totalQuestion')}<b>{dataModel.countTotal}</b></div>
          <div>{t('user.totalCorrect')}<b>{dataModel.countCorrect}</b></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowAnswer}>
            {t('user.showanswer')}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t('user.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelResult;