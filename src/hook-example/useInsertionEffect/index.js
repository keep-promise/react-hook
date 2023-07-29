import React from 'react';

export default function Index(){
 
  React.useInsertionEffect(()=>{
     /* 动态创建 style 标签插入到 head 中 */
     const style = document.createElement('style')
     style.innerHTML = `
       .css-in-js{
         color: red;
         font-size: 20px;
       }
     `
     document.head.appendChild(style)
  },[])
 
  return <div className="css-in-js" > hello , useInsertionEffect </div>
}