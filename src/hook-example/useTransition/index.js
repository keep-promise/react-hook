import React from 'react';

/* 模拟数据 */
const mockList1 = new Array(10000).fill('tab1').map((item,index)=>item+'--'+index )
const mockList2 = new Array(10000).fill('tab2').map((item,index)=>item+'--'+index )
const mockList3 = new Array(10000).fill('tab3').map((item,index)=>item+'--'+index )
 
const tab = {
  tab1: mockList1,
  tab2: mockList2,
  tab3: mockList3
}
 
export default function App(){
  const [ active, setActive ] = React.useState('tab1') //需要立即响应的任务，立即更新任务
  const [ renderData, setRenderData ] = React.useState(tab[active]) //不需要立即响应的任务，过渡任务
  const [ isPending, startTransition ] = React.useTransition();
  const handleChangeTab = (activeItem) => {
     setActive(activeItem) // 立即更新
     startTransition(()=>{ // startTransition 里面的任务优先级低
        setRenderData(tab[activeItem]);
     })
  }

  console.log('useTransition', active, isPending);
  return <div>
    <div className='tab' >
      { Object.keys(tab).map((item, index)=> 
        <span
          key={item}
          className={ active === item ? 'active' : '' } 
          onClick={()=>handleChangeTab(item)} >
            { item }
        </span> ) 
      }
    </div>
    <ul className='content' >
       { isPending && <div> loading... </div> }
       { renderData.map(item=> <li key={item} >{item}</li>) }
    </ul>
  </div>
}

// 如上当切换 tab 的时候，产生了两个优先级任务，
// 第一个任务是 setActive 控制 tab active 状态的改变，
// 第二个任务为 setRenderData 控制渲染的长列表数据 （在现实场景下长列表可能是一些数据量大的可视化图表）。

