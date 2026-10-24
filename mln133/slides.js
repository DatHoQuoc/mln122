/* Dữ liệu 26 slide — đặc tả sơ đồ node (v04, quy nạp).
   rows: mỗi hàng gồm các "ô" (cell); mỗi ô xếp node theo cột (hoặc lưới g cột).
   edges: [từ, đến, loại(arrow|conv|cross|vs), nhãn, bước]  */
(function () {
  const N = (id, type, text, s, o) => Object.assign({ id, type, text, s }, o || {});
  const D = (id, t, s, o) => N(id, 'data', t, s, o);
  const Q = (id, t, s, o) => N(id, 'quote', t, s, o);
  const G = (id, t, s, o) => N(id, 'ghost', t, s, o);
  const O = (id, t, s, o) => N(id, 'observe', t, s, o);
  const H = (id, t, s, o) => N(id, 'hub', t, s, o);
  const cv = (ids, h) => ids.map(i => [i, h, 'conv']);
  const ar = (ids, h) => ids.map(i => [i, h, 'arrow']);
  const chain = ids => ids.slice(1).map((b, i) => [ids[i], b, 'arrow']);
  const R = (cells, w, gap) => ({ cells, w, gap });

  const SLIDES = [];

  /* ---------- MỞ ĐẦU ---------- */
  SLIDES.push({
    id: 'M0', part: 0, cover: true,
    title: 'Dân chủ xã hội chủ nghĩa và Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam',
    nodes: [
      D('sub', 'MLN131 · Chương 4 · Mục III · Nhóm [..]', 0),
      D('mem', '[Họ tên – MSSV] × 4', 0)
    ],
    rows: [R([['sub', 'mem']])], edges: []
  });

  SLIDES.push({
    id: 'M1', part: 0, title: 'Một chi tiết đáng chú ý',
    nodes: [
      D('d1', '1945 — Chế độ dân chủ nhân dân được xác lập', 1),
      D('d2', '1976 — Tên nước: Cộng hòa xã hội chủ nghĩa Việt Nam', 2),
      D('d3', 'Văn kiện hầu như chưa dùng cụm từ “dân chủ xã hội chủ nghĩa”', 3),
      H('HUB', 'Cụm từ ấy được xác định thế nào, từ khi nào?', 4)
    ],
    rows: [R([['d1'], ['d2'], ['d3']]), R([['HUB']])],
    edges: [...chain(['d1', 'd2', 'd3']), ['d3', 'HUB', 'conv']]
  });

  /* ---------- PHẦN 1 ---------- */
  SLIDES.push({
    id: 'A1', part: 1, title: 'Trước Đổi mới',
    nodes: [
      D('d0', 'Văn kiện dùng: “làm chủ tập thể XHCN” + “nắm vững chuyên chính vô sản”', 1),
      D('d1', 'Bản chất dân chủ XHCN, quan hệ với nhà nước pháp quyền XHCN — <b>CHƯA</b> xác định rõ', 2),
      D('d2', 'Thực hiện dân chủ phù hợp kinh tế, xã hội, văn hóa, đạo đức VN; gắn pháp luật, kỷ cương — <b>CHƯA</b> đặt ra cụ thể', 3),
      D('d3', 'Dân sinh · dân trí · dân quyền — <b>CHƯA</b> đặt đúng vị trí', 4),
      O('o1', 'Ba ý có chung chữ nào?', 5),
      H('HUB', 'Dân chủ đã có, nhưng NHẬN THỨC về dân chủ XHCN chưa được xác định', 6)
    ],
    rows: [R([['d0', 'd1'], ['o1', 'HUB'], ['d2', 'd3']], [1, 0.9, 1])],
    edges: [['d0', 'd1', 'arrow'], ...cv(['d1', 'd2', 'd3'], 'HUB')]
  });

  SLIDES.push({
    id: 'A2', part: 1, title: 'Đại hội VI (1986)',
    nodes: [
      D('d1', 'Đường lối đổi mới toàn diện', 1),
      D('d2', 'Phát huy dân chủ → tạo động lực mạnh mẽ cho phát triển', 2),
      G('g1', 'Trước Đổi mới: vị trí của dân chủ <b>CHƯA</b> được xác định', 5),
      Q('q1', '“…quán triệt tư tưởng ‘lấy dân làm gốc’, xây dựng và phát huy quyền làm chủ của nhân dân lao động”', 3, { who: 'Đại hội VI' }),
      D('d3', 'Bài học: “cách mạng là sự nghiệp của quần chúng”', 4),
      Q('q2', '“ở đâu, nhân dân lao động có ý thức làm chủ và được làm chủ thật sự, thì ở đấy xuất hiện phong trào cách mạng”', 4, { who: 'Đại hội VI' }),
      O('o1', 'So với trước: dân chủ được gọi tên là gì?', 5),
      H('HUB', 'Dân chủ = ĐỘNG LỰC · Lấy dân làm gốc', 6)
    ],
    rows: [R([['d1', 'd2', 'g1'], ['o1', 'HUB'], ['q1', 'd3', 'q2']], [1, 0.9, 1.15])],
    edges: [['d1', 'd2', 'arrow'], ['d2', 'HUB', 'conv'], ['q1', 'HUB', 'conv'], ['d3', 'q2', 'arrow'], ['q2', 'HUB', 'conv'], ['g1', 'd2', 'vs']]
  });

  SLIDES.push({
    id: 'A3', part: 1, title: 'Qua mỗi kỳ đại hội thời kỳ đổi mới',
    nodes: [
      D('d1', 'Đặc trưng của CNXH Việt Nam: do nhân dân làm chủ', 1),
      D('d2', 'Mục tiêu tổng quát: Dân giàu, nước mạnh, <b>DÂN CHỦ</b>, công bằng, văn minh', 2),
      Q('q1', '“Dân chủ XHCN là bản chất của chế độ ta, vừa là mục tiêu, vừa là động lực…”', 3, { who: 'Đảng' }),
      D('d3', 'Thực hiện ở mỗi cấp, trên tất cả các lĩnh vực', 4),
      D('d4', 'Gắn liền với kỷ luật, kỷ cương; thể chế hóa bằng pháp luật, được pháp luật bảo đảm', 5),
      G('g1', 'Trước Đổi mới: bản chất dân chủ <b>CHƯA</b> xác định · <b>CHƯA</b> gắn với pháp luật', 6),
      H('HUB', 'Dân chủ ngày càng được nhận thức, phát triển, hoàn thiện đúng đắn, phù hợp hơn', 7)
    ],
    rows: [R([['d1'], ['d2'], ['q1'], ['d3'], ['d4']]), R([['g1'], []], [4, 1.3]), R([['HUB']])],
    edges: [...chain(['d1', 'd2', 'q1', 'd3', 'd4']), ['d4', 'HUB', 'conv'], ['g1', 'q1', 'vs'], ['g1', 'd4', 'vs']]
  });

  const QS = [
    ['q1', 'Bao nhiêu lợi ích đều vì ___'],
    ['q2', 'Bao nhiêu quyền hạn đều của ___'],
    ['q3', 'Công cuộc đổi mới, xây dựng là trách nhiệm của ___'],
    ['q4', 'Sự nghiệp kháng chiến, kiến quốc là công việc của ___'],
    ['q5', 'Chính quyền từ xã đến Chính phủ trung ương do ___ cử ra'],
    ['q6', 'Đoàn thể từ Trung ương đến xã do ___ tổ chức nên'],
    ['q7', 'Nói tóm lại, quyền hành và lực lượng đều ở nơi ___']
  ];
  SLIDES.push({
    id: 'A4', part: 1, title: '“Nước ta là nước dân chủ” — Hồ Chí Minh', fill: 3,
    nodes: [
      ...QS.map(q => Q(q[0], q[1], 1, { who: 'Hồ Chí Minh' })),
      O('o1', 'Chữ còn thiếu là gì?', 2),
      H('HUB', 'TẤT CẢ QUYỀN LỰC THUỘC VỀ NHÂN DÂN — dân là gốc, là chủ, dân làm chủ', 4),
      D('s1', 'Dựa vào: Nhà nước XHCN + sự ủng hộ, giúp đỡ của nhân dân', 5),
      D('s2', 'Con người: tư cách công dân, tư cách người làm chủ', 5)
    ],
    rows: [R([['q1', 'q2', 'q3', 'q4', 's1'], ['o1', 'HUB'], ['q5', 'q6', 'q7', 's2']], [1, 0.95, 1])],
    edges: [...cv(['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'], 'HUB'), ['s1', 'HUB', 'arrow'], ['s2', 'HUB', 'arrow']]
  });

  SLIDES.push({
    id: 'A5', part: 1, title: 'Bốn nội dung của dân chủ',
    nodes: [
      D('n1', '<b>MỤC TIÊU</b> — dân giàu, nước mạnh, dân chủ, công bằng, văn minh', 1),
      D('n2', '<b>BẢN CHẤT</b> — nhân dân làm chủ, quyền lực thuộc về nhân dân', 2),
      D('n3', '<b>ĐỘNG LỰC</b> — phát huy sức mạnh nhân dân, toàn dân tộc', 3),
      D('n4', '<b>GẮN VỚI PHÁP LUẬT</b> — đi đôi với kỷ luật, kỷ cương', 4),
      G('g1', 'Ba mươi lăm năm đổi mới: bản chất · mục tiêu · động lực · gắn với pháp luật', 5),
      H('HUB', 'Dân chủ phải được thực hiện ở TẤT CẢ CÁC CẤP, MỌI LĨNH VỰC: kinh tế · chính trị · văn hóa · xã hội', 6)
    ],
    rows: [R([['n1', 'n2'], ['g1', 'HUB'], ['n3', 'n4']], [1, 1.05, 1])],
    edges: [...cv(['n1', 'n2', 'n3', 'n4'], 'HUB'), ['g1', 'HUB', 'cross']]
  });

  SLIDES.push({
    id: 'A6', part: 1, title: 'Dân tự làm, hay giao cho người đại diện?',
    nodes: [
      O('o1', 'Chia 6 thẻ thành 2 nhóm', 1, { u: 1 }),
      D('m1', 'Người và tổ chức được bầu đại diện, thực hiện quyền làm chủ cho nhân dân', 1, { u: 1 }),
      D('m2', 'Được thông tin về hoạt động của nhà nước', 1, { u: 1 }),
      D('m3', 'Nhân dân bầu ra Quốc hội — cơ quan quyền lực nhà nước cao nhất, nhiệm kỳ 5 năm', 1, { u: 1 }),
      D('m4', 'Kiểm tra, giám sát cơ quan nhà nước từ Trung ương đến cơ sở', 1, { u: 1 }),
      D('m5', '“Ủy quyền”, giao quyền lực cho tổ chức do nhân dân trực tiếp bầu ra', 1, { u: 1 }),
      D('m6', 'Được bàn bạc về công việc của nhà nước, cộng đồng dân cư; bàn quyết định dân chủ cơ sở', 1, { u: 1 }),
      D('c1', 'Nhân dân bầu ra Quốc hội — cơ quan quyền lực nhà nước cao nhất, nhiệm kỳ 5 năm', 2, { late: true }),
      D('c3', '“Ủy quyền”, giao quyền lực cho tổ chức do nhân dân trực tiếp bầu ra', 2, { late: true }),
      D('c5', 'Người và tổ chức được bầu đại diện, thực hiện quyền làm chủ cho nhân dân', 2, { late: true }),
      D('c2', 'Được thông tin về hoạt động của nhà nước', 2, { late: true }),
      D('c4', 'Được bàn bạc về công việc của nhà nước, cộng đồng dân cư; bàn quyết định dân chủ cơ sở', 2, { late: true }),
      D('c6', 'Kiểm tra, giám sát cơ quan nhà nước từ Trung ương đến cơ sở', 2, { late: true }),
      H('Lh', 'DÂN CHỦ GIÁN TIẾP — dân chủ đại diện', 2, { late: true }),
      H('Rh', 'DÂN CHỦ TRỰC TIẾP — dân tự hành động', 2, { late: true }),
      D('Lx', 'Quyền lực thống nhất; phân công, phối hợp, kiểm soát: lập pháp – hành pháp – tư pháp', 3, { late: true }),
      G('g1', 'Bảy chữ “dân”: tất cả quyền lực thuộc về nhân dân', 4, { late: true }),
      H('HUB', 'Bản chất dân chủ XHCN được thực hiện qua HAI HÌNH THỨC → trở thành quy chế, cách làm việc của mọi tổ chức', 5)
    ],
    rows: [
      R([['c1', 'c3', 'c5', 'Lh'], ['o1', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6'], ['c2', 'c4', 'c6', 'Rh']], [1, 0.9, 1]),
      R([['Lx'], ['HUB'], ['g1']], [1, 1.3, 0.9])
    ],
    edges: [['c5', 'Lh', 'arrow'], ['c6', 'Rh', 'arrow'],
      ['Lh', 'Lx', 'arrow'], ['Lh', 'HUB', 'conv'], ['Rh', 'HUB', 'conv'], ['g1', 'HUB', 'cross']]
  });

  SLIDES.push({
    id: 'A7', part: 1, title: 'Thực tiễn xây dựng đất nước',
    nodes: [
      D('d1', 'Yêu cầu tất yếu: củng cố điều kiện đảm bảo quyền làm chủ; chăm lo đời sống vật chất, tinh thần', 1),
      D('d2', 'Quyền làm chủ ngày càng mở rộng, hoạt động có hiệu quả', 2),
      D('d3', 'Ý thức làm chủ, trách nhiệm công dân ngày càng được đề cao', 3),
      D('d4', 'Mọi công dân có quyền tham gia quản lý xã hội bằng nhiều cách, tùy trách nhiệm và nghĩa vụ', 4),
      D('d5', 'Dân chủ công dân gắn liền kỷ cương, thể chế hóa bằng luật', 5),
      D('d6', 'Quy chế dân chủ từ cơ sở đến Trung ương: <b>DÂN BIẾT · DÂN BÀN · DÂN LÀM · DÂN KIỂM TRA</b>', 6),
      O('o1', 'Chữ “quyền” luôn đi cùng chữ gì?', 7),
      H('HUB', '“Mọi đường lối, chính sách của Đảng và pháp luật của Nhà nước đều vì lợi ích của nhân dân, có sự tham gia ý kiến của nhân dân”', 8)
    ],
    rows: [R([['d1', 'd2', 'd3'], ['o1', 'HUB'], ['d4', 'd5', 'd6']], [1, 1.05, 1])],
    edges: cv(['d1', 'd2', 'd3', 'd4', 'd5', 'd6'], 'HUB')
  });

  SLIDES.push({
    id: 'A8', part: 1, title: 'Những trở ngại',
    nodes: [
      D('L1', 'Xuất phát từ nền kinh tế kém phát triển', 1),
      D('L2', 'Hậu quả chiến tranh tàn phá nặng nề', 2),
      D('L3', 'Tiêu cực xã hội chưa khắc phục triệt để → suy giảm động lực phát triển', 3),
      O('o1', 'Mặt khác', 4),
      D('R1', '“Diễn biến hòa bình”, bạo loạn, lật đổ; chiêu bài “dân chủ”, “nhân quyền”', 5),
      D('R2', '“Tự diễn biến”, “tự chuyển hóa” — hết sức phức tạp', 6),
      H('HUB', 'Đang là TRỞ NGẠI đối với thực hiện dân chủ ở nước ta hiện nay', 7)
    ],
    rows: [R([['L1', 'L2', 'L3'], ['o1'], ['R1', 'R2']], [1, 0.4, 1]), R([['HUB']])],
    edges: cv(['L1', 'L2', 'L3', 'R1', 'R2'], 'HUB')
  });

  SLIDES.push({
    id: 'A9', part: 1, title: 'Phần 1 — Dân chủ xã hội chủ nghĩa ở Việt Nam',
    nodes: [
      G('g1', 'Trước và trong Đổi mới: từ “chưa xác định” → bản chất · mục tiêu · động lực', 1),
      G('g2', 'Tất cả quyền lực thuộc về nhân dân', 2),
      G('g3', 'Bốn nội dung · thực hiện ở mọi cấp, mọi lĩnh vực', 3),
      G('g4', 'Dân chủ gián tiếp + trực tiếp · dân biết, bàn, làm, kiểm tra', 4),
      G('g5', 'Những trở ngại đối với thực hiện dân chủ', 5),
      G('g6', 'Đại hội VI: lấy dân làm gốc', 6),
      H('HUB', 'Bản chất tốt đẹp, tính ưu việt của nền dân chủ XHCN Việt Nam càng ngày càng thể hiện giá trị LẤY DÂN LÀM GỐC — nhân dân thực sự trở thành người làm chủ', 7),
      D('s1', 'Bảo đảm quyền làm chủ từ chính trị, kinh tế đến văn hóa, xã hội; phát huy tính tích cực, sáng tạo của nhân dân', 8)
    ],
    rows: [R([['g1', 'g2', 'g3'], ['HUB', 's1'], ['g4', 'g5', 'g6']], [1, 1.2, 1])],
    edges: [...cv(['g1', 'g2', 'g3', 'g4', 'g5'], 'HUB'), ['g6', 'HUB', 'conv'], ['HUB', 's1', 'arrow']]
  });

  /* ---------- PHẦN 2 ---------- */
  SLIDES.push({
    id: 'B1', part: 2, title: 'Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH',
    nodes: [
      D('k1', 'Tối thượng của Hiến pháp và pháp luật', 1),
      D('k2', 'Quyền lợi, nghĩa vụ công dân; quyền con người', 2),
      D('k3', 'Tập trung, thống nhất + phân công các nhánh quyền lực, phân cấp → <b>TRÁNH LẠM QUYỀN</b>', 3),
      D('k4', 'Gắn bó với nhân dân; lắng nghe; <b>CHỊU SỰ GIÁM SÁT</b> của nhân dân', 4),
      D('k5', '<b>KIỂM SOÁT</b>, ngăn ngừa, trừng trị quan liêu, tham nhũng, lộng quyền, vô trách nhiệm', 5),
      D('k6', 'Tập trung dân chủ; thống nhất quyền lực; chỉ đạo thống nhất của Trung ương', 6),
      O('o1', 'k3 · k4 · k5 cùng hướng về đâu?', 7),
      H('HUB', '?', 8)
    ],
    rows: [R([['k1', 'k2', 'k3'], ['o1', 'HUB'], ['k4', 'k5', 'k6']], [1, 0.7, 1])],
    edges: ar(['k1', 'k2', 'k3', 'k4', 'k5', 'k6'], 'HUB')
  });

  SLIDES.push({
    id: 'B2', part: 2, title: 'Nhận thức qua các kỳ Đại hội', hl: 5,
    nodes: [
      D('s1', 'Chủ trương: Nhà nước pháp quyền Việt Nam <b>CỦA DÂN, DO DÂN, VÌ DÂN</b> → quản lý xã hội bằng pháp luật; mọi người có nghĩa vụ chấp hành Hiến pháp, pháp luật', 1),
      Q('s2', 'ĐH XII: “Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm soát…”', 2, { who: 'ĐH XII' }),
      Q('s3', 'ĐH XIII: “…phân công <mark>rành mạch</mark>, phối hợp <mark>chặt chẽ</mark> và <mark>tăng cường</mark> kiểm soát quyền lực nhà nước”', 3, { who: 'ĐH XIII' }),
      O('o1', 'Câu XIII thêm chữ nào so với XII?', 4),
      G('g1', 'Cương lĩnh: tránh lạm quyền · chịu sự giám sát của nhân dân · kiểm soát, trừng trị tham nhũng', 6),
      G('g2', 'Dân chủ gián tiếp: quyền lực thống nhất, có phân công, phối hợp, kiểm soát', 6),
      H('HUB', 'KIỂM SOÁT QUYỀN LỰC — nhận thức về Nhà nước pháp quyền ngày càng sáng tỏ', 7)
    ],
    rows: [R([['s1'], ['s2'], ['s3']]), R([['o1']]), R([['g1'], ['HUB'], ['g2']], [1, 1.6, 1])],
    edges: [...chain(['s1', 's2', 's3']), ['s3', 'HUB', 'conv'], ['g1', 'HUB', 'cross'], ['g2', 'HUB', 'cross']]
  });

  SLIDES.push({
    id: 'B3', part: 2, title: 'Sáu đặc điểm (1–3)',
    nodes: [
      G('g1', 'Chủ trương: Nhà nước pháp quyền của dân, do dân, vì dân', 1),
      D('f1', '<b>1</b> · Nhà nước CỦA DÂN, DO DÂN, VÌ DÂN — nhân dân lao động làm chủ', 1),
      G('g2', 'Cương lĩnh: đề cao vai trò tối thượng của Hiến pháp và pháp luật', 2),
      D('f2', '<b>2</b> · Dựa trên Hiến pháp, pháp luật; pháp luật ở VỊ TRÍ TỐI THƯỢNG', 2),
      G('g3', 'Đại hội XII, XIII: quyền lực thống nhất, có phân công, phối hợp, kiểm soát', 3),
      D('f3', '<b>3</b> · Quyền lực thống nhất; phân công rõ ràng, phối hợp nhịp nhàng, kiểm soát: lập pháp – hành pháp – tư pháp', 3),
      H('HUB', 'Nhà nước pháp quyền XHCN Việt Nam (đang điền: 3/6)', 4)
    ],
    rows: [R([{ ids: ['g1', 'f1', 'g2', 'f2', 'g3', 'f3'], g: 2 }, ['HUB']], [3, 1.1])],
    edges: [['g1', 'f1', 'arrow'], ['g2', 'f2', 'arrow'], ['g3', 'f3', 'arrow'], ...cv(['f1', 'f2', 'f3'], 'HUB')]
  });

  SLIDES.push({
    id: 'B4', part: 2, title: 'Sáu đặc điểm (4–6)',
    nodes: [
      G('g4', 'Phương châm dân biết, dân bàn, dân làm, dân kiểm tra · Cương lĩnh: nhà nước chịu sự giám sát của nhân dân', 1),
      D('f4', '<b>4</b> · Đảng Cộng sản Việt Nam lãnh đạo (Điều 4 Hiến pháp 2013); nhân dân giám sát: dân biết, dân bàn, dân làm, dân kiểm tra', 1),
      G('g5', 'Cương lĩnh: đề cao quyền lợi, nghĩa vụ công dân; bảo đảm quyền con người', 2),
      D('f5', '<b>5</b> · Tôn trọng quyền con người — chủ thể, trung tâm của phát triển; “nhân dân có quyền bầu và bãi miễn những đại biểu không xứng đáng”', 2),
      G('g6', 'Cương lĩnh: tổ chức bộ máy theo nguyên tắc tập trung dân chủ', 3),
      D('f6', '<b>6</b> · Tập trung dân chủ — phân công, phân cấp, phối hợp, kiểm soát; quyền lực thống nhất, chỉ đạo thống nhất của Trung ương', 3),
      H('HUB', 'Nhà nước pháp quyền XHCN Việt Nam (6/6)', 4)
    ],
    rows: [R([{ ids: ['g4', 'f4', 'g5', 'f5', 'g6', 'f6'], g: 2 }, ['HUB']], [3, 1.1])],
    edges: [['g4', 'f4', 'arrow'], ['g5', 'f5', 'arrow'], ['g6', 'f6', 'arrow'], ...cv(['f4', 'f5', 'f6'], 'HUB')]
  });

  const FT = ['Nhà nước của dân, do dân, vì dân', 'Hiến pháp, pháp luật ở vị trí tối thượng', 'Quyền lực thống nhất; phân công, phối hợp, kiểm soát', 'Đảng Cộng sản Việt Nam lãnh đạo; nhân dân giám sát', 'Tôn trọng quyền con người; pháp luật nghiêm minh', 'Tập trung dân chủ; chỉ đạo thống nhất của Trung ương'];
  const F = FT.map((x, i) => G('F' + (i + 1), '<b>' + (i + 1) + '</b> · ' + x, 1, i === 3 ? { alert: 4 } : {}));
  SLIDES.push({
    id: 'B5', part: 2, title: 'Đối chiếu với quan niệm chung về nhà nước pháp quyền',
    nodes: [
      ...F,
      D('P1', 'Thượng tôn pháp luật', 1),
      D('P2', 'Hướng tới phúc lợi; cá nhân tự do, bình đẳng, phát huy năng lực', 1),
      D('P3', 'Cơ quan được phân quyền rõ ràng; chấp nhận trên nguyên tắc bình đẳng giữa các thế lực, giai cấp, tầng lớp', 1),
      D('P4', 'Hiện nay còn những cách hiểu khác nhau. Song, được hiểu là: mọi công dân được giáo dục pháp luật, hiểu biết, tuân thủ pháp luật', 2),
      D('P5', 'Pháp luật nghiêm minh', 2),
      D('P6', 'Cơ quan nhà nước phân công, phối hợp, kiểm soát lẫn nhau', 2),
      D('P7', 'Tất cả vì mục tiêu phục vụ nhân dân', 2),
      O('o1', 'Đặc điểm nào KHÔNG có cặp?', 4)
    ],
    rows: [R([['F1', 'F2', 'F3', 'F4', 'F5', 'F6'], ['P7', 'P1', 'P6', 'P5', 'P2', 'P3', 'P4']], [1.5, 2.6], 150), R([['o1']])],
    edges: [['P7', 'F1', 'vs', '', 3], ['P1', 'F2', 'vs', '', 3], ['P6', 'F3', 'vs', '', 3], ['P6', 'F6', 'vs', '', 3], ['P5', 'F5', 'vs', '', 3]]
  });

  SLIDES.push({
    id: 'B6', part: 2, title: 'Phần 2 — Nhà nước pháp quyền XHCN Việt Nam',
    nodes: [
      D('V1', '<b>Phần CHUNG:</b> các tinh thần cơ bản của nhà nước pháp quyền nói chung (những cặp khớp vừa nối)', 1),
      G('g1', 'Đặc điểm “Đảng Cộng sản Việt Nam lãnh đạo” không có cặp trong quan niệm chung', 2),
      D('V2', '<b>Phần KHÁC ①:</b> mang BẢN CHẤT GIAI CẤP CÔNG NHÂN, phục vụ lợi ích nhân dân', 3),
      D('V3', '<b>Phần KHÁC ②:</b> công cụ chủ yếu để Đảng Cộng sản Việt Nam định hướng đi lên CNXH', 4),
      H('HUB', 'Vừa thể hiện tinh thần chung của nhà nước pháp quyền, vừa có sự khác biệt', 5)
    ],
    rows: [R([['V1'], ['V2'], ['g1', 'V3']]), R([['HUB']])],
    edges: [...cv(['V1', 'V2', 'V3'], 'HUB'), ['g1', 'V3', 'arrow']]
  });

  /* ---------- PHẦN 3 ---------- */
  SLIDES.push({
    id: 'C1', part: 3, title: 'a) Phát huy dân chủ — Một là',
    nodes: [
      D('e1', 'Đa dạng hình thức sở hữu, thành phần kinh tế, loại hình doanh nghiệp; bảo hộ quyền chủ sở hữu', 1),
      D('e2', 'Luật về tài sản mới: sở hữu trí tuệ, cổ phiếu, trái phiếu…', 2),
      D('e3', 'Thể chế đồng bộ 3 khâu: ban hành → vận hành, thực thi → giám sát, xử lý vi phạm', 3),
      D('e4', 'Cải cách hành chính: từ bộ máy đến thủ tục → cải thiện môi trường kinh doanh', 4),
      D('e5', 'Phát triển đồng bộ các yếu tố thị trường; hoàn thiện pháp luật kinh doanh phù hợp Việt Nam', 5),
      G('g1', 'Trở ngại: nền kinh tế kém phát triển', 6),
      H('HUB', 'Hoàn thiện thể chế kinh tế thị trường định hướng XHCN → CƠ SỞ KINH TẾ VỮNG CHẮC cho dân chủ', 7)
    ],
    rows: [R([['e1', 'e2', 'e3'], ['g1', 'HUB'], ['e4', 'e5']], [1, 1, 1])],
    edges: [...cv(['e1', 'e2', 'e3', 'e4', 'e5'], 'HUB'), ['g1', 'HUB', 'cross']]
  });

  SLIDES.push({
    id: 'C2', part: 3, title: 'a) Phát huy dân chủ — Hai là, Ba là',
    nodes: [
      D('p1', 'Vững mạnh chính trị, tư tưởng, tổ chức; tự đổi mới, tự chỉnh đốn', 1),
      D('p2', 'Nâng cao trí tuệ, bản lĩnh chính trị, phẩm chất đạo đức, năng lực lãnh đạo', 2),
      D('p3', 'Dân chủ hóa sinh hoạt; tập trung dân chủ; tự phê bình và phê bình', 3),
      H('H2', 'Hai là: Đảng trong sạch, vững mạnh = ĐIỀU KIỆN TIÊN QUYẾT', 4),
      D('n1', 'Thực thi quyền dân chủ trên mọi lĩnh vực, bằng Hiến pháp, pháp luật', 5),
      D('n2', 'Quyền con người là GIÁ TRỊ CAO NHẤT', 6),
      D('n3', 'Chính sách, pháp luật dựa vào ý chí, nguyện vọng nhân dân; bảo đảm danh dự, nhân phẩm bằng pháp luật và trên thực tế', 7),
      H('H3', 'Ba là: Nhà nước pháp quyền vững mạnh = ĐIỀU KIỆN ĐỂ THỰC THI dân chủ', 8)
    ],
    rows: [R([{ ids: ['p1', 'p2', 'p3'], g: 3 }, ['H2']], [3.4, 1]), R([{ ids: ['n1', 'n2', 'n3'], g: 3 }, ['H3']], [3.4, 1])],
    edges: [...cv(['p1', 'p2', 'p3'], 'H2'), ...cv(['n1', 'n2', 'n3'], 'H3')]
  });

  SLIDES.push({
    id: 'C3', part: 3, title: 'a) Phát huy dân chủ — Bốn là, Năm là',
    nodes: [
      D('t1', 'Đổi mới mạnh mẽ phương thức hoạt động', 1),
      D('t2', 'Giám sát, phản biện đường lối, chính sách, pháp luật', 2),
      D('t3', 'Khối đoàn kết toàn dân; chăm lo đời sống nhân dân', 3),
      D('t4', 'Bảo vệ chính quyền, xây dựng Đảng, bảo vệ quyền lợi chính đáng của nhân dân', 4),
      H('H4', 'Bốn là: NÂNG CAO VAI TRÒ tổ chức chính trị – xã hội', 5),
      D('m1', 'Giám sát, phản biện ảnh hưởng tới đời sống tâm lý nhân dân khi đánh giá chủ trương, chính sách', 6),
      D('m2', 'Công khai hóa · minh bạch hóa · dân chủ hóa thông tin', 6),
      D('m3', 'Cụ thể hóa quy chế tôn trọng, lắng nghe ý kiến nhân dân', 6),
      D('m4', 'Nâng cao <b>DÂN TRÍ</b>, văn hóa pháp luật cho toàn xã hội', 7),
      G('g1', 'Trước Đổi mới: dân trí <b>CHƯA</b> được đặt đúng vị trí', 7),
      G('g2', 'Phương châm: dân biết, dân bàn, dân làm, dân kiểm tra', 8),
      H('H5', 'Năm là: hệ thống giám sát, phản biện xã hội → ĐỂ PHÁT HUY QUYỀN LÀM CHỦ của nhân dân', 9)
    ],
    rows: [R([{ ids: ['t1', 't2', 't3', 't4'], g: 2 }, ['H4']], [2.2, 1]), R([{ ids: ['m1', 'm2', 'm3', 'm4', 'g1'], g: 3 }, ['g2', 'H5']], [3, 1])],
    edges: [...cv(['t1', 't2', 't3', 't4'], 'H4'), ...cv(['m1', 'm2', 'm3', 'm4'], 'H5'), ['g1', 'm4', 'cross'], ['g2', 'H5', 'cross']]
  });

  SLIDES.push({
    id: 'C4', part: 3, title: 'Mỗi giải pháp giữ vai trò gì?',
    nodes: [
      O('o1', 'Nối giải pháp với vai trò', 1),
      G('a1', 'Một là — Thể chế kinh tế', 1),
      G('a2', 'Hai là — Đảng', 1),
      G('a3', 'Ba là — Nhà nước pháp quyền', 1),
      G('a4', 'Bốn là — Tổ chức chính trị – xã hội', 1),
      G('a5', 'Năm là — Giám sát, phản biện', 1),
      D('r1', 'cơ sở kinh tế vững chắc', 1),
      D('r2', 'điều kiện tiên quyết', 1),
      D('r3', 'điều kiện để thực thi', 1),
      D('r4', 'nâng cao vai trò', 1),
      D('r5', 'để phát huy quyền làm chủ', 1),
      H('HUB', 'a) PHÁT HUY DÂN CHỦ XHCN Ở VIỆT NAM HIỆN NAY', 3)
    ],
    rows: [R([['o1']]), R([['a1', 'a2', 'a3', 'a4', 'a5'], ['r4', 'r1', 'r5', 'r3', 'r2']], [1, 1.1], 220), R([['HUB']])],
    edges: [...[1, 2, 3, 4, 5].map(i => ['a' + i, 'r' + i, 'arrow', '', 2]), ...cv(['r1', 'r2', 'r3', 'r4', 'r5'], 'HUB')]
  });

  SLIDES.push({
    id: 'C5', part: 3, title: 'b) Hoàn thiện Nhà nước pháp quyền — Một là, Hai là',
    nodes: [
      G('g1', 'Nhà nước mang bản chất giai cấp công nhân', 1),
      D('l1', 'Bản chất giai cấp công nhân; gắn bó chặt chẽ với dân tộc, nhân dân', 1),
      G('g3', 'Kiểm soát quyền lực nhà nước', 2),
      D('l2', 'Quyền lực thống nhất; phân công, phối hợp: lập pháp – hành pháp – tư pháp', 2),
      H('H1', 'Một là: xây dựng Nhà nước pháp quyền DƯỚI SỰ LÃNH ĐẠO CỦA ĐẢNG', 3),
      G('g2', 'Quốc hội là cơ quan quyền lực nhà nước cao nhất', 4),
      D('i1', 'Quốc hội: cơ quan quyền lực cao nhất; lập hiến, lập pháp; một số nhiệm vụ hành pháp, tư pháp; giám sát tối cao', 4),
      D('i2', 'Hành chính: dân chủ, trong sạch, vững mạnh, từng bước hiện đại hóa', 5),
      D('i3', 'Giảm mạnh, bãi bỏ thủ tục gây phiền hà; nâng cao năng lực thực hiện cơ chế, chính sách', 6),
      D('i4', 'Xã hội hóa dịch vụ công', 7),
      H('H2', 'Hai là: CẢI CÁCH THỂ CHẾ và phương thức hoạt động', 8)
    ],
    rows: [R([{ ids: ['g1', 'l1', 'g3', 'l2'], g: 2 }, ['H1']], [2.4, 1]), R([{ ids: ['g2', 'i1', 'i2', 'i3', 'i4'], g: 3 }, ['H2']], [3.2, 1])],
    edges: [['g1', 'l1', 'cross'], ['g3', 'l2', 'cross'], ['g2', 'i1', 'cross'], ...cv(['l1', 'l2'], 'H1'), ...cv(['i1', 'i2', 'i3', 'i4'], 'H2')]
  });

  SLIDES.push({
    id: 'C6', part: 3, title: 'b) Hoàn thiện Nhà nước pháp quyền — Ba là, Bốn là',
    nodes: [
      D('c1', 'Bản lĩnh chính trị, phẩm chất đạo đức, năng lực lãnh đạo, điều hành', 1),
      D('c2', 'Đãi ngộ, động viên, khuyến khích người hoàn thành tốt nhiệm vụ', 2),
      D('c3', 'Loại bỏ, miễn nhiệm người không hoàn thành nhiệm vụ, vi phạm kỷ luật, đạo đức công vụ', 3),
      H('H3', 'Ba là: đội ngũ cán bộ, công chức TRONG SẠCH, CÓ NĂNG LỰC', 4),
      D('x1', 'Hoàn thiện thể chế + cải cách hành chính', 5),
      D('x2', 'Khuyến khích và bảo vệ người đấu tranh chống tham nhũng', 6),
      D('x3', 'Chế tài xử lý cá nhân, tổ chức vi phạm', 7),
      D('x4', 'Toàn Đảng, toàn dân thực hành tiết kiệm', 8),
      G('g1', 'Cương lĩnh: ngăn ngừa và trừng trị tham nhũng', 9),
      H('H4', 'Bốn là: phòng, chống tham nhũng, lãng phí — nhiệm vụ CẤP BÁCH, LÂU DÀI', 10)
    ],
    rows: [R([{ ids: ['c1', 'c2', 'c3'], g: 3 }, ['H3']], [3.2, 1]), R([{ ids: ['x1', 'x2', 'x3', 'x4'], g: 3 }, ['g1', 'H4']], [3.2, 1])],
    edges: [...cv(['c1', 'c2', 'c3'], 'H3'), ...cv(['x1', 'x2', 'x3', 'x4'], 'H4'), ['g1', 'H4', 'cross']]
  });

  const PAIRS = [
    ['A8', 'Trở ngại: kinh tế kém phát triển', 't1', 'Cơ sở kinh tế vững chắc', 'X5'],
    ['A1', 'Trước Đổi mới: dân trí chưa đúng vị trí', 't2', 'Nâng cao dân trí', 'X6'],
    ['A7', 'Phương châm: dân biết, bàn, làm, kiểm tra', 't3', 'Giám sát, phản biện', 'X4'],
    ['B6', 'Nhà nước pháp quyền: bản chất giai cấp công nhân', 't4', 'Dưới sự lãnh đạo của Đảng', 'X9'],
    ['A6', 'Dân chủ gián tiếp: Quốc hội cao nhất', 't5', 'Cải cách Quốc hội', 'X10'],
    ['B1', 'Cương lĩnh: trừng trị tham nhũng', 't6', 'Phòng, chống tham nhũng', 'X7']
  ];
  SLIDES.push({
    id: 'C7', part: 3, title: 'Phần 3 — Mỗi giải pháp nối về đâu?',
    nodes: [
      ...PAIRS.map((p, i) => G('g' + p[0], p[1], i + 1)),
      ...PAIRS.map((p, i) => D(p[2], p[3], i + 1)),
      H('HA', 'a) Phát huy dân chủ XHCN — 5 giải pháp', 7),
      H('HB', 'b) Hoàn thiện Nhà nước pháp quyền XHCN — 4 giải pháp', 7)
    ],
    rows: [R([{ ids: PAIRS.flatMap(p => ['g' + p[0], p[2]]), g: 2 }, { ids: ['HA', 'HB'], spread: true }], [3.4, 1])],
    edges: [...PAIRS.map(p => ['g' + p[0], p[2], 'cross']), ...cv(['t1', 't2', 't3'], 'HA'), ...cv(['t4', 't5', 't6'], 'HB')]
  });

  /* ---------- KẾT ---------- */
  const CH = (code, name) => `<a data-go="${code}" class="chip">${name}</a>`;
  const col1 = [['M1', 'Một dữ kiện mở đầu'], ['A1', 'Trước Đổi mới'], ['A2', 'Đại hội VI'], ['A3', 'Ba mươi lăm năm đổi mới'], ['A4', 'Bảy chữ “dân”'], ['A5', 'Bốn nội dung'], ['A6', 'Hai hình thức'], ['A7', 'Thực tiễn'], ['A8', 'Trở ngại'], ['A9', 'Khái quát phần 1']];
  const col2 = [['B1', 'Cương lĩnh'], ['B2', 'Qua các kỳ Đại hội'], ['B3', 'Đặc điểm 1–3'], ['B4', 'Đặc điểm 4–6'], ['B5', 'Đối chiếu quan niệm chung'], ['B6', 'Khái quát phần 2']];
  const col3 = [['C1', 'Một là: kinh tế'], ['C2', 'Hai là, Ba là'], ['C3', 'Bốn là, Năm là'], ['C4', 'Ghép vai trò'], ['C5', 'b) Một là, Hai là'], ['C6', 'b) Ba là, Bốn là'], ['C7', 'Khái quát phần 3']];
  const chips = (h, a) => `<b class="ch">${h}</b>` + a.map(c => CH(c[0], c[1])).join('');
  const XC = [
    ['X1', 'Quyền lực thuộc về nhân dân', 'Bảy chữ “dân” → Hai hình thức · Đặc điểm 1–3 · Kết luận'],
    ['X2', 'Dân chủ gắn với pháp luật, kỷ cương', 'Ba mươi lăm năm đổi mới → Bốn nội dung · Thực tiễn · Đặc điểm 1–3 · Đối chiếu'],
    ['X3', 'Phân công – phối hợp – kiểm soát quyền lực', 'Hai hình thức → Cương lĩnh · Các kỳ Đại hội · Đặc điểm 1–6 · Hoàn thiện Nhà nước'],
    ['X4', 'Dân biết, dân bàn, dân làm, dân kiểm tra', 'Thực tiễn → Đặc điểm 4–6 · Giám sát, phản biện · Kết luận'],
    ['X5', 'Kinh tế', 'Trở ngại → Một là: thể chế kinh tế'],
    ['X6', 'Dân trí', 'Trước Đổi mới → Nâng cao dân trí'],
    ['X7', 'Tham nhũng', 'Cương lĩnh → Phòng, chống tham nhũng'],
    ['X8', 'Lấy dân làm gốc', 'Đại hội VI → Khái quát phần 1 · Kết luận'],
    ['X9', 'Bản chất giai cấp công nhân', 'Khái quát phần 2 → Dưới sự lãnh đạo của Đảng'],
    ['X10', 'Quốc hội – cơ quan quyền lực cao nhất', 'Dân chủ gián tiếp → Cải cách Quốc hội']
  ];
  SLIDES.push({
    id: 'K1', part: 4, kmap: true, title: 'Dân chủ XHCN và Nhà nước pháp quyền XHCN ở Việt Nam',
    nodes: [
      N('col1', 'chips', chips('1 · Dân chủ XHCN ở Việt Nam', col1), 1),
      N('col2', 'chips', chips('2 · Nhà nước pháp quyền XHCN', col2), 1),
      N('col3', 'chips', chips('3 · Phát huy & xây dựng hiện nay', col3), 1),
      ...XC.map((x, i) => N('xc' + x[0], 'xcard', `<span class="xc">⇄</span><span class="xt"><b>${x[1]}</b><em>${x[2]}</em></span>`, i + 2, { xcode: x[0] })),
      D('R1', '<b>Bản chất:</b> tất cả quyền lực thuộc về nhân dân — dân là gốc, là chủ, dân làm chủ', 12),
      D('R2', '<b>Nhà nước pháp quyền XHCN:</b> sáu đặc điểm; vừa chung, vừa khác', 13),
      D('R3', '<b>Định hướng:</b> 5 giải pháp phát huy dân chủ + 4 giải pháp hoàn thiện Nhà nước', 14),
      D('R4', '<b>Trách nhiệm công dân:</b> hiểu biết, tuân thủ pháp luật · tham gia quản lý xã hội tùy trách nhiệm, nghĩa vụ · dân biết, bàn, làm, kiểm tra · nâng cao văn hóa pháp luật', 15),
      G('g0', 'Câu hỏi mở đầu: cụm từ “dân chủ XHCN” được xác định thế nào, từ khi nào?', 16),
      H('HUB', 'LẤY DÂN LÀM GỐC', 17)
    ],
    rows: [R([['col1'], ['col2'], ['col3']], [1.25, 1, 1.1]), R([{ ids: XC.map(x => 'xc' + x[0]), g: 5 }]), R([{ ids: ['R1', 'R2', 'R3', 'R4'], g: 4 }]), R([['g0'], ['HUB']], [1.4, 1])],
    edges: [...cv(['R1', 'R2', 'R3', 'R4'], 'HUB'), ['g0', 'HUB', 'cross']]
  });

  SLIDES.push({
    id: 'K2', part: 4, cover: true, title: 'Cảm ơn thầy/cô và các bạn — Mời đặt câu hỏi',
    nodes: [D('ref', 'Tài liệu tham khảo: Bộ GD&ĐT (2021), Chủ nghĩa xã hội khoa học, Nxb. Chính trị quốc gia Sự thật, tr.149–164', 0)],
    rows: [R([['ref']])], edges: []
  });

  window.SLIDES = SLIDES;
  window.PART_LABELS = ['1 · Dân chủ XHCN ở Việt Nam', '2 · Nhà nước pháp quyền XHCN Việt Nam', '3 · Phát huy & xây dựng hiện nay'];
})();
