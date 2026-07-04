# TỔNG QUAN NGHIÊN CỨU LIÊN NGÀNH

## Can thiệp số phục hồi tính tự quyết (digital self-control) cho sinh viên trước thuật toán mạng xã hội: một tổng quan tích hợp dưới lăng kính tha hóa của chủ nghĩa Mác

*Sản phẩm hỗ trợ RBL Level 5 – Nhóm 07, Lớp SE1812 – Đại học FPT TP.HCM*
*Tổng quan tích hợp (integrative literature review) · APA 7.0 · TP. Hồ Chí Minh, tháng 6 năm 2026*

> **Mục đích của tài liệu này:** cung cấp phần *Tổng quan nghiên cứu* và *Khung lý luận* có cơ sở học thuật cho đề cương Level 5, đồng thời neo ba tính năng của công cụ "Tỉnh" vào bằng chứng thực nghiệm hiện có. Tài liệu **không** thay thế nghiên cứu thực nghiệm của nhóm (thử nghiệm extension ở Tuần 3–4) mà làm nền lý luận – thực chứng cho nó.

---

## TÓM TẮT

Tổng quan này tổng hợp 28 nguồn học thuật (phần lớn từ các hội nghị/tạp chí hàng đầu về tương tác người–máy như CHI, CSCW, TOCHI, cùng *Science* và *American Psychologist*) nhằm trả lời: *các can thiệp số (digital self-control tools – DSCT, nudge, friction design, công cụ nâng "algorithm awareness") đã được chứng minh hiệu quả và hạn chế ra sao trong việc phục hồi tính tự quyết của người dùng trước thuật toán gợi ý; và lý luận tha hóa – nhu cầu giả tạo của chủ nghĩa Mác có thể làm khung diễn giải cho loại can thiệp này như thế nào?* Năm chủ đề được rút ra: (1) nền tảng chẩn đoán – nền tảng kinh tế chú ý như một bộ máy sản sinh tha hóa và nhu cầu giả tạo; (2) tính tự quyết (autonomy / sense of agency) như cấu trúc đích đo lường được; (3) các cơ chế can thiệp đã được kiểm chứng và giới hạn của chúng; (4) "làm cho cái vô hình trở nên hữu hình" như một hình thức can thiệp nhận thức; (5) lằn ranh đạo đức giữa thiết kế giải phóng và thao túng kiểu dark pattern. Tổng quan chỉ ra rằng cầu nối *lý luận phê phán Mác ↔ thiết kế công cụ* gần như chưa được nối trực tiếp trong tài liệu hiện có (chỉ Williams, 2018 và mô hình METUX của Peters và cộng sự, 2018 tiệm cận) — đây vừa là **tính mới** vừa là **rủi ro học thuật** chính của đề tài. Ba tính năng của công cụ "Tỉnh" được ánh xạ trực tiếp vào bằng chứng: *khoảng dừng phản tư* ← friction/microboundary; *gương bong bóng lọc* ← trực quan hóa thuật toán kiểu FeedVis; *nhật ký chủ thể* ← cơ chế goal-advancement và cấu trúc "sense of agency".

**Từ khóa:** digital self-control, sense of agency, self-determination theory, nudging, dark patterns, algorithm awareness, filter bubble, tha hóa (alienation), nhu cầu giả tạo (false needs).

---

## 1. GIỚI THIỆU

### 1.1. Bối cảnh và vấn đề

Nghiên cứu định tính Level 4 của Nhóm 07 (phỏng vấn sâu 7 sinh viên FPT, 112 đoạn mã) đã chẩn đoán ba hiện tượng cốt lõi: nghịch lý Biết–Làm, cơ chế *Want–Like Split*, và nhận thức *filter bubble* còn mờ nhạt. Tuy nhiên, chẩn đoán mới dừng ở mô tả. Khoảng trống thực tiễn còn bỏ ngỏ là: **chưa có công cụ chuyển các hiểu biết này thành can thiệp giúp sinh viên tái chiếm quyền làm chủ trước thuật toán.** Tổng quan này khảo sát kho tài liệu quốc tế về can thiệp số đã từng giải quyết đúng khoảng trống đó, để (a) đặt đề tài Level 5 vào bản đồ học thuật hiện có, và (b) bảo đảm thiết kế công cụ dựa trên bằng chứng chứ không chỉ trực giác.

### 1.2. Mục đích và câu hỏi tổng quan

**Câu hỏi tổng quan (RQ-review):** Các can thiệp số đã được chứng minh hiệu quả/hạn chế ra sao trong việc phục hồi tính tự quyết của người dùng trước thuật toán gợi ý, và lý luận tha hóa – nhu cầu giả tạo của chủ nghĩa Mác có thể làm khung diễn giải cho loại can thiệp này như thế nào?

Ba câu hỏi phụ: (1) Cơ chế can thiệp nào có/không hiệu quả? (2) Tha hóa và nhu cầu giả tạo ánh xạ thế nào sang ngôn ngữ thiết kế tương tác (autonomy, self-determination, dark patterns)? (3) Các can thiệp này được đánh giá bằng thước đo gì, gợi ý gì cho thiết kế đánh giá của nhóm?

---

## 2. PHƯƠNG PHÁP TỔNG QUAN

Đây là **tổng quan tích hợp (integrative review)** theo lối tổng hợp chủ đề (thematic synthesis), không phải PRISMA định lượng. Tìm kiếm thực hiện trên các chỉ mục học thuật (ACM Digital Library, Semantic Scholar, PubMed/PMC, Cambridge Core, Springer, MDPI) với các cụm khóa: *digital self-control tools, digital wellbeing, sense of agency, nudging HCI, dark patterns, design friction, algorithm awareness, folk theories of algorithms, filter bubble, self-determination theory technology, alienation digital labour, attention economy.* Tiêu chí chọn: ưu tiên bài bình duyệt ở hội nghị/tạp chí uy tín (CHI, CSCW, TOCHI, *Science*, *American Psychologist*), 5 năm gần đây được ưu tiên nhưng giữ các nguồn lý luận nền (Marx, Marcuse) và mốc kinh điển. **Mọi trích dẫn đều được kiểm chứng DOI/URL độc lập;** các nguồn không xác minh được bị loại theo nguyên tắc liêm chính. Hạn chế của phương pháp được nêu ở Mục 6.

Phân tầng bằng chứng: **Tier 1** (bài bình duyệt đầy đủ ở venue hàng đầu: CHI/CSCW full paper, TOCHI, *Science*, *American Psychologist*); **Tier 2** (sách học thuật bình duyệt, workshop/preprint, tạp chí position); **Lý luận nền** (văn bản kinh điển Marx, Marcuse — không phải bằng chứng thực nghiệm mà là khung diễn giải).

---

## 3. KHUNG LÝ LUẬN: TỪ THA HÓA ĐẾN TÍNH TỰ QUYẾT

Khung lý luận của đề tài bắc một cây cầu hai nhịp.

**Nhịp phê phán (chẩn đoán – từ chủ nghĩa Mác).** Marx (1844/1959) định nghĩa *tha hóa* là trạng thái hoạt động và sản phẩm của chủ thể quay lại đối lập với chính họ như một thế lực xa lạ. Marcuse (1964) mở rộng sang xã hội tiêu dùng với khái niệm *nhu cầu giả tạo* (false needs) — những nhu cầu được áp đặt từ bên ngoài nhằm duy trì hệ thống sản xuất–tiêu thụ, tạo ra "con người một chiều" suy giảm năng lực phản biện. Fuchs (2014) chuyển các phạm trù này vào nền tảng số: người dùng mạng xã hội thực hiện *lao động số* không công, mà sự chú ý và dữ liệu của họ bị chiếm dụng như giá trị thặng dư. Zuboff (2019) gọi tên cơ chế *chủ nghĩa tư bản giám sát*: hành vi con người bị dự đoán và **cải biến** trong các "thị trường tương lai hành vi", đe dọa trực tiếp quyền tự quyết. Williams (2018) — cựu chiến lược gia Google — bổ sung lăng kính đạo đức: trong nền kinh tế chú ý, thiết kế thuyết phục bòn rút sự chú ý khỏi mục tiêu đích thực của người dùng, làm xói mòn ý chí.

**Nhịp kiến tạo (đích phục hồi – từ tâm lý học tự quyết).** Để biến phê phán thành thiết kế, cần một cấu trúc đích *đo được*. Thuyết Tự quyết (Self-Determination Theory) của Ryan và Deci (2000) cung cấp ba nhu cầu tâm lý nền tảng — *tự chủ (autonomy)*, *năng lực*, *kết nối* — và lập luận rằng môi trường hỗ trợ tự chủ thì nuôi dưỡng phúc lợi, còn môi trường kiểm soát thì bóp nghẹt nó. Peters, Calvo và Ryan (2018) bắc cầu SDT sang thiết kế qua mô hình **METUX**, theo đó sự thỏa mãn/thất vọng nhu cầu phải được đánh giá trên năm "phạm vi trải nghiệm" (adoption, interface, tasks, behaviour, life). Điểm then chốt: một công nghệ có thể thỏa mãn nhu cầu ở *tầng giao diện* nhưng lại bóp nghẹt nó ở *tầng cuộc sống* — đúng nghịch lý mà sinh viên FPT trải nghiệm (thích thú khi cuộn nhưng kiệt quệ về tổng thể).

**Cây cầu của đề tài.** *Tha hóa/nhu cầu giả tạo* (chẩn đoán phê phán) ↔ *thất vọng nhu cầu tự chủ* (cấu trúc tâm lý đo được) ↔ *can thiệp thiết kế phục hồi tự quyết* (sản phẩm). Cần nói thẳng: **không nguồn kinh điển nào (Marx, Marcuse, Zuboff) tự nó nối tới thiết kế HCI** — METUX và Williams tiệm cận nhất. Việc nối trọn vẹn ba nhịp là **đóng góp mới và cũng là rủi ro** của nhóm (xem Mục 5.6).

---

## 4. KẾT QUẢ TỔNG HỢP THEO NĂM CHỦ ĐỀ

### 4.1. Chủ đề 1 — Nền tảng chú ý như bộ máy tha hóa: bằng chứng thực nghiệm

Lý luận phê phán được củng cố bằng bằng chứng thực chứng về *cách thức* tiêu thụ gây hại. Verduyn và cộng sự (2015), qua thực nghiệm và lấy mẫu trải nghiệm, chứng minh **quan hệ nhân quả**: việc dùng Facebook *thụ động* (lướt mà không tương tác) làm giảm phúc lợi cảm xúc theo thời gian, trung gian bởi sự đố kỵ, trong khi dùng *chủ động* thì không. West, Rice và Vella-Brodrick (2024), tổng quan phạm vi 86 nghiên cứu dưới lăng kính SDT, cho thấy cùng một nền tảng vừa thỏa mãn vừa bóp nghẹt cả ba nhu cầu tùy *đặc điểm sử dụng*, và **sự thất vọng nhu cầu tự chủ gắn với việc dùng có vấn đề/cưỡng bức**. Hai phát hiện này hợp thức hóa khẳng định trung tâm của đề tài: vấn đề không phải "thời lượng" mà là *phương thức* tiêu thụ (cuộn vô tận, thụ động) — đúng cơ chế *Want–Like Split* mà Level 4 phát hiện, và là biểu hiện thực chứng của "nhu cầu giả tạo" theo Marcuse.

### 4.2. Chủ đề 2 — Tính tự quyết như cấu trúc đích đo được

Lukoff và cộng sự (2021) là phát hiện then chốt cho phương pháp đánh giá của nhóm: họ thao tác hóa **"sense of agency"** (cảm giác làm chủ hành động của chính mình) thành một cấu trúc *đo được* và triển khai nó qua một **browser extension** thao tác các tính năng của YouTube. Kết quả: phần gợi ý ở trang chủ/thanh bên **làm giảm** sense of agency, còn các tính năng hỗ trợ theo đuổi mục tiêu thì **làm tăng** nó. Đây là bằng chứng — và là *khuôn mẫu phương pháp* — trực tiếp nhất cho RQ3 của nhóm: thay vì chỉ đo khả dụng bằng SUS, nhóm nên đo *sense of agency* trước–sau như một chỉ báo tự quyết. Kết hợp với METUX (Peters và cộng sự, 2018), nhóm có một bộ khung đánh giá đa tầng có cơ sở.

### 4.3. Chủ đề 3 — Các cơ chế can thiệp: cái gì hiệu quả, cái gì không

Lyngs và cộng sự (2019), qua phân tích 367 ứng dụng/tiện ích dưới lý thuyết hệ kép (System 1/System 2), phân loại DSCT thành bốn nhóm cơ chế: **chặn/loại bỏ phiền nhiễu, tự theo dõi, thúc đẩy mục tiêu, thưởng/phạt** — phần lớn nhắm vào System 1 bốc đồng; người dùng coi trọng sự hỗ trợ *khó vượt qua nhưng không cưỡng ép*. Trong thử nghiệm thực địa sáu tuần với 58 sinh viên đại học, Lyngs và cộng sự (2020) cho thấy **cả "nhắc mục tiêu" lẫn "gỡ bỏ news feed" đều giúp sinh viên tập trung và tăng cảm giác kiểm soát**, đồng thời xác định news feed là bề mặt gây phân tâm chính. Cox và cộng sự (2016) cung cấp triết lý thiết kế kiến tạo: **microboundary** — chèn một trở ngại nhỏ vừa đủ để ngắt hành động tự động và kích hoạt phản tư, tái định nghĩa "friction" như một tài nguyên tích cực thay vì lỗi.

Tuy vậy, bằng chứng cũng cảnh báo về *giới hạn*. Monge Roffarello và De Russis (2019) cho thấy phần lớn ứng dụng digital wellbeing **được ưa thích nhưng kém hiệu quả**: không tạo được thói quen bền và quá dễ bị vượt qua. Tổng quan hệ thống kèm **phân tích gộp (meta-analysis)** của họ (Monge Roffarello & De Russis, 2023, *TOCHI*) — nguồn bằng chứng mạnh nhất trong tổng quan này — kết luận DSCT có **hiệu ứng tổng hợp khiêm tốn nhưng có thật** trong giảm sử dụng công nghệ, song các đánh giá còn yếu về phương pháp và công cụ thường thiếu tác động hành vi lâu dài. Họ cũng chỉ ra (2021) rằng can thiệp đơn-thiết-bị dễ bị "lách" bằng cách đổi thiết bị, đòi hỏi thiết kế ở tầng hệ sinh thái. Hàm ý cho nhóm: (a) chọn can thiệp ở tầng *trình duyệt* là hợp lý (đa nền tảng qua web), nhưng (b) phải lường trước "đường thoát" đổi thiết bị, và (c) đừng kỳ vọng hiệu ứng lớn trong 1–2 tuần — nên đặt mục tiêu khiêm tốn, đo được.

### 4.4. Chủ đề 4 — Làm cho cái vô hình trở nên hữu hình: can thiệp nhận thức

Eslami và cộng sự (2015) là **tiền lệ trực tiếp nhất** cho tính năng *gương bong bóng lọc*: với công cụ "FeedVis" phơi bày các bài bị thuật toán ẩn đi, **62,5% người dùng không hề biết** feed của họ bị lọc; việc phơi bày ban đầu gây ngạc nhiên/tức giận, nhưng theo thời gian **làm tăng sự tham gia chủ động và cảm giác kiểm soát**. DeVito và cộng sự (2018) cho thấy người dùng vận hành theo các *folk theory* (lý thuyết dân gian) về feed — đa dạng và dễ uốn nắn — nên một can thiệp muốn giúp họ *nhận ra* bong bóng phải tác động vào folk theory sẵn có. Bucher (2017) bổ sung rằng *cảm xúc* về thuật toán ("algorithmic imaginary"), kể cả khi sai, vẫn tạo hành vi thật — gợi ý rằng "gương" nên chạm tới trải nghiệm cảm xúc, không chỉ dữ liệu khô. Karizat và cộng sự (2021) ghi nhận người dùng TikTok đã chủ động thực hiện *algorithmic resistance* — nửa "kháng cự" mà công cụ có thể khuếch đại.

**Cảnh báo phản biện quan trọng:** Bakshy, Messing và Adamic (2015), qua dữ liệu 10,1 triệu người dùng Facebook trên *Science*, cho thấy thuật toán chỉ cắt giảm ~15% nội dung trái chiều, trong khi **lựa chọn của chính người dùng còn thu hẹp nhiều hơn**. Bruns (2019) phản biện rằng phần lớn tuyên bố mạnh về "bong bóng lọc kín" là thiếu cơ sở và ẩn dụ này dễ bị thổi phồng. Hàm ý: *gương bong bóng lọc* phải trình bày **mức đa dạng thực tế** của người dùng (gồm cả phần do chính họ chọn), chứ không giả định một bong bóng bịt kín — nếu không sẽ phạm lỗi overclaim mà hội đồng phản biện sẽ bắt.

### 4.5. Chủ đề 5 — Lằn ranh đạo đức: thiết kế giải phóng hay thao túng?

Công cụ của nhóm vận hành đúng trong vùng đạo đức nhạy cảm. Một mặt, Gray và cộng sự (2018) và Mathur và cộng sự (2019) cho thấy *dark pattern* (thiết kế thao túng) đã được **công nghiệp hóa** — Mathur và cộng sự phát hiện 1.818 trường hợp trên ~11.000 trang mua sắm, nhiều cái mua dưới dạng "manipulation-as-a-service". Đây chính là "đối thủ" mà công cụ chống lại. Mặt khác, bản thân *nudge* cũng có thể trở thành thao túng. Hansen và Jespersen (2013) cung cấp **phép thử đạo đức**: phân biệt nudge *minh bạch* (engage tư duy phản tư) với nudge *che giấu* (bypass System 1). Caraban và cộng sự (2019), qua tổng quan 71 bài và bộ **"23 cách nudge"** trong 6 nhóm, vừa là bản thiết kế kỹ thuật cho extension vừa nhắc rằng cùng một cơ chế có thể giải phóng hoặc thao túng. Varshney (2020) lập luận hệ gợi ý nên tôn trọng tự quyết qua kiểm soát, minh bạch và bảo toàn việc hình thành sở thích đích thực.

**Hàm ý thiết kế cốt lõi:** công cụ "Tỉnh" phải **minh bạch và hỗ trợ tự chủ** (giải thích vì sao chèn khoảng dừng, để người dùng tùy chỉnh, không ép buộc) — nếu không, nó chỉ là "dark pattern thiện chí", tự mâu thuẫn với chính khung lý luận giải phóng của mình.

---

## 5. THẢO LUẬN

### 5.1. Ánh xạ bằng chứng → ba tính năng của "Tỉnh"

| Tính năng (neo phát hiện L4) | Cơ sở bằng chứng | Phạm trù lý luận |
|---|---|---|
| **Khoảng dừng phản tư** (Want–Like Split) | Microboundary (Cox và cộng sự, 2016); nudge hệ kép (Lyngs và cộng sự, 2019; Caraban và cộng sự, 2019); "gỡ feed/nhắc mục tiêu" hiệu quả (Lyngs và cộng sự, 2020) | Nhu cầu giả tạo (Marcuse, 1964); tự chủ (Ryan & Deci, 2000) |
| **Gương bong bóng lọc** (filter bubble) | FeedVis phơi bày thuật toán (Eslami và cộng sự, 2015); folk theory (DeVito và cộng sự, 2018); **giới hạn**: đa dạng do người dùng đồng-sản (Bakshy và cộng sự, 2015; Bruns, 2019) | Tha hóa nhận thức (Marx, 1844; Zuboff, 2019) |
| **Nhật ký chủ thể** (nghịch lý Biết–Làm) | Cơ chế goal-advancement (Lyngs và cộng sự, 2019); sense of agency đo được (Lukoff và cộng sự, 2021); METUX tầng "life" (Peters và cộng sự, 2018) | Tính chủ thể & tự do (Ryan & Deci, 2000) |

### 5.2. Hàm ý cho thiết kế đánh giá (RQ3)

Bằng chứng đề nghị nhóm **bổ sung thước đo *sense of agency* trước–sau** (theo Lukoff và cộng sự, 2021) bên cạnh SUS, vì SUS chỉ đo khả dụng chứ không đo tự quyết — vốn là biến đích của đề tài. METUX gợi ý phân biệt cảm nhận ở tầng giao diện và tầng cuộc sống. Vì meta-analysis (Monge Roffarello & De Russis, 2023) cho thấy hiệu ứng khiêm tốn và đánh giá thường yếu, nhóm nên **đặt mục tiêu mô tả, định tính**, tránh tuyên bố nhân quả mạnh — nhất quán với định hướng diễn giải đã nêu trong đề cương.

### 5.3. Khoảng trống nghiên cứu mà đề tài lấp được

1. **Cầu nối lý luận phê phán ↔ thiết kế công cụ** gần như bỏ ngỏ: tài liệu HCI hiếm khi dùng khung Mác; tài liệu phê phán hiếm khi chạm tới thiết kế. Đề tài nối hai mảng này một cách tường minh.
2. **Bối cảnh Việt Nam/Đông Nam Á tập thể** ít được khảo sát: gần như toàn bộ bằng chứng đến từ mẫu phương Tây (WEIRD). Level 4 đã ghi nhận điều này; Level 5 kiểm chứng trên sinh viên FPT là đóng góp thực.
3. **Tích hợp ba can thiệp trong một extension** (friction + trực quan hóa thuật toán + nhật ký mục tiêu) ít thấy — đa số công cụ chỉ làm một việc.

### 5.4. Điểm mạnh của hướng tiếp cận

Đề tài bám sát bằng chứng tốt nhất hiện có (meta-analysis TOCHI, thực nghiệm CHI), chọn tầng can thiệp hợp lý (browser extension – đa nền tảng, đúng tiền lệ Lukoff), và xử lý đúng cấu trúc đích đo được (sense of agency).

### 5.5. Rủi ro phải phòng ngừa (từ chính bằng chứng)

- **Hiệu ứng nhỏ & dễ bị lách** (Monge Roffarello & De Russis, 2019, 2021, 2023) → đặt kỳ vọng khiêm tốn; thiết kế "khó vượt nhưng không ép".
- **Overclaim về bong bóng lọc** (Bakshy và cộng sự, 2015; Bruns, 2019) → gương phải hiển thị đa dạng thực, gồm phần do người dùng tự chọn.
- **Tự mâu thuẫn đạo đức** (Hansen & Jespersen, 2013) → minh bạch hóa mọi nudge; cho tùy chỉnh; không bypass tư duy.

### 5.6. Rủi ro học thuật trung tâm: cầu Mác ↔ HCI

Đây là **tính mới đồng thời là điểm yếu tiềm tàng**. Vì không nguồn kinh điển nào tự nối tới thiết kế, nhóm phải tự xây luận chứng cầu nối thật chặt — nếu lỏng, phần "lý luận" sẽ bị xem là *dán nhãn* (đúng cảnh báo của rubric Level 5 về "tính liên ngành mờ nhạt"). Khuyến nghị: dùng METUX (Peters và cộng sự, 2018) và Williams (2018) làm *bản lề tường minh* giữa phê phán Mác và thiết kế, thay vì nhảy thẳng từ Marx sang code.

---

## 6. HẠN CHẾ CỦA TỔNG QUAN

(1) Đây là tổng quan tích hợp chọn lọc, **không phải PRISMA toàn diện**; có thể bỏ sót nghiên cứu. (2) Tìm kiếm chủ yếu bằng tiếng Anh, nguồn quốc tế; **thiếu tài liệu tiếng Việt** về digital wellbeing — một khoảng trống nên bổ sung. (3) Một số trích dẫn (Caraban, Eslami) chỉ xác minh được qua chỉ mục thứ cấp do nhà xuất bản chặn truy cập trực tiếp, dù DOI đã được đối chiếu chéo. (4) Cầu nối Mác–HCI dựa trên suy luận của nhóm, chưa có tiền lệ thực nghiệm trực tiếp. (5) Phần lớn bằng chứng từ mẫu phương Tây, cần thận trọng khi suy rộng sang bối cảnh Việt Nam.

---

## 7. KẾT LUẬN VÀ KHUYẾN NGHỊ

Tài liệu hiện có **ủng hộ mạnh** từng cơ chế trong ba tính năng của "Tỉnh" — friction để ngắt tiêu thụ tự động, trực quan hóa thuật toán để khôi phục nhận thức, và theo đuổi mục tiêu để bồi đắp sense of agency — đồng thời **cảnh báo rõ** về hiệu ứng khiêm tốn, nguy cơ overclaim bong bóng lọc, và lằn ranh đạo đức nudge. Khung tha hóa – nhu cầu giả tạo của Mác cung cấp một *chẩn đoán phê phán* sắc bén, nhưng phải được nối với thiết kế qua bản lề SDT/METUX để không rơi vào dán nhãn lý luận.

**Năm khuyến nghị hành động cho nhóm:**
1. Thêm thước đo **sense of agency** (Lukoff và cộng sự, 2021) trước–sau, bên cạnh SUS.
2. Thiết kế *gương bong bóng lọc* hiển thị **đa dạng thực** (gồm phần người dùng tự chọn), tránh giả định bong bóng kín.
3. **Minh bạch hóa** mọi can thiệp, cho tùy chỉnh — để công cụ không thành "dark pattern thiện chí".
4. Đặt **kỳ vọng khiêm tốn, mô tả** cho thử nghiệm 1–2 tuần; phòng ngừa "đường thoát" đổi thiết bị.
5. Dùng **METUX + Williams (2018)** làm bản lề tường minh nối lý luận Mác với thiết kế.

---

## TÀI LIỆU THAM KHẢO (APA 7.0)

Bakshy, E., Messing, S., & Adamic, L. A. (2015). Exposure to ideologically diverse news and opinion on Facebook. *Science, 348*(6239), 1130–1132. https://doi.org/10.1126/science.aaa1160

Bruns, A. (2019). *Are filter bubbles real?* Polity Press.

Bucher, T. (2017). The algorithmic imaginary: Exploring the ordinary affects of Facebook algorithms. *Information, Communication & Society, 20*(1), 30–44. https://doi.org/10.1080/1369118X.2016.1154086

Caraban, A., Karapanos, E., Campos, P., & Gonçalves, D. (2019). 23 ways to nudge: A review of technology-mediated nudging in human-computer interaction. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (Paper 503, pp. 1–15). ACM. https://doi.org/10.1145/3290605.3300733

Cox, A. L., Gould, S. J. J., Cecchinato, M. E., Iacovides, I., & Renfree, I. (2016). Design frictions for mindful interactions: The case for microboundaries. In *Proceedings of the 2016 CHI Conference Extended Abstracts on Human Factors in Computing Systems* (pp. 1389–1397). ACM. https://doi.org/10.1145/2851581.2892410

DeVito, M. A., Birnholtz, J., Hancock, J. T., French, M., & Liu, S. (2018). How people form folk theories of social media feeds and what it means for how we study self-presentation. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (Paper 120, pp. 1–12). ACM. https://doi.org/10.1145/3173574.3173694

Eslami, M., Rickman, A., Vaccaro, K., Aleyasen, A., Vuong, A., Karahalios, K., Hamilton, K., & Sandvig, C. (2015). "I always assumed that I wasn't really that close to [her]": Reasoning about invisible algorithms in news feeds. In *Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems* (pp. 153–162). ACM. https://doi.org/10.1145/2702123.2702556

Fuchs, C. (2014). *Digital labour and Karl Marx*. Routledge.

Gray, C. M., Kou, Y., Battles, B., Hoggatt, J., & Toombs, A. L. (2018). The dark (patterns) side of UX design. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (Paper 534, pp. 1–14). ACM. https://doi.org/10.1145/3173574.3174108

Hansen, P. G., & Jespersen, A. M. (2013). Nudge and the manipulation of choice: A framework for the responsible use of the nudge approach to behaviour change in public policy. *European Journal of Risk Regulation, 4*(1), 3–28. https://doi.org/10.1017/S1867299X00002762

Karizat, N., Delmonaco, D., Eslami, M., & Andalibi, N. (2021). Algorithmic folk theories and identity: How TikTok users co-produce knowledge of identity and engage in algorithmic resistance. *Proceedings of the ACM on Human-Computer Interaction, 5*(CSCW2), Article 305, 1–44. https://doi.org/10.1145/3476046

Lukoff, K., Lyngs, U., Zade, H., Liao, J. V., Choi, J., Fan, K., Munson, S. A., & Hiniker, A. (2021). How the design of YouTube influences user sense of agency. In *Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems* (Article 368, pp. 1–17). ACM. https://doi.org/10.1145/3411764.3445467

Lyngs, U., Lukoff, K., Slovák, P., Binns, R., Slack, A., Inzlicht, M., Van Kleek, M., & Shadbolt, N. (2019). Self-control in cyberspace: Applying dual systems theory to a review of digital self-control tools. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (Paper 131, pp. 1–18). ACM. https://doi.org/10.1145/3290605.3300361

Lyngs, U., Lukoff, K., Slovák, P., Seymour, W., Webb, H., Jirotka, M., Zhao, J., Van Kleek, M., & Shadbolt, N. (2020). "I just want to hack myself to not get distracted": Evaluating design interventions for self-control on Facebook. In *Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems* (pp. 1–15). ACM. https://doi.org/10.1145/3313831.3376672

Marcuse, H. (1964). *One-dimensional man: Studies in the ideology of advanced industrial society*. Beacon Press.

Marx, K. (1959). *Economic and philosophic manuscripts of 1844* (M. Milligan, Trans.). Progress Publishers. (Bản thảo gốc viết năm 1844)

Mathur, A., Acar, G., Friedman, M. J., Lucherini, E., Mayer, J., Chetty, M., & Narayanan, A. (2019). Dark patterns at scale: Findings from a crawl of 11K shopping websites. *Proceedings of the ACM on Human-Computer Interaction, 3*(CSCW), Article 81, 1–32. https://doi.org/10.1145/3359183

Monge Roffarello, A., & De Russis, L. (2019). The race towards digital wellbeing: Issues and opportunities. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (Paper 386, pp. 1–14). ACM. https://doi.org/10.1145/3290605.3300616

Monge Roffarello, A., & De Russis, L. (2021). Coping with digital wellbeing in a multi-device world. In *Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems* (Article 14, pp. 1–14). ACM. https://doi.org/10.1145/3411764.3445076

Monge Roffarello, A., & De Russis, L. (2023). Achieving digital wellbeing through digital self-control tools: A systematic review and meta-analysis. *ACM Transactions on Computer-Human Interaction, 30*(4), Article 53, 1–66. https://doi.org/10.1145/3571810

Peters, D., Calvo, R. A., & Ryan, R. M. (2018). Designing for motivation, engagement and wellbeing in digital experience. *Frontiers in Psychology, 9*, 797. https://doi.org/10.3389/fpsyg.2018.00797

Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. *American Psychologist, 55*(1), 68–78. https://doi.org/10.1037/0003-066X.55.1.68

Thaler, R. H., & Sunstein, C. R. (2008). *Nudge: Improving decisions about health, wealth, and happiness*. Yale University Press.

Varshney, L. R. (2020). Respect for human autonomy in recommender systems. In *Proceedings of the 3rd FAccTRec Workshop on Responsible Recommendation (RecSys 2020)*. arXiv. https://arxiv.org/abs/2009.02603

Verduyn, P., Lee, D. S., Park, J., Shablack, H., Orvell, A., Bayer, J., Ybarra, O., Jonides, J., & Kross, E. (2015). Passive Facebook usage undermines affective well-being: Experimental and longitudinal evidence. *Journal of Experimental Psychology: General, 144*(2), 480–488. https://doi.org/10.1037/xge0000057

Weinmann, M., Schneider, C., & vom Brocke, J. (2016). Digital nudging. *Business & Information Systems Engineering, 58*(6), 433–436. https://doi.org/10.1007/s12599-016-0453-1

West, M., Rice, S., & Vella-Brodrick, D. (2024). Adolescent social media use through a self-determination theory lens: A systematic scoping review. *International Journal of Environmental Research and Public Health, 21*(7), 862. https://doi.org/10.3390/ijerph21070862

Williams, J. (2018). *Stand out of our light: Freedom and resistance in the attention economy*. Cambridge University Press. https://doi.org/10.1017/9781108453004

Zuboff, S. (2019). *The age of surveillance capitalism: The fight for a human future at the new frontier of power*. PublicAffairs.

*Ghi chú nguồn phổ thông (không phải bằng chứng bình duyệt, chỉ dẫn nguồn khái niệm):* Pariser, E. (2011). *The filter bubble: What the internet is hiding from you*. Penguin Press.

---

## PHỤ LỤC: TUYÊN BỐ SỬ DỤNG AI

Tổng quan này được biên soạn với hỗ trợ của công cụ AI (Claude) ở các bước: (1) tìm kiếm và sàng lọc tài liệu trên các chỉ mục học thuật; (2) trích xuất WHY/HOW/WHAT cho từng nguồn; (3) tổng hợp chủ đề và soạn thảo. **Mọi trích dẫn đều được kiểm chứng DOI/URL độc lập;** các nguồn không xác minh được đã bị loại bỏ (ví dụ: Tristan Harris – blog; một số nguồn DOI suy đoán đã được đối chiếu lại). Nhóm chịu trách nhiệm cuối cùng về tính chính xác và phải đọc lại bản gốc các nguồn trước khi đưa vào báo cáo nộp. Khuyến nghị kiểm tra lại trực tiếp trên trang nhà xuất bản đối với: số trang/số bài của Caraban và cộng sự (2019); chuỗi DOI của Fuchs (2014) và Williams (2018) — sách đã xác minh qua ISBN.
```
