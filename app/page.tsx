"use client";
import { Form, Panel, Input, Button, InputGroup } from "rsuite";
import { useAuth } from "./authContext";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
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

  const defaultValues = { email: "", password: "" };
  const { control, handleSubmit } = useForm({ defaultValues });

  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  async function onSubmit(formValue: formValueType) {
    console.log(formValue);
  }
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
        <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                placeholder="email"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputGroup inside style={styles}>
                <Input
                  type={visible ? "text" : "password"}
                  id={field.name}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="senha"
                />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                </InputGroup.Button>
              </InputGroup>
            )}
          />

          <Button appearance="primary" type="submit">
            Entrar
          </Button>
        </Form>
      </Panel>
    </div>
  );
}
