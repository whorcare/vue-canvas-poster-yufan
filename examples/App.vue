<template>
  <div id="app">
    <div id="nav">
      <canvas-poster :drawData="drawData" @success="success"></canvas-poster>
      <canvas-poster :drawData="drawData2" @success="success2"></canvas-poster>
      <img :src="imgSrc">
      <img :src="imgSrc2">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawData: {
        width: 360,
        height: 667,
        backgroundColor: '#fff',
        views: [
          {
            type: 'image',
            url: require('./assets/bold.png'), //  eslint-disable-line
            top: 0,
            left: 0,
            width: 360,
            height: 667,
          },
          {
            type: 'image',
            url: require('./assets/header.jpg'), //  eslint-disable-line
            top: 58,
            left: 165,
            width: 30,
            height: 30,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#f0efefea',
          },
          {
            type: 'text',
            content: 'vue-canvas-poster-yufan简单快速的绘制canvas海报~~这是一段比较长的标题文字',
            fontSize: 14,
            color: '#f7f7f7',
            textAlign: 'center',
            top: 262,
            left: 180,
            width: 200,
            lineNum: 3,
            lineHeight: 20,
            baseLine: 'top',
          },
          {
            type: 'text',
            content: '2020年1月14日 12:30:00',
            fontSize: 14,
            color: '#f7f7f7',
            textAlign: 'center',
            top: 372,
            left: 180,
            width: 200,
            lineNum: 3,
            lineHeight: 20,
            baseLine: 'top',
          },
          {
            type: 'qcode',
            text: 'https://github.com/whorcare/vue-canvas-poster-yufan', //  eslint-disable-line
            top: 420,
            left: 135,
            width: 90,
            height: 90,
          },
          {
            type: 'line',
            color: '#999',
            startX: 30,
            startY: 580,
            endX: 330,
            endY: 580,
            width: 2,
            lineCap: 'round', // lineCap 属性设置或返回线条末端线帽的样式。
          },
        ],
      },
      drawData2: {
        width: 360,
        height: 667,
        backgroundColor: '#f1f1f1',
        views: [
          {
            type: 'rect',
            text: {
              content: 'vue-canvas-poster-yufan 这是一段rect类型的文本内容~~~~',
              fontSize: 18,
              color: '#666',
              textAlign: 'left',
              top: 50,
              left: 20,
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
            borderWidth: 0,
            backgroundColor: '#fff',
            borderColor: 'red',
            borderRadius: 0,
          },
        ],
      },
      imgSrc: '',
      imgSrc2: '',
    };
  },
  created() {
  },
  methods: {
    success(url) {
      this.imgSrc = url;
    },
    success2(url) {
      this.imgSrc2 = url;
    },
  },
};
</script>
<style lang="scss">
</style>
