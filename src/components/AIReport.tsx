import { Card, Typography } from 'antd';

const { Paragraph } = Typography;

interface Props {
    report: string;
}

export const AIReport = ({ report }: Props) => {
    return (
        <Card title="Заключение от ИИ" style={{ marginTop: 24 }}>
            <Paragraph>{report}</Paragraph>
        </Card>
    );
}