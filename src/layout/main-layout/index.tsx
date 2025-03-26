import { Layout } from "antd";
import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { useIsAuthenticated } from "../../auth/hooks/use-is-authenticated";
import NotAuthenSider from "./not-authen-sider";
import AuthenSider from "./authen-sider";

const { Sider, Content } = Layout;

const MainLayout = (props: PropsWithChildren) => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className={styles.sider} width={320}>
        {isAuthenticated ? <AuthenSider /> : <NotAuthenSider />}
      </Sider>
      <Layout>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
