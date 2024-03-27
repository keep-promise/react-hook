// 使用useReducer、Context实现react-redux
import React, { createContext, useContext, useReducer } from 'react';

const ColorContext = createContext({});

const ACTION_MAP = {
  UPDATE_COLOR: 'UPDATE_COLOR'
};

const reducer = (state, action) => {
  switch(action.type) {
    case ACTION_MAP.UPDATE_COLOR:
      return action.color;
    default:
      return state;
  }
}

const Color = (props) => {
  const [color, dispatch] = useReducer(reducer, 'blue');

  return (
    <ColorContext.Provider value={{color: color, dispatch: dispatch}}>
      {props.children}
    </ColorContext.Provider>
  );
}

export default function UseReduxDemo() {

  return (
    <div>
      <Color>
        <ShowColor />
        <ControlColor />
      </Color>
    </div>
  )
}


function ShowColor() {
  const { color } = useContext(ColorContext);
  return (<div style={{color: color}}>字体颜色为: {color}</div>)
}

function ControlColor() {
  const { dispatch } = useContext(ColorContext);
  return (<div>
    <button onClick={() => dispatch({type: ACTION_MAP.UPDATE_COLOR,  color: 'red'})}>
      red
    </button>
    <button onClick={() => dispatch({type: ACTION_MAP.UPDATE_COLOR, color: 'yellow'})}>
      yellow
    </button>
  </div>)
}