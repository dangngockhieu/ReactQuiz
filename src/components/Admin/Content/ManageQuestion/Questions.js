import { useState, useEffect } from 'react';
import Select from 'react-select';
import './Questions.scss';
import {getAllQuizForAdmin} from '../../../../services/apiService';
import {v4 as uuidv4} from 'uuid';
import _, {  } from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import {RiImageAddFill} from "react-icons/ri";
const Questions =(props) =>{
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState([
        {id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
            {id: uuidv4(),
            description: '',
            isCorrect: false}
        ]}
    ]);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    });
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, []);
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();  
        if(res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return { 
                    value: item.id, 
                    label: `${item.id } - ${item.description}` };
            });
            setListQuiz(newQuiz);
        } 
    };

    const handleQuestion=(type, id)=>{
        if(type === 'add'){
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {id: uuidv4(), description: '', isCorrect: false} 
                ]
            };
            setQuestions([...questions, newQuestion]);
        }
        if(type === 'remove'){
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }

    const handleAnswer=(type, questionId, answerId)=>{
        let questionsClone = _.cloneDeep(questions);
        if(type === 'add'){
            const newAnswer= {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if(type === 'remove'){
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item=> item.id !== answerId);
            setQuestions(questionsClone);
        }
    }
    const handleOnChange=(type, id, value)=>{
        if(type === 'question'){
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === id);
            if(index > -1){
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
        else if(type === 'answer'){
            let questionsClone = _.cloneDeep(questions);
            let questionIndex = questionsClone.findIndex(item => item.id === id.questionId);
            let answerIndex = questionsClone[questionIndex].answers.findIndex(item => item.id === id.answerId);
            questionsClone[questionIndex].answers[answerIndex].description = value;
            setQuestions(questionsClone);
        }
    }
    const handleOnChangeFileQuestion=(id, event)=>{
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === id);
        if(index > -1 && event.target.files && event.target.files.length>0){
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }
    const handleAnswerQuestion=(questionId, answerId, value)=>{
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if(index > -1){
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if(answer.id === answerId){
                    answer.isCorrect = value;
                }
                return answer;
            })
        }
        questionsClone[index].answers[index].isCorrect = value;
        setQuestions(questionsClone);
    }
    const handleSubmitQuestionForQuiz = () => {
        console.log('questions: ', questions);
    }
    const handlePreviewImage = (id) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === id);
        if(index > -1){
            setDataImagePreview({
                title: questionsClone[index].imageName, 
                url: URL.createObjectURL(questionsClone[index].imageFile)
            });
            setIsPreviewImage(true);
        }
    }
    return(
        <div className="questions-container">
            <div className="title">
                Manage Questions
                <hr/>
            </div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
            <div>
                <div className="mt-3 mb-2">Add Question:</div>
                {questions && questions.length>0 &&
                questions.map((item, index) => {
                    return(
                        <div key={item.id} className="q-main mb-4">
                    <div className="question-content">
                        <div className="form-floating description">
                        <input type="text"
                            className="form-control"
                            value={item.description}
                            onChange={(event)=> handleOnChange('question', item.id, event.target.value)}
                        />
                        <label>Question{index+1}'s Description</label>
                        </div>
                        <div className="group-upload">
                        <label htmlFor={`file ${item.id}`} className="label-upload">
                            <RiImageAddFill className="label-up"/>
                        </label>
                        <input type="file" id={`file ${item.id}`} hidden
                            onChange={(event)=> handleOnChangeFileQuestion(item.id, event)}
                        />
                        <span>
                            {item.imageName ? 
                            <span style={{cursor: "pointer"}}
                            onClick={()=>handlePreviewImage(item.id)}>
                                {item.imageName}</span>
                            : '0 file is uploaded' }
                        </span>
                        </div>
                        <div className="btn-add">
                        <button>
                            <span onClick={()=> handleQuestion('add', '')}>
                                <BsFillPatchPlusFill className="icon-add" />
                            </span>
                            {questions.length > 1 &&
                            <span onClick={()=> handleQuestion('remove', item.id)}>
                                <BsFillPatchMinusFill className="icon-remove" />
                            </span>
                            }
                        </button>
                        </div>
                    </div>
                    { item.answers && item.answers.length > 0 &&
                        item.answers.map((answer, ansIndex) => (
                            <div key={answer.id} className="answer-content">
                            <input className="form-check-input iscorrect" 
                                type="checkbox"
                                checked={answer.isCorrect}
                                onChange={(event)=> handleAnswerQuestion(item.id, answer.id, event.target.checked)}
                            />
                            <div className="form-floating answer-name">
                            <input type="text" className="form-control"
                                value={answer.description}
                                onChange={(event)=> handleOnChange('answer', { questionId: item.id, answerId: answer.id }, event.target.value)}
                            />
                            <label>Answer {ansIndex+1}</label>
                            </div>
                            <div className="btn-group">
                            <button>
                            <span>
                                <AiOutlinePlusCircle onClick={()=> handleAnswer('add', item.id, answer.id)} className="icon-add" />
                            </span>
                            {item.answers.length > 1 &&
                            <span>
                                <AiOutlineMinusCircle onClick={()=> handleAnswer('remove', item.id, answer.id)} className="icon-remove" />
                            </span>
                            }
                        </button>
                        </div>
                    </div>
                ))}
                
                </div>
                    )
                })}
                {questions && questions.length>0 &&
                <div>
                    <button 
                        onClick={()=>handleSubmitQuestionForQuiz()}
                        className="btn btn-warning">
                        Save Questions
                    </button>    
                </div>}
                {isPreviewImage===true &&
            <Lightbox image={dataImagePreview.url} title={dataImagePreview.title} 
                    onClose={() => setIsPreviewImage(false)}
            />}
                </div>
            </div>
            
        </div>
    );
}
export default Questions;