"use client";
import { Form, Panel, Input, Button, InputGroup } from "rsuite";
import { useAuth } from "./authContext";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { register } from "module";
const styles = {
  width: "100%",
};

interface formValueType {
  email: string;
  password: string;
}
export default function Home() {
  const { userLogin, isLoading } = useAuth();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Obrigatório"),
    password: Yup.string().required("Obrigatório"),
  });

  const defaultValues = { email: "", password: "" };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  async function onSubmit(formValue: formValueType) {
    await userLogin(formValue);
  }
  return (
    <div className="h-full w-full dark:bg-[#9bceff]">
      <div className="flex justify-center items-center h-screen">
        <Panel
          bordered
          shaded
          style={{
            display: "inline-block",
            width: "100%",
            maxWidth: 500,
            padding: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "#ffff",
          }}
        >
          <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-0">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group>
                  <Form.ControlLabel>Email</Form.ControlLabel>

                  <Input
                    {...field}
                    id={field.name}
                    value={field.value}
                    placeholder="Digite o seu email aqui..."
                  />
                  <Form.ErrorMessage
                    show={!!errors[field.name]?.message}
                    placement="bottomStart"
                  >
                    {errors[field.name]?.message}
                  </Form.ErrorMessage>
                </Form.Group>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Group>
                  <Form.ControlLabel className="mb-8">Senha</Form.ControlLabel>

                  <InputGroup inside style={styles}>
                    <Input
                      {...field}
                      type={visible ? "text" : "password"}
                      id={field.name}
                      value={field.value}
                      placeholder="Digite sua senha aqui..."
                    />

                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                    </InputGroup.Button>
                    <Form.ErrorMessage
                      show={!!errors[field.name]?.message}
                      placement="bottomStart"
                    >
                      {errors[field.name]?.message}
                    </Form.ErrorMessage>
                  </InputGroup>
                </Form.Group>
              )}
            />
            <Button appearance="primary" type="submit" loading={isLoading}>
              Entrar
            </Button>
          </Form>
        </Panel>
      </div>
    </div>
  );
}
