// src/components/SampleAnswerPanel.tsx
import {Collapse, Typography} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';

const {Panel} = Collapse;
const {Text, Paragraph} = Typography;

// Общие стили
const styles = {
    container: {
        fontSize: 13,
        lineHeight: 1.5,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 500,
        color: '#1890ff',
    },
    answerBox: {
        padding: '10px 14px',
        backgroundColor: '#f0f5ff',
        borderRadius: 6,
        border: '1px solid #bae0ff',
        marginBottom: 12,
        fontSize: 13,
    },
    answerTitle: {
        margin: 0,
        fontWeight: 600,
        color: '#1890ff',
        fontSize: 13,
    },
    answerText: {
        margin: '4px 0 0',
        fontStyle: 'italic',
        color: '#2c3e50',
        lineHeight: 1.4,
    },
    listItem: {
        marginBottom: 10,
    },
    subQuestion: {
        fontWeight: 500,
        color: '#1f1f1f',
        lineHeight: 1.4,
        marginBottom: 4,
    },
    subAnswer: {
        margin: 0,
        fontSize: 12,
        color: '#595959',
        lineHeight: 1.4,
        paddingLeft: 4,
        borderLeft: '2px solid #e8e8e8',
    },
    footer: {
        marginTop: 8,
        fontSize: 11,
        color: '#bfbfbf',
        textAlign: 'right' as const,
        fontStyle: 'italic' as const,
    },
};

interface Props {
    answer: string | undefined;
    subAnswers: { text: string; sampleAnswer: string }[];
}

export const SampleAnswerPanel = ({answer, subAnswers}: Props) => (
    <Collapse
        size="small"
        ghost
        bordered={false}
        style={{marginTop: 12, marginBottom: 16}}
        expandIconPosition="end"
    >
        <Panel
            header={
                <span style={styles.header}>
          <QuestionCircleOutlined/>
          Дополнительные вопросы и ответы
                </span>
            }
            key="1"
        >
            <div style={styles.container}>
                {answer && (
                    <div style={styles.answerBox}>
                        <Text strong style={styles.answerTitle}>
                            ✅ Ожидаемый ответ:
                        </Text>
                        <Paragraph style={styles.answerText}>{answer}</Paragraph>
                    </div>
                )}

                {subAnswers.length > 0 && (
                    <ul style={{margin: 0, paddingLeft: 18}}>
                        {subAnswers.map((sub, i) => (
                            <li key={i} style={styles.listItem}>
                                <Text style={styles.subQuestion}>{sub.text}</Text>
                                <Paragraph style={styles.subAnswer}>{sub.sampleAnswer}</Paragraph>
                            </li>
                        ))}
                    </ul>
                )}

                <div style={styles.footer}>📘 Подсказка для интервьюера</div>
            </div>
        </Panel>
    </Collapse>
);