import { useState, useEffect } from 'react';
import Select from 'react-select';
import './QuizQA.scss';
import  {getAllQuizForAdmin,
        getQuizWithQA,
        postUpsertQA} 
    from '../../../../services/apiService';
import {v4 as uuidv4} from 'uuid';
import _, {  } from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import {RiImageAddFill} from "react-icons/ri";
import { useTranslation} from 'react-i18next';
const QuizQA =(props) =>{
    const { t, i18n } = useTranslation();

    const initQuestion =[
        {id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        isValidQ: true,
        answers: [
            {id: uuidv4(),
            description: '',
            isCorrect: false,
            isValidA: true
            }
        ]}
    ];
    const initSelected = {}
    const [selectedQuiz, setSelectedQuiz] = useState(initSelected);
    const [questions, setQuestions] = useState(initQuestion);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    });
    const [listQuiz, setListQuiz] = useState([]);
    useEffect(() => {
        fetchQuiz();
    }, []);
    useEffect(() => {
        const fetchQuizWithQA = async() => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if(res && res.EC === 0) {
            let newQA = [];
            for(let i=0; i<res.DT.qa.length; i++){
                let q= res.DT.qa[i]
                if(res.DT.qa[i].imageFile){
                    res.DT.qa[i].imageName = `Question ${q.id}.jpg`;
                    res.DT.qa[i].imageFile = 
                    await urltoFile(`data:image/jpg;base64,${q.imageFile}`, `Question ${q.id}.jpg`,'image/jpg')
                }
                newQA.push(q);
            }
            setQuestions(newQA);
        }
    }
        if(selectedQuiz && selectedQuiz.value){ 
            fetchQuizWithQA();
        }
    }, [selectedQuiz]);
    // return a promise that resolves with a File instance
const urltoFile = (url, filename, mimeType) =>{
    if (url.startsWith('data:')) {
        var arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], filename, {type:mime || mimeType});
        return Promise.resolve(file);
    }
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename,{type:mimeType}));
};
    
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
                isValidQ: true,
                answers: [
                    {id: uuidv4(), description: '', isCorrect: false, isValidA: true} 
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
                isCorrect: false,
                isValidA: true
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
                questionsClone[index].isValidQ = true;
                setQuestions(questionsClone);
            }
        }
        else if(type === 'answer'){
            let questionsClone = _.cloneDeep(questions);
            let questionIndex = questionsClone.findIndex(item => item.id === id.questionId);
            let answerIndex = questionsClone[questionIndex].answers.findIndex(item => item.id === id.answerId);
            questionsClone[questionIndex].answers[answerIndex].description = value;
            questionsClone[questionIndex].answers[answerIndex].isValidA = true;
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
    const handleAnswerQuestion = (questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let qIndex = questionsClone.findIndex(item => item.id === questionId);
        if (qIndex > -1) {
            questionsClone[qIndex].answers = questionsClone[qIndex].answers.map(ans => {
            if (ans.id === answerId) {
                return { ...ans, isCorrect: value };
            }
            return ans;
        });
        setQuestions(questionsClone);
    }
};
    const handleSubmitQuestionForQuiz = async() => {
        // validate Quiz 
        if(_.isEmpty(selectedQuiz)){
            toast.error("Please select a quiz");
            return;
        }
        let questionsClone = _.cloneDeep(questions);
        let isValid = true;
        //validate answer
        questionsClone.forEach((q) => {
        q.isValidQ = !!q.description;
        q.answers.forEach(a => {
            a.isValidA = !!a.description;
            if (!a.isValidA) isValid = false;
        });
        if (!q.isValidQ) isValid = false;
    });

    setQuestions(questionsClone);
        if(!isValid){
            return;
        }
        // validate: mỗi câu hỏi phải có ít nhất 1 đáp án đúng
    for (let i = 0; i < questionsClone.length; i++) {
        const q = questionsClone[i];
        const hasCorrect = q.answers.some(a => a.isCorrect === true);
        if (!hasCorrect) {
            toast.error(`Question ${i + 1} must have at least one correct answer!`);
            return;
        }
    }
        //validate question
        let isValidQuestion=true;
        for(let i=0; i<questions.length; i++){
            if(!questions[i].description){
                isValidQuestion=false;
                break;
            }
        }
        if(!isValidQuestion){
            return;
        }
        let questionClone = _.cloneDeep(questions);
        for(let i=0; i<questionClone.length; i++){
            if(questionClone[i].imageFile){
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });
        if(res && res.EC === 0){
        toast.success("Create questions successfully");
        }
        // setQuestions(initQuestion);
    }
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
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
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">{t('admin.select')}</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
            <div>
                <div className="mt-3 mb-2">{t('admin.addQuestion')}</div>
                {questions && questions.length>0 &&
                questions.map((item, index) => {
                    return(
                        <div key={item.id} className="q-main mb-4">
                    <div className="question-content">
                        <div className="form-floating description">
                        <input type="text"
                            className={`form-control${item.isValidQ === false ? ' is-invalid' : ''}`}
                            value={item.description}
                            onChange={(event)=> handleOnChange('question', item.id, event.target.value)}
                        />
                        <label>
                            {i18n.language === 'vi' ? `Mô tả câu hỏi ${index+1}`:`Question${index+1}'s Description`}
                        </label>
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
                            : t('admin.upload') }
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
                            <input className="form-check-input iscorrec" 
                                type="checkbox"
                                checked={answer.isCorrect}
                                onChange={(event)=> handleAnswerQuestion(item.id, answer.id, event.target.checked)}
                            />
                            <div className="form-floating answer-name">
                            <input type="text" className={`form-control${answer.isValidA === false ? ' is-invalid' : ''}`}
                                value={answer.description}
                                onChange={(event)=> handleOnChange('answer', { questionId: item.id, answerId: answer.id }, event.target.value)}
                            />
                            <label>{t('admin.answer')} {ansIndex+1}</label>
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
                        {t('admin.save')}
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
export default QuizQA;