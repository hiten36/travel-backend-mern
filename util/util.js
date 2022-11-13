const removeUndefined=(obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([e,f])=>f));
};

module.exports={
    removeUndefined
};
