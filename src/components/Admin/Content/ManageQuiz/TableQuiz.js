const TableQuiz = (props) => {
    const { listQuiz, handleClickBtnUpdate, handleClickBtnDelete } = props;

    return (
        <>
        <div style={{fontSize:"20px",fontWeight:"450",paddingLeft:"35px"}}>List Quiz:</div>
        <table className="table table-hover table-bordered my-2">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
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
                                    >Edit</button>
                                    <button className="btn btn-danger"
                                        onClick={() => handleClickBtnDelete(item)}
                                    >Delete</button>
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