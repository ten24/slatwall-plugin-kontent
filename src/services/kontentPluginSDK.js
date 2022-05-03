const { CustomElement } = process.env.REACT_APP_DEV_MODE
  ? {
      CustomElement: {
        init: callback => {
          callback(undefined, undefined)
        },
        getElementValue: () => {},
        observeElementChanges: () => {},
        observeItemChanges: () => {},
        setValue: () => {},
        setHeight: () => {},
      },
    }
  : window

class KontentPluginSDK {
  element
  context

  init = callback => {
    CustomElement.init((element, context) => {
      this.element = element
      this.context = context
      callback(true)
    })
  }

  getElement = () => {
    return this.element
  }

  getContext() {
    return this.context
  }

  getElementValue(elementCodeName, callback) {
    CustomElement.getElementValue(elementCodeName, callback)
  }

  setValue(value) {
    CustomElement.setValue(value)
  }

  setHeight(height) {
    CustomElement.setHeight(height)
  }

  listenElementChanges(elementCodeNames, callback) {
    CustomElement.observeElementChanges(elementCodeNames, callback)
  }

  listenItemChanges(callback) {
    CustomElement.observeItemChanges(callback)
  }
}

export default KontentPluginSDK
