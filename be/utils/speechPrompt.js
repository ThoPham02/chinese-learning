module.exports = function getPronunciationPrompt(expectedText, recognizedText) {
  return `
    Tôi đang luyện phát âm tiếng Trung. Dưới đây là kết quả phiên âm:
    * Từ gốc: "${expectedText}"
    * Từ tôi phát âm và hệ thống nhận dạng được: "${recognizedText}"

    Hãy trả lời chi tiết các mục sau, và xuất kết quả dưới dạng HTML rõ ràng:
    1. Tôi đọc đúng hay sai? Viết câu trả lời ngắn gọn.
    2. Nếu sai thì sai ở đâu? Liệt kê các lỗi với gạch đầu dòng.
    3. Hướng dẫn sửa. Chia thành các đoạn nhỏ, mỗi đoạn một lời khuyên cụ thể, có gạch đầu dòng.
    4. Chấm điểm phát âm từ 0 đến 100%.

    LƯU Ý:
    - Bỏ nhưng ký tự "\n" đi
    - Dùng các thẻ HTML chuẩn như <div>, <p>, <ul>, <li>, <strong>, <em> để chia đoạn và làm rõ nội dung.
    - Trả về kết quả đúng định dạng HTML, dễ đọc, không thêm thẻ <think> hay thẻ code.
    `;
  }
  // - Không cần giải thích
