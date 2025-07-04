import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import './ListQuiz.scss';
import { useTranslation} from 'react-i18next';
const ListQuiz= (props) =>{
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);
    useEffect(() => {
        getQuizData();
    }, []);
    
    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        } 
    };
    return (
        <div className="list-quiz-container">
            {arrQuiz && arrQuiz.length > 0 && 
            arrQuiz.map((quiz, index) => {
                return (
                    <div key={`${index}-quiz`} className="card" style={{width: "18rem"}}>
                        <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Quiz {index+1}</h5>
                            <p className="card-text">{quiz.description}</p>
                            <button className="btn btn-primary" 
                                onClick={()=> navigate(`/quiz/${quiz.id}`, {state:{quizTitle: quiz.description}})}>
                                    {t('user.start')}
                            </button>
                        </div>
                    </div>
                )
            })
            }
            {arrQuiz && arrQuiz.length === 0 &&
                <div className="alert alert-info" role="alert">
                    You don't have any quiz now...
                </div>
            }
        </div>
    )
}
export default ListQuiz;