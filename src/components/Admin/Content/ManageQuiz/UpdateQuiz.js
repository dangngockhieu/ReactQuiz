import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import { putUpdateQuiz } from '../../../../services/apiService';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';

const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' }
];
const UpdateQuiz = (props) => {
const { show, setShow, dataUpdate} = props;
const handleClose = () => {
  setShow(false);
  setName("");
  setDescription("");
  setType("");
  setImage("null");
  setPreviewImage("");
  props.resetUpdateData();
}
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [type, setType] = useState("");
const [image, setImage] = useState("");
const [previewImage, setPreviewImage] = useState("");
const [isPreviewImage, setIsPreviewImage] = useState(false);
useEffect(() => {
  if(!_.isEmpty(dataUpdate)) {
    setName(dataUpdate.name);
    setDescription(dataUpdate.description);
    const foundType = options.find(opt => opt.value === dataUpdate.difficulty || opt.value === dataUpdate.type);
    setType(foundType || options[0]);
    if(dataUpdate.image) {
      setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
    }
  }
}, [dataUpdate]);
const handleUploadImage = (event) => {
  if(event.target && event.target.files && event.target.files[0]){
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
  } 
}
const handleSubmiUpdateQuiz = async() => {
  if (!name) {
    toast.error('Invalid name')
    return;
  }
  
  if (!description) {
    toast.error('Invalid description')
    return;
  }
  let data = await putUpdateQuiz(dataUpdate.id, description, name, type?.value,image);
  if(data && data.EC === 0) {
    toast.success("Update quiz successfully");
    
    handleClose();
    await props.fetchQuiz();
  } 
  if(data && data.EC !== 0) {
    toast.error(data.EM);
  }
}
  return (
    <>
      <Modal show={show} onHide={handleClose} 
      size='xl' backdrop="static" className="model-add-user">
        <Modal.Header closeButton>
          <Modal.Title>Update a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
  <div className="col-md-6">
    <label className="form-label">Name</label>
    <input type="text" className="form-control" 
        value={name} 
        onChange={(event)=>setName(event.target.value)}
    />
  </div>
  <div className="col-md-6">
    <label className="form-label">Description</label>
    <input type="text" className="form-control" 
        value={description}
        onChange={(event)=>setDescription(event.target.value)}
    />
  </div>
  <div className="col-md-6">
    <label className="form-label">Type</label>
    <Select
        value={type}
        onChange={(option) => setType(option)}
        options={options}
        placeholder="Quiz Type"
    />
  </div>
  <div className="col-md-12">
          <label className="form-label label-upload" htmlFor='labelUpdate'>
            <FcPlus/>
            Upload File Image
            </label>
          <input type="file" 
          id="labelUpdate" 
          onChange={(event) => handleUploadImage(event)}
          hidden />
      </div>
    <div className="col-md-12 img-preview">
       {previewImage ? 
          <img src={previewImage} 
            alt="Preview" 
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)} 
          /> 
        : <span>Preview image</span>
}
    </div>

</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSubmiUpdateQuiz()}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
      {isPreviewImage &&
  <Lightbox
    image={previewImage}
    title={name}
    onClose={() => setIsPreviewImage(false)}
  />
}
    </>
  );
}
export default UpdateQuiz;