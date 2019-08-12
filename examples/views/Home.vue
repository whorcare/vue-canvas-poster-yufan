<!--  -->
<template>
  <div>
    <canvas-poster :drawData="drawData" @success="success"></canvas-poster>
    <img :src="imgSrc">
  </div>

</template>

<script>

export default {
  data() {
    return {
      drawData: {
        width: 375,
        height: 555,
        backgroundColor: '#fff',
        debug: true,
        views: [
          {
            type: 'image',
            url: 'http://baike.baidu.com/cms/rc/240x112dierzhou.jpg',
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            borderRadius: 15,
            borderWidth: 5,
            borderColor: '#f0efefea',
          },
          {
            type: 'text',
            content: '你好你好测试一段文字哈哈哈哈嘎嘎嘎9dadhajdhjcb lorem',
            fontSize: 16,
            color: '#666',
            textAlign: 'left',
            top: 1,
            left: 50,
            width: 200,
            lineNum: 3,
            lineHeight: 0,
            baseLine: 'top',
          },
          {
            type: 'rect',
            text: {
              content: '你好你好测试一段文字哈哈哈哈嘎嘎嘎9dadhajdhjcb lorem',
              fontSize: 16,
              color: '#666',
              textAlign: 'left',
              top: 1,
              left: 50,
              width: 200,
              lineNum: 3,
              lineHeight: 0,
              baseLine: 'top',
            },
            width: 200,
            height: 200,
            x: 20,
            y: 50,
            paddingLeft: 10,
            paddingRight: 10,
            borderWidth: 2,
            backgroundColor: '#999',
            borderColor: 'yellow',
            borderRadius: 5,
          },
          {
            type: 'line',
            color: 'red',
            startX: 30,
            startY: 30,
            endX: 400,
            endY: 555,
            width: 3,
            lineCap: 'round', // lineCap 属性设置或返回线条末端线帽的样式。
          },
        ],

      },
      imgSrc: '',
    };
  },
  created() {
  },
  methods: {
    success(url) {
      console.log(url);
      this.imgSrc = url;
    },
  },
};
</script>
<style lang='scss'>
</style>
