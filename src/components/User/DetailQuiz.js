import { useEffect, useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import {getDataQuiz, postSubmitQuiz} from "../../services/apiService";
import _, {  } from "lodash";
import './DetailQuiz.scss';
import Question from "./Question";
import ModelResult from "./ModelResult";

const DetailQuiz = (props) => {
    const params = useParams(); 
    const location = useLocation();
    const quizId = params.id; 
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [dataModel, setDataModel] = useState({});
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
            }
            else{
                alert("Wrong answer, please try again!");
            }
        }
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
                        // Nếu answers là mảng
                        if (Array.isArray(item.answers)) {
                            item.answers.forEach(ans => ans.isSelected = false);
                            answers.push(...item.answers);
                        } else if (item.answers) {
                            item.answers.isSelected = false;
                            answers.push(item.answers);
                        }
                    });
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
                    {/* <img/> */}
                </div>
                <div className="q-content">
                    <Question 
                        index={index}
                        handleCheck={handleCheck}
                        data={dataQuiz && dataQuiz.length >0 
                        ? dataQuiz[index]:[]}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary"
                        onClick={()=>handlePrev()}>
                            Prev
                    </button>
                    <button className="btn btn-primary"
                        onClick={()=>handleNext()}>
                            Next
                    </button>
                    <button className="btn btn-warning"
                        onClick={()=>handleFinish()}>
                            Finish
                    </button>
                </div>
            </div>
            <div className="right-content">
                ytyuty
            </div>
            <ModelResult
                show={isShow}
                setShow={setIsShow}
                dataModel={dataModel}
            />
        </div>
    );
}
export default DetailQuiz;