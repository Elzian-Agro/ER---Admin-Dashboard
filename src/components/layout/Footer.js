import { Layout, Row, Col } from "antd";
import { FaTree } from 'react-icons/fa';

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2022, developed by &nbsp;
            <FaTree style={{color:'green'}}/>
            <a href="https://agro.elzian.com/" className="font-weight-bold">
              ELZIAN AGRO
            </a>
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
              <li className="nav-item">
                <a
                  href="https://www.restore.earth/"
                  className="nav-link text-muted"
                >
                  Earth Restoration
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
