import { useTranslation} from 'react-i18next';
const TableQuiz = (props) => {
    const { listQuiz, handleClickBtnUpdate, handleClickBtnDelete } = props;
    const { t } = useTranslation();
    return (
        <>
        <div style={{fontSize:"20px",fontWeight:"450",paddingLeft:"35px"}}>List Quiz:</div>
        <table className="table table-hover table-bordered my-2">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">{t('admin.name')}</th>
                    <th scope="col">{t('admin.description')}</th>
                    <th scope="col">{t('admin.type')}</th>
                    <th scope="col">{t('admin.action')}</th>
                </tr>
            </thead>
            <tbody>
                {listQuiz &&
                    listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <th>{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{display: "flex", gap: "15px"}}>
                                    <button className="btn btn-warning mx-2"
                                        onClick={() => handleClickBtnUpdate(item)}
                                    >{t('admin.edit')}</button>
                                    <button className="btn btn-danger"
                                        onClick={() => handleClickBtnDelete(item)}
                                    >{t('admin.delete')}</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>
    )
}
export default TableQuiz;