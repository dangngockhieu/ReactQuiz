import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { changePassword } from '../../services/apiService';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Password.scss'; 
const Password = () => {
  const { t } = useTranslation();
  const account = useSelector(state => state.user.account);

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setOldPassword(account.password);
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [account]);
  const validatePassword = (pw) => {
    return pw.length >= 6;
}
  const handleSubmiUpdateUser = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      setNewPassword("");
      setConfirmPassword("");
      return;
    }
    const isValidPassword = validatePassword(newPassword);
    if(!isValidPassword) {
      toast.error("Password must contain at least 6 characters, including uppercase, lowercase, number, and special character");
      setNewPassword("");
      setConfirmPassword("");
      return;
    }
    let data = await changePassword(email, oldPassword, newPassword);
    if (data && data.EC === 0) {
      toast.success("Change Password successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (data && data.EC !== 0) {
      toast.error(data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmiUpdateUser}>
      <div className="col-md-6 input-password-group">
        <label className="form-label">{t('profile.oldPassword')}</label>
        <input type={showOldPassword ? "text" : "password"} 
          className="form-control"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <span className="input-password-eye"
              onClick={() => setShowOldPassword(!showOldPassword)}>
          {showOldPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <div className="col-md-6 input-password-group">
        <label className="form-label">{t('profile.newPassword')}</label>
        <input type={showNewPassword ? "text" : "password"}
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <span className="input-password-eye"
              onClick={() => setShowNewPassword(!showNewPassword)}>
          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <div className="col-md-6 input-password-group">
        <label className="form-label">{t('profile.confirmPassword')}</label>
        <input type={showConfirmPassword ? "text" : "password"} 
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className="input-password-eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          {t('manageUser.save')}
        </button>
      </div>
    </form>
  );
};

export default Password;