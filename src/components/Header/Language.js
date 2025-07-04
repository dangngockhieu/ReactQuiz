import NavDropDown from 'react-bootstrap/NavDropdown';
import { useTranslation} from 'react-i18next';
const Language = (props) => {
  const {i18n} = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
        <NavDropDown className="languages" id="basic-nav-dropdown2"
                title={i18n.language === 'vi' ? 'Vie':'Eng'}  >
            <NavDropDown.Item onClick={()=>handleChangeLanguage('en')}>
              {i18n.language === 'vi' ? 'Tiếng Anh':'English'}
            </NavDropDown.Item>
            <NavDropDown.Item onClick={()=>handleChangeLanguage('vi')}>
              {i18n.language === 'vi' ? 'Tiếng Việt':'Vietnamese'}
            </NavDropDown.Item>
        </NavDropDown>
    </>
  );
}
export default Language;