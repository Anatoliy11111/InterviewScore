// src/components/RatingScale.tsx
import {Collapse, Typography, Space} from 'antd';
import {StarOutlined} from '@ant-design/icons';

const {Panel} = Collapse;
const {Paragraph, Text} = Typography;

// Общие стили
const styles = {
    container: {
        fontSize: 13,
        color: '#262626',
        marginTop: 8,
        borderRadius: 8,
        border: '1px solid #e8e8e8',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        padding: '5px'
    },
    item: {
        display: 'flex',
        alignItems: 'flex-start' as const,
        margin: 0,
    },
    badge: (bgColor: string) => ({
        display: 'inline-flex',
        width: 20,
        height: 20,
        backgroundColor: bgColor,
        color: 'white',
        borderRadius: '50%' as const,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        marginRight: 8,
    }),
    text: {
        lineHeight: 1.4,
        color: '#595959',
    },
    footer: {
        marginTop: 6,
        fontSize: 11,
        color: '#8c8c8c',
        textAlign: 'right' as const,
        fontStyle: 'italic' as const,
    },
};

// Цвета для оценок
const COLORS: Record<number, string> = {
    1: '#ff4d4f', // красный
    2: '#faad14', // оранжевый
    3: '#1890ff', // синий
    4: '#52c41a', // зелёный
    5: '#722ed1', // фиолетовый
};
// Данные шкалы
const scale = [
    {score: 1, label: 'Не знает, путается, не может объяснить даже базу'},
    {score: 2, label: 'Знает термин, но не может применить или объяснить'},
    {score: 3, label: 'Даёт корректный ответ, но без глубины или примеров'},
    {score: 4, label: 'Отвечает точно, с примером, показывает практику'},
    {score: 5, label: 'Ответ полный, с контекстом, сравнением, архитектурным обоснованием'},
];

export const RatingScale = () => (
    <Collapse
        size="small"
        ghost
        bordered={false}
        expandIconPosition="end"
    >
        <Panel
            header={
                <span style={{fontSize: 13, fontWeight: 500, color: '#1890ff'}}>
          📏 Критерии оценки
        </span>
            }
            key="1"
        >
            <div style={styles.container}>
                <Space direction="vertical" size={2}>
                    {scale.map(({score, label}) => (
                        <Paragraph key={score} style={styles.item}>
                            <Text strong style={styles.badge(COLORS[score])}>
                                {score}
                            </Text>
                            <Text style={styles.text}>{label}</Text>
                        </Paragraph>
                    ))}
                </Space>

                <div style={styles.footer}>
                    <StarOutlined/> Подсказка для оценки
                </div>
            </div>
        </Panel>
    </Collapse>
);