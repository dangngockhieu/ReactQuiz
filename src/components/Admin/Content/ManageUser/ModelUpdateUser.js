import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { putUpdateUser } from '../../../../services/apiService';
import _ from 'lodash';
import { useTranslation} from 'react-i18next';
const ModelUpdateUser = (props) => {
  const { t } = useTranslation();
const { show, setShow, dataUpdate} = props;
const handleClose = () => {
  setShow(false);
  setEmail("");
  setPassword("");
  setUsername("");
  setRole("USER");
  setImage("");
  setPreviewImage("");
  props.resetUpdateData();
}
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [username, setUsername] = useState("");
const [role, setRole] = useState("USER");
const [image, setImage] = useState("");
const [previewImage, setPreviewImage] = useState("");

useEffect(() => {
  if(!_.isEmpty(dataUpdate)) {
    setEmail(dataUpdate.email);
    setUsername(dataUpdate.username);
    setRole(dataUpdate.role);
    if(dataUpdate.image) {
      setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
    } else {
      setPreviewImage("");
    }
  }
}, [dataUpdate]);

const handleUploadImage = (event) => {
  if(event.target && event.target.files && event.target.files[0]){
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
  } 
}
const handleSubmiUpdateUser = async() => {
  let data = await putUpdateUser(dataUpdate.id, username, role, image);
  if(data && data.EC === 0) {
    toast.success("Update user successfully");
    handleClose();
    await props.fetchListUsersWithPaginate(props.currentPage);
  } 
  if(data && data.EC !== 0) {
    toast.error(data.message);
  }
}
  return (
    <>
      <Modal show={show} onHide={handleClose} 
      size='xl' backdrop="static" className="model-add-user">
        <Modal.Header closeButton>
          <Modal.Title>{t('manageUser.updateUser')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
  <div className="col-md-6">
    <label className="form-label">Email</label>
    <input type="email" className="form-control" 
        value={email} disabled
        onChange={(event)=>setEmail(event.target.value)}
    />
  </div>
  <div className="col-md-6">
    <label className="form-label">{t('manageUser.password')}</label>
    <input type="password" className="form-control" 
        value={password} disabled
        onChange={(event)=>setPassword(event.target.value)}
    />
  </div>
  
  <div className="col-md-6">
    <label className="form-label">{t('manageUser.username')}</label>
    <input type="text" className="form-control" 
        value={username}
        onChange={(event)=>setUsername(event.target.value)}
    />
  </div>
  <div className="col-md-4">
    <label className="form-label">{t('manageUser.role')}</label>
    <select className="form-select" value={role} onChange={(event)=>setRole(event.target.value)}>
      <option value="USER">{t('manageUser.user')}</option>
      <option value="ADMIN">{t('manageUser.admin')}</option>
    </select>
  </div>
    <div className="col-md-12">
        <label className="form-label label-upload" htmlFor='labelUpload'>
          <FcPlus/>
          {t('manageUser.upload')}
          </label>
        <input type="file" 
        id="labelUpload" 
        onChange={(event) => handleUploadImage(event)}
        hidden />
    </div>
    <div className="col-md-12 img-preview">
       {previewImage ? 
          <img src={previewImage} alt="Preview" /> 
        : <span>{t('manageUser.preview')}</span>
}
    </div>

</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('manageUser.close')}
          </Button>
          <Button variant="primary" onClick={()=>handleSubmiUpdateUser()}>
            {t('manageUser.save')} 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModelUpdateUser;