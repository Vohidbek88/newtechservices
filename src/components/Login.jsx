
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { signUserFailure, signUserStart, signUserSuccess,loginFailure } from "../slice/auth"
import { useHttp } from "../service/httpRequest"


const Login = () => {
  const { $post } = useHttp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {isLoading,isLoggedin,login_error}=useSelector(state=>state.auth)
  const submit=async(e)=>{
    e.preventDefault();

    const userdata={
      email,
      password,
    }
    // user/login/

    dispatch(signUserStart())
    try {
      const {data}= await $post(`user/login/`,userdata)
      console.log(data);
      localStorage.setItem('token',data.token)
      dispatch(signUserSuccess(data))
     
        navigate('/hujjat')
  
      
    } catch (error) {

      dispatch(loginFailure(error.message))
      dispatch(signUserFailure(null))
    }

  
  }

  // useEffect(() => {
  //   if(isLoggedin){
  //     navigate('/')
  //   }
  //   }, [isLoggedin])
    

  return (
    <main className="form-signin w-mob m-auto">
  <form className="p-md-0 m-md-0 p-lg-4 m-lg-4" onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Login bilan kiring</h1>
    {
        login_error ? <p className='alert alert-danger'>Login yoki parol xato!</p>:''
      }
    <div className="form-floating">
      <input
        type="email"
        className="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        onChange={e=>setEmail(e.target.value)}
      />
      <label htmlFor="floatingInput">Emailni kiriting</label>
    </div>
    <div className="form-floating">

        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />
      <label htmlFor="floatingPassword">Password</label>
    </div>
    <button disabled={isLoading} className="btn btn-primary w-100 py-2 mt-2" type="submit">
      Login
    </button>
    <p className="mt-2">
      Ro'yhatdan O'tmagamisiz{" "}
      <NavLink to="/signup" className="btn btn-link">
        Ro'yhatdan o'tish
      </NavLink>
    </p>
  </form>
</main>

  )
}

export default Login