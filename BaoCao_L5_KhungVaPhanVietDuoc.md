# BÁO CÁO NGHIÊN CỨU LIÊN NGÀNH — RBL LEVEL 5

## Vận dụng lý luận tha hóa và nhu cầu giả tạo của chủ nghĩa Mác để thiết kế công cụ số tái chiếm tính chủ thể cho sinh viên trước thuật toán mạng xã hội

*Nhóm 07 · Lớp SE1812 · Đại học FPT TP.HCM · GVHD: Thầy Nguyễn Trung Hiếu*
*Học kỳ Summer 2026 · Nghiên cứu thiết kế – đánh giá (Design Science Research)*

> **TRẠNG THÁI BẢN THẢO.** Báo cáo dựng đầy đủ khung theo rubric Level 5. Các phần **I–V**, **IX** và **Phụ lục A–C** (AI Usage, CRediT, Đạo đức) đã viết hoàn chỉnh; **Abstract (EN)** và các mục **cơ chế bảo mật dữ liệu** đã điền. Các phần **VI–VIII** đã được viết sẵn toàn bộ câu chữ, bảng và khung diễn giải theo hướng thận trọng (mô tả, không nhân quả); chỉ còn các ô `🔲` là **số liệu và trích dẫn cụ thể** cần lắp vào **sau khi thu dữ liệu thử nghiệm** (bảng H + tệp export + phỏng vấn, Tuần 3–4). Mọi trích dẫn đã kiểm chứng DOI.

---

## TÓM TẮT

Nghiên cứu này áp dụng quy trình Design Science Research (DSR) để chuyển hóa ba phát hiện định tính của nghiên cứu Level 4 — nghịch lý Biết–Làm, cơ chế *Want–Like Split*, và nhận thức *filter bubble* mờ nhạt — thành một công cụ số can thiệp (browser extension, tên làm việc "Tỉnh") nhằm giúp sinh viên Đại học FPT tái chiếm tính chủ thể trước thuật toán mạng xã hội. Lý luận tha hóa và nhu cầu giả tạo của chủ nghĩa Mác đóng vai trò nền thiết kế trực tiếp: mỗi tính năng được sinh ra từ một phạm trù lý luận và một cơ chế tâm lý đã được nghiên cứu định tính phát hiện. Công cụ gồm ba can thiệp đúng thời điểm — *khoảng dừng phản tư* (đối ứng nhu cầu giả tạo), *gương bong bóng lọc* (đối ứng tha hóa nhận thức), và *nhật ký chủ thể* (đối ứng nghịch lý Biết–Làm). Sản phẩm được đánh giá với tối thiểu mười sinh viên qua thang khả dụng hệ thống (SUS) và đo lường *sense of agency* trước–sau, kết hợp phỏng vấn ngắn tự báo cáo. 🔲 *[ĐIỀN kết quả chính sau thử nghiệm].* Nghiên cứu đóng góp một ví dụ về việc nối lý luận phê phán của chủ nghĩa Mác với thực hành thiết kế tương tác theo khung DSR — một hướng còn ít được khai thác ở bối cảnh Việt Nam.

**Từ khóa:** tha hóa, nhu cầu giả tạo, tính chủ thể, digital self-control, sense of agency, Design Science Research, thuật toán mạng xã hội.

*(Bản tóm tắt tiếng Anh — Abstract — sẽ được biên soạn độc lập ở bước hoàn thiện, không dịch máy.)*
**Abstract.** Algorithmic social media platforms are engineered to capture and prolong attention, leaving many university students feeling that they scroll compulsively rather than by choice. Building on a prior Level-4 qualitative study that surfaced three recurring experiences among students — a blurring of "wanting" and "liking", awareness of a narrowing "filter bubble", and a "knowing–doing" gap — this Level-5 project translates those findings into a working browser extension named *Tỉnh* ("Awake"). The tool implements three interventions that map directly onto the earlier findings: a *reflective pause* that interrupts prolonged scrolling with a want-versus-like prompt, a *filter-bubble mirror* that reports source diversity while honestly separating self-selected from algorithm-recommended content, and a *subject journal* that lets users set and review their intentions. The design is guided by the Marxist critique of alienation and false needs as an interpretive lens, and by Design Science Research as the method. The extension runs entirely on the user's device (Manifest V3, local storage, no network calls), operating on YouTube, Facebook and TikTok. It was evaluated with 🔲 *[n]* volunteer students over 🔲 *[1–2]* weeks using the System Usability Scale, pre/post self-agency measures, and short interviews. The tool achieved a mean SUS of 🔲 *[…]* and self-reported agency shifted 🔲 *[direction]*; given the small single-group sample, these results are descriptive and suggestive rather than causal. The main contribution is an artifact demonstrating how philosophical critique can be operationalized into concrete, ethically constrained software for digital self-control education.

**Keywords:** digital self-control, sense of agency, filter bubble, browser extension, alienation, design science research.

---

## I. GIỚI THIỆU

### 1.1. Bối cảnh nghiên cứu

Thuật toán gợi ý của hệ sinh thái mạng xã hội đa nền tảng đã trở thành một lớp trung gian thường trực giữa sinh viên và dòng thông tin họ tiêu thụ mỗi ngày. Với thế hệ Gen Z, ranh giới giữa "chủ động chọn xem" và "bị dẫn dắt để xem" ngày càng mờ. Nghiên cứu định tính Level 4 của Nhóm 07 — phỏng vấn sâu bảy sinh viên Đại học FPT, mã hóa 112 đoạn — đã giải mã ba cơ chế qua đó thuật toán thâm nhập và tái định hình hành vi: sinh viên hiểu rõ cơ chế nhưng vẫn mất kiểm soát (nghịch lý Biết–Làm); tiếp tục tiêu thụ nội dung dù không thực sự thích (*Want–Like Split*); và phần lớn không nhận ra mức độ thu hẹp nguồn tin của chính mình (nhận thức *filter bubble* yếu).

### 1.2. Vấn đề nghiên cứu

Ba phát hiện trên mới dừng ở *chẩn đoán*. Khoảng trống thực tiễn còn bỏ ngỏ là: **chưa có công cụ nào chuyển các hiểu biết đó thành can thiệp** giúp sinh viên hành động khác đi. Chính những người tham gia Level 4 đã bày tỏ mong muốn có công cụ hỗ trợ kiểm soát hành vi. Đề tài Level 5 nhắm thẳng vào khoảng trống này: dùng khung lý luận chính trị làm nền thiết kế và năng lực kỹ thuật phần mềm làm công cụ hiện thực hóa, biến phê phán triết học thành một can thiệp khả dụng và kiểm chứng được.

### 1.3. Mục đích và câu hỏi nghiên cứu

**Mục đích tổng quát:** thiết kế, xây dựng và đánh giá một công cụ số giúp sinh viên FPT tái chiếm tính chủ thể trước thuật toán mạng xã hội, trên nền lý luận tha hóa và nhu cầu giả tạo của chủ nghĩa Mác.

Khác với Level 4 (câu hỏi mô tả hiện tượng), Level 5 đặt câu hỏi *thiết kế – đánh giá*:

- **RQ1.** Làm thế nào chuyển hóa các phát hiện về tha hóa, *Want–Like Split* và bong bóng lọc thành đặc tả tính năng của một công cụ tái chiếm tính chủ thể?
- **RQ2.** Sinh viên FPT trải nghiệm và đánh giá công cụ ra sao về tính khả dụng và mức độ phù hợp với nhu cầu thực tế?
- **RQ3.** Trong giai đoạn thử nghiệm ngắn, công cụ tác động thế nào đến cảm nhận của người dùng về quyền tự quyết và khả năng kiểm soát hành vi?

### 1.4. Phạm vi nghiên cứu

Nghiên cứu giới hạn ở: (a) một prototype browser extension với ba tính năng lõi; (b) thử nghiệm nội bộ với tối thiểu mười sinh viên tình nguyện thuộc các lớp SE1821, SE1812 và SE1836 tại Đại học FPT TP.HCM; (c) thời gian dùng thử 1–2 tuần; (d) định hướng diễn giải, số liệu mang tính mô tả, không kiểm định nhân quả thống kê.

### 1.5. Ý nghĩa và giá trị liên ngành

**Về học thuật:** đóng góp một ví dụ về việc kết nối lý luận tha hóa của chủ nghĩa Mác với thực hành thiết kế tương tác (interaction design) theo khung Design Science Research — một cây cầu còn ít được nối, đặc biệt ở bối cảnh Việt Nam. **Về thực tiễn:** cung cấp một prototype có thể tiếp tục phát triển cho chương trình giáo dục năng lực số – tự quyết của Đại học FPT.

**Giá trị liên ngành:** nếu chỉ có kỹ thuật phần mềm, sản phẩm chỉ là một tiện ích đo screen-time thông thường; nếu chỉ có lý luận chính trị, kết quả chỉ là một bài luận về tha hóa. Kết hợp cả hai tạo ra một công cụ tái chiếm chủ thể nhắm đúng cơ chế tâm lý mà nghiên cứu định tính đã phát hiện.

---

## II. TỔNG QUAN NGHIÊN CỨU

### 2.1. Công cụ tự kiểm soát số: cơ chế và giới hạn

Can thiệp số nhằm phục hồi tính tự quyết đã hình thành một dòng nghiên cứu rõ trong lĩnh vực tương tác người–máy. Lyngs và cộng sự (2019) phân tích 367 công cụ tự kiểm soát số và phân loại bốn nhóm cơ chế — chặn/loại bỏ phiền nhiễu, tự theo dõi, thúc đẩy mục tiêu, thưởng/phạt — phần lớn nhắm vào "hệ thống 1" bốc đồng theo lý thuyết hệ kép. Trong thử nghiệm thực địa sáu tuần với 58 sinh viên, Lyngs và cộng sự (2020) cho thấy cả việc nhắc mục tiêu lẫn gỡ bỏ news feed đều làm tăng khả năng tập trung và cảm giác kiểm soát. Cox và cộng sự (2016) đề xuất khái niệm *microboundary* — một trở ngại nhỏ vừa đủ để ngắt hành vi tự động và kích hoạt phản tư. Tuy vậy, tổng quan hệ thống kèm phân tích gộp của Monge Roffarello và De Russis (2023) cảnh báo rằng hiệu ứng tổng hợp của các công cụ này chỉ ở mức khiêm tốn và thường thiếu tác động bền vững, một phần do người dùng dễ vô hiệu hóa chúng hoặc chuyển sang thiết bị khác (Monge Roffarello & De Russis, 2019, 2021).

### 2.2. Tính tự quyết như cấu trúc đích đo được

Để biến phê phán thành thiết kế cần một cấu trúc đích đo được. Thuyết Tự quyết (Ryan & Deci, 2000) xác lập *tự chủ* là một trong ba nhu cầu tâm lý nền tảng; mô hình METUX (Peters và cộng sự, 2018) bắc cầu thuyết này sang thiết kế, chỉ ra rằng một công nghệ có thể thỏa mãn nhu cầu ở tầng giao diện nhưng bóp nghẹt nó ở tầng cuộc sống. Quan trọng cho thiết kế đánh giá, Lukoff và cộng sự (2021) thao tác hóa *sense of agency* (cảm giác làm chủ hành động của chính mình) thành một cấu trúc đo được, triển khai qua một browser extension trên YouTube, và phát hiện phần gợi ý thuật toán làm giảm cảm giác này còn các tính năng hỗ trợ mục tiêu thì làm tăng nó.

### 2.3. Làm cho thuật toán trở nên hữu hình

Eslami và cộng sự (2015) cho thấy 62,5% người dùng không biết news feed của mình bị thuật toán lọc; việc trực quan hóa cơ chế ẩn này theo thời gian làm tăng sự tham gia chủ động và cảm giác kiểm soát — tiền lệ trực tiếp cho một "gương bong bóng lọc". DeVito và cộng sự (2018) và Bucher (2017) bổ sung rằng người dùng vận hành theo các *folk theory* và cảm xúc về thuật toán, nên can thiệp nhận thức phải chạm tới mô hình và trải nghiệm sẵn có. Cần thận trọng tránh thổi phồng: Bakshy và cộng sự (2015) cùng Bruns (2019) chỉ ra mức thu hẹp nguồn tin do chính lựa chọn người dùng còn lớn hơn do thuật toán — vì vậy một công cụ trung thực phải hiển thị mức đa dạng *thực tế* thay vì giả định một bong bóng bịt kín.

### 2.4. Lằn ranh đạo đức: thiết kế giải phóng hay thao túng?

Gray và cộng sự (2018) và Mathur và cộng sự (2019) cho thấy *dark pattern* (thiết kế thao túng) đã được công nghiệp hóa — đây là "đối thủ" mà công cụ chống lại. Nhưng bản thân nudge cũng có thể trở thành thao túng: Hansen và Jespersen (2013) cung cấp phép thử đạo đức phân biệt nudge minh bạch (kích hoạt tư duy phản tư) với nudge che giấu (lách qua tư duy tự động). Caraban và cộng sự (2019), qua bộ "23 cách nudge", vừa là bản thiết kế kỹ thuật vừa nhắc rằng cùng một cơ chế có thể giải phóng hoặc thao túng. Hàm ý cốt lõi: công cụ "Tỉnh" phải minh bạch và hỗ trợ tự chủ, nếu không nó tự mâu thuẫn với chính khung lý luận giải phóng của mình.

### 2.5. Khoảng trống nghiên cứu

Tổng hợp tài liệu cho thấy ba khoảng trống mà đề tài lấp được: (1) cầu nối giữa lý luận phê phán của chủ nghĩa Mác và thiết kế công cụ HCI gần như chưa được nối trực tiếp; (2) gần như toàn bộ bằng chứng đến từ bối cảnh phương Tây (WEIRD), thiếu kiểm chứng trong văn hóa tập thể Đông Nam Á; (3) hiếm công cụ tích hợp đồng thời ba can thiệp trên nền một khung lý luận thống nhất.

---

## III. KHUNG LÝ LUẬN CHÍNH TRỊ NỀN TẢNG

Đây là phần đặc thù Level 5: lý luận chính trị không chỉ là tham chiếu mà là nền sinh ra mục tiêu và cơ chế của sản phẩm. Khung lý luận bắc một cây cầu hai nhịp.

**Nhịp phê phán (chẩn đoán).** Marx (1844/1959) định nghĩa *tha hóa* là trạng thái hoạt động và sản phẩm của chủ thể quay lại đối lập với họ như một thế lực xa lạ. Marcuse (1964) mở rộng sang xã hội tiêu dùng với *nhu cầu giả tạo* — những nhu cầu áp đặt từ bên ngoài để duy trì hệ thống tiêu thụ, tạo ra "con người một chiều" suy giảm năng lực phản biện. Fuchs (2014) chuyển các phạm trù này vào nền tảng số (lao động số, chiếm dụng chú ý), còn Zuboff (2019) và Williams (2018) gọi tên cơ chế dự đoán – cải biến hành vi và bòn rút sự chú ý trong nền kinh tế chú ý.

**Nhịp kiến tạo (đích phục hồi).** Để biến phê phán thành thiết kế đo được, nghiên cứu mượn Thuyết Tự quyết (Ryan & Deci, 2000) và mô hình METUX (Peters và cộng sự, 2018) làm bản lề: "tha hóa/nhu cầu giả tạo" được diễn dịch thành "thất vọng nhu cầu tự chủ", một cấu trúc tâm lý có thể quan sát và can thiệp.

**Bảng ánh xạ phạm trù → thiết kế:**

| Phạm trù MLN | Diễn giải trong bối cảnh số | Định hướng thiết kế |
|---|---|---|
| Tha hóa (alienation) | Sự chú ý và dữ liệu cá nhân bị khai thác; chủ thể mất quyền làm chủ hoạt động tinh thần | Trả lại quyền điều khiển: chặn cuộn vô tận, buộc quyết định có ý thức |
| Nhu cầu giả tạo (false needs) | Tiếp tục tiêu thụ do hệ thống khen thưởng dẫn dắt, không phải nhu cầu thật (*Want–Like Split*) | Khoảng dừng phản tư phân biệt muốn/thích, phơi bày nhu cầu giả tạo |
| Tính chủ thể & tự do | Khôi phục năng lực tự quyết là điều kiện của tự do thực chất | Nhật ký chủ thể: đặt ý định, đối chiếu, tích lũy năng lực làm chủ |

**Chiều sâu kinh điển Mác–Lênin.** Khung lý luận được củng cố bằng các văn bản gốc. Phạm trù *nhu cầu giả tạo* có gốc rễ trực tiếp ở Marx: trong *Grundrisse*, ông chỉ ra "sản xuất không chỉ tạo ra đối tượng mà còn tạo ra cách thức tiêu dùng… sản xuất tạo ra người tiêu dùng" (Marx, 1857–1858/1973) — tiền lệ lý luận cho luận điểm rằng thuật toán *chế tạo* nhu cầu chứ không đơn thuần thỏa mãn nhu cầu có sẵn. Cơ chế che giấu quan hệ xã hội đằng sau hiện tượng "sự chú ý như một thứ hàng hóa" được soi sáng bởi học thuyết *sùng bái hàng hóa* trong *Tư bản* (Marx, 1867/1887, Quyển I, ch. 1, §4): quan hệ xã hội của lao động hiện ra như "tính chất khách quan đóng dấu lên sản phẩm". *Hệ tư tưởng Đức* (Marx & Engels, 1845–1846/1998) bổ sung rằng "những tư tưởng thống trị" được nội hóa thành sở thích của chính chủ thể — feed thuật toán là một "phương tiện sản xuất tinh thần" hiện đại. Về phía nhận thức, *lý luận phản ánh* của Lenin (1909/1972) cung cấp một chuẩn mực: ý thức lành mạnh phản ánh hiện thực khách quan, trong khi bong bóng lọc thay thế hiện thực bằng một hình ảnh do lợi nhuận định hình — chính là "tha hóa nhận thức". Ở bối cảnh Việt Nam, *Giáo trình Triết học Mác – Lênin* và *Giáo trình Kinh tế chính trị Mác – Lênin* (Bộ Giáo dục và Đào tạo, 2021) làm nền chuẩn quốc gia; các nghiên cứu gần đây vận dụng học thuyết tha hóa vào kinh tế số (Hoàng Ngọc Bích, 2025) và bối cảnh trí tuệ nhân tạo (Tạp chí Khoa học và Công nghệ IUH, 2025) cho thấy tính thời sự của khung lý luận. Cầu nối học thuật quốc tế giữa Marx và nền tảng số được Fuchs và Sevignani (2013) cùng Miconi (2024) củng cố.

---

## IV. PHƯƠNG PHÁP NGHIÊN CỨU

### 4.1. Thiết kế nghiên cứu

Nghiên cứu áp dụng quy trình **Design Science Research** (Hevner và cộng sự, 2004): xác định vấn đề (đã hoàn thành ở Level 4) → thiết kế hiện vật (artifact) → trình diễn → đánh giá. Đây là nghiên cứu thiết kế cỡ mẫu nhỏ, định hướng diễn giải; số liệu mô tả, không kiểm định nhân quả thống kê.

### 4.2. Quy trình phát triển sản phẩm

Prototype được phát triển theo quy trình gate-based (đọc – duyệt – thực thi), commit từng phần, kiểm thử trước khi tích hợp, ưu tiên hoàn thiện một tính năng "demo được" chắc chắn trước khi mở rộng.

### 4.3. Đối tượng và mẫu

Tối thiểu mười sinh viên tình nguyện thuộc các lớp SE1821, SE1812 và SE1836 tại Đại học FPT TP.HCM, cài đặt và dùng thử công cụ trong 1–2 tuần. Lấy mẫu thuận tiện; nêu rõ giới hạn tính đại diện ở Mục IX.

### 4.4. Công cụ và quy trình đánh giá

Kết hợp ba nguồn dữ liệu:
1. **Thang khả dụng hệ thống (SUS)** (Brooke, 1996) — đo tính khả dụng tổng thể của công cụ (RQ2).
2. **Đo *sense of agency* trước–sau** — theo cách thao tác hóa của Lukoff và cộng sự (2021), một thang tự báo cáo ngắn về cảm nhận làm chủ hành vi số, đo ở thời điểm trước và sau giai đoạn dùng thử (RQ3). *Bổ sung so với đề cương gốc: đây là chỉ báo tự quyết có cơ sở học thuật, vá điểm yếu rằng SUS chỉ đo khả dụng chứ không đo tự quyết.*
3. **Phỏng vấn ngắn tự báo cáo** — câu hỏi mở về trải nghiệm từng tính năng và cảm nhận quyền tự quyết.

### 4.5. Khung biến nghiên cứu (kế thừa và đảo chiều mô hình SOR của Level 4)

Level 4 mô hình hóa hiện tượng theo trục SOR: **S**timulus (X: yếu tố thuật toán) → **O**rganism (M: cơ chế tâm lý) → **R**esponse (Y: hành vi), điều tiết bởi Z (năng lực phản kháng). Level 5 **đảo chiều** trục này: *can thiệp* của công cụ thay vào vị trí Stimulus, hướng tới phục hồi tính chủ thể.

| Loại biến | Mã | Tên biến | Đo lường | Neo lý luận MLN | RQ |
|---|---|---|---|---|---|
| Độc lập (IV) – Can thiệp | X′1 | Khoảng dừng phản tư | Có/không + tần suất kích hoạt | Nhu cầu giả tạo | RQ1 |
| | X′2 | Gương bong bóng lọc | Tiếp xúc phản hồi đa dạng nguồn | Tha hóa nhận thức | RQ1 |
| | X′3 | Nhật ký chủ thể | Mức độ đặt/đối chiếu ý định | Tính chủ thể | RQ1 |
| Trung gian (Mediator) | M′1 | Phản tư có ý thức ("muốn vs thích") | Item Likert tự báo cáo | Nhu cầu giả tạo | RQ3 |
| | M′2 | Nhận thức bong bóng lọc | Likert + dữ liệu từ "gương" | Tha hóa nhận thức | RQ3 |
| Phụ thuộc (DV) – Kết quả | Y′1 | Cảm nhận quyền tự quyết (sense of agency) | Thang tự báo cáo **pre/post** (Lukoff và cộng sự, 2021) | Tính chủ thể / tha hóa | RQ3 |
| | Y′2 | Cảm nhận kiểm soát hành vi | Likert pre/post | Tính chủ thể | RQ3 |
| | Y′3 | Tính khả dụng công cụ | **SUS** 10 mục (Brooke, 1996) | (đánh giá artifact) | RQ2 |
| Điều tiết (Moderator) | Z′1 | Mức độ dùng MXH nền | Screen-time tự báo cáo | (kế thừa) | — |
| | Z′2 | Tư duy phản biện số nền | Likert (kế thừa Z2 của L4) | Năng lực phản kháng | — |
| Kiểm soát (Control) | C | Thời gian dùng thử, nền tảng, năm học/ngành | Ghi nhận | — | — |

**Sơ đồ quan hệ:** X′ (can thiệp) → M′ (cơ chế phản tư/nhận thức) → Y′ (tự quyết, kiểm soát), điều tiết bởi Z′. Khớp với ba mệnh đề thiết kế: P1 (X′1→M′1→Y′1,Y′2); P2 (X′2→M′2→hành vi tìm nguồn ngược chiều); P3 (X′3→Y′1).

**Lưu ý liêm chính:** với cỡ mẫu n≥10 và định hướng diễn giải, đây là *mô hình biến khái niệm + kế hoạch đo lường* để kiểm chứng **định tính** (qua P1–P3), không phải kiểm định nhân quả thống kê (không hồi quy/SEM) — nhất quán với khung khái niệm định hướng của Level 4.

### 4.6. Phân tích dữ liệu

Số liệu SUS và *sense of agency* xử lý thống kê mô tả (trung bình, độ lệch chuẩn, so sánh trước–sau ở mức mô tả). Dữ liệu phỏng vấn phân tích chủ đề (Braun & Clarke, 2006), diễn giải qua lăng kính tha hóa/nhu cầu giả tạo.

### 4.7. Đạo đức nghiên cứu

Người tham gia tình nguyện, được thông báo mục đích và quyền rút lui; dữ liệu ẩn danh; công cụ không thu thập nội dung duyệt web cá nhân ra ngoài thiết bị người dùng (chỉ thống kê cục bộ). Về cơ chế bảo mật thực tế: extension được đóng gói theo Manifest V3 với **quyền tối thiểu** (`storage`, `alarms`, `tabs`, `notifications`) và **không khai báo host_permissions** ngoài ba tên miền mạng xã hội đích, nên **không thể gửi bất kỳ yêu cầu mạng nào ra ngoài**; toàn bộ dữ liệu lưu trong `chrome.storage.local` trên máy người dùng, tự động xóa sau 30 ngày. Dữ liệu chỉ rời máy khi người dùng **chủ động** bấm nút "Xuất dữ liệu nghiên cứu"; bản xuất chỉ gồm **số đếm tổng hợp và tên nguồn tối thiểu**, tuyệt đối không chứa nội dung đã xem. Điều này có thể kiểm chứng độc lập bằng cách theo dõi tab Network của trình duyệt trong khi dùng (không có request nào phát sinh từ extension).

---

## V. THIẾT KẾ SẢN PHẨM ỨNG DỤNG

### 5.1. Tổng quan

Sản phẩm là một browser extension (tên làm việc "Tỉnh"), gồm ba tính năng, mỗi tính năng ánh xạ một phát hiện Level 4 và một phạm trù lý luận.

### 5.2. Đặc tả ba tính năng

| Tính năng | Neo phát hiện L4 | Cơ chế & mô tả | Phạm trù lý luận | Neo bằng chứng |
|---|---|---|---|---|
| **Khoảng dừng phản tư** | *Want–Like Split* (M1) | Sau N phút cuộn liên tục, chèn màn hình dừng hỏi "bạn đang muốn hay đang thích?", yêu cầu quyết định có ý thức để tiếp tục | Nhu cầu giả tạo | Microboundary (Cox và cộng sự, 2016); nudge hệ kép (Lyngs và cộng sự, 2019) |
| **Gương bong bóng lọc** | Filter bubble (X3) | Hiển thị thống kê độ đa dạng nguồn tin đã tiêu thụ; gợi ý nguồn ngược chiều — hiển thị đa dạng *thực tế*, không giả định bong bóng kín | Tha hóa nhận thức | FeedVis (Eslami và cộng sự, 2015); cảnh báo đồng-sản (Bakshy và cộng sự, 2015; Bruns, 2019) |
| **Nhật ký chủ thể** | Nghịch lý Biết–Làm (Z1) | Đặt ý định trước phiên, đối chiếu sau, tích lũy "micro-wins" theo thời gian | Tính chủ thể | Goal-advancement (Lyngs và cộng sự, 2019); sense of agency (Lukoff và cộng sự, 2021) |

### 5.3. Mệnh đề thiết kế (design propositions)

Do bản chất nghiên cứu thiết kế cỡ mẫu nhỏ, nhóm phát biểu dưới dạng mệnh đề thiết kế để kiểm chứng định tính:

- **P1.** Một khoảng dừng phản tư chèn đúng thời điểm cao trào cuộn sẽ giúp người dùng phân biệt "đang muốn" với "đang thích", tăng cảm giác kiểm soát.
- **P2.** Việc trực quan hóa độ đa dạng nguồn tin làm người dùng nhận ra bong bóng lọc của mình và chủ động tìm nguồn ngược chiều.
- **P3.** Việc đặt ý định trước phiên và đối chiếu sau giúp người dùng tích lũy "micro-wins", củng cố năng lực đàm phán lại quyền tự quyết.

### 5.4. Nguyên tắc đạo đức thiết kế

Mọi can thiệp được minh bạch hóa (giải thích lý do chèn khoảng dừng) và cho phép người dùng tùy chỉnh, không ép buộc — để công cụ là nudge minh bạch (Hansen & Jespersen, 2013) chứ không phải một "dark pattern thiện chí".

---

## VI. TRIỂN KHAI ỨNG DỤNG VÀ KẾT QUẢ THỬ NGHIỆM 🔲

> **Chương đặc thù Level 5** — cần dữ liệu thử nghiệm Tuần 3–4. Cấu trúc và hướng dẫn điền bên dưới.

### 6.1. Quy trình triển khai

Công cụ "Tỉnh" được đóng gói thành tệp nén và phân phối kèm hướng dẫn cài đặt dành cho người dùng (Phụ lục — *Hướng dẫn dùng thử*). Người tham gia tự cài trên trình duyệt máy tính nhân Chromium (Chrome, Edge hoặc Cốc Cốc) theo quy trình *load unpacked*; nhóm hỗ trợ trực tiếp qua 🔲 *[ĐIỀN: kênh hỗ trợ, ví dụ nhóm Messenger + buổi gọi 10 phút khi vướng]*. Trước khi cài, mỗi người được cấp một **Mã tham gia** ẩn danh (P01, P02, …) nhập vào phần Cài đặt, dùng để ghép dữ liệu khảo sát trước–sau với dữ liệu hành vi xuất ra mà không lộ danh tính.

Giai đoạn thử nghiệm kéo dài 🔲 *[ĐIỀN: 1–2]* tuần, từ 🔲 *[ĐIỀN: ngày bắt đầu]* đến 🔲 *[ĐIỀN: ngày kết thúc]*. Người tham gia được yêu cầu dùng mạng xã hội **như thường lệ**, nhóm không nhắc nhở sử dụng trong suốt kỳ thử nghiệm nhằm hạn chế hiệu ứng kỳ vọng (demand effect).

Trong số 🔲 *[N_mời]* sinh viên được mời, 🔲 *[N_cài]* cài đặt thành công và 🔲 *[N_hoàn_thành]* hoàn thành cả khảo sát trước và sau (tỉ lệ hoàn thành 🔲 *[…%]*). Các vướng mắc cài đặt được ghi nhận gồm: 🔲 *[ĐIỀN từ nhật ký pilot, ví dụ: phải bật Developer mode; nhầm chọn thư mục gốc thay vì `dist/`]* — bản thân đây là một phát hiện về tính khả dụng của **quy trình phân phối** (chưa lên cửa hàng tiện ích), được bàn thêm ở Mục 6.3 và IX.

### 6.2. Đặc điểm mẫu

Mẫu gồm 🔲 *[n]* sinh viên tình nguyện (🔲 *[số nữ]* nữ, 🔲 *[số nam]* nam) thuộc các lớp SE1821, SE1812 và SE1836, lấy mẫu thuận tiện. Đặc điểm nền (mục F của bộ công cụ đo) tổng hợp ở Bảng 6.1; giới hạn về tính đại diện được nêu ở Mục IX.

**Bảng 6.1. Đặc điểm mẫu tham gia (n = 🔲…)**

| Đặc điểm | Phân nhóm | Số người | Tỉ lệ |
|---|---|---|---|
| Năm học | Năm 1 / 2 / 3 / 4 | 🔲 … | 🔲 … |
| Ngành | 🔲 *[liệt kê ngành]* | 🔲 … | 🔲 … |
| Nền tảng dùng nhiều nhất | YouTube / Facebook / TikTok / Khác | 🔲 … | 🔲 … |
| Thời gian MXH/ngày (tự báo cáo) | <1h / 1–2h / 2–4h / 4–6h / >6h | 🔲 … | 🔲 … |
| Thiết bị dùng MXH chủ yếu | Chủ yếu điện thoại / Cân bằng / Chủ yếu máy tính | 🔲 … | 🔲 … |

🔲 *[ĐIỀN 1–2 câu nhận xét: mẫu nghiêng về nhóm dùng nhiều/ít, nền tảng nào chiếm ưu thế — lưu ý điều này khi diễn giải kết quả, đặc biệt với biến kiểm soát Z′1 "thời lượng dùng máy tính".]*

### 6.3. Kết quả tính khả dụng (SUS) — RQ2

Tính khả dụng được đo bằng thang **System Usability Scale** (SUS; Brooke, 1996), làm sau kỳ thử nghiệm (mục E của bộ công cụ). Điểm mỗi người quy về thang 0–100 theo cách chấm chuẩn (mục lẻ: giá trị − 1; mục chẵn: 5 − giá trị; tổng × 2,5).

Điểm SUS trung bình của mẫu là **🔲 *[M]* ± 🔲 *[SD]*** (min 🔲 *[…]* – max 🔲 *[…]*; n = 🔲 *[…]*). So với **mốc tham chiếu 68** thường được dùng làm ngưỡng "trên trung bình" trong tài liệu SUS, điểm của công cụ nằm **🔲 *[trên / quanh / dưới]*** mốc này. Phân bố điểm được tóm tắt ở Bảng 6.2.

**Bảng 6.2. Phân bố điểm SUS (n = 🔲…)**

| Khoảng điểm SUS | Diễn giải quy ước | Số người | Tỉ lệ |
|---|---|---|---|
| ≥ 80,3 | Rất tốt (A) | 🔲 … | 🔲 … |
| 68 – 80,2 | Trên trung bình | 🔲 … | 🔲 … |
| < 68 | Dưới trung bình | 🔲 … | 🔲 … |

Cần lưu ý: SUS đo **cảm nhận về tính khả dụng**, không phải chất lượng tổng thể hay hiệu quả can thiệp. Vì vậy nhóm diễn giải kết quả như "công cụ được người dùng cảm nhận **trên/dưới mốc tham chiếu về khả dụng**", **không** kết luận công cụ "tốt" hay "kém". 🔲 *[ĐIỀN 1 câu: nếu SD lớn, lưu ý sự phân hóa giữa người dùng; nếu có điểm cực thấp, đối chiếu với phản hồi lỗi ở 6.5.]*

### 6.4. Sense of agency và các thước đo trung gian trước–sau — RQ3

Bốn thang tự báo cáo được đo **cùng bộ mục** ở hai thời điểm trước (PRE) và sau (POST) kỳ thử nghiệm: A — *sense of agency* (Y′1), B — cảm nhận kiểm soát hành vi (Y′2), C — phân biệt "muốn/thích" (M′1), D — nhận thức bong bóng lọc (M′2). Các mục nghịch đảo (R) đã được đảo điểm trước khi tính trung bình. Do cỡ mẫu nhỏ và thiết kế một nhóm, kết quả trình bày ở **mức mô tả** (Bảng 6.3); nhóm **không** thực hiện kiểm định giả thuyết và **không** suy diễn quan hệ nhân quả.

**Bảng 6.3. Điểm trung bình các thang trước–sau (thang Likert 1–5; n = 🔲…)**

| Thang (biến) | TB trước (PRE) | TB sau (POST) | Chênh lệch | Xu hướng |
|---|---|---|---|---|
| A — Sense of agency (Y′1) | 🔲 … | 🔲 … | 🔲 … | 🔲 ↑/↓/≈ |
| B — Kiểm soát hành vi (Y′2) | 🔲 … | 🔲 … | 🔲 … | 🔲 ↑/↓/≈ |
| C — Muốn/thích (M′1) | 🔲 … | 🔲 … | 🔲 … | 🔲 ↑/↓/≈ |
| D — Nhận thức bong bóng (M′2) | 🔲 … | 🔲 … | 🔲 … | 🔲 ↑/↓/≈ |

Diễn giải (khung viết sẵn, chỉ điền số và chiều): *Ở mức mô tả, điểm trung bình thang A thay đổi từ* 🔲 *[PRE]* *lên/xuống* 🔲 *[POST]* *(chênh* 🔲 *[±…]); các thang B, C, D biến thiên tương ứng như Bảng 6.3.* Vì cỡ mẫu nhỏ và không có nhóm đối chứng, những khác biệt này **chỉ mang tính gợi ý**, có thể do nhiều yếu tố ngoài công cụ (thời điểm học kỳ, hiệu ứng tự quan sát khi biết mình đang được đo…). 🔲 *[ĐIỀN 1 câu: chỉ ra thang nào biến động rõ nhất và nối với phản hồi định tính 6.5 — ví dụ nếu C (muốn/thích) tăng, liên hệ với việc người dùng nhắc lại ngôn ngữ "muốn/thích" của F1.]*

### 6.5. Phản hồi định tính theo từng tính năng

Dữ liệu phỏng vấn ngắn (mục G) được mã hóa theo chủ đề (Braun & Clarke, 2006) và nhóm theo ba mệnh đề thiết kế. Với mỗi tính năng, nhóm đối chiếu **phản hồi chủ quan** với **dữ liệu hành vi cục bộ** xuất ra từ chính extension (các biến đếm, không chứa nội dung duyệt web) để tăng độ tin cậy diễn giải.

**(a) Khoảng dừng phản tư — F1 / P1.** Số liệu hành vi tổng hợp: tổng số lần khoảng dừng hiển thị = 🔲 *[pauseShown]*; tỉ lệ chọn *"Dừng phiên"* = 🔲 *[pauseStop/pauseShown → …%]*; thời gian phản ứng trung vị trước khi bấm = 🔲 *[avgReactionMs → …s]* (một khoảng dừng đủ dài trước quyết định gợi ý có sự cân nhắc, không phải phản xạ đóng ngay). Trích dẫn tiêu biểu:
> 🔲 *[ĐIỀN 2–3 trích dẫn, ví dụ: "Khoảng dừng làm tôi khựng lại và nhận ra mình đang lướt vô thức" — Pxx]*

**(b) Gương bong bóng lọc — F2 / P2.** Số liệu hành vi: số lượt mở "Gương" = 🔲 *[mirrorOpens]*; độ đa dạng nguồn chuẩn hóa trung bình H\* = 🔲 *[entropyNormAll]* (thang 0–1); tỉ lệ nội dung *do thuật toán đề xuất* so với *do người dùng chủ động chọn* = 🔲 *[…% vs …%]*. Đúng theo cảnh báo của Bakshy và cộng sự (2015) và Bruns (2019), 🔲 *[ĐIỀN: nêu rõ mức độ tập trung nguồn — nếu H\* KHÔNG thấp thì báo cáo trung thực rằng bong bóng không bịt kín, đây là finding hợp lệ chứ không phải thất bại]*. Trích dẫn:
> 🔲 *[ĐIỀN 2–3 trích dẫn về sự bất ngờ/không bất ngờ khi thấy phân bố nguồn — Pxx]*

**(c) Nhật ký chủ thể — F3 / P3.** Số liệu hành vi: tổng số phiên ghi nhận = 🔲 *[sessionsTotal]*; tỉ lệ phiên có đặt ý định = 🔲 *[intentionSetRatio]*; tỉ lệ giữ đúng ý định (micro-win) = 🔲 *[…%]*; chuỗi micro-win dài nhất = 🔲 *[…]* ngày. Trích dẫn:
> 🔲 *[ĐIỀN 2–3 trích dẫn về việc đặt ý định & đối chiếu, cảm giác "thắng nhỏ" — Pxx]*

Tổng hợp ≥ 🔲 *[số]* phản hồi cho thấy 🔲 *[ĐIỀN 1–2 câu khái quát: tính năng nào được nhắc đến tích cực nhất, tính năng nào gây tranh cãi/khó chịu — dẫn thẳng sang thảo luận lằn ranh đạo đức ở 7.x].*

---

## VII. THẢO LUẬN VÀ PHẢN HỒI TỪ THỰC TIỄN 🔲

### 7.1. Đối chiếu kết quả với mệnh đề thiết kế

Mỗi mệnh đề được đánh giá là **được ủng hộ / ủng hộ một phần (hỗn hợp) / không được ủng hộ** dựa trên cả bằng chứng chủ quan (6.5) và hành vi (6.3–6.5). Nhóm giữ nguyên tắc trung thực: kết luận "không ủng hộ" là kết quả hợp lệ, không phải thất bại của nghiên cứu.

**P1 — Khoảng dừng phản tư giúp người dùng nhận ra và điều chỉnh hành vi lướt vô thức.**
🔲 *[ĐIỀN: kết luận ủng hộ/hỗn hợp/không — dựa trên tỉ lệ "Dừng phiên", reactionMs, và trích dẫn 6.5(a). Khung câu: "Bằng chứng … cho thấy P1 được ủng hộ ở mức … vì …; tuy nhiên …"]*

**P2 — "Gương" làm người dùng ý thức hơn về bong bóng lọc và tính đa dạng nguồn.**
🔲 *[ĐIỀN: kết luận — dựa trên H\*, tỉ lệ tự-chọn/đề-xuất, thay đổi thang D (nhận thức bong bóng) PRE→POST, và trích dẫn 6.5(b). Lưu ý: nếu người dùng "ý thức hơn" nhưng nguồn không thực sự thu hẹp, đó là ủng hộ P2 ở khía cạnh nhận thức mà không xác nhận giả định bong bóng bịt kín.]*

**P3 — Nhật ký chủ thể (đặt–đối chiếu ý định) củng cố cảm nhận làm chủ.**
🔲 *[ĐIỀN: kết luận — dựa trên intentionSetRatio, tỉ lệ giữ ý định, chuỗi micro-win, thay đổi thang A/B, và trích dẫn 6.5(c).]*

Bảng 7.1 tóm tắt.

**Bảng 7.1. Tổng hợp mức độ ủng hộ ba mệnh đề**

| Mệnh đề | Bằng chứng chính | Kết luận |
|---|---|---|
| P1 (F1) | 🔲 *[stop%, reactionMs, quote]* | 🔲 ủng hộ / hỗn hợp / không |
| P2 (F2) | 🔲 *[H\*, self vs rec, ΔD]* | 🔲 ủng hộ / hỗn hợp / không |
| P3 (F3) | 🔲 *[intention%, micro-win, ΔA/B]* | 🔲 ủng hộ / hỗn hợp / không |

### 7.2. Đối chiếu với tài liệu
*(Khung viết sẵn — điền số liệu của nhóm vào.)* Kết quả của nhóm có thể được so với phát hiện rằng công cụ tự kiểm soát thường có hiệu ứng khiêm tốn và dễ bị vô hiệu hóa (Monge Roffarello & De Russis, 2023); nếu *sense of agency* tăng phù hợp với Lukoff và cộng sự (2021); nếu phản hồi về "gương" cho thấy sự ngạc nhiên khi thấy nguồn tin bị thu hẹp, điều này lặp lại Eslami và cộng sự (2015). 🔲 [ĐIỀN số liệu cụ thể.]

### 7.3. Giá trị liên ngành
*(Khung viết sẵn.)* Nếu chỉ có kỹ thuật, sản phẩm là tiện ích đo screen-time; nếu chỉ có lý luận, kết quả là bài luận về tha hóa. Sự kết hợp tạo ra công cụ nhắm đúng cơ chế tâm lý mà nghiên cứu định tính phát hiện. 🔲 [ĐIỀN: minh chứng cụ thể từ phản hồi cho thấy lý luận đã định hình trải nghiệm thật.]

---

## VIII. KẾT LUẬN

Nghiên cứu này đã chuyển hóa ba phát hiện định tính từ Level 4 — sự lẫn lộn giữa "muốn" và "thích" (M1), hiện tượng bong bóng lọc (X3) và nghịch lý "biết nhưng không làm" (Z1) — thành một **browser extension chạy được** ("Tỉnh") với ba tính năng tương ứng: Khoảng dừng phản tư, Gương bong bóng lọc và Nhật ký chủ thể. Sản phẩm được xây theo quy trình Design Science Research, vận hành hoàn toàn cục bộ trên máy người dùng (không truyền dữ liệu ra ngoài), và tôn trọng bốn ràng buộc đạo đức thiết kế: minh bạch, tùy chỉnh được, không ép buộc, chỉ lưu cục bộ. Việc hiện thực hóa đầy đủ ba can thiệp trên **ba nền tảng** (YouTube, Facebook và TikTok web), với kiến trúc *adapter* cho phép cắm thêm nền tảng mới mà không sửa phần lõi, là đóng góp *artifact* trung tâm của cấp độ Level 5.

Về kết quả thử nghiệm với 🔲 *[n]* sinh viên trong 🔲 *[1–2]* tuần: công cụ đạt điểm SUS trung bình 🔲 *[M]* (🔲 *[trên/dưới]* mốc tham chiếu 68), cho thấy tính khả dụng ở mức 🔲 *[…]* (RQ2). Ở mức mô tả, các thang tự báo cáo về *sense of agency* và cảm nhận kiểm soát thay đổi theo hướng 🔲 *[…]* sau khi dùng (RQ3), song do cỡ mẫu nhỏ và thiết kế một nhóm, những thay đổi này **chỉ mang tính gợi ý, không phải bằng chứng nhân quả**. Phản hồi định tính 🔲 *[ủng hộ/ủng hộ một phần]* cả ba mệnh đề thiết kế, đồng thời chỉ ra 🔲 *[ĐIỀN: hạn chế nổi bật nhất từ người dùng]*.

Ý nghĩa của nghiên cứu nằm ở **giá trị liên ngành và giáo dục**: dự án minh họa cách lý luận Mác về tha hóa và nhu cầu giả tạo có thể được thao tác hóa thành thiết kế phần mềm cụ thể, phục vụ trực tiếp cho việc bồi dưỡng **năng lực số và tư duy phản tư** cho sinh viên FPT trước sức ép của thuật toán mạng xã hội. Hướng phát triển tiếp theo (Level 6) gồm: mở rộng sang **ứng dụng di động** qua Android Accessibility Service (nơi phần lớn hành vi lướt thực sự diễn ra), tăng cỡ mẫu và bổ sung nhóm đối chứng để kiểm định mạnh hơn, và thử nghiệm dài hạn để quan sát liệu hiệu ứng có bền vững hay bị "nhờn" theo thời gian như cảnh báo của Monge Roffarello và De Russis (2023).

---

## IX. HẠN CHẾ VÀ HƯỚNG PHÁT TRIỂN TIẾP

### 9.1. Hạn chế

Nghiên cứu có những hạn chế cần nêu rõ. **Cỡ mẫu nhỏ và lấy mẫu thuận tiện** giới hạn tính đại diện; kết quả không thể suy rộng ra toàn bộ sinh viên. **Thời gian thử nghiệm ngắn** (1–2 tuần) không cho phép quan sát thay đổi thói quen bền vững — đúng giới hạn mà tổng quan của Monge Roffarello và De Russis (2023) cảnh báo. **Đo lường tự báo cáo** (SUS, sense of agency, phỏng vấn) có thể chịu thiên lệch mong muốn xã hội. **Phần lớn bằng chứng nền đến từ bối cảnh phương Tây**, nên việc áp dụng vào văn hóa tập thể Việt Nam cần thận trọng. Cuối cùng, **cây cầu lý luận Mác ↔ thiết kế HCI dựa trên suy luận của nhóm**, chưa có tiền lệ thực nghiệm trực tiếp; đây vừa là đóng góp mới vừa là điểm cần củng cố.

### 9.2. Hướng phát triển tiếp

Mở rộng cỡ mẫu và kéo dài thời gian theo dõi để đánh giá tính bền của thay đổi; bổ sung nhóm đối chứng; thử nghiệm trên nhiều nền tảng và thiết bị (lường trước "đường thoát" đổi thiết bị mà Monge Roffarello & De Russis, 2021 chỉ ra); và bổ sung tài liệu tiếng Việt về digital wellbeing. Nếu đạt chất lượng, đề tài có thể phát triển lên **Level 6** để công bố tại hội nghị NCKH sinh viên hoặc Euréka.

---

## TÀI LIỆU THAM KHẢO (APA 7.0)

Bakshy, E., Messing, S., & Adamic, L. A. (2015). Exposure to ideologically diverse news and opinion on Facebook. *Science, 348*(6239), 1130–1132. https://doi.org/10.1126/science.aaa1160

Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. *Qualitative Research in Psychology, 3*(2), 77–101. https://doi.org/10.1191/1478088706qp063oa

Brooke, J. (1996). SUS: A "quick and dirty" usability scale. In P. W. Jordan, B. Thomas, B. A. Weerdmeester, & I. L. McClelland (Eds.), *Usability evaluation in industry* (pp. 189–194). Taylor & Francis.

Bruns, A. (2019). *Are filter bubbles real?* Polity Press.

Bucher, T. (2017). The algorithmic imaginary: Exploring the ordinary affects of Facebook algorithms. *Information, Communication & Society, 20*(1), 30–44. https://doi.org/10.1080/1369118X.2016.1154086

Caraban, A., Karapanos, E., Campos, P., & Gonçalves, D. (2019). 23 ways to nudge: A review of technology-mediated nudging in human-computer interaction. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (Paper 503, pp. 1–15). ACM. https://doi.org/10.1145/3290605.3300733

Cox, A. L., Gould, S. J. J., Cecchinato, M. E., Iacovides, I., & Renfree, I. (2016). Design frictions for mindful interactions: The case for microboundaries. In *Proceedings of the 2016 CHI Conference Extended Abstracts on Human Factors in Computing Systems* (pp. 1389–1397). ACM. https://doi.org/10.1145/2851581.2892410

DeVito, M. A., Birnholtz, J., Hancock, J. T., French, M., & Liu, S. (2018). How people form folk theories of social media feeds and what it means for how we study self-presentation. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (Paper 120, pp. 1–12). ACM. https://doi.org/10.1145/3173574.3173694

Eslami, M., Rickman, A., Vaccaro, K., Aleyasen, A., Vuong, A., Karahalios, K., Hamilton, K., & Sandvig, C. (2015). "I always assumed that I wasn't really that close to [her]": Reasoning about invisible algorithms in news feeds. In *Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems* (pp. 153–162). ACM. https://doi.org/10.1145/2702123.2702556

Fuchs, C. (2014). *Digital labour and Karl Marx*. Routledge.

Gray, C. M., Kou, Y., Battles, B., Hoggatt, J., & Toombs, A. L. (2018). The dark (patterns) side of UX design. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (Paper 534, pp. 1–14). ACM. https://doi.org/10.1145/3173574.3174108

Hansen, P. G., & Jespersen, A. M. (2013). Nudge and the manipulation of choice. *European Journal of Risk Regulation, 4*(1), 3–28. https://doi.org/10.1017/S1867299X00002762

Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). Design science in information systems research. *MIS Quarterly, 28*(1), 75–105. https://doi.org/10.2307/25148625

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

Verduyn, P., Lee, D. S., Park, J., Shablack, H., Orvell, A., Bayer, J., Ybarra, O., Jonides, J., & Kross, E. (2015). Passive Facebook usage undermines affective well-being: Experimental and longitudinal evidence. *Journal of Experimental Psychology: General, 144*(2), 480–488. https://doi.org/10.1037/xge0000057

West, M., Rice, S., & Vella-Brodrick, D. (2024). Adolescent social media use through a self-determination theory lens: A systematic scoping review. *International Journal of Environmental Research and Public Health, 21*(7), 862. https://doi.org/10.3390/ijerph21070862

Williams, J. (2018). *Stand out of our light: Freedom and resistance in the attention economy*. Cambridge University Press. https://doi.org/10.1017/9781108453004

Zuboff, S. (2019). *The age of surveillance capitalism: The fight for a human future at the new frontier of power*. PublicAffairs.

### Nguồn lý luận Mác–Lênin (bổ sung — triết học & kinh tế chính trị)

Bộ Giáo dục và Đào tạo. (2021). *Giáo trình Triết học Mác – Lênin (Dành cho bậc đại học hệ không chuyên lý luận chính trị)* (Phạm Văn Đức chủ biên). Nhà xuất bản Chính trị quốc gia Sự thật.

Bộ Giáo dục và Đào tạo. (2021). *Giáo trình Kinh tế chính trị Mác – Lênin (Dành cho bậc đại học hệ không chuyên lý luận chính trị)* (Ngô Tuấn Nghĩa chủ biên). Nhà xuất bản Chính trị quốc gia Sự thật.

Fuchs, C., & Sevignani, S. (2013). What is digital labour? What is digital work? What's their difference? And why do these questions matter for understanding social media? *tripleC: Communication, Capitalism & Critique, 11*(2), 237–293. https://doi.org/10.31269/triplec.v11i2.461

Hoàng Ngọc Bích. (2025, 18 tháng 4). Góc nhìn về lý thuyết tha hóa lao động của C. Mác trong thời đại kinh tế số. *Tạp chí Quản lý nhà nước*. https://www.quanlynhanuoc.vn/2025/04/18/goc-nhin-ve-ly-thuyet-tha-hoa-lao-dong-cua-c-mac-trong-thoi-dai-kinh-te-so/

Lenin, V. I. (1972). *Materialism and empirio-criticism: Critical comments on a reactionary philosophy* (A. Fineberg, Trans.; bản gốc xuất bản 1909). Progress Publishers. https://www.marxists.org/archive/lenin/works/1908/mec/

Marx, K. (1887). *Capital: A critique of political economy, Volume I* (S. Moore & E. Aveling, Trans.; F. Engels, Ed.; bản gốc xuất bản 1867). Progress Publishers. https://www.marxists.org/archive/marx/works/1867-c1/

Marx, K. (1973). *Grundrisse: Foundations of the critique of political economy* (M. Nicolaus, Trans.; bản thảo gốc 1857–1858). Penguin. https://www.marxists.org/archive/marx/works/1857/grundrisse/

Marx, K., & Engels, F. (1998). *The German ideology* (bản thảo gốc 1845–1846). Marxists Internet Archive. https://www.marxists.org/archive/marx/works/1845/german-ideology/

Miconi, A. (2024). On digital fetishism: A critique of the big data paradigm. *Critical Sociology, 50*(4–5), 629–642. https://doi.org/10.1177/08969205231202873

Tạp chí Khoa học và Công nghệ – Đại học Công nghiệp TP.HCM. (2025). Tha hóa con người trong bối cảnh trí tuệ nhân tạo: Nhận diện, lý giải và định hướng chính sách. *Tạp chí Khoa học và Công nghệ (IUH)*, (76). https://jst.iuh.edu.vn/ *[Bổ sung tên tác giả + số trang theo bản PDF chính thức.]*

---

## PHỤ LỤC

### A. Tuyên bố sử dụng AI (AI Usage Statement)
Báo cáo và sản phẩm sử dụng công cụ AI (Claude) hỗ trợ ở một số khâu. Nhóm chịu trách nhiệm cuối cùng về nội dung; mọi trích dẫn được kiểm chứng DOI độc lập; phần Kết quả/Thảo luận do nhóm viết từ dữ liệu thực nghiệm thật; các mục tự viết trong bộ công cụ đo (đặc biệt các phát biểu *sense of agency* diễn đạt lại tiếng Việt) được thực hiện **không dùng AI** (AI-Free Zone) theo yêu cầu PAAL.

**Bảng A. Nhật ký sử dụng AI (AI Usage — 5 cột)**

| Công cụ | Mục đích | Prompt mẫu (rút gọn) | Giữ – Bỏ | Điểm mù của AI & cách nhóm xử lý |
|---|---|---|---|---|
| Claude | Tìm & thẩm định tài liệu HCI + Mác–Lênin | *"Tìm nghiên cứu peer-reviewed về digital self-control tools và sense of agency, kèm DOI đầy đủ."* | **Giữ** nguồn có DOI/URL kiểm chứng được; **bỏ** nguồn không truy được | AI có thể **bịa nguồn/DOI** (hallucination) → nhóm mở từng DOI kiểm chứng thủ công trước khi đưa vào danh mục |
| Claude | Dựng khung báo cáo & bộ tài liệu thiết kế theo rubric L5 | *"Dựng cấu trúc báo cáo RBL Level 5 và kế hoạch phase triển khai extension."* | **Giữ** khung mục lục & checklist; **bỏ** đoạn chung chung, sáo rỗng | Khung mặc định **thiếu bối cảnh FPT/SE1812** → nhóm bổ sung số liệu, tên đối tác, đặc thù lớp |
| Claude | Sinh mã extension (scaffold, adapter, hàm thuần + unit test) | *"Viết TypeScript pure function tính normalized Shannon entropy + Vitest test với mốc thời gian cố định."* | **Giữ** code build/lint/test xanh; **bỏ** đoạn không chạy hoặc thừa | Selector DOM của YouTube/Facebook/TikTok **dễ lỗi thời**; AI không biết DOM hiện tại → nhóm test tay trên trình duyệt thật, thêm fallback null→skip |
| Claude | Soạn bản nháp phần lý luận & phương pháp | *"Diễn giải lý luận tha hóa của Mác như lăng kính cho cơ chế feed thuật toán, giữ ở mức suy luận."* | **Giữ** luận điểm nhóm đồng thuận; **bỏ** suy diễn quá đà | AI dễ **overclaim** quan hệ Mác↔HCI như thể đã được chứng minh → nhóm siết lại, đánh dấu rõ là *suy luận của nhóm*, chưa có tiền lệ thực nghiệm |
| *(AI-Free)* | Phát biểu thang đo tự viết (mục A–D), dữ liệu & diễn giải Kết quả (Chương VI–VIII) | — không dùng AI — | Toàn bộ do nhóm viết từ dữ liệu thật | Không áp dụng |

### B. Phân công liên ngành (CRediT)

Phân công theo taxonomy CRediT (Contributor Roles Taxonomy), ánh xạ bảng nhân sự đề cương:

| Thành viên | Vai trò CRediT |
|---|---|
| **Hồ Quốc Đạt** (trưởng nhóm) | Conceptualization; Software (kiến trúc & phát triển extension); Project administration |
| **Nguyễn Thị Mai Vỹ** | Software (giao diện popup/options); Data curation (dữ liệu test); Visualization |
| **Hoàng Tấn Đạt** | Conceptualization (khung lý luận Mác–Lênin); Formal analysis (ánh xạ phạm trù ↔ tính năng); Writing – original draft (phần lý luận) |
| **Nguyễn Công Thành** | Methodology (thiết kế khảo sát & đo lường); Investigation (tuyển mẫu, thu dữ liệu UX, phỏng vấn) |
| **Phạm Trần Trung Hiếu** | Formal analysis (xử lý dữ liệu định lượng/định tính); Writing – original draft & Writing – review & editing (báo cáo) |

*(Tất cả thành viên tham gia Writing – review & editing ở khâu rà soát cuối và chịu trách nhiệm chung về tính chính trực của báo cáo.)*

### C. Tuyên bố đạo đức & tính khả dụng dữ liệu

**Đạo đức nghiên cứu.** Người tham gia là sinh viên tình nguyện, được thông báo rõ đây là sản phẩm nghiên cứu sinh viên và có quyền **rút lui bất cứ lúc nào không cần lý do**; đồng ý tham gia được thu qua bước consent trong onboarding của extension và trong biểu mẫu khảo sát. Dữ liệu **ẩn danh** theo Mã tham gia (không thu tên, email, hay nội dung duyệt web). Phỏng vấn chỉ ghi âm khi người tham gia đồng ý. Bốn ràng buộc đạo đức thiết kế (minh bạch, tùy chỉnh được, không ép buộc, chỉ lưu cục bộ) được tuân thủ xuyên suốt.

**Tính khả dụng dữ liệu (Data availability).** Do cam kết local-first, extension **không** tạo một kho dữ liệu tập trung; mỗi bản ghi nằm trên máy người tham gia và chỉ được chia sẻ khi họ chủ động xuất. Bộ dữ liệu tổng hợp ẩn danh (bảng H, các tệp export JSON/CSV) do nhóm lưu giữ và có thể cung cấp cho mục đích học thuật theo yêu cầu hợp lý, sau khi đã loại mọi thông tin định danh. Mã nguồn công cụ "Tỉnh" được lưu trong kho của nhóm (`Tinh_Project/tinh-extension/`).
