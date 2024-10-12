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
import { handleChangePassword } from '../../../helpers/api';


interface ChangePassword{
    old:string
    newpwd:string
}
export const UpdatePassword = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<ChangePassword>()
    const [error, setError] = useState("")

    const navigate = useNavigate()


    const handlePasswordChange:SubmitHandler<ChangePassword>  = (data) => {

        const {old, newpwd} = data
       
        
        const changes:ChangePassword = { old, newpwd}
       
        handleChangePassword(changes)
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
                           
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Enter new password</h3>
                           
                            <form onSubmit={handleSubmit(handlePasswordChange)}> 
                                {
                                    errors.old && <p>old password required</p>
                                }
                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='password' placeholder='old password'
                                    {...register("old",{required:true})}
                                    
                                />
                                {
                                    errors.newpwd && <p >new password required</p>
                                }
                                <MDBInput
                                    wrapperClass='mb-4'
                                    type='password' placeholder='new password'
                                    {...register("newpwd",{required:true})}
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

