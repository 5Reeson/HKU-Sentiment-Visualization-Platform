import React from 'react';
import hku_logo from '../../assets/hku_logo.png'
import './Header.css'; // 导入样式文件

const Header = () => {
  return (
    <header>
      <div className="logo">
        {/* 在这里放置你的 logo */}
        <img src={hku_logo} alt="Logo" />
      </div>
      <div className="title">
        {/* 在这里展示项目的标题 */}
        <h1>HKU Discussion Visualization: Statistics, Sentiment, and more!</h1>
      </div>
      <div className="search-box">
        {/* 在这里放置搜索框 */}
        <input type="text" placeholder="Search by keywords, e.g. HKU" />
      </div>
      <div className="about">
        {/* 在这里放置关于链接或按钮 */}
        <a href="/about">Models</a>
      </div>
      <div className="about">
        {/* 在这里放置关于链接或按钮 */}
        <a href="/about">Dataset</a>
      </div>
      <div className="about">
        {/* 在这里放置关于链接或按钮 */}
        <a href="/about">About</a>
      </div>
    </header>
  );
};

export default Header;
