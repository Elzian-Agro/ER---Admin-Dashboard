/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect, useReducer } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Upload,
  // message,
  Modal,
  Form,
  Input,
} from "antd";

import {
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/pexels-richa-sharma-4217311.jpg";
// import profilavatar from "../assets/images/face-1.jpg";
import project1 from "../assets/images/EveningTree.png";
import project2 from "../assets/images/DaveStarbelly.png";
import project3 from "../assets/images/Valinor.png";
import DataService from "../services/data-service";
import { MdEmail, MdFacebook, MdLocationOn, MdPhone } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Profile() {
  // const [imageURL, setImageURL] = useState(false);
  const [imageURL] = useState(false);
  // const [setLoading] = useState(false);
  // const [data, setdata] = useState({});

  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instragramLink, setInstragramLink] = useState("");
  const [location, setLocation] = useState("");
  const [profImage, setProfImage] = useState("");
  const [profileInfo, setProfileInfo] = useState("");
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updateFullname, setupdateFullname] = useState("");
  const [updateMobile, setupdateMobile] = useState("");
  const [updateLocation, setupdateLocation] = useState("");
  const [updateTwitterLink, setupdateTwitterLink] = useState("");
  const [updateFacebookLink, setupdateFacebookLink] = useState("");
  const [updateInstagramLink, setupdateInstagramLink] = useState("");
  const [updateProfileinfo, setupdateProfileinfo] = useState("");
  const [updateImagePath, setUpdateImagePath] = useState();
  const [checkTempupdateImagePath, setCheckTempUpdateImagePath] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [form] = Form.useForm();

  const { getProfile, updateAdminDetails } = DataService();

  useEffect(() => {
    async function fetchData() {
      const res = await getProfile();
      setUserName(res.userName);
      setUserType(res.userType);
      setFullName(res.fullName);
      setMobile(res.mobile);
      setEmail(res.email);
      setTwitterLink(res.twitterLink);
      setFacebookLink(res.facebookLink);
      setInstragramLink(res.instragramLink);
      setLocation(res.location);
      setProfImage(res.profImage);
      setProfileInfo(res.profileInfo);
      // setdata(res);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ignored]);


  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>View New Project</div>
    </div>
  );


  //QR code section
  const project = [
    {
      img: project1,
      //titlesub: "Project #1",
      title: "Oka Tree",
      description:
        "Tree in red color evening",
        link:"https://testnets.opensea.io/assets/mumbai/0x919c55A13DFfd2351c11068353DF303304b47900/100"
    },
    {
      img: project2,
      //titlesub: "Project #2",
      title: "Coconut Tree",
      description:
        "Friendly OpenSea Creature that enjoys long swims in the ocean.",
        link:"https://testnets.opensea.io/assets/mumbai/0x919c55A13DFfd2351c11068353DF303304b47900/1005"
    },
    {
      img: project3,
      //titlesub: "Project #3",
      title: "Oka Tree two",
      description:
        "Two trees of valinor, lord of the rings.",
        link:"https://testnets.opensea.io/assets/mumbai/0x919c55A13DFfd2351c11068353DF303304b47900/1007"
    },
  ];



  const handleUpdatelick = async () => {
    const formData = new FormData();

    formData.append("fullName", updateFullname);
    formData.append("mobile", updateMobile);
    formData.append("location", updateLocation);
    formData.append("twitterLink", updateTwitterLink);
    formData.append("facebookLink", updateFacebookLink);
    formData.append("instragramLink", updateInstagramLink);
    formData.append("profileInfomation", updateProfileinfo);
    formData.append("image", updateImagePath);
    

    try {
      await updateAdminDetails(formData);
      setIsUpdateModalVisible(false);
      getProfile();
      forceUpdate();

    } catch (error) {
      console.log(error);
      setIsUpdateModalVisible(false);
    }
  };


  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };
 


  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      >
        {" "}
      </div>
      <Card
        className="card-profile-head"
        bordered={false}
        // title={<h6 className="font-semibold m-0">Profile Information</h6>}
        // extra={<Button type="link">{pencil}</Button>}
        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
      >
        {/* <Avatar size={170} shape="circle" src={profImage}
          style={{marginTop:"20px", marginLeft:"30px"}}/> */}
        <div style={{ borderRadius: "10px", padding: "10px" }}>
          <Row gutter={[16, 16]}>
            <Col>
              <div
                style={{
                  marginLeft: "50px",
                  marginTop: "40px",
                  marginRight: "10px",
                }}
              >
                <Avatar
                  shape="circle"
                  style={{ borderTopLeftRadius: 1 }}
                  size={240}
                  src={profImage}
                ></Avatar>
              </div>
            </Col>
            <Col md={12} xs={24}>
              <div
                style={{
                  fontSize: "35px",
                  textAlign: "justify",
                  fontWeight: "bold",
                 // fontFamily: "Cursive",
                  marginTop: "20px",
                  marginLeft: "20px",
                }}
              >
                {fullName}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  //fontFamily: "Cursive",
                  marginTop: "5px",
                  marginLeft: "20px",
                  textAlign: "justify",
                  fontWeight: "bold"
                }}
              >
                <b></b>
                <MdAdminPanelSettings /> {userType}
              </div>
              <div
         
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  //fontFamily: "Cursive",
                  marginTop: "20px",
                  marginLeft: "20px",
                  textAlign: "justify",
                }}
              >
                <b></b> {profileInfo}
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col
              style={{
                marginTop: "30px",
                fontSize: "20px",
                textAlign: "left",
                marginLeft: "50px",
                fontWeight: "bold",
               // fontFamily: "Cursive",
                marginRight: "50px",
              }}
            >
              <div>
                <AccountCircleIcon /> : {userName}
              </div>
            </Col>
            <Col
              style={{
                marginTop: "30px",
                fontWeight: "bold",
                fontSize: "20px",
                marginLeft: "50px",
                textAlign: "left",
               // fontFamily: "Cursive",
                marginRight: "50px",
              }}
            >
              <div>
                <MdPhone /> : {mobile}
              </div>
            </Col>
            <Col
              style={{
                marginTop: "30px",
                fontSize: "20px",
                marginLeft: "50px",
                marginRight: "50px",
                textAlign: "left",
                fontWeight: "bold"
               // fontFamily: "Cursive",
              }}
            >
              <div>
                <MdEmail /> : {email}
              </div>
            </Col>
            <Col
              style={{
                marginTop: "30px",
                fontSize: "20px",
                marginLeft: "50px",
                textAlign: "left",
                fontWeight: "bold"
               // fontFamily: "Cursive",
              }}
            >
              <div>
                <MdLocationOn /> : {location}
              </div>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "35px",
              marginLeft: "50px",
              marginBottom: "10px",
            }}
          >
            <div>
              <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
              <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "25px", marginLeft: "50px" }}
              >
                <MdFacebook size={26} style={{ color: "#344e86" }} />
              </a>
              <a
                href={instragramLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "25px", marginLeft: "50px" }}
              >
                <InstagramIcon style={{ color: "#e1306c" }} />
              </a>
            </div>

            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                 color: "white",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  showUpdateModal();
                  setupdateFullname(fullName);
                  setupdateMobile(mobile);
                  setupdateLocation(location);
                  setupdateFacebookLink(facebookLink);
                  setupdateTwitterLink(twitterLink);
                  setupdateInstagramLink(instragramLink);
                  setupdateProfileinfo(profileInfo);
                  setUpdateImagePath(profImage);
                  setCheckTempUpdateImagePath(profImage);

                  form.setFieldsValue({
                    updateFullname: fullName,
                    updateMobile: mobile,
                    updateLocation: location,
                    updateTwitterLink: twitterLink,
                    updateFacebookLink: facebookLink,
                    updateInstagramLink: instragramLink,
                    updateProfileinfo: profileInfo,
                    updateImagePath: profImage,
                  });
                }}
              >
                
                Update Profile
              </Button>
              <Modal
                title="Update Personal Information"
                visible={isUpdateModalVisible}
                onOk={() => {
                  handleUpdatelick();
                }}
                onCancel={handleUpdateCancel}
                okButtonProps={{ disabled: buttonDisabled }}
                destroyOnClose={true}
              >
                <Form
                  autoComplete="off"
                  form={form}
                  onFieldsChange={() => {
                    if (
                      !updateFullname ||
                      !updateMobile ||
                      !updateLocation ||
                      !updateProfileinfo ||
                      !updateTwitterLink ||
                      !updateInstagramLink ||
                      !updateFacebookLink
                    ) {
                      setButtonDisabled(true);
                    } else if (
                      form
                        .getFieldsError()
                        .some((field) => field.errors.length > 0)
                    ) {
                      setButtonDisabled(true);
                    } else {
                      setButtonDisabled(false);
                    }
                  }}
                >
                  <Form.Item
                    name="updateFullname"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        pattern: "^[A-Za-z]",
                        message: "Please enter Full name",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 3 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="updateFullname"
                      onChange={(event) =>
                        setupdateFullname(event.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="updateMobile"
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        pattern: "^[0-9]{10}$",
                        message: "Please Enter valid Mobile Number",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 10 },
                      { max: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="updateMobile"
                      onChange={(event) => setupdateMobile(event.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="updateLocation"
                    label="Location"
                    rules={[
                      {
                        required: true,
                        pattern: "^[A-Za-z]",
                        message: "Please enter Location",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 4 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="updateLocation"
                      onChange={(event) =>
                        setupdateLocation(event.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item name={["user", "image"]} label="Profile Image">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        setUpdateImagePath(event.target.files[0]);
                        setButtonDisabled(false);
                      }}
                    />
                    <br />

                    {updateImagePath === checkTempupdateImagePath ? (
                      <img src={updateImagePath} alt="img" />
                    ) : (
                      <img
                        src={URL.createObjectURL(updateImagePath)}
                        alt="img"
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    name="updateProfileinfo"
                    label="Profile Infomation"
                    rules={[
                      {
                        required: true,
                        pattern: "^[A-Za-z]",
                        message: "Please enter Profile Infomation",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 5 },
                      { max: 250 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="updateProfileinfo"
                      onChange={(event) =>
                        setupdateProfileinfo(event.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="updateTwitterLink"
                    label="Twitter Link"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Twitter Link",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 5 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="updateTwitterLink"
                      onChange={(event) =>
                        setupdateTwitterLink(event.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="updateFacebookLink"
                    label="Facebook Link"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Facebook Link",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 5 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="updateFacebookLink"
                      onChange={(event) =>
                        setupdateFacebookLink(event.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="updateInstagramLink"
                    label="Instragram Link"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Instragram Link",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 5 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      name="updateInstagramLink"
                      onChange={(event) =>
                        setupdateInstagramLink(event.target.value)
                      }
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>
        </div>
      </Card>


      {/* <Card
      bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">
              OpenSea Links
            </h6>
          </>
        }
      >

      <div>
              <a 
              href={twitterLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                marginTop: "30px",
                fontSize: "20px",
                textAlign: "left",
                marginLeft: "50px",
                fontFamily: "Cursive",
                marginRight: "50px",
              }}
              
              >
                <a href="https://testnets.opensea.io/assets/mumbai/0x919c55A13DFfd2351c11068353DF303304b47900/1004" target=" ">Oak Tree</a>
              </a>

              <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                marginTop: "30px",
                fontSize: "20px",
                textAlign: "left",
                marginLeft: "50px",
                fontFamily: "Cursive",
                marginRight: "50px",
              }}
              >
                <a href="https://testnets.opensea.io/assets/mumbai/0x919c55A13DFfd2351c11068353DF303304b47900/1005" target=" ">Coconut Tree</a>

              </a>


              <a
                href={instragramLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                marginTop: "30px",
                fontSize: "20px",
                textAlign: "left",
                marginLeft: "50px",
                fontFamily: "Cursive",
                marginRight: "50px",
              }}
              >
                <a href="https://testnets.opensea.io/assets/mumbai/0x919c55A13DFfd2351c11068353DF303304b47900/1007" target=" ">Oak Tree 2</a>
              </a>
            </div>
      </Card> */}

      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">
              Blockchain Secured C-PES Production Verification System
            </h6>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
               hoverable
                bordered={false}
                className="card-project"
                cover={
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                  <img alt="example" src={p.img} />
                </a>
              }
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.title}</h5>
                <p>{p.description}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    {/* <Button type="button">VIEW PROJECT</Button> */}
                  </Col>
                </Row>
              </Card>
              
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader projects-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // beforeUpload={beforeUpload}
              // onChange={handleChange}
            >
              {imageURL ? (
                <img src={imageURL} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default Profile;
