import ReactPaginate from "react-paginate";
import { useTranslation} from 'react-i18next';
const TableUserPaginate =(props) =>{
    const {listUsers, pageCount} =props;
    const { t } = useTranslation();
  const handlePageClick = (event) => {
    props.setCurrentPage(+event.selected + 1);
    props.fetchListUsersWithPaginate(+event.selected + 1);
  };
    return(
        <>
            <table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">{t('manageUser.username')}</th>
      <th scope="col">Email</th>
      <th scope="col">{t('manageUser.role')}</th>
      <th scope="col">{t('manageUser.action')}</th>
    </tr>
  </thead>
  <tbody>
    {listUsers && listUsers.length > 0 &&
      listUsers.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>
              <button className="btn btn-secondary"
                onClick={() => props.handleClickBtnView(item)}
                  >{t('manageUser.view')}</button>
              <button className="btn btn-warning mx-3"
                onClick={() => props.handleClickBtnUpdate(item)}
                  >{t('manageUser.update')}
              </button>
              <button className="btn btn-danger"
                onClick={() => props.handleClickBtnDelete(item)}
                  >{t('manageUser.delete')}</button>
            </td>
          </tr>
        )
      })
    }
    {listUsers && listUsers.length === 0 &&
      <tr>
        <td colSpan="4" className="text-center">{t('manageUser.not-found')}</td>
      </tr>
    }
  </tbody>
</table>
<ReactPaginate
        nextLabel={t('manageUser.next')}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={t('manageUser.prev')}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={props.currentPage - 1} 
      />
        </>
    )
}
export default TableUserPaginate;