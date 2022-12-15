const express = require("express");
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");
const router = express.Router();

// 카트 조회 API
router.get("/carts", async (req, res) => {
  const carts = await Cart.find({});
    // [
    //   {goodsId, quantity},
    //   {goodsId, quantity},
    // ];
  const goodsIds = carts.map((cart) => {
    return cart.goodsId
  });
  // ex) [2, 11, 1];
  
  // goodsId에 해당하는 goods를 가지고 오기
  const goods = await Goods.find({ goodsId: goodsIds });

  const results = carts.map((cart) => {
		return {
			"quantity": cart.quantity,
			"goods": goods.find((item) => item.goodsId === cart.goodsId)
		};
  });

  res.json({
    "carts": results,
  });

});

module.exports = router;