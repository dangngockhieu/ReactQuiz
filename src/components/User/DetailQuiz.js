import { useEffect, useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import {getDataQuiz, postSubmitQuiz} from "../../services/apiService";
import _, {  } from "lodash";
import './DetailQuiz.scss';
import Question from "./Question";
import ModelResult from "./ModelResult";
import RightContent from "./Content/RightContent";
import { useTranslation} from 'react-i18next';
const DetailQuiz = () => {
    const { t } = useTranslation();
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const params = useParams(); 
    const location = useLocation();
    const quizId = params.id; 
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [dataModel, setDataModel] = useState({});
    const [isFinish, setIsFinish] = useState(false);
    const handlePrev = () => {
        if (dataQuiz && index > 0) {
            setIndex(index - 1);
        }
    }
    const handleNext = () => {
        if (dataQuiz && index < dataQuiz.length - 1) {
            setIndex(index + 1);
        }
    }
    const handleFinish = async() => {
        setIsFinish(true); 
        let payload={
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = []; 
                question.answers.forEach(answer => {
                    if (answer.isSelected === true) {
                        userAnswerId.push(+answer.id);
                    }
                })
                answers.push({
                    questionId: +questionId , 
                    userAnswerId: userAnswerId});
            })
            payload.answers = answers;
            //submit api
            let res = await postSubmitQuiz(payload);
            if(res && res.EC === 0) {
                setDataModel({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                });
                setIsShow(true);
                if(res.DT && res.DT.quizData){
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a= res.DT.quizData;
                    for (let q of a){
                        for(let i=0; i<dataQuizClone.length; i++){
                            if(+dataQuizClone[i].questionId === +q.questionId){
                                let newAnswers=[];
                                for(let j=0; j<dataQuizClone[i].answers.length; j++){
                                    let s=q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id);
                                    if(s){
                                        dataQuizClone[i].answers[j].isCorrect = true;
                                    }
                                    newAnswers.push(dataQuizClone[i].answers[j]);
                                }
                                dataQuizClone[i].answers = newAnswers;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }
            }
            else{
                alert("Wrong answer, please try again!");
            }
        }
    }
    const handleCloseResult = () => {
        // setIsShow(false);
        // setIsShowAnswer(false);
        // setIndex(0);
        // setDataQuiz([]);
        window.location.href = '/users';

    }
    const handleCheck=(answerId, questionId)=>{
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            question.answers=b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if(index >-1){
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }
    useEffect(() => {
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id").map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers);
                    });
                    answers=_.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDescription, image }
                })
                .value();
            setDataQuiz(data);
        }
    };
    fetchQuestions();
}, [quizId]);
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                </div>
                <div className="q-content">
                    <Question 
                        index={index}
                        handleCheck={handleCheck}
                        data={dataQuiz && dataQuiz.length >0 ? dataQuiz[index]:[]}
                        isShowAnswer={isShowAnswer}
                        isSubmitQuiz={isShow}
                    />
                </div>
                <div className="footer">
                    {isShowAnswer && (
                        <button className="btn btn-warning"
                            onClick={()=>handleCloseResult()}>
                            Close
                        </button>
                    )}
                    <button className="btn btn-secondary"
                        onClick={()=>handlePrev()}>
                            {t('user.prev')}
                    </button>
                    <button className="btn btn-primary"
                        onClick={()=>handleNext()}>
                            {t('user.next')}
                    </button>
                    {!isShowAnswer && (
                        <button className="btn btn-warning"
                            onClick={()=>handleFinish()}>
                            {t('user.finish')}
                        </button>
                    )}
                </div>
            </div>
            <div className="right-content">
                <RightContent 
                    dataQuiz={dataQuiz}
                    handleFinish={handleFinish}
                    setIndex={setIndex}
                    isFinish={isFinish}
                />
            </div>
            <ModelResult
                show={isShow}
                setShow={setIsShow}
                dataModel={dataModel}
                setIsShowAnswer={setIsShowAnswer}
            />
        </div>
    );
}
export default DetailQuiz;