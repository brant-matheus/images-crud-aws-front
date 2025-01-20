"use client";
import { Dropdown, Avatar } from "rsuite";
import { useAuth } from "../context/authContext";
import { UserType } from "../context/authContext";
interface AvatarProps {
  user: UserType;
}
const avatarPlacerholder = "https://avatar.iran.liara.run/public";

const renderToggle = (props: any, user: UserType) => (
  <Avatar circle {...props} src={(user && user.avatar) ?? avatarPlacerholder} />
);

export default function AvatarElement({ user }: AvatarProps) {
  const { userLogout } = useAuth();

  return (
    <Dropdown
      renderToggle={(props) => renderToggle(props, user)}
      placement="bottomEnd"
    >
      <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
        <p>Signed in as</p>
        <strong>{(user && user.fullName) ?? "user"}</strong>
      </Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item onClick={async () => await userLogout()}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
