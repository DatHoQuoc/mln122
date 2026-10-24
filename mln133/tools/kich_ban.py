# Kịch bản thuyết trình — dùng chung cho Kich_ban_thuyet_trinh_tung_slide.docx (make_docx.py)
# và phần ghi chú người nói (speaker notes) trong pptx (build.py).
# Mỗi mục: id slide trong slides.js · mốc thời gian (nhóm tự chia người nói) · thao tác bấm · lời nói · chuyển ý.
# "(bấm)" trong lời nói = bấm → một lần. "split" = số đoạn thuộc trang thứ nhất khi slide bị tách 2 trang trong pptx.

SCRIPT = [
    dict(id='M0', title='Bìa', time='0:00–0:20',
         act='Hiện sẵn, không bấm.',
         say=['Em chào thầy/cô và các bạn. Nhóm em là nhóm 2. Hôm nay nhóm em trình bày mục III của chương 4: '
              'Dân chủ xã hội chủ nghĩa và Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam.']),

    dict(id='M2', title='Nội dung trình bày', time='0:20–1:10',
         act='Hiện sẵn, không bấm.',
         say=['Bài của nhóm em có ba phần. Phần một là dân chủ xã hội chủ nghĩa ở Việt Nam: nó hình thành, phát triển ra sao '
              'và bản chất của nó là gì.',
              'Phần hai nói về Nhà nước pháp quyền xã hội chủ nghĩa: hiểu nó thế nào và nó có những đặc điểm gì. '
              'Phần ba là những việc cần làm hiện nay để phát huy dân chủ và hoàn thiện Nhà nước pháp quyền.',
              'Cuối cùng nhóm em tóm lại cả bài trên một slide, rồi mời thầy/cô và các bạn đặt câu hỏi. '
              'Giữa chừng nhóm em có vài chỗ hỏi nhanh, các bạn cứ trả lời thoải mái nhé.'],
         next='Em bắt đầu bằng một chi tiết nhỏ mà nhóm em thấy khá thú vị.'),

    # ---------------- PHẦN 1 ----------------
    dict(id='M1', title='Một chi tiết đáng chú ý', time='1:10–2:00',
         act='4 lần bấm: 1945 → 1976 → văn kiện chưa dùng cụm từ → câu hỏi hiện ra ở ô giữa.',
         say=['(bấm) Sau Cách mạng Tháng Tám năm 1945, nước ta xác lập chế độ dân chủ nhân dân. '
              '(bấm) Năm 1976, tên nước đổi thành Cộng hòa xã hội chủ nghĩa Việt Nam. '
              '(bấm) Vậy mà trong các văn kiện của Đảng thời đó, cụm từ “dân chủ xã hội chủ nghĩa” gần như chưa xuất hiện.',
              'Nghe hơi lạ đúng không ạ? Tên nước đã có chữ “xã hội chủ nghĩa” rồi, nhưng dân chủ thì chưa được gọi là “dân chủ xã hội chủ nghĩa”.',
              '(bấm) Vậy cụm từ này được xác định ra sao, và từ lúc nào? Các bạn giữ câu hỏi này giúp nhóm em, cuối bài mình sẽ quay lại.'],
         next='Muốn trả lời thì phải lùi về giai đoạn trước Đổi mới.'),

    dict(id='A1', title='Trước Đổi mới', time='2:00–3:15',
         act='6 lần bấm: cách gọi cũ → ba ô “chưa” lần lượt → câu hỏi “Ba ý có chung chữ nào?” → kết luận ở giữa.',
         say=['(bấm) Thời đó, thay vì nói “dân chủ xã hội chủ nghĩa”, văn kiện dùng cách nói “xây dựng chế độ làm chủ tập thể xã hội chủ nghĩa”, '
              'đi kèm với “nắm vững chuyên chính vô sản”.',
              'Nhưng có mấy chuyện lúc đó vẫn còn bỏ ngỏ. '
              '(bấm) Bản chất của dân chủ xã hội chủ nghĩa là gì, nó liên quan thế nào tới nhà nước pháp quyền — chưa được xác định rõ. '
              '(bấm) Làm dân chủ sao cho hợp với điều kiện kinh tế, văn hóa, đạo đức của Việt Nam, gắn với pháp luật, kỷ cương — cũng chưa được đặt ra cụ thể. '
              '(bấm) Còn những thứ rất gần với dân chủ như dân sinh, dân trí, dân quyền thì chưa được đặt đúng chỗ.',
              '(bấm) Các bạn thấy ba ý này có chữ nào lặp lại không? … Đúng rồi, chữ “chưa”.',
              '(bấm) Tức là dân chủ thì đã có từ năm 1945, nhưng hiểu dân chủ xã hội chủ nghĩa là gì thì lúc đó chưa rõ. '
              'Riêng chữ “dân trí”, các bạn nhớ giúp em, sang phần ba nó sẽ quay lại.'],
         next='Bước ngoặt đến vào năm 1986.'),

    dict(id='A2', title='Đại hội VI (1986)', time='3:15–4:30',
         act='6 lần bấm: đường lối đổi mới → phát huy dân chủ → câu “lấy dân làm gốc” → bài học và câu trích → ô so với trước Đổi mới + câu hỏi → kết luận ở giữa.',
         say=['(bấm) Đại hội VI năm 1986 đề ra đường lối đổi mới toàn diện. '
              '(bấm) Trong đó có một ý rất quan trọng: phát huy dân chủ để tạo ra động lực mạnh mẽ cho đất nước phát triển.',
              '(bấm) Đại hội nói rõ: trong toàn bộ hoạt động của mình, Đảng phải quán triệt tư tưởng “lấy dân làm gốc”, '
              'xây dựng và phát huy quyền làm chủ của nhân dân lao động.',
              '(bấm) Đại hội cũng nhắc lại một bài học không bao giờ cũ: cách mạng là sự nghiệp của quần chúng. '
              'Thực tiễn cho thấy: “ở đâu, nhân dân lao động có ý thức làm chủ và được làm chủ thật sự, thì ở đấy xuất hiện phong trào cách mạng”.',
              '(bấm) Ở slide trước, vị trí của dân chủ còn chưa rõ. Đến đây thì dân chủ đã được gọi bằng một cái tên cụ thể. Các bạn thấy là gì không ạ?',
              '(bấm) Là động lực. Và đi cùng với nó là bốn chữ “lấy dân làm gốc” — bốn chữ này cuối bài nhóm em sẽ nhắc lại.'],
         next='Từ Đại hội VI, qua mỗi kỳ đại hội sau, cách hiểu về dân chủ càng rõ hơn.'),

    dict(id='A3', title='Qua mỗi kỳ đại hội thời kỳ đổi mới', time='4:30–5:45',
         act='7 lần bấm: năm ô từ trái sang phải → ô “Trước Đổi mới” → kết luận bên dưới.',
         say=['Giáo trình viết năm 2021 nên tính là ba mươi lăm năm đổi mới; tính đến nay là bốn mươi năm. Trong khoảng thời gian đó, Đảng khẳng định mấy điều.',
              '(bấm) Thứ nhất, một trong những đặc trưng của chủ nghĩa xã hội Việt Nam là do nhân dân làm chủ. '
              '(bấm) Thứ hai, dân chủ được đưa vào mục tiêu chung: dân giàu, nước mạnh, dân chủ, công bằng, văn minh — câu này chắc các bạn nghe từ hồi cấp một. '
              '(bấm) Thứ ba, và đây là ý nặng ký nhất: “Dân chủ xã hội chủ nghĩa là bản chất của chế độ ta, vừa là mục tiêu, vừa là động lực của sự phát triển đất nước”.',
              '(bấm) Dân chủ đó phải được làm thật trong cuộc sống, ở mỗi cấp, trên tất cả các lĩnh vực, '
              '(bấm) và phải gắn với kỷ luật, kỷ cương, được thể chế hóa bằng pháp luật, được pháp luật bảo đảm.',
              '(bấm) Đặt cạnh giai đoạn trước Đổi mới thì thấy rõ: trước kia bản chất “chưa xác định”, nay đã gọi tên là bản chất của chế độ. '
              'Trước kia “chưa gắn với pháp luật”, nay bắt buộc phải gắn.',
              '(bấm) Nói gọn lại, qua mỗi kỳ đại hội, dân chủ được hiểu đúng hơn, đầy đủ hơn và hợp với điều kiện nước mình hơn.'],
         next='Vậy cụ thể bản chất ấy là gì?'),

    dict(id='A4', title='“Nước ta là nước dân chủ” — Hồ Chí Minh', time='5:45–7:30', split=2,
         act='Trang 1: bảy câu có chỗ trống và câu hỏi “Chữ còn thiếu là gì?” hiện sẵn; dừng cho lớp trả lời. '
             'Trang 2 (2 lần bấm): sang trang là chữ “dân” đã điền sẵn → kết luận ở giữa → hai ô bổ sung.',
         say=['Để hiểu bản chất của nền dân chủ này, nhóm em mượn một đoạn rất ngắn của Bác Hồ. '
              'Em đã che chữ cuối của mỗi câu. Em đọc, các bạn đoán giúp em chữ còn thiếu nhé.',
              '“Bao nhiêu lợi ích đều vì…?” (để lớp trả lời) “Bao nhiêu quyền hạn đều của…?” (đọc tiếp đến hết bảy câu, mỗi câu dừng một nhịp cho lớp nói)',
              '(sang trang) Bảy câu, bảy chữ “dân”. Lợi ích, quyền hạn, trách nhiệm, chính quyền, đoàn thể… cuối cùng đều quy về dân. '
              'Bác tóm lại bằng một câu: “quyền hành và lực lượng đều ở nơi dân”.',
              '(bấm) Đó chính là bản chất của dân chủ xã hội chủ nghĩa ở Việt Nam: tất cả quyền lực đều thuộc về nhân dân — dân là gốc, là chủ, dân làm chủ.',
              '(bấm) Thêm hai ý. Nền dân chủ này dựa vào Nhà nước xã hội chủ nghĩa và sự ủng hộ, giúp đỡ của nhân dân. '
              'Và mỗi người tham gia vào đó với tư cách công dân, tức là với tư cách người làm chủ, chứ không phải người đứng ngoài.'],
         next='Từ tư tưởng của Bác, Đảng khái quát dân chủ thành bốn nội dung.'),

    dict(id='A5', title='Bốn nội dung của dân chủ', time='7:30–8:30',
         act='6 lần bấm: mục tiêu → bản chất → động lực → gắn với pháp luật → ô tổng hợp → kết luận ở giữa.',
         say=['Mấy ý này lúc nãy mình đã nghe qua, ở đây nhóm em tách riêng ra cho dễ nhớ.',
              '(bấm) Dân chủ là mục tiêu — cái đích mình hướng tới: dân giàu, nước mạnh, dân chủ, công bằng, văn minh. '
              '(bấm) Dân chủ là bản chất — nhân dân làm chủ, quyền lực thuộc về nhân dân. '
              '(bấm) Dân chủ là động lực — vì khi người dân được làm chủ thật thì sức mạnh của cả dân tộc mới được phát huy. '
              '(bấm) Và dân chủ phải gắn với pháp luật, đi đôi với kỷ luật, kỷ cương. Dân chủ không có nghĩa là muốn làm gì thì làm.',
              '(bấm) Bốn ý này chính là những gì Đảng rút ra sau mấy chục năm đổi mới.',
              '(bấm) Từ đó có một yêu cầu: dân chủ phải được làm thật trong đời sống, ở tất cả các cấp và mọi lĩnh vực — kinh tế, chính trị, văn hóa, xã hội.'],
         next='Vậy trong thực tế, người dân làm chủ bằng cách nào? Mình chơi một chút ở slide sau.'),

    dict(id='A6', title='Dân tự làm, hay giao cho người đại diện?', time='8:30–10:15', split=1,
         act='Trang 1: sáu thẻ xáo trộn hiện sẵn; dừng 30–45 giây cho lớp chia nhóm. '
             'Trang 2 (4 lần bấm): thẻ tách về hai nhóm → ô quyền lực thống nhất → ô “bảy chữ dân” → kết luận ở giữa.',
         say=['Trên màn hình là sáu việc, em cố tình xáo lộn. Các bạn chia giúp em thành hai nhóm: '
              'việc người dân tự mình làm, và việc người dân giao cho người khác làm thay. (chờ khoảng 30 giây, mời 2–3 bạn trả lời)',
              '(bấm) Đáp án đây. Bên trái là những việc dân giao quyền: mình đi bầu ra Quốc hội — cơ quan quyền lực nhà nước cao nhất, nhiệm kỳ 5 năm; '
              'mình “ủy quyền” cho người và tổ chức do mình bầu ra, để họ thay mặt mình thực hiện quyền làm chủ. Đó là dân chủ gián tiếp, hay dân chủ đại diện.',
              'Bên phải là những việc dân tự làm: được thông tin về hoạt động của nhà nước; được bàn bạc chuyện chung của nhà nước và của khu dân cư; '
              'được kiểm tra, giám sát cơ quan nhà nước từ trung ương xuống cơ sở. Ví dụ gần gũi nhất là những buổi họp tổ dân phố bàn chuyện làm đường, '
              'hay việc người dân góp ý vào dự thảo luật. Đó là dân chủ trực tiếp.',
              '(bấm) Ở hình thức gián tiếp có một ý các bạn lưu ý: quyền lực nhà nước là thống nhất, nhưng có phân công, phối hợp và kiểm soát giữa lập pháp, hành pháp, tư pháp. '
              'Sang phần hai ý này sẽ được nói kỹ hơn.',
              '(bấm) Dù theo hình thức nào thì cũng quay về bảy chữ “dân” lúc nãy: quyền lực thuộc về nhân dân.',
              '(bấm) Như vậy, bản chất dân chủ được thực hiện qua hai con đường này, và dân chủ dần trở thành quy chế, thành cách làm việc của mọi tổ chức trong xã hội.'],
         next='Còn nhìn vào thực tế xây dựng đất nước thì sao?'),

    dict(id='A7', title='Thực tiễn xây dựng đất nước', time='10:15–11:30',
         act='8 lần bấm: sáu ô lần lượt → câu hỏi “Chữ ‘quyền’ luôn đi cùng chữ gì?” → câu trích ở giữa.',
         say=['(bấm) Trước hết có một yêu cầu tất yếu: phải liên tục củng cố những điều kiện để người dân thực sự làm chủ, '
              'và chăm lo cả đời sống vật chất lẫn tinh thần cho người dân. Nói đơn giản, người dân có cuộc sống ổn định, có hiểu biết thì mới làm chủ được.',
              '(bấm) Thực tế thì quyền làm chủ ngày càng được mở rộng và hoạt động có hiệu quả hơn. '
              '(bấm) Ý thức làm chủ, trách nhiệm công dân ngày càng được đề cao. '
              '(bấm) Mọi công dân đều có quyền tham gia quản lý xã hội, bằng nhiều cách khác nhau, tùy trách nhiệm và nghĩa vụ của mình. '
              '(bấm) Dân chủ của công dân gắn với kỷ cương, được thể chế hóa bằng luật.',
              '(bấm) Và phương châm quen thuộc: dân biết, dân bàn, dân làm, dân kiểm tra. '
              'Năm 2022, Quốc hội còn ban hành Luật Thực hiện dân chủ ở cơ sở để cụ thể hóa tinh thần này.',
              '(bấm) Các bạn để ý, chữ “quyền” ở đây hay đi với chữ gì? … Đi với “trách nhiệm”, “nghĩa vụ”, “kỷ cương”. Có quyền thì cũng có trách nhiệm.',
              '(bấm) Đảng tổng kết bằng một câu: “Mọi đường lối, chính sách của Đảng và pháp luật của Nhà nước đều vì lợi ích của nhân dân, có sự tham gia ý kiến của nhân dân”.'],
         next='Tuy vậy, con đường này không hề bằng phẳng.'),

    dict(id='A8', title='Những trở ngại', time='11:30–12:30',
         act='7 lần bấm: ba ô bên trái → nhãn “Mặt khác” → hai ô bên phải → kết luận bên dưới.',
         say=['Có hai nhóm khó khăn. Nhóm thứ nhất đến từ điều kiện của chính mình. '
              '(bấm) Mình xây dựng dân chủ khi xuất phát điểm là một nền kinh tế kém phát triển, '
              '(bấm) lại phải gánh hậu quả rất nặng nề của chiến tranh. '
              '(bấm) Thêm vào đó, những tiêu cực trong xã hội chưa được khắc phục triệt để, làm ảnh hưởng đến bản chất tốt đẹp của chế độ và làm suy giảm động lực phát triển.',
              '(bấm) Mặt khác, '
              '(bấm) có âm mưu “diễn biến hòa bình”, gây bạo loạn, lật đổ, lợi dụng chiêu bài “dân chủ”, “nhân quyền” của các thế lực thù địch; '
              '(bấm) và cả nguy cơ “tự diễn biến”, “tự chuyển hóa”, diễn biến hết sức phức tạp.',
              '(bấm) Tất cả những điều này đang là trở ngại cho việc thực hiện dân chủ ở nước ta hiện nay. '
              'Riêng khó khăn về kinh tế, các bạn nhớ giúp em — sang phần ba sẽ có giải pháp cho nó.'],
         next='Em tóm lại phần một.'),

    dict(id='A9', title='Phần 1 — Dân chủ xã hội chủ nghĩa ở Việt Nam', time='12:30–13:30',
         act='8 lần bấm: năm ô nhắc lại → ô “Đại hội VI: lấy dân làm gốc” → kết luận ở giữa → ô bổ sung bên phải.',
         say=['(bấm) Từ chỗ còn nhiều chữ “chưa”, dân chủ đã được xác định là bản chất, là mục tiêu, là động lực. '
              '(bấm) Bản chất ấy là tất cả quyền lực thuộc về nhân dân, '
              '(bấm) gồm bốn nội dung và phải được làm ở mọi cấp, mọi lĩnh vực. '
              '(bấm) Nó được thực hiện qua hai hình thức, gián tiếp và trực tiếp, theo tinh thần dân biết, dân bàn, dân làm, dân kiểm tra. '
              '(bấm) Và trên đường đi vẫn còn những trở ngại.',
              '(bấm) Các bạn còn nhớ bốn chữ của Đại hội VI không ạ? “Lấy dân làm gốc”.',
              '(bấm) Đó cũng là kết luận của phần một: bản chất tốt đẹp và tính ưu việt của nền dân chủ xã hội chủ nghĩa ở Việt Nam ngày càng thể hiện giá trị lấy dân làm gốc. '
              'Từ khi có nước Việt Nam Dân chủ Cộng hòa đến nay, nhân dân thực sự trở thành người làm chủ, tự xây dựng và tổ chức quản lý xã hội.',
              '(bấm) Chế độ này bảo đảm quyền làm chủ của người dân từ chính trị, kinh tế đến văn hóa, xã hội, '
              'và phát huy tính tích cực, sáng tạo của nhân dân trong xây dựng và bảo vệ Tổ quốc.'],
         next='Lúc nãy mình nói, ở dân chủ gián tiếp, người dân giao quyền cho Nhà nước. Vậy Nhà nước đó phải là nhà nước như thế nào?'),

    # ---------------- PHẦN 2 ----------------
    dict(id='B0', title='Nhà nước pháp quyền là gì?', time='13:30–14:45',
         act='7 lần bấm: ba ô bên trái → nhãn “Còn nhiều cách hiểu…” → hai ô đầu bên phải → hai ô sau → kết luận ở giữa.',
         say=['Trước khi nói về Nhà nước pháp quyền của Việt Nam, mình thống nhất với nhau một chút: nhà nước pháp quyền nói chung là gì đã.',
              '(bấm) Theo quan niệm chung, đó là nhà nước thượng tôn pháp luật — pháp luật đứng trên hết. '
              '(bấm) Nhà nước hướng tới phúc lợi cho mọi người, tạo điều kiện để mỗi cá nhân được tự do, bình đẳng, phát huy hết năng lực của mình. '
              '(bấm) Các cơ quan nhà nước được phân quyền rõ ràng, và được mọi người chấp nhận trên nguyên tắc bình đẳng giữa các thế lực, giai cấp, tầng lớp trong xã hội.',
              '(bấm) Thật ra đến giờ vẫn có nhiều cách hiểu khác nhau về nhà nước pháp quyền. Nhưng có thể hiểu gọn thế này: '
              '(bấm) mọi công dân đều được giáo dục pháp luật, phải hiểu và tuân thủ pháp luật; pháp luật phải nghiêm minh; '
              '(bấm) các cơ quan nhà nước có phân công, phối hợp, kiểm soát lẫn nhau; và tất cả là để phục vụ nhân dân.',
              '(bấm) Nếu chỉ nhớ một câu thì các bạn nhớ: nhà nước pháp quyền là nhà nước thượng tôn pháp luật, và mọi việc đều vì mục tiêu phục vụ nhân dân. '
              'Lát nữa mình sẽ đem bảy ý này ra so với Nhà nước của mình.'],
         next='Giờ mình xem Đảng ta đặt vấn đề nhà nước pháp quyền thế nào, bắt đầu từ Cương lĩnh.'),

    dict(id='B1', title='Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH', time='14:45–16:00',
         act='8 lần bấm: sáu ô lần lượt → câu hỏi “cùng hướng về đâu?” → câu trả lời ở giữa.',
         say=['Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội nêu ra sáu nội dung về xây dựng nhà nước pháp quyền.',
              '(bấm) Một, đề cao vai trò tối thượng của Hiến pháp và pháp luật. '
              '(bấm) Hai, đề cao quyền lợi và nghĩa vụ của công dân, bảo đảm quyền con người. '
              '(bấm) Ba, bộ máy vừa tập trung, thống nhất, vừa có phân công giữa các nhánh quyền lực, phân cấp giữa các cấp chính quyền, để tránh lạm quyền. '
              '(bấm) Bốn, Nhà nước gắn bó chặt chẽ với nhân dân, lắng nghe nhân dân và chịu sự giám sát của nhân dân. '
              '(bấm) Năm, có cơ chế kiểm soát, ngăn ngừa và trừng trị quan liêu, tham nhũng, lộng quyền, vô trách nhiệm. '
              '(bấm) Sáu, bộ máy hoạt động theo nguyên tắc tập trung dân chủ, có sự chỉ đạo thống nhất của Trung ương.',
              '(bấm) Sáu ý khá dài, nhưng các bạn nhìn ba cụm em in đậm: tránh lạm quyền, chịu sự giám sát, kiểm soát. Ba cụm này cùng nói về một chuyện. Các bạn nghĩ là chuyện gì?',
              '(bấm) Đó là: quyền lực nhà nước phải được kiểm soát. Ý này còn được nhấn mạnh hơn nữa ở các kỳ Đại hội gần đây.'],
         next='Mình xem các kỳ Đại hội nói gì.'),

    dict(id='B2', title='Nhận thức qua các kỳ Đại hội', time='16:00–17:15',
         act='6 lần bấm: chủ trương → Đại hội XII → Đại hội XIII (ba cụm từ mới đã tô đỏ sẵn) → câu hỏi so sánh, hỏi lớp → hai ô nhắc lại → kết luận.',
         say=['(bấm) Trong quá trình đổi mới, Đảng đưa ra chủ trương xây dựng Nhà nước pháp quyền Việt Nam của dân, do dân, vì dân. '
              'Nhà nước quản lý xã hội bằng pháp luật, và từ cơ quan, cán bộ cho tới mọi công dân đều có nghĩa vụ chấp hành Hiến pháp, pháp luật.',
              '(bấm) Đến Đại hội XII, Đảng nói rõ hơn: “Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm soát giữa các cơ quan nhà nước…”. '
              '(bấm) Đại hội XIII viết: “Quyền lực nhà nước là thống nhất, có sự phân công rành mạch, phối hợp chặt chẽ và tăng cường kiểm soát quyền lực nhà nước”.',
              '(bấm) Các bạn so giúp em hai câu này: Đại hội XIII thêm vào những chữ nào? … '
              'Đúng rồi, chính là ba cụm em tô đỏ: “rành mạch”, “chặt chẽ”, và “tăng cường” kiểm soát.',
              '(bấm) Ghép lại với những gì mình đã nghe: Cương lĩnh nói tránh lạm quyền, chịu sự giám sát; dân chủ gián tiếp nói phân công, phối hợp, kiểm soát. '
              '(bấm) Tất cả gặp nhau ở chữ “kiểm soát quyền lực”. Và qua từng kỳ đại hội, nhận thức về Nhà nước pháp quyền ngày càng rõ ràng hơn.'],
         next='Từ những nhận thức đó, có thể rút ra sáu đặc điểm cơ bản. Em chia làm hai slide.'),

    dict(id='B3', title='Sáu đặc điểm (1–3)', time='17:15–18:30',
         act='4 lần bấm: cặp ô nguồn → đặc điểm 1 → cặp đặc điểm 2 → cặp đặc điểm 3 → ô bên phải.',
         say=['Mỗi đặc điểm em đặt cạnh nguồn gốc của nó, để các bạn thấy nó không tự nhiên mà có.',
              '(bấm) Thứ nhất, đây là nhà nước do nhân dân lao động làm chủ — Nhà nước của dân, do dân, vì dân. Nó đi ra từ chính chủ trương mình vừa nghe.',
              '(bấm) Thứ hai, Nhà nước được tổ chức và hoạt động dựa trên Hiến pháp và pháp luật; trong mọi hoạt động của xã hội, pháp luật được đặt ở vị trí tối thượng. Ý này lấy từ Cương lĩnh.',
              '(bấm) Thứ ba, quyền lực nhà nước thống nhất, có phân công rõ ràng, phối hợp nhịp nhàng và kiểm soát giữa lập pháp, hành pháp, tư pháp — đúng điều Đại hội XII, XIII nhấn mạnh.',
              '(bấm) Vậy là mình có ba đặc điểm đầu.'],
         next='Ba đặc điểm còn lại.'),

    dict(id='B4', title='Sáu đặc điểm (4–6)', time='18:30–19:45',
         act='4 lần bấm: cặp đặc điểm 4 → cặp đặc điểm 5 → cặp đặc điểm 6 → ô bên phải.',
         say=['(bấm) Thứ tư, Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam do Đảng Cộng sản Việt Nam lãnh đạo, phù hợp với Điều 4 Hiến pháp năm 2013. '
              'Đồng thời, hoạt động của Nhà nước chịu sự giám sát của nhân dân, theo phương châm dân biết, dân bàn, dân làm, dân kiểm tra.',
              '(bấm) Thứ năm, Nhà nước tôn trọng quyền con người, coi con người là chủ thể, là trung tâm của sự phát triển. '
              'Quyền dân chủ được thực hành rộng rãi — “nhân dân có quyền bầu và bãi miễn những đại biểu không xứng đáng” — và pháp luật phải nghiêm minh.',
              '(bấm) Thứ sáu, bộ máy tổ chức theo nguyên tắc tập trung dân chủ: có phân công, phân cấp, phối hợp, kiểm soát lẫn nhau, '
              'nhưng quyền lực vẫn thống nhất và có sự chỉ đạo thống nhất của Trung ương.',
              '(bấm) Như vậy là đủ sáu đặc điểm, và đặc điểm nào cũng có gốc từ những điều mình đã nói trước đó.'],
         next='Giờ mình đem sáu đặc điểm này so với quan niệm chung ở đầu phần hai.'),

    dict(id='B5', title='Đối chiếu với quan niệm chung về nhà nước pháp quyền', time='19:45–20:45',
         act='3 lần bấm: hai cột → các đường nối → tô đỏ đặc điểm 4 và câu kết luận bên dưới.',
         say=['(bấm) Bên trái là sáu đặc điểm của mình, bên phải là bảy ý của quan niệm chung lúc nãy.',
              '(bấm) Nối thử thì thấy: “vì nhân dân” khớp với đặc điểm một; “thượng tôn pháp luật” khớp với đặc điểm hai; '
              '“kiểm soát lẫn nhau” khớp với đặc điểm ba và sáu; “pháp luật nghiêm minh” khớp với đặc điểm năm.',
              '(bấm) Chỉ còn đặc điểm bốn — Đảng Cộng sản Việt Nam lãnh đạo — là không có cặp nào bên phải. '
              'Đây chính là điểm riêng của Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam.'],
         next='Vậy giống ở đâu, khác ở đâu? Em tóm lại ở slide cuối phần hai.'),

    dict(id='B6', title='Phần 2 — Nhà nước pháp quyền XHCN Việt Nam', time='20:45–21:45',
         act='5 lần bấm: điểm chung → ô nhắc đặc điểm 4 → điểm khác thứ nhất → điểm khác thứ hai → kết luận bên dưới.',
         say=['(bấm) Điểm giống: những đặc điểm của Nhà nước pháp quyền mà Việt Nam đang xây dựng đã thể hiện được tinh thần cơ bản của một nhà nước pháp quyền nói chung — '
              'thượng tôn pháp luật, pháp luật nghiêm minh, kiểm soát quyền lực, và tất cả vì nhân dân.',
              '(bấm) Còn điểm khác thì bắt đầu từ đặc điểm bốn không có cặp lúc nãy. '
              '(bấm) Khác thứ nhất: Nhà nước mang bản chất giai cấp công nhân, phục vụ lợi ích của nhân dân. '
              '(bấm) Khác thứ hai: Nhà nước là công cụ chủ yếu để Đảng Cộng sản Việt Nam định hướng đi lên chủ nghĩa xã hội.',
              '(bấm) Gói phần hai trong một câu: Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam vừa mang tinh thần chung của nhà nước pháp quyền, vừa có những điểm khác biệt của riêng mình.'],
         next='Hai phần đầu trả lời câu hỏi “là gì”. Phần ba trả lời câu hỏi “phải làm gì”.'),

    # ---------------- PHẦN 3 ----------------
    dict(id='C1', title='a) Phát huy dân chủ — Một là', time='21:45–23:00',
         act='7 lần bấm: năm ô lần lượt → ô nhắc trở ngại kinh tế → kết luận ở giữa.',
         say=['Phần ba có hai nhóm việc: nhóm a là phát huy dân chủ, có năm giải pháp; nhóm b là hoàn thiện Nhà nước pháp quyền, có bốn giải pháp. Em đi lần lượt.',
              'Giải pháp thứ nhất là về kinh tế. '
              '(bấm) Cần thể chế hóa việc phát triển nhiều hình thức sở hữu, nhiều thành phần kinh tế, loại hình doanh nghiệp, và bảo vệ quyền lợi hợp pháp của chủ sở hữu. '
              '(bấm) Luật cũng phải theo kịp những loại tài sản mới như sở hữu trí tuệ, cổ phiếu, trái phiếu. '
              '(bấm) Làm thể chế thì phải làm đủ ba khâu: ban hành quy định, đưa vào vận hành thực tế, và có bộ máy giám sát, xử lý vi phạm. Ban hành xong mà không ai thực thi thì cũng như không. '
              '(bấm) Song song là cải cách hành chính, từ bộ máy đến thủ tục — thủ tục gọn thì môi trường kinh doanh mới tốt lên được. '
              '(bấm) Và phát triển đồng bộ các loại thị trường, rà soát lại pháp luật kinh doanh cho phù hợp với Việt Nam.',
              '(bấm) Các bạn còn nhớ trở ngại đầu tiên ở phần một không? Nền kinh tế kém phát triển. '
              '(bấm) Giải pháp này chính là để trả lời trở ngại đó: hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa, tạo cơ sở kinh tế vững chắc cho dân chủ.'],
         next='Giải pháp hai và ba là về Đảng và Nhà nước.'),

    dict(id='C2', title='a) Phát huy dân chủ — Hai là, Ba là', time='23:00–24:15',
         act='8 lần bấm: ba ô về Đảng → “Hai là” → ba ô về Nhà nước → “Ba là”.',
         say=['(bấm) Muốn giữ được vai trò lãnh đạo, Đảng phải vững mạnh về chính trị, tư tưởng và tổ chức, thường xuyên tự đổi mới, tự chỉnh đốn. '
              '(bấm) Phải nâng cao trí tuệ, bản lĩnh chính trị, phẩm chất đạo đức và năng lực lãnh đạo. '
              '(bấm) Và ngay trong Đảng cũng phải dân chủ: thực hiện tập trung dân chủ, tự phê bình và phê bình.',
              '(bấm) Đây là giải pháp thứ hai: xây dựng Đảng trong sạch, vững mạnh — điều kiện tiên quyết để xây dựng nền dân chủ.',
              '(bấm) Về phía Nhà nước: Nhà nước phải thực thi quyền dân chủ của nhân dân trên mọi lĩnh vực, bằng Hiến pháp và pháp luật. '
              '(bấm) Quyền con người phải được coi là giá trị cao nhất. '
              '(bấm) Vì vậy chính sách, pháp luật phải dựa trên ý chí, nguyện vọng của nhân dân; danh dự, nhân phẩm, quyền lợi hợp pháp của công dân phải được bảo đảm, cả bằng pháp luật lẫn trong đời sống thực tế.',
              '(bấm) Đó là giải pháp thứ ba: xây dựng Nhà nước pháp quyền vững mạnh — điều kiện để thực thi dân chủ. '
              'Các bạn để ý: Đảng là điều kiện “tiên quyết”, còn Nhà nước là điều kiện “để thực thi”.'],
         next='Hai giải pháp còn lại của nhóm a thì gần với người dân hơn.'),

    dict(id='C3', title='a) Phát huy dân chủ — Bốn là, Năm là', time='24:15–25:30',
         act='9 lần bấm: bốn ô → “Bốn là” → ba ô về giám sát, phản biện → ô dân trí + ô “Trước Đổi mới” → ô phương châm → “Năm là”.',
         say=['(bấm) Các tổ chức chính trị – xã hội, như Đoàn Thanh niên, Công đoàn, Hội Phụ nữ, cần đổi mới mạnh mẽ cách hoạt động, '
              '(bấm) để tham gia giám sát và phản biện đường lối, chính sách, pháp luật; '
              '(bấm) tạo khối đoàn kết toàn dân, chăm lo đời sống nhân dân; '
              '(bấm) đồng thời tham gia bảo vệ chính quyền, xây dựng Đảng, và bảo vệ quyền lợi chính đáng của người dân.',
              '(bấm) Đó là giải pháp thứ tư: nâng cao vai trò của các tổ chức chính trị – xã hội.',
              '(bấm) Giải pháp thứ năm là về giám sát và phản biện xã hội. Việc này ảnh hưởng tới cách người dân nhìn nhận, đánh giá chủ trương, chính sách. '
              'Vì vậy cần công khai, minh bạch thông tin, nhất là những vấn đề đụng tới quyền lợi chính đáng của người dân, và cụ thể hóa các quy chế để lắng nghe ý kiến nhân dân.',
              '(bấm) Ngoài ra cần nâng cao dân trí, văn hóa pháp luật cho cả xã hội. Chữ “dân trí” này, trước Đổi mới còn chưa được đặt đúng chỗ, giờ đã thành một giải pháp.',
              '(bấm) Và giám sát, phản biện cũng chính là chữ “dân kiểm tra” trong phương châm quen thuộc.',
              '(bấm) Vậy giải pháp thứ năm là: xây dựng và từng bước hoàn thiện hệ thống giám sát, phản biện xã hội để phát huy quyền làm chủ của nhân dân.'],
         next='Năm giải pháp nghe hơi nhiều, nên mình làm nhanh một bài nối.'),

    dict(id='C4', title='Mỗi giải pháp giữ vai trò gì?', time='25:30–26:15',
         act='3 lần bấm: năm giải pháp và năm vai trò (xáo trộn) → dừng 30 giây cho lớp nối → các đường nối → kết luận bên dưới.',
         say=['(bấm) Bên trái là năm giải pháp, bên phải là vai trò của từng giải pháp, em đã xáo thứ tự. Các bạn nối giúp em nhé. (chờ khoảng 30 giây)',
              '(bấm) Kinh tế là cơ sở vững chắc; Đảng là điều kiện tiên quyết; Nhà nước là điều kiện để thực thi; '
              'tổ chức chính trị – xã hội thì cần nâng cao vai trò; còn giám sát, phản biện là để phát huy quyền làm chủ.',
              '(bấm) Mỗi giải pháp một vai trò, nhưng đều hướng về một mục tiêu: phát huy dân chủ xã hội chủ nghĩa ở Việt Nam hiện nay.'],
         next='Sang nhóm b: tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền, gồm bốn giải pháp.'),

    dict(id='C5', title='b) Hoàn thiện Nhà nước pháp quyền — Một là, Hai là', time='26:15–27:30',
         act='8 lần bấm: ô bản chất giai cấp công nhân → ô quyền lực thống nhất → “Một là” → Quốc hội → hành chính → thủ tục → dịch vụ công → “Hai là”.',
         say=['(bấm) Nhà nước pháp quyền ở Việt Nam mang bản chất giai cấp công nhân, đồng thời gắn bó chặt chẽ với dân tộc, với nhân dân. '
              '(bấm) Quyền lực nhà nước là thống nhất, có phân công và phối hợp giữa lập pháp, hành pháp, tư pháp.',
              '(bấm) Vì vậy giải pháp đầu tiên là: xây dựng Nhà nước pháp quyền dưới sự lãnh đạo của Đảng.',
              'Giải pháp thứ hai là cải cách thể chế và cách thức hoạt động của Nhà nước. '
              '(bấm) Bắt đầu từ Quốc hội — cơ quan quyền lực nhà nước cao nhất, có quyền lập hiến, lập pháp và giám sát tối cao — phải được kiện toàn, hoạt động hiệu quả hơn. '
              '(bấm) Nền hành chính phải dân chủ, trong sạch, vững mạnh, từng bước hiện đại hóa. '
              '(bấm) Giảm mạnh, bãi bỏ những thủ tục gây phiền hà cho người dân và doanh nghiệp — như bây giờ nhiều thủ tục đã nộp được trực tuyến qua Cổng Dịch vụ công quốc gia. '
              '(bấm) Và đẩy mạnh xã hội hóa các dịch vụ công.',
              '(bấm) Đó là giải pháp thứ hai: cải cách thể chế và phương thức hoạt động của Nhà nước.'],
         next='Hai giải pháp cuối nói về con người trong bộ máy.'),

    dict(id='C6', title='b) Hoàn thiện Nhà nước pháp quyền — Ba là, Bốn là', time='27:30–28:45',
         act='10 lần bấm: ba ô về cán bộ → “Ba là” → bốn ô chống tham nhũng → ô nhắc Cương lĩnh → “Bốn là”.',
         say=['(bấm) Đội ngũ cán bộ, công chức phải vững về bản lĩnh chính trị, đạo đức, năng lực lãnh đạo, điều hành. Và phải làm theo cả hai chiều: '
              '(bấm) người làm tốt thì được đãi ngộ, động viên; '
              '(bấm) người không hoàn thành nhiệm vụ, vi phạm kỷ luật, đạo đức công vụ thì phải bị loại ra, miễn nhiệm.',
              '(bấm) Đó là giải pháp thứ ba: xây dựng đội ngũ cán bộ, công chức trong sạch, có năng lực.',
              'Giải pháp thứ tư là phòng, chống tham nhũng, lãng phí. Cụ thể: '
              '(bấm) hoàn thiện thể chế và đẩy mạnh cải cách hành chính để phục vụ việc phòng, chống tham nhũng; '
              '(bấm) có cơ chế khuyến khích và bảo vệ người đấu tranh chống tham nhũng; '
              '(bấm) có chế tài để xử lý cá nhân, tổ chức vi phạm; '
              '(bấm) và toàn Đảng, toàn dân cùng thực hành tiết kiệm.',
              '(bấm) Ý này thật ra đã có từ Cương lĩnh ở phần hai: ngăn ngừa và trừng trị tham nhũng.',
              '(bấm) Phòng, chống tham nhũng, lãng phí là nhiệm vụ vừa cấp bách, vừa lâu dài — không thể làm một lần là xong.'],
         next='Em tóm lại phần ba.'),

    dict(id='C7', title='Phần 3 — Mỗi giải pháp nối về đâu?', time='28:45–29:30',
         act='7 lần bấm: sáu cặp từ trên xuống → hai ô bên phải.',
         say=['Các giải pháp ở phần ba không tự nhiên mà có, mỗi giải pháp đều trả lời cho một vấn đề đã nêu trước đó. '
              '(bấm) Kinh tế kém phát triển — thì tạo cơ sở kinh tế vững chắc. '
              '(bấm) Dân trí từng chưa được đặt đúng chỗ — thì nâng cao dân trí. '
              '(bấm) Dân biết, dân bàn, dân làm, dân kiểm tra — thì giám sát, phản biện. '
              '(bấm) Nhà nước mang bản chất giai cấp công nhân — thì xây dựng dưới sự lãnh đạo của Đảng. '
              '(bấm) Quốc hội là cơ quan quyền lực cao nhất — thì cải cách Quốc hội. '
              '(bấm) Cương lĩnh nói trừng trị tham nhũng — thì phòng, chống tham nhũng.',
              '(bấm) Tổng cộng là năm giải pháp phát huy dân chủ và bốn giải pháp hoàn thiện Nhà nước pháp quyền.'],
         next='Giờ mình nhìn lại cả bài.'),

    # ---------------- KẾT ----------------
    dict(id='K1', title='Tổng kết cả bài', time='29:30–32:00',
         act='17 lần bấm: ba cột → mười ô ở giữa (bấm liền tay) → bốn ô kết luận → câu hỏi mở đầu → “Lấy dân làm gốc”.',
         say=['Slide này gom cả bài lại. (bấm) Ba cột trên là ba phần mình vừa đi qua.',
              '(bấm liền tay đến hết mười ô ở giữa) Mười ô ở giữa là những ý xuất hiện ở nhiều phần. Ví dụ “quyền lực thuộc về nhân dân” đi từ đoạn văn của Bác sang hai hình thức dân chủ, '
              'rồi sang đặc điểm của Nhà nước; hay “kiểm soát quyền lực” đi từ dân chủ gián tiếp sang Cương lĩnh, các kỳ Đại hội, rồi tới giải pháp. '
              'Ba phần của bài nối với nhau chứ không tách rời.',
              'Nếu phải nhớ ba điều thì nhóm em mong các bạn nhớ: '
              '(bấm) bản chất của dân chủ xã hội chủ nghĩa là tất cả quyền lực thuộc về nhân dân; '
              '(bấm) Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam có sáu đặc điểm, vừa có tinh thần chung, vừa có điểm riêng; '
              '(bấm) và để đi tiếp, có năm giải pháp phát huy dân chủ, bốn giải pháp hoàn thiện Nhà nước.',
              '(bấm) Còn mình — là sinh viên, là công dân — thì làm được gì? Không có gì to tát: hiểu luật và làm đúng luật; '
              'tham gia vào việc chung theo đúng trách nhiệm, nghĩa vụ của mình, từ góp ý ở lớp, ở trường cho tới đi bầu cử khi đủ tuổi; '
              'thực hiện tinh thần dân biết, dân bàn, dân làm, dân kiểm tra; và tự nâng cao hiểu biết pháp luật. '
              'Ví dụ đơn giản thôi: trước khi chia sẻ một tin về chính sách trên mạng, mình kiểm tra xem nguồn có chính thống không.',
              '(bấm) Giờ quay lại câu hỏi đầu bài: vì sao năm 1976, khi tên nước đã có chữ “xã hội chủ nghĩa”, cụm từ “dân chủ xã hội chủ nghĩa” vẫn gần như chưa được dùng? '
              'Vì lúc đó bản chất của nó chưa được xác định rõ. Phải qua thời kỳ đổi mới, từ Đại hội VI trở đi, nó mới dần được làm rõ: là bản chất, là mục tiêu, là động lực.',
              '(bấm) Và nếu gói cả bài vào bốn chữ, thì đó là: lấy dân làm gốc.']),

    dict(id='K2', title='Cảm ơn — Hỏi đáp', time='32:00–32:30',
         act='Hiện sẵn. Dòng tài liệu tham khảo chỉ để trên slide, không đọc.',
         say=['Phần trình bày của nhóm em đến đây là hết. Cảm ơn thầy/cô và các bạn đã lắng nghe. Nhóm em rất mong nhận được câu hỏi và góp ý ạ.']),
]
