const ListingPaginationModern = ({ currentPage = 1, setPage, count = 0, pageMax = 12 }) => {
  currentPage = parseInt(currentPage)
  return (
    <div className="pagination-container">
      <div>
        <button
          className="btn btn--destructive-primary btn--xs"
          aria-label="Prev"
          onClick={evt => {
            evt.preventDefault()
            setPage(currentPage - 1)
            window.scrollTo({
              top: 5,
              behavior: 'smooth',
            })
          }}
          disabled={currentPage === 1}
        >
          Prev
        </button>
      </div>
      <div className="pagination-page">{currentPage}</div>
      <div>
        {count === pageMax && (
          <button
            className="btn btn--destructive-primary btn--xs"
            aria-label="Next"
            onClick={evt => {
              evt.preventDefault()
              setPage(currentPage + 1)
              window.scrollTo({
                top: 5,
                behavior: 'smooth',
              })
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export { ListingPaginationModern }
