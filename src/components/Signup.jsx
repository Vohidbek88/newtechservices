
import {  useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { signUserFailure, signUserStart, signUserSuccess } from "../slice/auth"
import { useHttp } from "../service/httpRequest"
const Signup = () => {
  const { $get , $post } = useHttp()
  const {isLoading, sign_error}=useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [seconname, setsecondName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  //asosiy mana shu yerda sinovda lekin xtolik
  const submit = async (e) => {
    e.preventDefault();

    const userdata = {
      email: email,
      password: password,
      password2: confirmpassword,
      first_name: name,
      last_name: seconname,
    }
    // user/register/
dispatch(signUserStart())
    try {
      
      const {data}= await $post(`user/register/`,userdata);
      console.log(data);

      dispatch(signUserSuccess(data))

        navigate('/login')
    } catch (error) {
      console.log(error)
      dispatch(signUserFailure(error.message))
    }

   
  }






return (
  <main className="form-signin w-mob m-auto">
    <form className="p-md-0 m-md-0 p-lg-4 m-lg-4" onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Ro'yhatdan O'ting</h1>
      {
        sign_error ? <p className='alert alert-danger'>Kiritilgan ma'lumotlarni qayta tekshiring!</p>:''
      }
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInputIsm"
          placeholder="name@example.com"
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="floatingInputIsm">Ism</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInputFamilya"
          placeholder="name@example.com"
          onChange={e => setsecondName(e.target.value)}
        />
        <label htmlFor="floatingInputFamilya">Familya</label>
      </div>
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Emailni kiriting</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="form-floating">

        <input
          type="password"
          className="form-control"
          id="floatingPasswordConfirm"
          placeholder="Password Confirm"
          onChange={e => setConfirmpassword(e.target.value)}
        />
        <label htmlFor="floatingPasswordConfirm">Passwordni takrorlang</label>
      </div>
      <button disabled={isLoading} className="btn btn-primary w-100 py-2 mt-2" type="submit">
        Ro'yhatdan o'tish
      </button>
      <p className="mt-2">
        Ro'yhatdan O'tkanmisiz{" "}
        <NavLink to="/login" className="btn btn-link">
          Login
        </NavLink>
      </p>
    </form>
  </main>

)
}

export default Signup