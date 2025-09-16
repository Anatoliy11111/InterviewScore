// src/components/CodingTaskPanel.tsx
import {Button, Collapse, Typography, Alert, Space, message} from 'antd';
import {CopyOutlined, EyeOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {CODING_TASKS} from '../data/codingTasks';
import type {NoticeType} from "antd/es/message/interface";

const {Title, Paragraph, Text} = Typography;
const {Panel} = Collapse;

export const CodingTaskPanel = () => {
    const [visibleSolution, setVisibleSolution] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const success = (content: string, type: NoticeType) => {
        messageApi.open({
                type,
                content,
                duration: 2.5,
            })
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => success('Скопировано!', 'success'),
            () => success('Ошибка копирования', 'error')
        );
    };

    return (
        <div style={{maxWidth: '100%'}}>
            {contextHolder}
            <Title level={3} style={{textAlign: 'center', color: '#1890ff'}}>
                💻 Задачи для собеседования
            </Title>
            <Paragraph style={{textAlign: 'center', color: '#595959', marginBottom: 32}}>
                Практические задания с вопросами и решениями
            </Paragraph>

            <Collapse accordion bordered>
                {CODING_TASKS.map((task) => (
                    <Panel header={<strong>{task.title}</strong>} key={task.id}>
                        <Paragraph><strong>Описание:</strong> {task.description}</Paragraph>

                        <div style={{marginBottom: 16}}>
                            <pre style={{display: 'block', padding: '12px', borderRadius: 8, background: '#f5f5f5'}}>
                                {task.codeTemplate}
                            </pre>
                            <Space style={{marginTop: 8}}>
                                <Button
                                    icon={<CopyOutlined/>}
                                    size="small"
                                    onClick={() => copyToClipboard(task.codeTemplate)}
                                >
                                    Код заготовки
                                </Button>
                                <Button
                                    icon={<EyeOutlined/>}
                                    size="small"
                                    type="primary"
                                    onClick={() => setVisibleSolution(visibleSolution === task.id ? null : task.id)}
                                >
                                    {visibleSolution === task.id ? 'Скрыть' : 'Показать'} решение
                                </Button>
                            </Space>
                        </div>

                        {/* Решение */}
                        {visibleSolution === task.id && (
                            <div style={{marginTop: 16}}>
                                <Alert
                                    message="Решение"
                                    type="success"
                                    showIcon
                                    style={{marginBottom: 12}}
                                />
                                <pre style={{
                                    display: 'block',
                                    padding: '12px',
                                    borderRadius: 8,
                                    background: '#e6ffed',
                                    border: '1px solid #b7eb8f',
                                    fontFamily: 'monospace',
                                    fontSize: '14px',
                                    lineHeight: 1.5
                                }}>
                                    {task.solution}
                                </pre>
                                <Button
                                    icon={<CopyOutlined/>}
                                    size="small"
                                    style={{marginTop: 8}}
                                    onClick={() => copyToClipboard(task.solution)}
                                >
                                    Скопировать решение
                                </Button>
                            </div>
                        )}

                        {task.tests &&
                            <div style={{marginTop: 16}}>
                                <Text strong>Тесты:</Text>
                                <pre
                                    style={{display: 'block', padding: '12px', background: '#f9f0ff', borderRadius: 8}}>
                                {task.tests}
                            </pre>
                            </div>
                        }

                        {/* Вопрос */}
                        <div style={{marginTop: 16}}>
                            <Alert
                                message="Вопрос интервьюера"
                                description={
                                    <>
                                        <Text strong>{task.question.text}</Text>
                                        <ul>
                                            {task.question.hints.map((hint, idx) => (
                                                <li key={idx}><Text type="secondary">{hint}</Text></li>
                                            ))}
                                        </ul>
                                    </>
                                }
                                type="info"
                                showIcon
                            />
                        </div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};