import { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { updateProfile } from '../../services/apiService';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { doUpdateUserInfo } from '../../redux/action/userAction';
const UserInfor = () => {
  const { t } = useTranslation();
  const account = useSelector(state => state.user.account);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("");
      if (account && account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmiUpdateUser = async (e) => {
    e.preventDefault();
    let data = await updateProfile(username, image);
    if (data && data.EC === 0) {
      toast.success("Update user successfully");
      // Cập nhật Redux store
      dispatch(doUpdateUserInfo({
        ...account,
        username: username,
        image: data.DT?.image || account.image
      }));
    }
    if (data && data.EC !== 0) {
      toast.error(data.message);
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmiUpdateUser}>
      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input type="email" className="form-control"
          value={email} disabled
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">{t('manageUser.password')}</label>
        <input type="password" className="form-control"
          value="********" disabled
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">{t('manageUser.username')}</label>
        <input type="text" className="form-control"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">{t('manageUser.role')}</label>
        <select className="form-select" value={role} disabled>
          <option value="USER">{t('manageUser.user')}</option>
          <option value="ADMIN">{t('manageUser.admin')}</option>
        </select>
      </div>
      <div className="col-md-12">
        <label className="form-label label-upload" htmlFor='labelUpload'>
          <FcPlus />
          {t('manageUser.upload')}
        </label>
        <input type="file"
          id="labelUpload"
          onChange={handleUploadImage}
          hidden />
      </div>
      <div className="col-md-12 img-preview">
        {previewImage ?
          <img src={previewImage} alt="Preview" />
          : <span>{t('manageUser.preview')}</span>
        }
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          {t('manageUser.save')}
        </button>
      </div>
    </form>
  );
};

export default UserInfor;