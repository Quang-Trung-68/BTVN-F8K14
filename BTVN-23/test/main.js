// const calNormalCst = (totalMoney) => {
//   return totalMoney
// }
//
// const calVipCst = (totalMoney) => {
//   return 0.9 * totalMoney
// }
//
// const calPremiumCst = (totalMoney) => {
//   return 0.8 * totalMoney
// }
//
//
// const customerType = {
//   normal: calNormalCst,
//   vip: calVipCst,
//   premium: calPremiumCst,
// }
//
//
// const calculateMoney = (type, totalMoney) => {
//   // console.log(customerType[type], totalMoney)
//   return customerType[type](totalMoney)
// }
//
//
// const money = calculateMoney('vip', 1000)


// const arg = (arr) => {
//   return (a + b + c) / 3
// }
// keywordagr
// const loger = ({a, b, c, d = 100}) => {
//   console.log(a, b, c, d)
// }
//
// // const loger = (a, b, c, d = 100) => {
// //   console.log(a, b, c, d)
// // }
//
// loger(1, 2, d = 200)
//
// loger({
//   a: 1, b: 2, d: 3
// })

// const {a, b, c, d} = {a: 1, b: 2, c: 3, d: 4}

// agrument
const loger = (...a) => {
  console.log(a)
}

loger(1, 2, 3)