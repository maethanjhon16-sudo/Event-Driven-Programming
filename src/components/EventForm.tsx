import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import type { RegistrationData } from "./interface/types";

interface Props {
  dispatch: React.Dispatch<any>;
}

const EventForm = ({ dispatch }: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: RegistrationData) => {
    dispatch({
      type: "SUBMIT",
      payload: values,
    });
  };

  const handleReset = () => {
    form.resetFields();

    dispatch({
      type: "RESET",
    });
  };

  return (
    <Card title="Event Registration">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          guests: 0,
        }}
      >
        <Form.Item
          label="Participant Name"
          name="participantName"
          rules={[
            {
              required: true,
              message: "Please enter your name.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email.",
            },
            {
              type: "email",
              message: "Invalid email address.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Event Name"
          name="eventName"
          rules={[
            {
              required: true,
              message: "Please enter the event name.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Attendance Type"
          name="attendanceType"
          rules={[
            {
              required: true,
              message: "Please select attendance type.",
            },
          ]}
        >
          <Select
            placeholder="Select attendance type"
            options={[
              {
                value: "On-site",
                label: "On-site",
              },
              {
                value: "Online",
                label: "Online",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Number of Guests"
          name="guests"
          rules={[
            {
              required: true,
              message: "Please enter the number of guests.",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        "You must agree before submitting."
                      )
                    ),
            },
          ]}
        >
          <Checkbox>
            I agree to the event terms and conditions.
          </Checkbox>
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button danger onClick={handleReset}>
            Reset
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default EventForm;