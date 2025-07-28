const Delay=(time)=>{
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve();
    },time*1000)
  })
}

async function loading(time){
  await Delay(time);
};

export default loading;