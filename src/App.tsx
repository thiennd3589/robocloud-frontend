import { Route, Routes } from "react-router";
import Home from "./pages/home";
import MainLayout from "./layout/main-layout";
import AuthProvider from "./auth/provider";
import { ConfigProvider, notification, theme } from "antd";
import NotificationProvider from "./notification/provider";
import ConversationProvider from "./conversation/provider";
import USBPortProvider from "./usb-port/provider";

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
            <USBPortProvider>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
                {contextHolder}
              </MainLayout>
            </USBPortProvider>
          </ConversationProvider>
        </AuthProvider>
      </NotificationProvider>
    </ConfigProvider>
  );
}

export default App;
