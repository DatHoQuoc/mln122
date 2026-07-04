// Toàn bộ chuỗi UI tiếng Việt (NFR-7). KHÔNG hardcode chuỗi trong component.

export const vi = {
  appName: 'Tỉnh',
  tagline: 'Tái chiếm quyền làm chủ trước thuật toán',

  tabs: {
    today: 'Hôm nay',
    mirror: 'Gương',
    journal: 'Nhật ký',
    settings: 'Cài đặt',
  },

  today: {
    title: 'Hôm nay',
    empty:
      'Chưa có hoạt động nào hôm nay. Hãy dùng mạng xã hội như thường lệ — "Tỉnh" sẽ đồng hành.',
    pauseToday: 'Khoảng dừng hôm nay',
    pauseTotal: 'Tổng khoảng dừng',
    streak: 'Chuỗi micro-win',
  },

  pause: {
    heading: 'Bạn đã cuộn liên tục {minutes} phút.',
    question: 'Bạn đang MUỐN xem điều gì cụ thể, hay chỉ đang THÍCH cảm giác cuộn?',
    continue: 'Tiếp tục có ý thức',
    stop: 'Dừng phiên ở đây 👋',
    why: 'Vì sao tôi thấy màn hình này?',
  },

  mirror: {
    title: 'Gương 7 ngày qua',
    diversity: 'Độ đa dạng nguồn tin',
    views: '{items} lượt xem · {sources} nguồn',
    selfSelected: 'Do bạn chọn',
    recommended: 'Thuật toán đề xuất',
    topSources: 'Nguồn hàng đầu',
    others: '{n} nguồn khác',
    suggestion:
      '💡 {days} ngày qua nguồn tin của bạn khá tập trung. Thử tìm một nguồn khác góc nhìn xem sao?',
    notEnough: 'Chưa đủ dữ liệu để soi gương (cần ≥ 10 lượt xem).',
    why: 'Vì sao tôi thấy thống kê này?',
  },

  journal: {
    title: 'Nhật ký chủ thể',
    intentionQuestion: 'Hôm nay bạn vào {platform} để làm gì?',
    categories: { 'giai-tri': 'Giải trí', 'hoc-tap': 'Học tập', 'tim-cu-the': 'Tìm cụ thể' },
    planned: 'Dự kiến',
    minutesShort: 'phút',
    customMinutes: 'Khác',
    start: 'Bắt đầu phiên',
    skip: 'Bỏ qua',
    reflectTitle: 'Phiên {platform} vừa rồi',
    reflectDetail: 'Bạn định "{intention}" trong {planned} phút, thực tế {actual} phút.',
    reflectQuestion: 'Bạn có làm được điều mình định làm không?',
    kept: 'Có 💪',
    partial: 'Một phần',
    notKept: 'Không',
    streakCurrent: 'Chuỗi hiện tại',
    streakLongest: 'Dài nhất',
    keptRatioWeek: 'Giữ đúng ý định (tuần này)',
    recent: 'Phiên gần đây',
    noSessions: 'Chưa có phiên nào. Đặt ý định khi mở mạng xã hội để bắt đầu tích lũy micro-win.',
    newStreak: 'Bắt đầu chuỗi mới hôm nay?',
    days: 'ngày',
  },

  platformNames: { youtube: 'YouTube', facebook: 'Facebook', tiktok: 'TikTok' },

  settings: {
    title: 'Cài đặt',
    consent: 'Tham gia nghiên cứu (bật các tính năng)',
    pauseThreshold: 'Ngưỡng khoảng dừng',
    minutesUnit: 'phút',
    featurePause: 'Khoảng dừng phản tư',
    featureMirror: 'Gương bong bóng lọc',
    featureJournal: 'Nhật ký chủ thể',
    notifications: 'Thông báo đối chiếu',
    participantCode: 'Mã tham gia (ẩn danh)',
    reloadHint: 'Đổi cài đặt có hiệu lực ngay; nếu đang mở tab MXH, tải lại trang để chắc chắn.',
  },

  onboarding: {
    step1Title: 'Chào bạn — đây là "Tỉnh"',
    step1Body:
      'Một công cụ nhỏ giúp bạn nhận ra và làm chủ thói quen lướt mạng xã hội. Mọi dữ liệu ở lại trên máy bạn — không có gì được gửi đi.',
    step2Title: 'Đồng ý tham gia nghiên cứu',
    step2Body:
      'Đây là sản phẩm nghiên cứu (RBL Level 5). Bạn tham gia tự nguyện, có thể rút lui bất cứ lúc nào. Extension chỉ đếm số nguồn và hành vi cuộn — không lưu nội dung bạn xem.',
    consent: 'Tôi đồng ý tham gia',
    step3Title: 'Chọn tính năng',
    finish: 'Bắt đầu dùng',
  },

  export: {
    title: 'Xuất dữ liệu nghiên cứu',
    body: 'Xem trước dữ liệu, sau đó tự gửi cho nhóm. Không có gì tự động gửi đi.',
    button: 'Xuất dữ liệu nghiên cứu',
    needCode: 'Vui lòng đặt Mã tham gia trong Cài đặt trước khi xuất.',
    preview: 'Xem trước',
    downloadJson: '⬇ Tải JSON',
    downloadCsv: '⬇ Tải CSV (Excel)',
    summary: 'Tóm tắt: {pauses} khoảng dừng · {sessions} phiên · {opens} lượt mở Gương',
    note: 'Dữ liệu xuất chỉ gồm SỐ ĐẾM tổng hợp và tên nguồn tối thiểu — không có nội dung bạn đã xem. Bạn tự gửi tệp cho nhóm nghiên cứu (ví dụ qua email/Drive lớp).',
  },

  notify: {
    reflectTitle: '🌙 Tỉnh — một phút đối chiếu?',
    reflectBody:
      'Phiên {platform} vừa rồi đã khép lại. Mở "Tỉnh" để xem bạn có làm đúng ý định không.',
  },

  options: {
    settingsSection: 'Cài đặt',
    whyPauseTitle: 'Vì sao có "Khoảng dừng phản tư"?',
    whyPauseBody:
      'Khi bạn cuộn liên tục một khoảng thời gian, "Tỉnh" hiện một câu hỏi ngắn để bạn tự nhận ra mình đang MUỐN xem điều gì cụ thể hay chỉ đang THÍCH cảm giác cuộn (phân biệt "muốn" và "thích" theo nghiên cứu về sense of agency — Lukoff 2021). Đây là một nudge MINH BẠCH: luôn giải thích lý do, luôn có nút "Tiếp tục", và bạn chỉnh được ngưỡng phút hoặc tắt hẳn. Về lý luận Mác: đây là nỗ lực nhỏ giúp bạn tái chiếm tính chủ thể trước cơ chế thiết kế để kéo dài sự chú ý.',
    whyMirrorTitle: 'Vì sao có "Gương bong bóng lọc"?',
    whyMirrorBody:
      '"Gương" chỉ đếm TÊN NGUỒN (kênh/trang/bạn bè) của những gì bạn xem trong 7 ngày, rồi tính độ đa dạng (Shannon entropy) để bạn thấy mình có đang bị dồn vào một "bong bóng lọc" hay không. Điều quan trọng: nó tách rõ phần "do bạn chủ động chọn" và phần "thuật toán đề xuất" — vì nghiên cứu (Bakshy 2015; Bruns 2019) cảnh báo không nên đổ hết cho thuật toán. Extension KHÔNG lưu nội dung bạn xem, chỉ tên nguồn, và mọi thứ ở lại máy bạn.',
    backToTop: '↑ Về đầu trang',
  },
} as const;

/** Thay {key} bằng giá trị. */
export function t(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
