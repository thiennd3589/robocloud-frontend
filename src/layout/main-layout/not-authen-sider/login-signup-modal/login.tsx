import { useState } from "react";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../../../services/authentication";
import { useNotification } from "../../../../notification/hooks/use-notification";
import { useNotificationError } from "../../../../notification/hooks/use-notification-error";
import { useLoginSuccess } from "../../../../auth/hooks/use-login-success";

type LoginPopupProps = {
  visible?: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
};

const LoginPopup = ({
  visible,
  onClose,
  onSwitchToRegister,
}: LoginPopupProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const notification = useNotification();
  const notificationError = useNotificationError();
  const loginSuccess = useLoginSuccess();

  const onFinish = async (values: any) => {
    setLoading(true);
    await login(
      values,
      (res) => {
        notification?.success({
          message: "Login Successful",
          description: "Welcome back!",
        });
        form.resetFields();
        const { accessToken, currentUser } = res.data;
        loginSuccess(accessToken, currentUser);
        onClose();
      },
      (res) => {
        notificationError(res?.response?.data?.error?.message);
      }
    );

    setLoading(false);
  };

  return (
    <Modal
      title={null}
      footer={null}
      open={visible}
      onCancel={onClose}
      centered
      closable={false}
      maskClosable={false}
      className="[&_.ant-modal-content]:bg-gray-800 [&_.ant-modal-content]:p-0"
    >
      <div className="relative">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Welcome Back
          </h1>

          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              label={<span className="text-gray-300">Email</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your username or email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                className="bg-gray-700 border-gray-600 text-white h-10"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-gray-300">Password</span>}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                className="bg-gray-700 border-gray-600 text-white h-10"
              />
            </Form.Item>

            <div className="flex justify-between mb-4">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox className="text-gray-300">Remember me</Checkbox>
              </Form.Item>
              <Form.Item className="mb-0">
                <div className="text-blue-400 hover:underline text-sm">
                  Forgot password?
                </div>
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700 h-10 font-medium mb-4"
            >
              Log in
            </Button>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Don't have an account?{" "}
              <button
                className="text-blue-400 hover:underline"
                onClick={() => {
                  onSwitchToRegister();
                }}
              >
                Sign up
              </button>
            </p>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginPopup;
