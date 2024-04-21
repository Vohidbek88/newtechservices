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


const url ='https://shaxobiddin20.pythonanywhere.com/api/v1/file/dow_word/'
const authHeader =`Token ${token}` 

const options = {
  headers: {
    Authorization: authHeader
  }
};
 await fetch(url, options)
  .then( res => res.blob())
  .then( blob => {
    console.log(blob)
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
link.href = url;
link.setAttribute('download', `AmaliyotFayl.zip`);
 document.body.appendChild(link);
  link.click();
  link.remove()
  setYuklash(false)
  });

}


  const HandleUpload=async()=>{

   if(!fayl){
    setMSg('Avval excel fayl tanlang!!')
    return
   }


setMSg('Serverga yuklanmoqda kuting...')

const fd=new FormData()
fd.append('excel_file',fayl)

try {
  const {  data} = await $post(`file/excel_to_word/`,fd)
  // faylsuccesSet(String(data.yuklanadigan papka joyi))
  console.log(data);
  setYuklash(true)
  setMSg('Serverga yuklash muvaffaqiyatli boldi!')
  setHujjat(null)
  
} catch (error) {
  setMSg('Serverga Yuklashda Xatolik! Internet ulanishni tekshiring')
      console.error(error)
}
  }

  return (
    <div className='text-center mt-5'>
       <h1 className='mb-5'> Hujjatlardan online foydlalanish</h1>
       <p className='text-danger'>O'quvchilarning amaliyot ma'lumotlarini Excel ko'rinishda yuklang!!!</p>
       <div className='text-center'>
       <p className='fw-bold'>Siz serverga yuklayotgan fayl quyidagi shablonga mos bo'lish kerak!</p>
         <a href={'https://docs.google.com/uc?export=download&id=1dj0mHx_rRb9vBY2_eZb-r8vIBfqqgVwi'} download="Example-Excel-document" rel="noopener noreferrer" className='btn btn-info mb-4' target="_blank">Shablonni yuklash</a>
       </div>
       <input type="file"  accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'  className='form-control  m-auto w-mob' onChange={e=>setHujjat(e.target.files[0])}/>
       <button className='btn btn-primary mt-3' onClick={HandleUpload}>Serverga yuklash! <i className="fa-solid fa-cloud-arrow-up"></i></button>
   
      {
      msg && <span className='d-block my-3 fw-bold'>{msg}</span>
    }
    {
      yulash &&  <div className='text-center'>
         <p className='text-success'>O'quvchilarning amaliyot bo'yicha hujjatlari tayyor!</p>
        <button className='btn btn-success' onClick={fileDown} disabled={!yulash}>Tayyor faylni yuklash! <i className="fa-solid fa-cloud-arrow-down"></i></button>
      </div>
    }
    </div>
  )
}

export default Hujjatlar