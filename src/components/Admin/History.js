import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiService";
import moment from "moment";
import { useTranslation} from 'react-i18next';
const History = () => {
    const [listHistory, setListHistory] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            let newData = res?.DT?.data?.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    date: moment(item.createdAt).utc().format("DD/MM/YYYY hh:mm:ss A")
                }
            })
            if (newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length);
            }
            setListHistory(newData);
        }
    };

    return (
        <div>
            <h5>{t('profile.title1')}</h5>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>{t('profile.name')}</th>
                            <th>{t('profile.total_questions')}</th>
                            <th>{t('profile.total_correct')}</th>
                            <th>{t('profile.date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listHistory && listHistory.length > 0 ? (
                            listHistory.map((item, idx) => (
                                <tr key={item.id}>
                                    <td>{idx + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">{t('profile.notfound')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;