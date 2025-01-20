import { FaAws } from "react-icons/fa";

import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { HStack, IconButton, Text } from "rsuite";

export const Brand = ({ expand }: { expand: boolean }) => {
  return (
    <HStack
      className="page-brand"
      style={expand ? {} : { justifyContent: "center" }}
      spacing={20}
    >
      <FaAws size={35} />
      {expand && <Text size={16}>CRUD AWS S3</Text>}
    </HStack>
  );
};

export const NavToggle = ({
  expand,
  onChange,
}: {
  expand: boolean;
  onChange: () => void;
}) => {
  return (
    <IconButton
      onClick={onChange}
      appearance="subtle"
      size="lg"
      icon={expand ? <MdKeyboardArrowLeft /> : <MdOutlineKeyboardArrowRight />}
    />
  );
};
