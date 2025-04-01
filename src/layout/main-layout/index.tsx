import { Layout } from "antd";
import { PropsWithChildren, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useIsAuthenticated } from "../../auth/hooks/use-is-authenticated";
import NotAuthenSider from "./not-authen-sider";
import AuthenSider from "./authen-sider";
import SiderHeader from "./sider-header";
import LayoutContext from "./context";

const { Sider, Content } = Layout;

const MainLayout = (props: PropsWithChildren) => {
  const isAuthenticated = useIsAuthenticated();
  const [collapsed, setCollapsed] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const toggleCollapsed = (collapsed?: boolean) => {
    if (typeof collapsed !== "undefined") setCollapsed(collapsed);
    return setCollapsed((prev) => !prev);
  };

  return (
    <LayoutContext.Provider
      value={{
        collapsed,
        setCollapsed: toggleCollapsed,
        chatRef,
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Sider
          collapsed={collapsed}
          collapsible
          collapsedWidth={0}
          className={styles.sider}
          width={320}
          onCollapse={toggleCollapsed}
        >
          <SiderHeader />
          {isAuthenticated ? <AuthenSider /> : <NotAuthenSider />}
        </Sider>
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
