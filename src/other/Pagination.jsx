import PropTypes from 'prop-types'
import { useState } from 'react';
// Pagination defaultCurrent={1} total={50} 
const Pagination = ({ total, page, onChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(total / page);
  
    const handleClick = (page) => {
      setCurrentPage(page);
      onChange(page);
    };
  
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
          if (i === 1 || i === currentPage - 1 || i === currentPage || i === currentPage + 1 || (i === totalPages - 1 && currentPage < totalPages - 2)) {
            pageNumbers.push(
              <li key={i} className={currentPage === i ? 'bg-white text-black p-1 rounded-full' : ''}>
                <button onClick={() => handleClick(i)}>{i}</button>
              </li>
            );
          } else if ((i === 2 && currentPage > 3) || (i === totalPages - 2 && currentPage < totalPages - 1)) {
            pageNumbers.push(<li key={i}>...</li>);
          }
        }
        return pageNumbers;
      };
      
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        onChange(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        onChange(currentPage + 1);
      }
    };
  
    return (
      <div className="pagination-container flex gap-11 py-5">
        <button onClick={handlePrevPage} className='font-medium bg-white text-black w-6 h-6 flex justify-center items-center rounded-full' disabled={currentPage === 1}>{'<'}</button>
        <ul className="flex gap-10">
          {renderPageNumbers()}
        </ul>
        <button onClick={handleNextPage} className='font-medium bg-white text-black w-6 h-6 flex justify-center items-center rounded-full' disabled={currentPage === totalPages}>{'>'}</button>
      </div>
    );
};
Pagination.propTypes = {
    defaultCurrent: PropTypes.number,
    total: PropTypes.number,
    page: PropTypes.number,
    onChange: PropTypes.func
}
export default Pagination