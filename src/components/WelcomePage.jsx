import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/WelcomePage.css';

export default function WelcomePage(){

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [error,setError] = useState(false);

    function handleSubmit(){
        if(name===''){
            return setError(true);
        }
        navigate('/selection',{state:{name}})
    }

    return(
    <>
    
    <div className='Container'>
    <h1 className='name_heading'>Please Enter your Name</h1>
    <input className='name_input' placeholder='Enter Your Name' onChange={(event)=>{
        setName(event.target.value)}}></input>
        {error && <p className='error_name'>Please Enter Your Name</p>}
    <button className='welcome_button' value={name} onClick={handleSubmit}>Enter</button>
    </div>
    </>
    )
}