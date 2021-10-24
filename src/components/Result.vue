<template>
  <div class="content-wrap">
      <div class="content-left">
        <div>
          어제 가격 : <span>{{ prev_closing_price.toLocaleString() }} 원</span>
        </div>
        <div>
          현재 가격 : <span :class="{ up: upPrice, down: downPrice }">{{ trade_price.toLocaleString() }} 원</span>
        </div>
      </div>
      <div class="content-right">
        <div :class="{ up: upPrice, down: downPrice }">
          <span v-show="upPrice">+</span>{{ change_price.toLocaleString() }} 원
        </div>
        <div :class="{ up: upPrice, down: downPrice }">
          <span v-show="upPrice">+</span>{{ change_rate.toLocaleString() }} %
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Result",
  props: [
    "prev_closing_price",
    "trade_price",
    "change_price",
    "change_rate",
    "upPrice",
    "downPrice"
  ]
}
</script>

<style>
  .content-wrap {
    display: flex;
    padding: 20px 0;
    justify-content: center;
    align-items: center;
    color: #248C45;
    line-height: 30px;
  }

  .content-left {
    margin-right: 14px;
    text-align: left;
  }

  .content-right {
    text-align: right;
  }

  .up {
    color: #d60000;
  }

  .down {
    color: #0051c7;
  }
</style>
