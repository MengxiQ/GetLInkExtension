const btnIcon = `data:image/png;base64,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`;

const oBtn = document.createElement("button");
oBtn.setAttribute("draggable", "true");
// window.body.setAttribute("", "");
oBtn.innerHTML = `<img src="${btnIcon}" style="
height: 40px;
background: white;
display: inline-block;
user-select: none;
pointer-events: none;
"/> <span">获取祈愿链接</span>`
oBtn.style.cssText = `
    z-index: 214748;
    position: absolute;
    left: 20px;
    top: calc(100% - 80px);
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px 0px 0px;
`


document.body.appendChild(oBtn);


oBtn.addEventListener('click', function (e) {
    getLink();
})



oBtn.addEventListener('touchstart', touchStart)
oBtn.addEventListener('touchmove', touchMove)
oBtn.addEventListener('touchend', touchEnd)

oBtn.addEventListener('dragstart', (e) => {
    console.log('开始拖动');
    let img = new Image()
    img.src = ''
    e.dataTransfer.setDragImage(img, 0, 0)
})

oBtn.addEventListener('drag', moveEvent)
oBtn.addEventListener('dragend', moveEvent);



//手指按下
function touchStart(e) {
    // e.preventDefault();
    this.odiv = e.target; //获取目标元素
    //算出鼠标相对元素的位置
    this.touchX = e.changedTouches[0].pageX - this.odiv.offsetLeft;
    this.touchY = e.changedTouches[0].pageY - this.odiv.offsetTop;
}
//手指拖动事件
function touchMove(e) {
    //用手指的位置减去手指相对元素的位置，得到元素的位置
    let left = e.changedTouches[0].pageX - this.touchX;
    let top = e.changedTouches[0].pageY - this.touchY;


    if (left < 0) {
        left = 0;
    }
    if (left > window.innerWidth - this.odiv.offsetWidth) {
        left = window.innerWidth - this.odiv.offsetWidth;
    }//可视区域宽度
    if (top < 0) {
        top = 0;
    }
    if (top >window.innerHeight - this.odiv.offsetHeight) {
        top = window.innerHeight - this.odiv.offsetHeight;
    }//可视区域高度

    //移动当前元素
    this.odiv.style.left = left + "px";
    this.odiv.style.top = top + "px";
}
//手指抬起
function touchEnd(e) {
    const left = e.x;
    const top = e.y;
    e.target.style.left = left + "px";
    e.target.style.top = top + "px";
}

function moveEvent(e) {
    const left = e.x;
    const top = e.y;
    e.target.style.left = left + "px";
    e.target.style.top = top + "px";
}

