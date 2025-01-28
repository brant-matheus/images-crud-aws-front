"use client";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputGroup,
  Placeholder,
  Uploader,
} from "rsuite";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/authContext";
import { getLocalStorageData } from "@/utils/getLocalStorageData";
import { useToast } from "../context/toastContext";

export type UserEditModalType = {
  open: () => void;
};

export const UserEditModal = forwardRef((props, ref) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null); //
  const { pushToast } = useToast();
  const { api } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (!selectedFile) {
      setFileError("No file selected.");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size / 1024 > maxSize) {
      setFileError("File size exceeds the 5MB limit.");
      setFile(null);
      return;
    }

    setFileError(null);
    setFile(selectedFile);
  };
  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setUploading(true);
    const { user } = getLocalStorageData();

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await api.put(`/users/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        pushToast({
          text: "Avatar updated successfully",
          type: "success",
        });
        setIsOpen(false);

        localStorage.setItem("userData", JSON.stringify(response.data.user));
      }
    } catch (error) {
      pushToast({
        text: "Error updating avatar",
        type: "error",
      });
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  return (
    <Drawer backdrop={"static"} open={isOpen} onClose={() => setIsOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>Edit avatar profile</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsOpen(false)} appearance="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <input onChange={handleFileChange} type="file" accept="image/*" />
          {fileError && <div className="text-red-500">{fileError}</div>}
          <Button type="submit" appearance="primary" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
        </form>
      </Drawer.Body>
    </Drawer>
  );
});
