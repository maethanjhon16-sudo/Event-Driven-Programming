import { Card, Descriptions } from "antd";
import type { RegistrationData } from "./interface/types";

interface Props {
  registration: RegistrationData;
}

const SummaryCard = ({ registration }: Props) => {
  return (
    <Card
      title="Registration Summary"
      style={{
        marginTop: 20,
      }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Participant">
          {registration.participantName}
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          {registration.email}
        </Descriptions.Item>

        <Descriptions.Item label="Event">
          {registration.eventName}
        </Descriptions.Item>

        <Descriptions.Item label="Attendance">
          {registration.attendanceType}
        </Descriptions.Item>

        <Descriptions.Item label="Guests">
          {registration.guests}
        </Descriptions.Item>


      </Descriptions>
    </Card>
  );
};

export default SummaryCard;