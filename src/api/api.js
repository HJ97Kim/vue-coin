import axios from "axios";

export const getCoinList = async () => {
  const regex = /KRW-[a-zA-Z]{2,}/;
  let krwCoin = [];
  await axios.get('https://api.upbit.com/v1/market/all')
    .then((res) => {
      res.data.forEach((item) => {
        if (item.market.match(regex)) {
          krwCoin.push({
            value: item.market.substring(4),
            text: item.korean_name
          });
        }
      });
    })
    .catch((err) => {
      console.error(err)
    });
  return krwCoin;
};