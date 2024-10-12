import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
}
from 'mdb-react-ui-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleChangeLogin } from '../../../helpers/api';

interface ChangeLogin{
    password:string
    login:string
}
export const UpdateLogin = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<ChangeLogin>()
    const [error, setError] = useState("")

    const navigate = useNavigate()


    const handleLoginChange:SubmitHandler<ChangeLogin>  = (data) => {

        const {password, login} = data
        
        const changes:ChangeLogin = { password, login}
        handleChangeLogin(changes)
        .then(response => {
            if(response.status == "error" && response.message){
                setError(response.message)
                
            } else {
                setError("")
                navigate("/profile")
                
            }
        
    })
}


    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
        

                        <MDBCardBody className='px-5'>
                           
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Change Login</h3>
                           
                            <form onSubmit={handleSubmit(handleLoginChange)}> 
                                {
                                errors.password && <p>password required</p>
                                }
                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='password' placeholder='password'
                                    {...register("password", {required:true})}
                                />
                                {
                                   errors.login && <p>new login required</p>
                                }
                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='text' placeholder='new login'
                                    {...register("login",{required:true})}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

