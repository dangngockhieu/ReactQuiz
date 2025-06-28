import _ from "lodash";
const Question =(props) =>{
    const {data, index} = props;
    const hanleCheckBox =(event, aId, qId)=>{
       props.handleCheck(aId, qId);
    }
    if(_.isEmpty(data)){
        return <></>
    }
    return(
        <>
        {data.image ? 
            <div className="q-image">
                <img src={`data:image/jpeg;base64,${data.image}`} alt="Question" />
            </div>
            :
            <div className="q-image"></div>
        }
        
            <div className="question">
                Question {index+1}: { data.questionDescription }?
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                data.answers.map((item) => {
                    return (<div key={`${data.questionId}-${item.id}`}className="a-child">
                        <div className="form-check">
                        <input className="form-check-input" 
                            type="checkbox"
                            checked={item.isSelected ? true : false}
                            onChange={(event) => hanleCheckBox(event, item.id, data.questionId)}  
                        />
                        <label className="form-check-label">
                            {item.description}
                        </label>
                        </div>
                        </div>)
                })}
            </div>
        </>
    )
}
export default Question;