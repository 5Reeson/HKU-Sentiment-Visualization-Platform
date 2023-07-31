import './noticeboard.css'; // 导入样式文件
import { useState, useEffect } from 'react';
import React from 'react';
// 1.我们已经收集了 xxx 条数据
// 2.数据更新时间
// 3.数据源切换 如果能做的话
export default function NoticeBoard(props) {
    const { totalNum } = props;
    // 获取当前时间
    const currentDate = new Date();

    // 取整到每5分钟
    const roundedMinutes = Math.floor(currentDate.getMinutes() / 5) * 5;

    // 设置取整后的分钟数
    currentDate.setMinutes(roundedMinutes);

    // 格式化时间为 "yyyy-mm-dd HH:mm" 的形式
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    console.log(formattedDate);
    // const [updatedTime, setUpdatedTime] = useState("2023-07-18 22:12:00"); // 假数据
    return (
        <div className='notice-container'>
            <div className='notice-text-container'>
                📢📢📢 We have collect {totalNum} posts about HKU from Twitter and Weibo! The latest updated time of our database is {formattedDate} 📢📢📢
            </div>
        </div>
    )
}