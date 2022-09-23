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
import { useState, useEffect } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  Upload,
  message,
  Modal,
  Form,
  Input,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/pexels-richa-sharma-4217311.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import project1 from "../assets/images/qr-code.png";
import project2 from "../assets/images/qr-code.png";
import project3 from "../assets/images/qr-code.png";
import DataService from "../services/data-service";

function Profile() {
  const [imageURL, setImageURL] = useState(false);
  const [setLoading] = useState(false);
  const [data, setdata] = useState({});

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
  const [modaldata, setModaldata] = useState({});
  const [profileInfo, setProfileInfo] = useState("");

  const [form] = Form.useForm();

  const { getProfile, updateAdminDetails } = DataService();

  useEffect(() => {
    async function fetchData() {
      const res = await getProfile();
      setUserName(res.userName);
      setUserType(res.userType);
      setFullName(res.fullName);
      setMobile(res.mobile.toString());
      setEmail(res.email);
      setTwitterLink(res.twitterLink);
      setFacebookLink(res.facebookLink);
      setInstragramLink(res.instragramLink);
      setLocation(res.location);
      setProfImage(res.profImage);
      setProfileInfo(res.profileInfo);
      setdata(res);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };

  // const beforeUpload = (file) => {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  // const handleChange = (info) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(false);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     getBase64(info.file.originFileObj, (imageUrl) => {
  //       setLoading(false);
  //       setImageURL(false);
  //     });
  //   }
  // };

  // console.log(imageURL);

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>View New Project</div>
    </div>
  );

  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (data) => {
    setModaldata(data);
    setIsModalVisible(true);
  };

  const handleUpdatelick = () => {
    const admin = {
      // id: modaldata.id,
      fullName: modaldata.fullName,
      mobile: modaldata.mobile.toString(),
      image: modaldata.profImage,
      location: modaldata.location,
      twitterLink: modaldata.twitterLink,
      facebookLink: modaldata.facebookLink,
      instragramLink: modaldata.instragramLink,
      profileInfomation: modaldata.profileInfo,
    };
    console.log(admin);

    updateAdminDetails(admin);
    getProfile();
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: '$"label" is required!',
    types: {
      email: '$"label" is not a valid email!',
      number: '$"label" is not a valid number!',
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleSubmit = () => {};

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profImage} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{fullName}</h4>
                  <p>{userName}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  showModal(data);

                  form.setFieldsValue({
                    // id: data.id,
                    fullName: data.fullName,
                    mobile: data.mobile,
                    location: data.location,
                    twitterLink: data.twitterLink,
                    facebookLink: data.facebookLink,
                    instragramLink: data.instragramLink,
                    profileInfo: data.profileInfo,
                    // profImage: data.profImage,
                  });
                }}
              >
                Update Profile
              </Button>
              <Modal
                title="Update Personal Information"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <Form {...layout} form={form}>
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[
                      {
                        pattern: "^[A-Za-z]",
                        message: "Please enter Full name",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 3 },
                    ]}
                  >
                    <Input
                      name="fullName"
                      onChange={(event) => {
                        setModaldata({
                          ...modaldata,
                          fullName: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="mobile"
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Mobile Number",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 10 },
                      { max: 10 },
                    ]}
                  >
                    <Input
                      name="mobile"
                      onChange={(event) => {
                        setModaldata({
                          ...modaldata,
                          mobile: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="location"
                    label="Location"
                    rules={[
                      {
                        pattern: "^[A-Za-z]",
                        message: "Please enter Location",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 4 },
                    ]}
                  >
                    <Input
                      name="location"
                      onChange={(event) => {
                        setModaldata({
                          ...modaldata,
                          location: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="profImage" label="Profile Image">
                    <Input
                      type="file"
                      accept="image/jpeg"
                      onChange={(event) => {
                        setModaldata({
                          ...modaldata,
                          profImage: event.target.files[0],
                        });
                      }}
                    />
                    {/* <img src={selectedFile} alt="img" /> */}
                  </Form.Item>
                  <Form.Item
                    name="profileInfo"
                    label="Profile Infomation"
                    rules={[
                      {
                        pattern: "^[A-Za-z]",
                        message: "Please enter Profile Infomation",
                      },
                      {
                        whitespace: true,
                      },
                      { min: 5 },
                    ]}
                  >
                    <Input
                      name="profileInfo"
                      onChange={(event) => {
                        setModaldata({
                          ...modaldata,
                          profileInfo: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="twitterLink" label="Twitter Link">
                    <Input
                      name="twitterLink"
                      onChange={(event) => {
                        setModaldata({
                          ...modaldata,
                          twitterLink: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="facebookLink" label="Facebook Link">
                    <Input
                      name="facebookLink"
                      onChange={(event) => {
                        setModaldata({
                          ...modaldata,
                          facebookLink: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="instragramLink" label="Instragram Link">
                    <Input
                      name="instragramLink"
                      onChange={(event) => {
                        setModaldata({
                          ...modaldata,
                          instragramLink: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  {/* <Form.Item
                    name={["user", "profileinfo"]}
                    label="Profile Information"
                  >
                    <Input.TextArea />
                  </Form.Item> */}
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                      key="submit"
                      type="submit"
                      onClick={() => handleUpdatelick(modaldata)}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={12} offset={6} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            // extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">{profileInfo}</p>
            <hr className="my-25" />
            <Descriptions title={userName}>
              <Descriptions.Item label="Full Name" span={3}>
                {fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {mobile}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {email}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {location}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="{twitterLink}" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="{facebookLink}" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="{instragramLink}" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
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
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
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
