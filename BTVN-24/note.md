- input / button / menu (ul - li)
- histories phai dc luu vao 1 bien gi do
- ban dau histories ko dc hien, chi hien khi focus vao input
- khi nhan nut search thi histories dc them, menu tat di
- khi enter thi giong nhu nhan save'
- tring moi muc trong history -> co the xoa dc


ailatrieuphu
15 cau / 1 game
do khoi tang dan
3 su tro giup tu cau 6 co them 1
    hoi y kien kham gia / 50-50 / call / tu van
    hoi y kien: random ti le %
    tu van: random
    goi dien: random
3 moc qian trong (5/ 10/ 15)
tien thuong
se co 1 bo cau hoi, ko dc trung]
moi cau hoi co 4 dap an, trong do co 1 dap an dung, 1 dap an ng choi chon

giao dien

man hinh choi
    - 1 box hien cau hoi
    - 4 box hien dap an
    - 1 box hien tro giup
    - 1 box hien ds so cau - tien thuong
them cau hoi (man hinh rieng) -> ko lam
bo cau hoi
questions -> array
tao 1 bien luu tro giup, neu
vd chon 50-50:
    disable / an su tro giup day di
    loai bo 2 dap an sai (text -> '')
can 1 bien de luu gia tri phan qua
can 1 bien de luu cau hoi hien tai

an nut next:
    check xem cau nay diung hay sai
        dung: ting tiung -> next
        saiL: hien dap an dung
    chuyen cau hoi va cau tra loi
    nang cau hoi hien tai len

phan tich trong moi cau hoi
    co 1 cau hoi
    4 dap an
    1 dap an dung
    level
    dap an ma ng choi chon
    status dung hay sai

const questions = [
    {
        id: 1,
        question: 'how are you today'
        a: 'ok'
        b: 'ko ok',
        c: 'good'
        d: 'my name is bang',
        correct: d,
        user_ionas: d,
        is_correc: true,
        level: 1,
        show: false
    },
    {
        id: 2,
        question: 'how are you today'
        a: 'ok'
        b: 'ko ok',
        c: 'good'
        d: 'my name is bang',
        correct: d,
        user_ionas: d,
        is_correc: true,
        level: 1
    }
]

{
    1: 200,
    2: 300
}

current_level = 3


























