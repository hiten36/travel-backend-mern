// const d=new Date("2022-10-30");
// console.log(d.toLocaleDateString());
// console.log(d.getMonth());
// console.log(d.getTime());

// const d1=new Date(1667088000000+66599999);
// console.log(d1.toLocaleDateString());
// console.log(d1.toLocaleTimeString());

const removeUndefined=(obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([e,f])=>f));
}

const a={
    ab:"sdf",
    bc:undefined,
    cd:"sdf",
    de:"sdf",
    ef:undefined
};

console.log(removeUndefined(a));
