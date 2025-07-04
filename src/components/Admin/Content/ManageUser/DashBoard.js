import './DashBoard.scss';
import { ResponsiveContainer, BarChart, XAxis, Tooltip, Bar, Cell } from 'recharts';
import { getOverview } from '../../../../services/apiService';
import { useState, useEffect } from 'react';
import { useTranslation} from 'react-i18next';
const DashBoard = (props) =>{
    const { t } = useTranslation();

    const [dataOverView, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    useEffect(() => {
        fetchDataOverView();
    },[]);
    const fetchDataOverView = async () => {
        let res = await getOverview();
        if(res && res.EC === 0){
            setDataOverview(res.DT);
            let Qz=0, Qs=0, As=0;
            Qz=res?.DT?.others?.countQuiz ?? 0;
            Qs=res?.DT?.others?.countQuestions ?? 0;
            As=res?.DT?.others?.countAnswers ?? 0;
            const data = [
                { name: "Quizzes", value: Qz },
                { name: "Questions", value: Qs },
                { name: "Answers", value: As }
            ];
            setDataChart(data);
        }
    }
    
    return(
        <div className="dashboard-container">
            <div className="title">
                {t('admin.content')}
            </div>
            <div className="content">
                <div className="left-content">
                    <div className="child">
                        <span className="text-1">{t('admin.totalUser')}</span>
                        <span className="text-1">
                            {dataOverView && dataOverView.users && dataOverView.users.total 
                                ? <>{dataOverView.users.total}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('admin.totalQuiz')}</span>
                        <span className="text-1">
                            {dataOverView && dataOverView.others && dataOverView.others.countQuiz
                                ? <>{dataOverView.others.countQuiz}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('admin.totalQuestion')}</span>
                        <span className="text-1">
                            {dataOverView && dataOverView.others && dataOverView.others.countQuestions 
                                ? <>{dataOverView.others.countQuestions}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">{t('admin.totalAnswer')}</span>
                        <span className="text-1">
                            {dataOverView && dataOverView.others && dataOverView.others.countAnswers 
                                ? <>{dataOverView.others.countAnswers}</> 
                                : <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className="right-content">
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={dataChart}
            margin={{ top: 20, right: 20, left: 20, bottom: 30 }} // tăng bottom để label không bị cắt
            barCategoryGap="20%" // tăng khoảng cách giữa các cột
        >
            <XAxis dataKey="name" />
            <Tooltip />
                <Bar dataKey="value">
            {
                dataChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={
                entry.name === "Quizzes" ? "#8884d8" :
                entry.name === "Questions" ? "#82ca9d" :
                "#fcb12a"
                } />
                ))
            }
                </Bar>
        </BarChart>
    </ResponsiveContainer>
</div>
            </div>
        </div>
    )
}
export default DashBoard;