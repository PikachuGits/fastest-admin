import React from 'react';

interface TestComponentProps {
  title?: string;
}

export const TestComponent: React.FC<TestComponentProps> = ({ title = '测试组件' }) => {
  return (
    <div style={{
      padding: '16px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      margin: '8px 0'
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{title}</h3>
      <p style={{ margin: '0', color: '#666' }}>
        这是一个测试组件，用于验证应用程序的基本功能。
      </p>
      <div style={{ marginTop: '12px' }}>
        <button 
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => alert('测试按钮被点击了！')}
        >
          测试按钮
        </button>
      </div>
    </div>
  );
};

export default TestComponent;