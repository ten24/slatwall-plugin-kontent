function CustomToast({ showToast, message }) {
  return (
    <div className="custom-toast" style={{ display: showToast ? 'flex' : 'none' }}>
      {message}
    </div>
  )
}

export default CustomToast
