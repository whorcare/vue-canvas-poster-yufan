<!-- canvas Poster -->
<template>
  <div class="canvas-poster">
    <!--eslint-disable-next-line-->
    <canvas v-show="false"
            ref="canvas"
            class="canvas-poster-hidca"></canvas>
  </div>
</template>

<script>

export default {
  name: 'canvasPoster',
  props: {
    drawData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      ctx: '', // canvas 对象
    };
  },
  watch: {
    drawData: {
      handler() {
        this.$nextTick(() => {
          this.initCanvas();
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    // 初始化initCanvas
    initCanvas() {
      if (!this.drawData.width || !this.drawData.height || this.drawData.views.length === 0) {
        return;
      }
      this.$refs.canvas.width = this.drawData.width;
      this.$refs.canvas.height = this.drawData.height;
      this.ctx = this.$refs.canvas.getContext('2d');
      this.drawArr();
    },
    async drawArr() {
      if (this.drawData.backgroundColor) {
        this.ctx.save();
        this.ctx.fillStyle = this.drawData.backgroundColor;
        this.ctx.fillRect(0, 0, this.drawData.width, this.drawData.height);
        this.ctx.restore();
      }
      for (let i = 0; i < this.drawData.views.length; i += 1) {
        if (this.drawData.views[i].type === 'image') {
          // eslint-disable-next-line no-await-in-loop
          await this.drawImg(this.drawData.views[i]);
        } else if (this.drawData.views[i].type === 'text') {
          this.drawText(this.drawData.views[i]);
        } else if (this.drawData.views[i].type === 'rect') {
          this.drawBlock(this.drawData.views[i]);
        } else if (this.drawData.views[i].type === 'line') {
          this.drawLine(this.drawData.views[i]);
        }
      }
      this.$emit('success', this.$refs.canvas.toDataURL('image/jpeg'));
    },
    // drawImg
    drawImg(data) {
      return new Promise((resolve) => {
        const {
          url, top = 0, left = 0, width = 0, height = 0, borderRadius = 0, borderWidth = 0, borderColor = 'rgba(255,255,255,0)',
        } = data;
        this.ctx.save();
        const img = new Image();
        img.crossOrigin = 'anonymous';
        if (borderRadius > 0) {
          img.addEventListener('load', () => {
            this.drawRadiusRect(left, top, width, height, borderRadius, borderWidth, borderColor);
            this.ctx.clip();
            this.ctx.drawImage(img, left, top, width, height);
            this.ctx.restore();
            setTimeout(() => {
              resolve();
            }, 50);
          });
        } else {
          img.addEventListener('load', () => {
            this.ctx.drawImage(img, left, top, width, height);
          });
          this.ctx.restore();
          setTimeout(() => {
            resolve();
          }, 100);
        }
        img.src = url;
      });
    },
    // drawRadiusRect
    drawRadiusRect(x, y, w, h, r, borderWidth, borderColor) {
      const br = r / 2;
      this.ctx.beginPath();
      if (borderWidth > 0) { this.ctx.lineWidth = borderWidth; }
      this.ctx.strokeStyle = borderColor;
      this.ctx.moveTo(x + br, y); // 移动到左上角的点
      this.ctx.lineTo(x + w - br, y);
      this.ctx.arc(x + w - br, y + br, br, 2 * Math.PI * (3 / 4), 2 * Math.PI * (4 / 4));
      this.ctx.lineTo(x + w, y + h - br);
      this.ctx.arc(x + w - br, y + h - br, br, 0, 2 * Math.PI * (1 / 4));
      this.ctx.lineTo(x + br, y + h);
      this.ctx.arc(x + br, y + h - br, br, 2 * Math.PI * (1 / 4), 2 * Math.PI * (2 / 4));
      this.ctx.lineTo(x, y + br);
      this.ctx.arc(x + br, y + br, br, 2 * Math.PI * (2 / 4), 2 * Math.PI * (3 / 4));
      this.ctx.closePath();
      this.ctx.stroke();
    },
    // drawText
    drawText({
      top = 0, left = 0, fontSize = 16, color = '#000', baseLine = 'bottom', textAlign = 'left', content, opacity = 1,
      width, lineNum = 1, lineHeight = 0, fontWeight = 'normal', fontStyle = 'normal', fontFamily = 'Microsoft YaHei',
    }) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
      this.ctx.globalAlpha = opacity;
      this.ctx.textAlign = textAlign;
      this.ctx.textBaseline = baseLine;
      this.ctx.fillStyle = color;
      let textWidth = this.ctx.measureText(content).width;
      const textArr = [];

      if (textWidth > width) {
        let fillText = '';
        let line = 1;
        for (let i = 0; i <= content.length - 1; i += 1) { // 将文字转为数组
          fillText += content[i];
          if (this.ctx.measureText(fillText).width >= width) {
            if (line === lineNum) {
              if (i !== content.length - 1) {
                fillText = `${fillText.substring(0, fillText.length - 1)}...`;
              }
            }
            if (line <= lineNum) {
              textArr.push(fillText);
            }
            fillText = '';
            line += 1;
          } else if (line <= lineNum) {
            if (i === content.length - 1) {
              textArr.push(fillText);
            }
          }
        }
        textWidth = width;
      } else {
        textArr.push(content);
      }

      textArr.forEach((item, index) => {
        this.ctx.fillText(item, left, top + (lineHeight || fontSize) * index);
      });

      this.ctx.restore();
    },
    // drawLine
    drawLine({
      startX, startY, endX, endY, color = '#000', width = 1, lineCap = 'butt',
    }) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.lineCap = lineCap;
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = width;
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke(); // 进行绘制
      this.ctx.closePath();
      this.ctx.restore();
    },
    drawBlock({
      text, width = 0, height, x, y, paddingLeft = 0, paddingRight = 0, borderWidth,
      backgroundColor, borderColor, borderRadius = 0, opacity = 1,
    }) {
      // 判断是否块内有文字
      let blockWidth = 0; // 块的宽度
      let textX = 0;
      let textY = 0;
      if (typeof text !== 'undefined') {
        // 如果有文字并且块的宽度小于文字宽度，块的宽度为 文字的宽度 + 内边距
        const textWidth = this.getTextWidth(typeof text.content === 'string' ? text : text.content);
        blockWidth = textWidth > width ? textWidth : width;
        blockWidth += paddingLeft + paddingLeft;

        // eslint-disable-next-line
        const { textAlign = 'left', text: textCon } = text;
        textY = height / 2 + y; // 文字的y轴坐标在块中线
        if (textAlign === 'left') {
          // 如果是右对齐，那x轴在块的最左边
          textX = x + paddingLeft;
        } else if (textAlign === 'center') {
          textX = blockWidth / 2 + x;
        } else {
          textX = x + blockWidth - paddingRight;
        }
      } else {
        blockWidth = width;
      }

      if (backgroundColor) {
        // 画面
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = backgroundColor;
        if (borderRadius > 0) {
          // 画圆角矩形
          this.drawRadiusRect(x, y, blockWidth, height, borderRadius);
          this.ctx.fill();
        } else {
          this.ctx.fillRect(x, y, blockWidth, height);
        }
        this.ctx.restore();
      }
      if (borderWidth) {
        // 画线
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        console.log(borderColor);
        this.ctx.fillStyle = borderColor;
        this.ctx.lineWidth = borderWidth;
        if (borderRadius > 0) {
          // 画圆角矩形边框
          this.drawRadiusRect(x, y, blockWidth, height, borderRadius);
          this.ctx.stroke();
        } else {
          this.ctx.strokeRect(x, y, blockWidth, height);
        }
        this.ctx.restore();
      }

      if (text) {
        this.drawText(Object.assign(text, { x: textX, y: textY }));
      }
    },
    /**
     * 计算文本长度
     * @param {Array|Object}} text 数组 或者 对象
     */
    getTextWidth(text) {
      let texts = [];
      if (Object.prototype.toString.call(text) === '[object Object]') {
        texts.push(text);
      } else {
        texts = text;
      }
      let width = 0;
      texts.forEach(({
        // eslint-disable-next-line
        fontSize, text, marginLeft = 0, marginRight = 0,
      }) => {
        this.ctx.font = `${fontSize}`;
        width += this.ctx.measureText(text).width + marginLeft + marginRight;
      });

      return width;
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
