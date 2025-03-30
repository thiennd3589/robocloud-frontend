import { Route, Routes } from "react-router";
import Home from "./pages/home";
import MainLayout from "./layout/main-layout";
import AuthProvider from "./auth/provider";
import { ConfigProvider, notification, theme } from "antd";
import NotificationProvider from "./notification/provider";
import ConversationProvider from "./conversation/provider";

function App() {
  const [_api, contextHolder] = notification.useNotification();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Button: {
            lineHeight: 1.265,
          },
        },
      }}
    >
      <NotificationProvider>
        <AuthProvider>
          <ConversationProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
              {contextHolder}
            </MainLayout>
          </ConversationProvider>
        </AuthProvider>
      </NotificationProvider>
    </ConfigProvider>
  );
}

export default App;
