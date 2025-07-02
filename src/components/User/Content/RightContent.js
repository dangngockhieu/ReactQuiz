import CountDown from "./CountDown";
import {useRef} from "react";
const RightContent = (props)=>{
    const refDiv = useRef([]);
    const { dataQuiz } = props;
    const onTimeUp = () =>{
        props.handleFinish();
    }
    const getClassQuestion =(question, index) =>{
        if(question && question.answers.length>0){
            let isChecked = question.answers.find(item => item.isSelected === true);
            if(isChecked){
                return "question selected";
            }
        }
            return `question`;
    }
    const handleClick = (question, index) =>{
        props.setIndex(index);
        if(refDiv.current){
            refDiv.current.forEach((item, i) => {
                if(item && item.className === "question clicked"){
                    item.className = "question";
                }
            });
        }
        if(question && question.answers.length>0){
            let isChecked = question.answers.find(item => item.isSelected === true);
            if(isChecked){
                return ;
            }
        }
        refDiv.current[index].className ="question clicked";
    }
    return(
    <>
        <div className="main-timer">
            <CountDown onTimeUp={onTimeUp}/>
        </div>
        <div className="main-question">
            {dataQuiz && dataQuiz.length > 0 &&
            dataQuiz.map((item, index) => {
                return (
                    <div key={`question-${index}`} 
                        className={getClassQuestion(item, index)}
                        onClick={()=>handleClick(item, index)}
                        ref={el =>refDiv.current[index] = el}
                    >{index+1}</div>
                )
            }
            )
            }
            
        </div>
    </>
    )
}
export default RightContent;