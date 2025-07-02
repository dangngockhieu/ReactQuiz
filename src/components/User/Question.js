import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useState } from "react";
const Question =(props) =>{
    const {data, index} = props;
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
                data.answers.map((item) => {
                    return (<div key={`${data.questionId}-${item.id}`}className="a-child">
                        <div className="form-check">
                        <input className="form-check-input" 
                            type="checkbox"
                            checked={item.isSelected ? true : false}
                            onChange={() => hanleCheckBox(item.id, data.questionId)}  
                        />
                        <label className="form-check-label">
                            {item.description}
                        </label>
                        </div>
                        </div>)
                })}
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