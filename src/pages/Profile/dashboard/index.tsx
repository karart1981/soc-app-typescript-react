import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../helpers/types";
import { useRef } from "react";
import { handleUpload, handleUploadCover } from "../../../helpers/api";
import { BASE, DEF } from "../../../helpers/default";

export function Profile() {
  const { account, setAccount } = useOutletContext<IContext>();
  const photo = useRef<HTMLInputElement | null>(null);
  const cover = useRef<HTMLInputElement | null>(null);

  const handleChoose = () => {
    const file = photo.current?.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("picture", file);
      handleUpload(form)
      .then((response) => {
        console.log(response)
        setAccount({ ...account, picture: response.payload as string });
      });
    }
  };

  const chooseCover = () => {
    const file = cover.current?.files?.[0];
    console.log(file)
    if (file) {
      const form = new FormData();
      form.append("cover", file);
      handleUploadCover(form).then((response) => {
        setAccount({ ...account, cover: response.payload as string });
      });
    }
  };

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9DE2FF" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{
                  backgroundImage: `url('${
                    account.cover ? BASE + account.cover : DEF
                  }')`,
                  height: "200px",
                  cursor: "pointer",
                }}
                onClick={() => cover.current?.click()}
              >
                <input
                  style={{ display: "none" }}
                  type="file"
                  ref={cover}
                  onChange={chooseCover}
                />
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                  onClick={() => photo.current?.click()}
                >
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={photo}
                    onChange={handleChoose}
                  />
                  <MDBCardImage
                    onClick={() => photo.current?.click()}
                    src={account.picture ? BASE + account.picture : DEF}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    {account.name} {account.surname}
                  </MDBTypography>
                  <MDBCardText>web developer</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">0</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Photos
                    </MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{account.followers?.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Followers
                    </MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{account.following?.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Following
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#F8F9FA" }}>
                    <MDBCardText className="font-italic mb-1">
                      Web Developer
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-1">
                      Lives in Yerevan
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-0">
                      Armenia
                    </MDBCardText>
                  </div>
                </div>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
