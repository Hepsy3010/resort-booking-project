import React ,{useState, useEffect} from 'react'
import Loader from "../components/Loader";
import Error from '../components/Error';
import axios from"axios"
function Loginscreen() {
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const [loading, setLoading] = useState(false); // Initialize loading as true
  const [error, setError] = useState();

  async function Login(){
   
    const user={
      email,
      password
      
    }
    try {
      setLoading(true);
      const result= (await axios.post('/api/users/login',user)).data
      setLoading(false);
      console.log(result);

      localStorage.setItem('currentuser',JSON.stringify(result));
      window.location.href='/home'



    } catch (error) {
      console.log(error)
      setLoading(false);
      setError(true)
    }
   
   }
  return (
    <div>
      {loading && (<Loader/>)}
       <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error &&(<Error message='Invalid credentionals'/>)}

          <div className='bs'>
            <h2>Login</h2>
           
            <input type="text" className="form-control" placeholder="email"
            value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="text" className="form-control" placeholder="password"
            value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            
            
            <button className='btn btn-primary mt-3'onClick={Login}>Login</button>
          </div>
        </div>
       </div>
    </div>

  )
}

export default Loginscreen