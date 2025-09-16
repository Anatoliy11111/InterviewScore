// src/components/InterviewCheatSheet.tsx
import { Collapse, Typography } from 'antd';
import {CHEAT_SHEET_CONTENT} from "../data/theory.ts";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export const InterviewCheatSheet = () => {
    return (
        <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 32, color: '#1890ff' }}>
                📚 Теория за 15 минут
            </Title>
            <Paragraph style={{ textAlign: 'center', fontSize: 16, color: '#595959', marginBottom: 32 }}>
                Подготовьтесь к интервью: ключевые концепции по каждой теме
            </Paragraph>

            <Collapse accordion bordered={false}>
                {Object.entries(CHEAT_SHEET_CONTENT).map(([category, content]) => (
                    <Panel header={`📘 ${category}`} key={category}>
                        <div
                            style={{
                                whiteSpace: 'pre-line',
                                lineHeight: 1.6,
                                color: '#262626',
                                fontSize: '14px'
                            }}
                        >
                            {content.trim()}
                        </div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};