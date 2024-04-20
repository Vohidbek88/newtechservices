import React, { useState } from 'react'
import axios from 'axios'
import { useHttp } from "../service/httpRequest"


const Hujjatlar = () => {
  const {  $post,$get } = useHttp()
  const [fayl,setHujjat]=useState(null)
  const [yulash,setYuklash]=useState(false)
  const [faylsucces,faylsuccesSet]=useState('folder.zip')
// const [progres,setProgres]=useState({statred:false,pc:0})
const [msg,setMSg]=useState(null)
const token=(localStorage.getItem('token'))

const fileDown=async()=>{
// const res=await axios.get(`https://shaxobiddin20.pythonanywhere.com/api/v1/file/dow_word/`,{
//   headers:{
//     'Authorization':`Token ${token}`
//   }
// })
// console.log(res)
// window.location.assign(`https://shaxobiddin20.pythonanywhere.com/api/v1/file/dow_word/?Token=${token}`);

const url ='https://shaxobiddin20.pythonanywhere.com/api/v1/file/dow_word/'
const authHeader =`Token ${token}` 

const options = {
  headers: {
    Authorization: authHeader
  }
};
 await fetch(url, options)
  .then( res => res.blob() )
  .then( blob => {
    var file = window.URL.createObjectURL(blob);
    window.location.assign(file);
  });

// window.open(`https://shaxobiddin20.pythonanywhere.com/api/v1/file/dow_word/?Token=${token}`)
}


  const HandleUpload=async()=>{

   if(!fayl){
    setMSg('No file selected!')
    return
   }


setMSg('Uploading...')

const fd=new FormData()
fd.append('excel_file',fayl)

try {
  const {  data} = await $post(`file/excel_to_word/`,fd)
  // faylsuccesSet(String(data.yuklanadigan papka joyi))
  console.log(data);
  setYuklash(true)
  setMSg('Yulash muvaffaqiyatli boldi!')
  setHujjat(null)
} catch (error) {
  setMSg('Yuklashda Xatolik! Internetni tekshiring')
      console.error(error)
}
  }

  return (
    <div className='text-center mt-5'>
       <h1 className='mb-5'> Hujjatlardan online foydlalanish</h1>
       <input type="file"  accept='.xlsx, .xls' className='form-control  m-auto w-mob' onChange={e=>setHujjat(e.target.files[0])}/>
       <button className='btn btn-primary mt-3' onClick={HandleUpload}>Upload <i className="fa-solid fa-cloud-arrow-up"></i></button>
   
      {
      msg && <span className='d-block my-3 fw-bold'>{msg}</span>
    }
    {
      yulash &&  <button className='btn btn-success' onClick={fileDown}>Tayyor faylni yuklash! <i className="fa-solid fa-cloud-arrow-down"></i></button>
    }
    </div>
  )
}

export default Hujjatlar