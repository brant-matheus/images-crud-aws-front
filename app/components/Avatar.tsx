"use client";
import { Dropdown, Avatar } from "rsuite";
import { useAuth } from "../context/authContext";
import { UserType } from "../context/authContext";
import { useRef } from "react";
import { UserEditModal, UserEditMoodalType } from "./UserEditModal";
interface AvatarProps {
  user: UserType;
}
const avatarPlacerholder = "https://avatar.iran.liara.run/public";

const renderToggle = (props: any, user: UserType) => (
  <Avatar
    color="cyan"
    bordered
    circle
    {...props}
    src={(user && user.avatar) ?? avatarPlacerholder}
  />
);

export default function AvatarElement({ user }: AvatarProps) {
  const { userLogout } = useAuth();

  const editUserModalRef = useRef<UserEditMoodalType>(null);
  return (
    <>
      <UserEditModal ref={editUserModalRef} />
      <Dropdown
        renderToggle={(props) => renderToggle(props, user)}
        placement="bottomEnd"
      >
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          <strong>{(user && user.fullName) ?? "user"}</strong>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onClick={() => editUserModalRef.current?.open()}>
          Settings
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onClick={async () => await userLogout()}>
          Sign out
        </Dropdown.Item>
      </Dropdown>
    </>
  );
}
