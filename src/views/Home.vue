<template>
  <div>
    <Alert 
      :showAlert="showAlert" 
      message="심볼명을 확인해주세요." 
    />
    <div class="wrap">
    <Title :title="title" />
    <b-img 
      class="image"
      center 
      :src="image" 
      alt="coin-image">
    </b-img>
    <b-select 
      class="select-coin"
      v-model="selectCoin" 
      :options="coinList"
    />
    <b-input-group prepend="심볼명" class="input-wrap">
      <b-input 
        type="text" 
        placeholder="심볼 입력 ex: BTC"
        v-model="searchCoin" 
        v-on:keyup.enter="getCoin(searchCoin)"
      />
      <b-input-group-append>
        <b-button @click="getCoin(searchCoin)">
          검색
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <Result 
      :prev_closing_price="prev_closing_price"
      :trade_price="trade_price"
      :change_price="change_price"
      :change_rate="change_rate"
      :upPrice="upPrice"
      :downPrice="downPrice"
    />
    </div>
  </div>
</template>
<script>
import { up1, up2, down1, down2 } from "../assets/index"
import { Title, Alert, Result } from "../components/index"
import { randomBoolean } from "../utils/util"
import { getCoinList } from "../api/api"

export default {
  components: {
    Title,
    Alert,
    Result
  },
  data() {
    return {
      title: 'BTC',
      coinList: [],
      selectCoin: 'BTC',
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
    selectCoin(value) {
      this.searchCoin = value
    }
  },
  methods: {
    calcPrice() {
      const rb = randomBoolean();
      if (this.trade_price > this.prev_closing_price) {
        this.image = rb ? up1 : up2;
        this.upPrice = true;
        this.downPrice = false;
      } else {
        this.image = rb ? down1 : down2;
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

        this.selectCoin = coin.toUpperCase();
        this.title = coin.toUpperCase();
      }).catch((err) => {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        console.error(err);
      });
    },
  },
  async created() {
    const coinList = await getCoinList();
    this.coinList = coinList;
    this.getCoin(this.searchCoin);
  },
}
</script>
<style>
  .wrap {
    padding-top: 60px;
  }

  .select-coin {
    width: 300px;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
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

</style>