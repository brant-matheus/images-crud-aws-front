"use client";
import { Icon } from "@rsuite/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Content,
  Footer,
  Header,
  Nav,
  Sidebar,
  Sidenav,
} from "rsuite";
import AvatarElement from "../components/Avatar";
import { Brand, NavToggle } from "../components/SideBarElements";
import { UserType } from "../context/authContext";
import { FaUserCircle } from "react-icons/fa";
import { FaImages } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expand, setExpand] = useState(true);
  const [user, setUser] = useState<UserType>();
  const router = useRouter();

  const getLocalStorage = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return { token, user };
  };
  useEffect(() => {
    const { token, user } = getLocalStorage();
    if (!token || !user) {
      router.push("/");
    }

    setUser(JSON.parse(user!));
  }, []);

  return (
    <Container className="h-screen">
      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8f9fa",
        }}
        collapsible
        width={expand ? 260 : 56}
      >
        <Sidenav.Header>
          <Brand expand={expand} />
        </Sidenav.Header>

        <Sidenav expanded={expand} defaultOpenKeys={["3"]} appearance="subtle">
          <Sidenav.Body>
            <Nav defaultActiveKey="images">
              <Nav.Item
                eventKey="images"
                onClick={() => router.push("/images")}
                icon={<Icon as={FaImages} />}
              >
                Images
              </Nav.Item>
              <Nav.Item
                eventKey="users"
                onClick={() => router.push("/users")}
                icon={<Icon as={FaUserCircle} />}
              >
                Users
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>

      <Container>
        <Header className="page-header flex justify-between ">
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
          <div className="mr-5">
            <AvatarElement user={user!} />
          </div>
        </Header>
        <Content>{children} </Content>
        <Footer>
          <p className="text-center">
            &copy; {new Date().getFullYear()} AWS S3 Images managment CRUD
          </p>
        </Footer>
      </Container>
    </Container>
  );
}
