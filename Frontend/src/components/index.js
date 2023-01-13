import React from 'react'

export default function index() {
    let missNu=[];
    function missNumber(arr){
        let minNum=Math.min(...arr);
        let maxNum=Math.max(...arr);
        for(let i=minNum; i<maxNum; i++){
            if(arr.indexOf(i)===-1){
                missNu.push(i);
            }
        }
        return missNu
    }
    missNumber([1,2,3,6,7,9]);
  return (
    <div>index{missNu.map((index,item)=>{
        return (<div key={item}>{index}</div>)
    })}</div>
  )
}
