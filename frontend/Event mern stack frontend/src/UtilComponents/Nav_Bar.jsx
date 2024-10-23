import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Nav_Bar() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "userdata",
    "city",
  ]);
  const [cities, setCities] = useState(["Mumbai", "Delhi", "Pune"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const changeCity = (e) => {
    setCookie("city", e.currentTarget.innerHTML);
    navigate(`/${e.currentTarget.innerHTML}`);
  };
  useEffect(() => {
    if (cookie.token && cookie.userdata) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookie.token, cookie.userdata]);
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("userdata");
    navigate("/", { replace: true });
  };

  return (
    <div className="">
      <Navbar expand="lg" className="bg-transparent">
        <Container fluid>
          <Navbar.Brand href="#">MDsider</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
              {isLoggedIn ? (
                <></>
              ) : (
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
              )}

              <NavDropdown
                title={cookie.city ? cookie.city : ""}
                id="navbarScrollingDropdown"
              >
                {cities.map((city, ind) => {
                  return (
                    <NavDropdown.Item
                      key={ind}
                      onClick={changeCity}
                      value={city}
                    >
                      {city}
                    </NavDropdown.Item>
                  );
                })}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    {isLoggedIn ? (
                      <AvatarImage src="https://github.com/shadcn.png" />
                    ) : (
                      <AvatarImage src="https://cdn.icon-icons.com/icons2/876/PNG/512/user-circle_icon-icons.com_68282.png" />
                    )}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-orders")}>
                    My Orders
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Nav_Bar;
