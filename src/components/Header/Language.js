import NavDropDown from 'react-bootstrap/NavDropdown';
import { useTranslation} from 'react-i18next';
const Language = (props) => {
  const {i18n} = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
        <NavDropDown style={{ fontSize: "20px", fontWeight: 600, color:"red"}} 
                title={i18n.language === 'vi' ? 'Vie':'Eng'} id="basic-nav-dropdown2" className="languages">
            <NavDropDown.Item onClick={()=>handleChangeLanguage('en')}>English</NavDropDown.Item>
            <NavDropDown.Item onClick={()=>handleChangeLanguage('vi')}>Việt Nam</NavDropDown.Item>
        </NavDropDown>
    </>
  );
}
export default Language;