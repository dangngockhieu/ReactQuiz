import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useState } from "react";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
const Question =(props) =>{
    const {data, index, isShowAnswer = false} = props;
    const hanleCheckBox =(aId, qId)=>{
       props.handleCheck(aId, qId);
    }
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    });
    const handlePreviewImage = (data) => {
        setDataImagePreview({
            title: data.description,
            url: `data:image/jpeg;base64,${data.image}`
        });
        setIsPreviewImage(true);
    };
    if(_.isEmpty(data)){
        return <></>
    }
    return(
        <>
        {data.image ? 
            <div className="q-image">
                <img
                    src={`data:image/jpeg;base64,${data.image}`}
                    alt="..."
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePreviewImage(data)}
                />
            </div>
            :
            <div className="q-image"></div>
        }
        
            <div className="question">
                Question {index+1}: { data.questionDescription }?
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
  data.answers.map((a) => (
    <div key={`${data.questionId}-${a.id}`} className="a-child">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={a.isSelected ? true : false}
          onChange={() => hanleCheckBox(a.id, data.questionId)}
          disabled={isShowAnswer}
        />
        <label className="form-check-label">
          {a.description}
          {isShowAnswer === true && (
            <>
              {a.isSelected === true && a.isCorrect !== true && (
                <IoIosClose className="icon-close" style={{ fontSize:"30px",fontWeight:"600", color: "red", marginLeft: 8 }} />
              )}
              {a.isCorrect === true && (
                <IoIosCheckmark className="icon-check" style={{ fontSize:"30px",fontWeight:"600",color: "green", marginLeft: 8 }} />
              )}
            </>
          )}
        </label>
      </div>
    </div>
  ))
}
            </div>
            {isPreviewImage &&
            <Lightbox
                image={dataImagePreview.url}
                title={dataImagePreview.title}
                onClose={() => setIsPreviewImage(false)}
            />
}
        </>
    )
}
export default Question;