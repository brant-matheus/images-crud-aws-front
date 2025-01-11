"use client";
import { useState } from "react";
import { Button, Form, Panel, Input, InputGroup } from "rsuite";
import { useAuth } from "./authContext";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";
const styles = {
  width: "100%",
};

interface formValueType {
  email: string;
  password: string;
}
export default function Home() {
  const { userLogin } = useAuth();
  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  const [formValue, setFormValue] = useState<formValueType>({
    email: "user@user.com",
    password: "password",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "##f5f5f4",
      }}
    >
      <Panel
        shaded
        bordered
        bodyFill
        style={{
          display: "inline-block",
          width: "100%",
          maxWidth: 500,
          padding: 30,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
        }}
      >
        <Form
          layout="vertical"
          formValue={formValue}
          onChange={(formValue: Record<string, any>) => {
            const typedFormValue = formValue as formValueType;
            setFormValue(typedFormValue);
          }}
          onSubmit={async () => await userLogin(formValue)}
        >
          <Form.Group controlId="email">
            <Form.ControlLabel>email</Form.ControlLabel>
            <Form.Control name="email" style={{ width: "215%" }} />
            <Form.HelpText tooltip>Required</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <InputGroup inside style={{ width: "100%" }}>
              <Input
                type={visible ? "text" : "password"}
                name="password"
                value={formValue.password}
                onChange={(value) =>
                  setFormValue({ ...formValue, password: value })
                }
              />
              <InputGroup.Button onClick={handleChange}>
                {visible ? <VisibleIcon /> : <EyeCloseIcon />}
              </InputGroup.Button>
            </InputGroup>
          </Form.Group>

          <Button type="submit" style={{ width: "100%", marginTop: 20 }}>
            Login
          </Button>
        </Form>
      </Panel>
    </div>
  );
}
