import {useState, useCallback, useEffect} from 'react';
import {getAllQuizForAdmin} from '../../../../services/apiService';
import './ManageQuiz.scss';
import TableQuiz from './TableQuiz';
import UpdateQuiz from './UpdateQuiz';
import DeleteQuiz from './DeleteQuiz'; 
import Accordion from 'react-bootstrap/Accordion';
import CreateQuiz from './CreateQuiz';

const ManageQuiz = (props) => {
    const [showDelete, setShowDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [showUpdate, setShowUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    const fetchQuiz = useCallback(async () => {
        let res = await getAllQuizForAdmin();  
        if(res && res.EC === 0) {
            setListQuiz(res.DT);
        } 
    }, []);

    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    const handleClickBtnUpdate = (quiz) => {
        setShowUpdate(true);
        setDataUpdate(quiz);
    }
    const handleClickBtnDelete = (quiz) => {
        setShowDelete(true);
        setDataDelete(quiz);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
        setShowUpdate(false);
    }
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quiz</Accordion.Header>
                    <Accordion.Body>
                        <CreateQuiz
                            fetchQuiz={fetchQuiz}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="list-detail">
                <TableQuiz 
                    listQuiz={listQuiz}
                    fetchQuiz={fetchQuiz}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnDelete={handleClickBtnDelete}
                />
            </div>
            <UpdateQuiz
                show={showUpdate}
                setShow={setShowUpdate}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
                resetUpdateData={resetUpdateData}
            />
            <DeleteQuiz
                show={showDelete}
                setShow={setShowDelete}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
        </div>
    );
}
export default ManageQuiz;