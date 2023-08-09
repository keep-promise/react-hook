import React, { useInsertionEffect, useLayoutEffect, useEffect } from 'react';

export default function Index(){
  
  useLayoutEffect(()=>{
    console.log('useLayoutEffect')
 },[]);

  useInsertionEffect(()=>{
    /* 动态创建 style 标签插入到 head 中 */
    const style = document.createElement('style')
    style.innerHTML = `
      .css-in-js{
        color: red;
        font-size: 20px;
      }
    `
    document.head.appendChild(style);
    console.log('useInsertionEffect')
  },[]);

  useEffect(()=>{
    console.log('useEffect')
 },[]);
 
  return <div className="css-in-js" > hello , useInsertionEffect </div>
}