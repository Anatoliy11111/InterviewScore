import { Progress, Typography } from 'antd';

const { Title } = Typography;

interface Props {
    totalScore: number;
}

export const Summary = ({ totalScore }: Props)=> {
    const level = totalScore >= 80 ? 'Senior' : totalScore >= 60 ? 'Middle' : 'Junior';

    return (
        <div style={{ marginBottom: 24 }}>
            <Title level={3}>Итоговый балл: {totalScore} из 100</Title>
            <Typography.Text strong>Уровень: {level}</Typography.Text>
            <Progress percent={totalScore} status="active" style={{ marginTop: 8 }} />
        </div>
    );
}