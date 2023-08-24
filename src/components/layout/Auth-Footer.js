// import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  LinkedinOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { FaTree } from 'react-icons/fa';

const { Footer } = Layout;



//This part is related to the Web site authentication page footer
export default function AuthFooter() {

  const currentYear = new Date().getFullYear();
  console.log("year", currentYear)


  return (
    <Footer>
      <Menu mode="horizontal">
        <Menu.Item key={1}>
          <a href="https://restore.earth/index.html">Company</a>
        </Menu.Item>
        <Menu.Item key={2}>
          <a href="https://restore.earth/index.html#about">About Us</a>
        </Menu.Item>
      </Menu>



      <Menu mode="horizontal" className="menu-nav-social">
        <Menu.Item key={3}>
          {/* <Link to="#">{<FacebookOutlined />}</Link> */}
          <a href="#abc">{<FacebookOutlined />}</a>
        </Menu.Item>



        <Menu.Item key={4}>
          {/* <Link to="#">{<InstagramOutlined />}</Link> */}
          <a href="#abc">{<InstagramOutlined />}</a>
        </Menu.Item>



        <Menu.Item key={5}>

          <a href="https://www.linkedin.com/company/earth-restoration/">{<LinkedinOutlined />}</a>
        </Menu.Item>



        <Menu.Item key={7}>
          {/* <Link to="#">{<TwitterOutlined />}</Link> */}
          <a href="#abc">{<TwitterOutlined />}</a>
        </Menu.Item>
      </Menu>



      <div className="copyright">
        © {currentYear}, developed by&nbsp;
        <FaTree style={{ color: 'green' }} />
        <a href="https://agro.elzian.com/" className="font-weight-bold">
          ELZIAN AGRO
        </a>
      </div>



    </Footer>
  );
}
