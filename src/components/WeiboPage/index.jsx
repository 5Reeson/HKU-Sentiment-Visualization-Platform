import { useState, useEffect } from 'react';
import React from 'react';
import './index.css'; // 导入样式文件
import axios, { all } from 'axios';
import MyWordCloud from '../wordcloud';
import PostList from '../PostList';
import ReactECharts from 'echarts-for-react';

export default function WeiboPage(props) {
    const { weiboHotVal, weiboDateVal, xAxis } = props;
    const [cloudData, setCloudData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [weiboText, setWeiboText] = useState([]);
    const [tweetPositiveText, setTweetPositiveText] = useState([]);
    const [tweetNegativeText, setTweetNegativeText] = useState([]);
    // 第一行：两个柱状图 + 词云
    // 第二行：三个博文组件
    // 第三行：地图
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://8.130.120.233:8088/weibo');
                const allData = response.data.data;
                console.log(allData)

                // 1. 词云数据
                const cloudOriginal = allData.WeiboCloud;

                // 2. 帖子数据
                const WeiboText = allData.WeiboText.WeiboText;
                const TweetPositiveText = allData.TweetPositiveText.TweetPositiveText;
                const TweetNegativeText = allData.TweetNegativeText.TweetNegativeText;
                // 微博：text，likes，score
                // 推特：text favoriteCount score，推特的洗一下，把favoriteCount变成 likes，都按 text, likes, score 的格式去传

                // 3. 地图数据
                const locationMap = allData.locationMap;
                // 使用 Object.keys() 获取 locationMap 中所有的省份
                const provinces = Object.keys(locationMap);
                // 使用 map 方法转换数组格式
                const mapChange = provinces.map(province => {
                    return { name: province, value: locationMap[province] };
                });

                // 设置数据：
                // 1. 设置词云数据
                setCloudData(cloudOriginal);

                // 2. 设置帖子数据
                setWeiboText(WeiboText);
                setTweetNegativeText(TweetNegativeText);
                setTweetPositiveText(TweetPositiveText);

                // 3. 设置地图数据
                setMapData(mapChange);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [])

    var map_option = {
        title: {
            text: 'Weibo Map',
            left: "center",
            top: 10,
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
        },
        visualMap: {
            left: 'right',
            min: 1,
            max: 100,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
            text: ['High', 'Low'],
            calculable: true
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'Weibo Posts',
                type: "map",
                // mapType,
                map: "china",
                itemStyle: {
                    //地图区域的多边形 图形样式
                    normal: {
                        //是图形在默认状态下的样式
                        label: {
                            show: true, //是否显示标签
                            textStyle: {
                                color: "rgba(255,255,255,0)",
                            },
                        },
                    },
                },
                // aspectScale: mapType === "china" ? 0.75 : 1,
                top: "10%", //组件距离容器的距离
                data: mapData
            },
        ],
    };
    var hot_option = {
        title: {
            text: 'Hot-Val of Weibo Posts in Last Week ',
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
                data: weiboHotVal,
                type: 'bar'
            }
        ]
    };
    var date_option = {
        title: {
            text: 'Number of HKU-related Weibo Posts in Last Week',
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
                data: weiboDateVal,
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
                    <PostList data={weiboText} title={"Most Popular Overall Weibo Posts"} source={"Weibo"}/>
                </div>
                <div className='echart-container-3'>
                    <PostList data={tweetPositiveText} title={"Most Popular Positive Weibo Posts"} source={"Weibo"}/>
                </div>
                <div className='echart-container-3'>
                    <PostList data={tweetNegativeText} title={"Most Popular Negative Weibo Posts"} source={"Weibo"}/>
                </div>
            </div>
            

            {/* 第三行：地图 */}
            <div className='echart-container-4'>
                <ReactECharts
                    option={map_option}
                    style={{
                        height: "60vh",
                        width: "90vw",
                    }} 
                />
            </div>
            
        </div>
    )
}