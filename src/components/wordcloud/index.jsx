import WordCloud from 'react-d3-cloud';
import './wordcloud.css'; // 导入样式文件

export default function MyWordCloud(props){
    const {cloudData} = props;
    var data = []; // 初始化
    console.log("cloudData",cloudData)
    if(cloudData){
        data = cloudData.map(item => {
            return { text: item.word, value: item.overview };
        });
        console.log("data",data)
    }
    
    return(
        <div className='cloud-container'>
            <WordCloud
                data={data}
                width={260}
                height={205}
                font="Times"
                fontStyle="italic"
                fontWeight="bold"
            />
        </div>
        
    )
}