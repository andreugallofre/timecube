import React from 'react';
import { Modal, Input, Form, InputNumber } from 'antd';


export const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate} >
                    <Form layout="vertical">
                        <Form.Item label="Face Number (1 to 5)">
                            {getFieldDecorator('id', {
                                rules: [{ required: true, message: 'Please select a face number' }],
                                initialValue: 1
                            })(
                                <InputNumber min={1} max={5} />
                            )}
                        </Form.Item>
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of the task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please input the description for the task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);