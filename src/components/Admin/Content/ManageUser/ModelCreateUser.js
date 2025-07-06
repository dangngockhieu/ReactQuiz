import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { useTranslation} from 'react-i18next';
import { postCreateNewUser } from '../../../../services/apiService';
const ModelCreateUser = (props) => {
  const { t } = useTranslation();

const { show, setShow } = props;
const handleClose = () => {
  setShow(false);
  setEmail("");
  setPassword("");
  setUsername("");
  setRole("USER");
  setImage("");
  setPreviewImage("");
}
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [username, setUsername] = useState("");
const [role, setRole] = useState("USER");
const [image, setImage] = useState("");
const [previewImage, setPreviewImage] = useState("");

const handleUploadImage = (event) => {
  if(event.target && event.target.files && event.target.files[0]){
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
  } 
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validatePassword = (pw) => {
    return pw.length >= 6;
}
const handleSubmitCreateUser = async() => {
  //validate 
  const isValidEmail = validateEmail(email);
  if(!isValidEmail) {
    toast.error("Invalid email");
    return;
  }
  const isValidPassword = validatePassword(password);
  if(!isValidPassword) {
    toast.error("Password must contain at least 6 characters, including uppercase, lowercase, number, and special character");
    return;
  }
  let data = await postCreateNewUser(email, password, username, role, image);
  if(data && data.EC === 0) {
    toast.success("Create user successfully");
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
      <Modal show={show} onHide={handleClose} 
      size='xl' backdrop="static" className="model-add-user">
        <Modal.Header closeButton>
          <Modal.Title>{t('manageUser.createUser')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
  <div className="col-md-6">
    <label className="form-label">Email</label>
    <input type="email" className="form-control" 
        value={email}
        onChange={(event)=>setEmail(event.target.value)}
    />
  </div>
  <div className="col-md-6">
    <label className="form-label">{t('manageUser.password')}</label>
    <input type="password" className="form-control" 
        value={password}
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
    <select className="form-select" onChange={(event)=>setRole(event.target.value)}>
      <option value={t('manageUser.user')}>{t('manageUser.user')}</option>
      <option value={t('manageUser.admin')}>{t('manageUser.admin')}</option>
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
          <Button variant="primary" onClick={()=>handleSubmitCreateUser()}>
            {t('manageUser.save')} 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModelCreateUser;