import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useLogOut } from "../../auth/hooks/use-log-out";

const UserAvatar = () => {
  const logout = useLogOut();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={logout}>Đăng xuất</span>,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Avatar className="cursor-pointer">
        {currentUser.fullName?.slice(0, 1)}
      </Avatar>
    </Dropdown>
  );
};

export default UserAvatar;
