import './index.css'; // 导入样式文件
import { useState, useEffect } from 'react';
import React from 'react';
import { Avatar, List, Modal, Button } from 'antd';

export default function PostList(props) {
  // const { data } = props;
  const { data, title, source } = props;
  const [open, setOpen] = useState(false);
  const [modalTitle,setModalTitle] = useState("");
  const [text,setText] = useState("");
  const [likes,setLikes] = useState(0);
  const [score,setScore] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 添加当前页数状态

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // 用于让 list 内超出的文字单行显示
  const singleLineTextStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };

  return (
    <><div className="post-list">
      <div className="post_title">{title}</div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        size="small"
        pagination={{ pageSize: 10, align: 'center',onChange: (page) => setCurrentPage(page), }}
        renderItem={(item, index) => (
          // 处理每一项的弹窗
          <List.Item onClick={() => {
            showModal(true);
            setModalTitle("Detail of No. " + (parseInt(index) + 1) + " " + source + " Post");
            setText(item.text);
            setLikes(item.likes);
            setScore(item.score);
          }}>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={<span>{"No. " + (index + 1 + (currentPage - 1) * 10) + " " + source + " Post"} </span>}
              // description={item.text}
              description={<div style={singleLineTextStyle}>{item.text}</div>} />
          </List.Item>
        )} />
    </div>
      <Modal
        open={open}
        title={modalTitle}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="primary" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        <p>{text}</p>
        <div className='detail-row'>
          <span>
            <i className="iconfont">&#xe7df;</i>
            <span className="detail-mark">{likes}</span>
          </span>
          <span>
            <i className="iconfont">&#xe7e5;</i>
            <span className="detail-mark">{parseFloat(score).toFixed(3)}</span>
          </span>
        </div>
        
      </Modal></>
  );
}