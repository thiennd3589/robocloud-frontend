import { useState } from "react";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { register } from "../../../../services/authentication";
import { useNotification } from "../../../../notification/hooks/use-notification";

type RegisterPopupProps = {
  visible?: boolean;
  onClose?: () => void;
  onSwitchToLogin: () => void;
};

const RegisterPopup = ({
  visible,
  onClose,
  onSwitchToLogin,
}: RegisterPopupProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const notification = useNotification();
  const onFinish = async (values: any) => {
    setLoading(true);
    await register(
      values,
      () => {
        notification?.success({
          message: "Registration Successful",
          description: `Welcome ${values.fullName}!`,
        });
        form.resetFields();
        onSwitchToLogin();
      },
      () => {
        console.log("oke");
        notification?.error({
          message: "Registration Failed",
        });
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
      className="[&_.ant-modal-content]:bg-gray-800 [&_.ant-modal-content]:p-0"
    >
      <div className="relative">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Tạo tài khoản
          </h1>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="fullName"
              label={<span className="text-gray-300">Họ và tên</span>}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                className="bg-gray-700 border-gray-600 text-white h-10"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="text-gray-300">Email</span>}
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input valid email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
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

            <Form.Item
              name="agreement"
              valuePropName="checked"
              className="mb-4"
            >
              <Checkbox className="text-gray-300">
                I agree to the{" "}
                <a href="#" className="text-blue-400">
                  terms
                </a>
              </Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700 h-10 font-medium mb-4"
            >
              Register
            </Button>
            <p className="text-center text-gray-400 mt-6 text-sm">
              Already have an account?{" "}
              <button
                className="text-blue-400 hover:underline"
                onClick={onSwitchToLogin}
              >
                Sign in
              </button>
            </p>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterPopup;
