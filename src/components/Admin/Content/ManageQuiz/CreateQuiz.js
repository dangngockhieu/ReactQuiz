import { useState } from 'react';
import Select from 'react-select';
import { toast } from "react-toastify";
import { postCreateNewQuiz } from '../../../../services/apiService';
import { FcPlus } from 'react-icons/fc';

const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' }
];

const CreateQuiz = (props) => {
  const { fetchQuiz } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
        setName('');
        setDescription('');
        setType(null);
        setImage(null);
        setPreviewImage("");
        fetchQuiz();
}
  const handleChangeFile = (event) => {
    if(event.target && event.target.files && event.target.files[0]){
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  }

  const handleSubmit = async() => {
    if(!name || !description){
      toast.error("Missing required parameters!");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if(res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
    }
    else{
      toast.error(res.EM);
    }
  }

  return (
    <div className="add-new">
      <fieldset className="border rounded-3 px-3 pb-3">
        <legend className="float-none w-auto px-3" style={{fontSize:"20px",fontWeight:"450"}}>Add New Quiz</legend>
        <div className="form-floating mb-3">
          <input type="text" 
            className="form-control" 
            placeholder="Your quiz name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating">
          <input type="text" 
            className="form-control" 
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label htmlFor="floatingPassword">Description</label>
        </div>
        <div className="my-3" style={{fontSize:"16px",fontWeight:"450", color:"black"}}>
          <Select
            defaultValue={type}
            onChange={setType}
            options={options}
            placeholder="Quiz Type"
          />
        </div>
        <div className="more-actions form-group">
          <label htmlFor='labelCreate'>
            <FcPlus/>
            Upload Image
          </label>
          <input type="file" 
            className="form-control" 
            id="labelCreate" 
            onChange={handleChangeFile}
            hidden 
          />
          <div className="img-preview">
            {previewImage && 
              <img src={previewImage} alt="Preview" /> 
            }
          </div>
        </div>
        <div className="mt-3">
          <button 
            className="btn btn-warning"
            onClick={handleSubmit}
          >Save</button>
        </div>
      </fieldset>
    </div>
  );
}
export default CreateQuiz;