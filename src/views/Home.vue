<template>
  <div>
    <b-alert class="alert" variant="danger" :show="showAlert" fade>심볼명을 확인해주세요.</b-alert>
    <div class="wrap">

    <div class="title">{{ title }}</div>

    <b-img 
      class="image"
      center 
      :src="image" 
      alt="coin-image">
    </b-img>

    <b-input-group prepend="심볼명" class="input-wrap">
      <b-input type="text" v-model="searchCoin" placeholder="심볼 입력 ex: BTC" />
      <b-input-group-append>
        <b-button @click="getCoin(searchCoin)">검색</b-button>
      </b-input-group-append>
    </b-input-group>

    <div class="content-wrap">
      <div class="content-left">
        <div>어제 가격 : <span>{{ prev_closing_price.toLocaleString() }} 원</span></div>
        <div>현재 가격 : <span v-bind:class="{ up: upPrice, down: downPrice }">{{ trade_price.toLocaleString() }} 원</span></div>
      </div>
      <div class="content-right">
        <div v-bind:class="{ up: upPrice, down: downPrice }">
          <span v-show="upPrice">+</span>{{ change_price.toLocaleString() }} 원
        </div>
        <div v-bind:class="{ up: upPrice, down: downPrice }">
          <span v-show="upPrice">+</span>{{ change_rate.toLocaleString() }} %
        </div>
      </div>
    </div>

    </div>
  </div>
</template>
<script>
import up from "../assets/up.jpeg"
import down from "../assets/down.gif"

export default {
  components: {
  },
  data() {
    return {
      title: 'BTC',
      searchCoin: 'BTC',
      trade_price: 0,
      prev_closing_price: 0,
      change_rate: 0,
      change_price: 0,
      image: '',
      upPrice: false,
      downPrice: false,
      showAlert: false
    }
  },
  watch: {
  },
  methods: {
    calcPrice() {
      if (this.trade_price > this.prev_closing_price) {
        this.image = up;
        this.upPrice = true;
        this.downPrice = false;
      } else {
        this.image = down;
        this.downPrice = true;
        this.upPrice = false;
      }
    },
    getCoin(coin) {
      this.axios.get('https://api.upbit.com/v1/ticker?markets=KRW-' + coin)
      .then((res) => {
        const data = res.data[0];

        this.trade_price = data.trade_price;
        this.prev_closing_price = data.prev_closing_price;
        this.change_price = data.signed_change_price;
        this.change_rate = (data.signed_change_rate * 100).toFixed(2);

        this.calcPrice();

        this.title = coin.toUpperCase();
      }).catch((err) => {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        console.log(err);
      });
    },
  },
  created() {
    this.getCoin(this.searchCoin);
  },
}
</script>
<style>
  .wrap {
    padding-top: 60px;
  }

  .title {
    font-size: 40px;
    font-weight: bold;
  }

  .input-wrap {
    width: 300px !important;
    margin: 0 auto;
    float: none;
  }

  .image {
    margin: 20px 0;
    width: 300px;
    height: 300px;
  }

  .alert {
    position: absolute !important;
    top: 0;
    width: 100%;
  }

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