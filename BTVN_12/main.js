// Link lưu đồ: https://drive.google.com/file/d/1o4ub3z7ONfM-LDh4xDomKusmyAWlj9JB/view?usp=sharing
console.log("Cách mở lưu đồ: Click vào LINK ==> Click mở bằng draw IO");

console.log(
  "Link lưu đồ: https://drive.google.com/file/d/1o4ub3z7ONfM-LDh4xDomKusmyAWlj9JB/view?usp=sharing"
);

// =====BÀI 1: TIỀN ĐI TAXI=====

let a = 100,
  x;
// a: số km ; x: tổng tiền phải trả

let b = 15000,
  c = 13500,
  d = 11000;
// b,c,d : các mốc giá tiền từ 0 > 1 ; 1 > 5 ; 5 > ...

if (a < 0) console.log("Số km không hợp lệ, phải lớn hơn hoặc bằng 0");
else if (a <= 1) x = a * b;
else if (a <= 5) x = b * 1 + (a - 1) * c;
else if (a <= 120) x = b * 1 + c * 4 + d * (a - 5);
else x = 0.9 * (b * 1 + c * 4 + d * (a - 5));

console.log("Số tiền trả khi đi " + a + "km là: " + x + " đ");

// =====BÀI 2: TÍNH GIÁ TRỊ S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)=====

let n = 10;

let S = 0;

if (n > 0 && n % 1 === 0) {
  for (let i = 1; i <= n; i++) S += i * (i + 1);
  console.log(`Gía trị biểu thức S với ${n} là: ` + S);
} else console.log(`Đầu vào n = ${n} không hợp lệ, n phải là số nguyên dương`);

// =====BÀI 3: Viết hàm kiểm tra số nguyên tố=====

let m = 99,
  count = 0,
  i;

if (m > 1) {
  for (i = 2; i <= Math.sqrt(m); i++) {
    if (m % i === 0) count++;
  }
  if (count > 0) console.log("m: " + m + " không là SNT");
  else console.log("m: " + m + " là SNT");
} else {
  console.log("m: " + m + " không là SNT");
}

// =====BÀI 4: VẼ BẢNG CỬU CHƯƠNG=====

for (let i = 1; i <= 10; i++) {
  console.log(`====Bảng cửu chương số ${i}====`);
  for (let j = 1; j <= 10; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
}
