import { useState, useRef, useCallback } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import update from 'immutability-helper'

import CustomToast from './CustomToast'

const SelectedProductsSidebar = ({ saveProducts, selectedProducts, setSelectedProducts }) => {
  const [showToast, setShowToast] = useState(false)
  const showMessage = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = selectedProducts[dragIndex]
      setSelectedProducts(
        update(selectedProducts, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      )
    },
    [selectedProducts, setSelectedProducts]
  )

  return (
    <div className="sidebar-container">
      <CustomToast showToast={showToast} message={'Products Saved !'} />
      <div className="sidebar-header">
        <h3>Selected Products</h3>
        <button
          className="btn btn--destructive-primary btn--xs"
          onClick={() => {
            saveProducts()
            showMessage()
          }}
          disabled={selectedProducts.length === 0}
        >
          {`Save ${selectedProducts.length} Products`}
        </button>
      </div>

      <div className="selected-product-container">
        <DndProvider backend={HTML5Backend}>
          {selectedProducts.map((product, index) => {
            return <Card product={product} key={product.productID} index={index} id={product.productID} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} moveCard={moveCard} />
          })}{' '}
        </DndProvider>
      </div>
    </div>
  )
}

export { SelectedProductsSidebar }

const Card = ({ id, product, index, moveCard, setSelectedProducts, selectedProducts }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} className="dropdown-options selected-product" key={product.productID} data-handler-id={handlerId} style={{ opacity }}>
      <img src={product.images.length ? `${process.env.REACT_APP_SLATWALL_IMAGE_HOST}${product.images[1]}` : ''} alt="" />
      <div className="selected-product-body">
        <span>{product.productName}</span>
        <span
          className="product-remove"
          onClick={() => {
            setSelectedProducts(selectedProducts.filter(prod => prod.productID !== product.productID))
          }}
        >
          Remove
        </span>
      </div>
    </div>
  )
}
