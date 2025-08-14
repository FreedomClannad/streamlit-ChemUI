import React, {ReactElement, StrictMode, useEffect} from "react"
import { createRoot } from "react-dom/client"
import "chem-ui/dist/index.css"
import {Streamlit, ComponentProps, withStreamlitConnection } from "streamlit-component-lib"
import { ComponentMap } from "./components"
const rootElement = document.getElementById("root")
import "./style.css"
import "./tailwind.css"
function App(props: ComponentProps): ReactElement {

  const {args, theme} = props
  const {component} = args
  const Component = ComponentMap[component] || (() => <div>Unknown type: {component}</div>)
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [theme, Component]);
  return <Component {...props} />
}


if (!rootElement) {
  throw new Error("Root element not found")
}

const root = createRoot(rootElement)
const APPRender = withStreamlitConnection(App)

root.render(
  <StrictMode>
    <div className="component">
      <APPRender />
    </div>
  </StrictMode>
)
