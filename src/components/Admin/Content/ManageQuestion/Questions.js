import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
const Questions =(props) =>{
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});
    return(
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
            <div>
                <div className="mt-3">Add Question:</div>
                <div className="question-content">
                        <div class="form-floating description">
                        <input type="text" class="form-control"/>
                        <label>Description</label>
                        </div>
                        <div className="group-upload">
                        <label className="label-upload">Upload Image</label>
                        <input type="file" hidden/>
                        <span>0 file is uploaded</span>
                        </div>
                        <div className="btn-add">
                        <button>
                            <span>
                                <BsFillPatchPlusFill className="icon-add" />
                            </span>
                            <span>
                                <BsFillPatchMinusFill className="icon-remove" />
                            </span>
                        </button>
                        </div>
                </div>
                <div className="answer-content">
                    <input className="form-check-input iscorrect" 
                        type="checkbox"
                    />
                    <div class="form-floating answer-name">
                        <input type="text" class="form-control"/>
                        <label>Answer1</label>
                    </div>
                    <div className="btn-group">
                        <button>
                            <span>
                                <AiOutlinePlusCircle className="icon-add" />
                            </span>
                            <span>
                                <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                        </button>
                        </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export default Questions;