import {  MDBCard, MDBCardBody, MDBContainer } from "mdb-react-ui-kit";
import { UpdatePrivacy } from "../../../components/Settings/UpdatePrivacy";
import { UpdateLogin } from "../../../components/Settings/UpdateLogin";
import { UpdatePassword } from "../../../components/Settings/UpdatePassowrd";

export const Settings = () => {
  

  return (
    <MDBContainer className="py-5">
      <MDBCard>
        <MDBCardBody className="p-4">
            <UpdatePrivacy/>
            <UpdateLogin />
            <UpdatePassword />
          </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
