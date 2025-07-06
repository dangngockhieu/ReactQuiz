import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import UserInfor from './UserInfor';
import Password from './Password';
import History from './History';
const Profile = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();
    
    const handleClose = () => setShow(false);
  return (
      <>
        <Modal show={show} onHide={handleClose} 
          size='xl' backdrop="static" className="model-add-user">
          <Modal.Header closeButton>
            <Modal.Title>{t('manageUser.manage')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="profile" title={t('profile.title2')}>
                <UserInfor />
              </Tab>
              <Tab eventKey="password" title={t('profile.title3')}>
                <Password/>
              </Tab>
              <Tab eventKey="history" title={t('profile.title4')}>
                <History />
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t('manageUser.close')}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default Profile;