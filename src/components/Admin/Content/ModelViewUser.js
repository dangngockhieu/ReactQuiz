import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const ModelViewUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email || "");
      setPassword(dataUpdate.password || "");
      setUsername(dataUpdate.username || "");
      setRole(dataUpdate.role || "USER");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      } else {
        setPreviewImage("");
      }
    }
  }, [dataUpdate]);

  return (
    <Modal show={show} onHide={handleClose}
      size='xl' backdrop="static" className="model-add-user">
      <Modal.Header closeButton>
        <Modal.Title>View a user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control"
              value={email} disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" 
            value={password} disabled
    />
  </div>
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input type="text" className="form-control"
              value={username} disabled
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Role</label>
            <select className="form-select" value={role} disabled>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          {/* ----------------------------------------------- */}
          <div className="col-md-12">
                  <div className="upload">Image</div>
              </div>
              <div className="col-md-12 img-preview">
                 {previewImage ? 
                    <img src={previewImage} alt="Preview" /> 
                  : <span>Preview image</span>
          }
              </div>
          {/* ----------------------------------------------- */}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModelViewUser;