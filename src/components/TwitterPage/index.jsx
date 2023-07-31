import { useState, useEffect } from 'react';
import React from 'react';
import './index.css'; // 导入样式文件
import axios, { all } from 'axios';
import MyWordCloud from '../wordcloud';
import PostList from '../PostList';
import ReactECharts from 'echarts-for-react';

export default function TwitterPage(props) {
    const { tweetDateVal, tweetHotVal, xAxis } = props;
    const [cloudData, setCloudData] = useState([]);
    const [tweetText, setTweetText] = useState([]);
    const [tweetPositiveText, setTweetPositiveText] = useState([]);
    const [tweetNegativeText, setTweetNegativeText] = useState([]);
    // 第一行：两个柱状图 + 词云
    // 第二行：三个博文组件
    // 第三行：地图
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://8.130.120.233:8088/tweet');
                const allData = response.data.data;
                console.log(allData)

                // 1. 词云数据
                const cloudOriginal = allData.TweetCloud;
                console.log("cloudOriginal",cloudOriginal)

                // 2. 帖子数据
                const TweetTextOri = allData.TweetText.TweetText;
                const TweetPositiveTextOri = allData.TweetPositiveText.TweetPositiveText;
                const TweetNegativeTextOri = allData.TweetNegativeText.TweetNegativeText;
                // 微博：text，likes，score
                // 推特：text favoriteCount score，推特的洗一下，把favoriteCount变成 likes，都按 text, likes, score 的格式去传
                // 处理数据：
                const TweetText = TweetTextOri.map(item => {
                    const { text, favoriteCount, score } = item;
                    return {
                      text,
                      likes: favoriteCount,
                      score,
                    };
                });
                const TweetPositiveText = TweetPositiveTextOri.map(item => {
                    const { text, favoriteCount, score } = item;
                    return {
                      text,
                      likes: favoriteCount,
                      score,
                    };
                });
                const TweetNegativeText = TweetNegativeTextOri.map(item => {
                    const { text, favoriteCount, score } = item;
                    return {
                      text,
                      likes: favoriteCount,
                      score,
                    };
                });

                // 设置数据：
                // 1. 设置词云数据
                setCloudData(cloudOriginal);

                // 2. 设置帖子数据
                setTweetText(TweetText);
                setTweetNegativeText(TweetNegativeText);
                setTweetPositiveText(TweetPositiveText);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [])
    var hot_option = {
        title: {
            text: 'Hot-Val of Twitter Posts in Last Week ',
            x: 'center',
            top: 10
        },
        grid: { top: 50, right: 30, bottom: 30, left: 50 },
        xAxis: {
            type: 'category',
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: tweetHotVal,
                type: 'bar'
            }
        ]
    };
    var date_option = {
        title: {
            text: 'Number of HKU-related Twitter Posts in Last Week',
            x: 'center',
            top: 10
        },
        grid: { top: 50, right: 30, bottom: 30, left: 50 },
        xAxis: {
            type: 'category',
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: tweetDateVal,
                type: 'bar'
            }
        ]
    };
    return (
        <div>
            {/* 第一行：词云 + 两个柱状图 */}
            <div className='overview-row'>
                <div className='echart-container-3'>
                    <MyWordCloud cloudData={cloudData} />
                </div>
                <div className='echart-container-3'>
                    <ReactECharts
                        option={hot_option}
                        style={{
                            height: "40vh",
                            width: "32vw",
                        }} />
                </div>
                <div className='echart-container-3'>
                    <ReactECharts
                        option={date_option}
                        style={{
                            height: "40vh",
                            width: "32vw",
                        }} />
                </div>
            </div>

            {/* 第二行：列表 */}
            <div className='overview-row'>
                <div className='echart-container-3'>
                    <PostList data={tweetText} title={"Most Popular Overall Twitter Posts"} source={"Twitter"}/>
                </div>
                <div className='echart-container-3'>
                    <PostList data={tweetPositiveText} title={"Most Popular Positive Twitter Posts"} source={"Twitter"}/>
                </div>
                <div className='echart-container-3'>
                    <PostList data={tweetNegativeText} title={"Most Popular Negative Twitter Posts"} source={"Twitter"}/>
                </div>
            </div>
        </div>
    )
}