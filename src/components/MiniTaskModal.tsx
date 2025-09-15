// src/components/tasks/MiniTaskModal.tsx
import {Button, Modal, Typography, Alert, Space, message} from 'antd';
import {CopyOutlined} from '@ant-design/icons';
import {Categories, MINI_TASKS} from "../data/questions.ts";

const {Title} = Typography;

interface Props {
    categoryId: Categories;
    open: boolean;
    onClose: () => void;
}

export const MiniTaskModal = ({categoryId, open, onClose}: Props) => {
    const tasks = MINI_TASKS[categoryId];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => message.success('Скопировано!'),
            () => message.error('Не удалось скопировать')
        );
    };

    return (
        <Modal
            title="Мини-задача"
            open={open}
            footer={<Button onClick={onClose}>Закрыть</Button>}
            onCancel={onClose}
            width={700}
        >
            {tasks.length === 0 ? (
                <Alert type="info" message="Нет задач для этой категории"/>
            ) : (
                tasks.map((task, id) => (
                    <div key={id} style={{marginBottom: 24}}>
                        <Title level={5}>{task.title}</Title>
                        <pre style={{
                            background: '#f5f5f5',
                            padding: 12,
                            borderRadius: 8,
                            overflowX: 'auto',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: 1.5,
                        }}>
              {task.code}
            </pre>
                        <Space>
                            <Button
                                type="primary"
                                icon={<CopyOutlined/>}
                                onClick={() => copyToClipboard(task.code)}
                            >
                                Скопировать код
                            </Button>
                            {task.expected && (
                                <Button
                                    icon={<CopyOutlined/>}
                                    onClick={() => copyToClipboard(task.expected)}
                                >
                                    Скопировать ответ
                                </Button>
                            )}
                        </Space>
                        {task.expected && (
                            <Alert
                                message="Ожидаемый ответ"
                                description={task.expected}
                                type="info"
                                showIcon
                                style={{marginTop: 12}}
                            />
                        )}
                    </div>
                ))
            )}
        </Modal>
    );
};