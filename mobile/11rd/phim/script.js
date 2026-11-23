// Chọn phim mẫu đầu tiên làm nội dung banner và nội dung minh họa xuyên suốt ứng dụng.
const FEATURED_MOVIE_ID = "may-qua-doi-song";
// Dùng khóa riêng để dữ liệu demo không trùng với ứng dụng khác trong cùng trình duyệt.
const STORAGE_KEYS = {
  // Lưu các phim do người dùng demo thêm vào danh mục.
  addedMovies: "cinemay.addedMovies",
  // Lưu danh sách phim yêu thích trên thiết bị hiện tại.
  watchlist: "cinemay.watchlist",
  // Lưu tiến trình xem gần nhất trên thiết bị hiện tại.
  history: "cinemay.history",
  // Lưu bình luận demo do người dùng thêm.
  comments: "cinemay.comments",
  // Lưu phiên người dùng demo, không lưu mật khẩu.
  user: "cinemay.user"
};
// Mỗi đối tượng là dữ liệu hư cấu để minh họa giao diện mà không sử dụng tác phẩm có bản quyền.
const SAMPLE_MOVIES = [
  // Phim nổi bật có thể phát video mẫu và hiển thị ở banner.
  { id: FEATURED_MOVIE_ID, title: "Mây qua đồi sóng", year: 2025, genre: "Phiêu lưu", type: "movie", duration: "2 giờ 04 phút", rating: 8.7, quality: "4K", episodes: 0, director: "An Nhiên", cast: ["Minh Châu", "Bảo Nam"], description: "Một chuyến tàu muộn, hai người xa lạ và hành trình tìm lại điều tưởng như đã mất. Họ đi qua những thị trấn ven biển để khám phá câu chuyện gia đình bị bỏ quên.", poster: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=760&q=85", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", badge: "NỔI BẬT" },
  // Phim bộ hư cấu để minh họa danh sách tập và tiến trình xem.
  { id: "ben-kia-mua-ha", title: "Bên kia mùa hạ", year: 2025, genre: "Tình cảm", type: "series", duration: "8 tập", rating: 9.1, quality: "1080p", episodes: 8, director: "Hạ Lam", cast: ["Hạ Vy", "Trung Kiên"], description: "Bốn người bạn cũ gặp lại nhau trong một mùa hè ngắn ngủi và cùng học cách bắt đầu lại từ những điều bình dị.", poster: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=760&q=85", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", badge: "8 TẬP" },
  // Phim phiêu lưu hư cấu cho danh mục thịnh hành.
  { id: "duong-mon-xanh", title: "Đường mòn xanh", year: 2024, genre: "Phiêu lưu", type: "movie", duration: "1 giờ 52 phút", rating: 8.4, quality: "4K", episodes: 0, director: "Đức Thành", cast: ["Lan Phương", "Quốc Huy"], description: "Một nhiếp ảnh gia trẻ rời thành phố để lần theo dấu một khu rừng cổ và những câu chuyện của người dân nơi đây.", poster: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=760&q=85", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", badge: "4K" },
  // Phim chính kịch hư cấu về tình cảm gia đình.
  { id: "nha-co-nang", title: "Nhà có nắng", year: 2023, genre: "Gia đình", type: "movie", duration: "1 giờ 46 phút", rating: 8.8, quality: "1080p", episodes: 0, director: "Thảo Vy", cast: ["Thu Hà", "Đình Khang"], description: "Một căn bếp nhỏ trở thành nơi ba thế hệ trong gia đình tìm thấy tiếng nói chung sau nhiều năm xa cách.", poster: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=760&q=85&sat=-35", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", badge: "ĐỀ CỬ" },
  // Phim trinh thám hư cấu có chất lượng mẫu 1080p.
  { id: "dem-tren-ben-cang", title: "Đêm trên bến cảng", year: 2025, genre: "Trinh thám", type: "series", duration: "6 tập", rating: 8.2, quality: "1080p", episodes: 6, director: "Hoàng Lâm", cast: ["Tuấn Anh", "Mai Chi"], description: "Một hồ sơ thất lạc mở ra những manh mối bất ngờ về một vụ mất tích bên bến cảng nhiều năm trước.", poster: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=760&q=85", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", badge: "MỚI" },
  // Phim tình cảm hư cấu cho hàng danh mục lãng mạn.
  { id: "thu-gui-tu-ban-cong", title: "Thư gửi từ ban công", year: 2022, genre: "Tình cảm", type: "movie", duration: "1 giờ 38 phút", rating: 8.5, quality: "HD", episodes: 0, director: "Khánh An", cast: ["Ngọc Lan", "Gia Bảo"], description: "Những lá thư viết tay nối hai căn hộ đối diện và giúp hai người hàng xóm vượt qua khoảng lặng của riêng mình.", poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=760&q=85", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", badge: "CẢM XÚC" },
  // Phim gia đình hư cấu bổ sung cho bộ lọc.
  { id: "mua-tren-san-ga", title: "Mưa trên sân ga", year: 2024, genre: "Gia đình", type: "series", duration: "10 tập", rating: 8.1, quality: "1080p", episodes: 10, director: "Minh Tâm", cast: ["Yến Nhi", "Hoàng Sơn"], description: "Một tiệm sách cũ ở sân ga trở thành điểm hẹn của những con người đang tìm đường về nhà.", poster: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=760&q=85", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", badge: "10 TẬP" },
  // Phim phiêu lưu hư cấu khác để danh mục có nhiều lựa chọn.
  { id: "ban-do-mat-troi", title: "Bản đồ mặt trời", year: 2023, genre: "Phiêu lưu", type: "movie", duration: "1 giờ 57 phút", rating: 8.6, quality: "4K", episodes: 0, director: "Duy Khánh", cast: ["Uyên Linh", "Trọng Tấn"], description: "Hai nhà địa chất trẻ cùng tìm lời giải cho tấm bản đồ cổ được truyền lại qua nhiều thế hệ.", poster: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=760&q=85", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", badge: "4K" }
];
// Cung cấp vài nhận xét mẫu để người xem hiểu cách phần bình luận hoạt động.
const SAMPLE_COMMENTS = {
  // Các nhận xét mẫu được gắn với bộ phim nổi bật.
  [FEATURED_MOVIE_ID]: [
    // Nhận xét đầu tiên là nội dung minh họa, không phải đánh giá thật.
    { name: "Linh Đan", rating: 5, text: "Khung cảnh đẹp và câu chuyện rất nhẹ nhàng. Mình thích phần kết." },
    // Nhận xét thứ hai giúp thể hiện nhiều người dùng khác nhau.
    { name: "Hải Đăng", rating: 4, text: "Một bộ phim dễ xem cho buổi tối cuối tuần." }
  ]
};
// Đọc dữ liệu cục bộ và báo lỗi rõ ràng nếu trình duyệt không thể truy cập bộ nhớ.
function readStoredData(storageKey, fallbackValue) {
  // Bắt lỗi riêng lúc đọc hoặc phân tích JSON để tránh giao diện lỗi toàn bộ.
  try {
    // Lấy chuỗi dữ liệu đã lưu trong trình duyệt.
    const storedText = window.localStorage.getItem(storageKey);
    // Trả về bản dự phòng nếu đây là lần đầu mở trang.
    if (storedText === null) return fallbackValue;
    // Chuyển chuỗi JSON thành dữ liệu có cấu trúc.
    return JSON.parse(storedText);
  } catch (error) {
    // Ghi lỗi cho người phát triển khi dữ liệu lưu bị hỏng hoặc không truy cập được.
    console.error(`Không thể đọc dữ liệu demo "${storageKey}".`, error);
    // Hiển thị lỗi thay vì giả vờ rằng dữ liệu đã được tải thành công.
    showStatus("Không thể đọc dữ liệu đã lưu trên trình duyệt. Một số thay đổi có thể không được khôi phục.", true);
    // Dùng giá trị dự phòng để những phần còn lại của giao diện vẫn có thể mở.
    return fallbackValue;
  }
}
// Ghi dữ liệu cục bộ và thông báo lỗi nếu trình duyệt từ chối thao tác.
function writeStoredData(storageKey, value) {
  // Bắt lỗi bộ nhớ đầy, chế độ riêng tư hoặc quyền truy cập bị chặn.
  try {
    // Chuyển dữ liệu thành chuỗi JSON để lưu.
    window.localStorage.setItem(storageKey, JSON.stringify(value));
    // Báo cho mã gọi biết dữ liệu đã được lưu thành công.
    return true;
  } catch (error) {
    // Ghi lỗi lưu dữ liệu để tiện chẩn đoán.
    console.error(`Không thể lưu dữ liệu demo "${storageKey}".`, error);
    // Báo lỗi cho người dùng bằng khu vực thông báo chung.
    showStatus("Trình duyệt không lưu được thay đổi. Hãy kiểm tra dung lượng hoặc quyền lưu trữ.", true);
    // Báo cho mã gọi biết thao tác lưu thất bại.
    return false;
  }
}
// Khởi tạo danh sách phim bằng dữ liệu mẫu và phim được tạo trong phiên demo.
let movies = [...SAMPLE_MOVIES, ...readStoredData(STORAGE_KEYS.addedMovies, [])];
// Khởi tạo danh sách yêu thích từ bộ nhớ cục bộ.
let watchlistIds = readStoredData(STORAGE_KEYS.watchlist, []);
// Khởi tạo lịch sử xem từ bộ nhớ cục bộ.
let viewingHistory = readStoredData(STORAGE_KEYS.history, {});
// Khởi tạo nhận xét mẫu cùng những nhận xét được viết trong phiên demo.
let commentsByMovie = readStoredData(STORAGE_KEYS.comments, {});
// Khởi tạo phiên đăng nhập mô phỏng nếu người dùng đã mở website trước đó.
let currentUser = readStoredData(STORAGE_KEYS.user, null);
// Theo dõi số sao đang được chọn trong biểu mẫu đánh giá.
let selectedRating = 5;
// Ghi lại phim hiện tại để xử lý nhận xét và tiến trình xem.
let activeMovie = null;
// Ghi lại các URL phụ đề tạm để thu hồi chúng khi đóng trình phát.
let activeSubtitleUrls = [];
// Giữ mốc thời điểm lưu tiến trình gần nhất để chỉ lưu theo chu kỳ 15 giây.
let lastProgressSaveSecond = 0;
// Lấy phần tử hộp thoại dùng chung cho các màn hình phụ.
const appDialog = document.getElementById("app-dialog");
// Lấy vùng nội dung động của hộp thoại dùng chung.
const dialogContent = document.getElementById("dialog-content");
// Lấy vùng thông báo trạng thái hiển thị cho người dùng.
const statusMessage = document.getElementById("status-message");
// Chuẩn hóa chuỗi để tìm kiếm tiếng Việt có dấu hoặc không dấu.
function normalizeSearchText(value) {
  // Đưa chữ về dạng thống nhất, loại dấu thanh và chuyển thành chữ thường.
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("vi").trim();
}
// Chuyển dữ liệu tùy ý thành văn bản an toàn khi chèn vào mẫu HTML.
function escapeHtml(value) {
  // Thay ký tự đặc biệt để nội dung do người dùng nhập không trở thành mã HTML.
  return String(value).replace(/[&<>"']/g, (character) => ({
    // Mã hóa dấu và cho HTML.
    "&": "&amp;",
    // Mã hóa dấu nhỏ hơn.
    "<": "&lt;",
    // Mã hóa dấu lớn hơn.
    ">": "&gt;",
    // Mã hóa dấu ngoặc kép.
    '"': "&quot;",
    // Mã hóa dấu nháy đơn.
    "'": "&#39;"
  }[character]));
}
// Hiển thị thông báo thành công hoặc lỗi ở đầu nội dung trang.
function showStatus(message, isError = false) {
  // Đặt nội dung thông báo đã được xử lý dưới dạng văn bản thuần.
  statusMessage.textContent = message;
  // Đặt kiểu thông báo phù hợp với kết quả thao tác.
  statusMessage.classList.toggle("is-error", isError);
  // Bật vùng trạng thái để người dùng và trình đọc màn hình nhận biết.
  statusMessage.hidden = false;
  // Tự ẩn thông báo sau vài giây để không che nội dung.
  window.setTimeout(() => {
    // Chỉ ẩn nếu thông báo không bị thay thế bởi nội dung khác.
    if (statusMessage.textContent === message) statusMessage.hidden = true;
  }, 4200);
}
// Tìm một phim theo mã định danh duy nhất.
function findMovieById(movieId) {
  // Trả về phim hoặc giá trị rỗng nếu mã không còn tồn tại.
  return movies.find((movie) => movie.id === movieId) ?? null;
}
// Chuyển danh sách phim thành các thẻ poster có nút chi tiết và nút lưu.
function createMovieCard(movie, options = {}) {
  // Kiểm tra phim hiện tại đã được lưu trong danh sách yêu thích chưa.
  const isSaved = watchlistIds.includes(movie.id);
  // Lấy tiến trình đã xem của phim nếu người dùng đã bắt đầu xem.
  const progress = viewingHistory[movie.id]?.progress ?? 0;
  // Bật thanh tiến trình nếu phim có thời gian xem đã lưu.
  const progressBar = options.showProgress && progress > 0
    ? `<div class="progress-track" aria-label="Đã xem ${Math.round(progress)} phần trăm"><span style="width:${Math.min(100, Math.max(0, progress))}%"></span></div>`
    : "";
  // Tạo cấu trúc thẻ phim, mã hóa dữ liệu động trước khi chèn vào HTML.
  return `
    <article class="movie-card" aria-label="${escapeHtml(movie.title)}">
      <div class="movie-card__poster">
        <img src="${escapeHtml(movie.poster)}" alt="Poster minh họa phim ${escapeHtml(movie.title)}" loading="lazy">
        <span class="movie-card__badge">${escapeHtml(movie.badge || movie.quality)}</span>
        <button class="movie-card__save ${isSaved ? "is-saved" : ""}" type="button" data-action="toggle-watchlist" data-movie-id="${escapeHtml(movie.id)}" aria-label="${isSaved ? "Bỏ khỏi" : "Thêm vào"} danh sách yêu thích">${isSaved ? "♥" : "♡"}</button>
        <button class="movie-card__details" type="button" data-action="open-details" data-movie-id="${escapeHtml(movie.id)}" aria-label="Xem chi tiết phim ${escapeHtml(movie.title)}">${escapeHtml(movie.title)}</button>
        <span class="movie-card__poster-title" aria-hidden="true">${escapeHtml(movie.title)}</span>
      </div>
      <div class="movie-card__meta"><span>${escapeHtml(movie.year)}</span><span>·</span><span>${movie.type === "series" ? `${escapeHtml(movie.episodes)} tập` : "Phim lẻ"}</span><span class="movie-card__rating">★ ${escapeHtml(movie.rating)}</span></div>
      ${progressBar}
    </article>`;
}
// Điền các danh mục trên trang chủ bằng các phim đáp ứng điều kiện.
function renderHomeCatalog() {
  // Sắp xếp điểm cao trước để tạo danh sách phim thịnh hành dễ khám phá.
  const trendingMovies = [...movies].sort((firstMovie, secondMovie) => secondMovie.rating - firstMovie.rating);
  // Sắp xếp năm phát hành giảm dần để hiển thị phim mới trước.
  const newestMovies = [...movies].sort((firstMovie, secondMovie) => secondMovie.year - firstMovie.year);
  // Điền các phim thịnh hành vào hàng đầu tiên.
  document.getElementById("trending-row").innerHTML = trendingMovies.slice(0, 7).map((movie) => createMovieCard(movie)).join("");
  // Điền các phim mới nhất vào hàng thứ hai.
  document.getElementById("new-row").innerHTML = newestMovies.slice(0, 7).map((movie) => createMovieCard(movie)).join("");
  // Lọc các phim phiêu lưu cho hàng thể loại tương ứng.
  document.getElementById("adventure-row").innerHTML = movies.filter((movie) => movie.genre === "Phiêu lưu").map((movie) => createMovieCard(movie)).join("");
  // Lọc phim tình cảm và gia đình cho hàng nội dung nhẹ nhàng.
  document.getElementById("drama-row").innerHTML = movies.filter((movie) => ["Tình cảm", "Gia đình"].includes(movie.genre)).map((movie) => createMovieCard(movie)).join("");
  // Điền lại danh sách thể loại và năm sau khi dữ liệu phim thay đổi.
  renderFilterOptions();
}
// Điền các lựa chọn thể loại và năm dựa trên danh mục phim hiện có.
function renderFilterOptions() {
  // Lấy menu chọn thể loại.
  const genreFilter = document.getElementById("genre-filter");
  // Lấy menu chọn năm phát hành.
  const yearFilter = document.getElementById("year-filter");
  // Giữ lựa chọn hiện tại nếu vẫn còn trong dữ liệu phim.
  const selectedGenre = genreFilter.value;
  // Giữ năm hiện tại nếu vẫn còn trong dữ liệu phim.
  const selectedYear = yearFilter.value;
  // Tạo danh sách thể loại duy nhất và sắp xếp theo tên.
  const genres = [...new Set(movies.map((movie) => movie.genre))].sort((firstGenre, secondGenre) => firstGenre.localeCompare(secondGenre, "vi"));
  // Tạo danh sách năm duy nhất theo thứ tự mới nhất trước.
  const years = [...new Set(movies.map((movie) => movie.year))].sort((firstYear, secondYear) => secondYear - firstYear);
  // Tạo lại lựa chọn thể loại an toàn bằng cách mã hóa văn bản.
  genreFilter.innerHTML = `<option value="">Tất cả thể loại</option>${genres.map((genre) => `<option value="${escapeHtml(genre)}">${escapeHtml(genre)}</option>`).join("")}`;
  // Tạo lại lựa chọn năm an toàn.
  yearFilter.innerHTML = `<option value="">Mọi năm</option>${years.map((year) => `<option value="${escapeHtml(year)}">${escapeHtml(year)}</option>`).join("")}`;
  // Khôi phục thể loại đã chọn nếu còn khả dụng.
  genreFilter.value = genres.includes(selectedGenre) ? selectedGenre : "";
  // Khôi phục năm đã chọn nếu còn khả dụng.
  yearFilter.value = years.includes(Number(selectedYear)) ? selectedYear : "";
}
// Tìm và lọc phim theo từ khóa, thể loại, năm và định dạng.
function searchAndFilterMovies() {
  // Đọc từ khóa và loại bỏ khoảng trắng ở đầu cuối.
  const query = document.getElementById("filter-search-input").value.trim();
  // Đọc thể loại mà người dùng đang chọn.
  const selectedGenre = document.getElementById("genre-filter").value;
  // Đọc năm phát hành mà người dùng đang chọn.
  const selectedYear = document.getElementById("year-filter").value;
  // Đọc định dạng phim lẻ hoặc phim bộ.
  const selectedType = document.getElementById("type-filter").value;
  // Bỏ qua truy vấn chỉ chứa dấu câu hoặc khoảng trắng.
  if (query && !/[a-zA-Z0-9À-ỹ]/u.test(query)) {
    // Hiển thị hướng dẫn để người dùng nhập từ khóa có chữ hoặc số.
    showStatus("Hãy nhập ít nhất một chữ cái hoặc chữ số để tìm phim.", true);
    // Không gửi hoặc xử lý một truy vấn không hữu ích.
    return;
  }
  // Chuẩn hóa từ khóa một lần để hỗ trợ tìm kiếm tiếng Việt không dấu.
  const normalizedQuery = normalizeSearchText(query);
  // Lọc danh sách phim theo mọi điều kiện đã chọn.
  const matchedMovies = movies.filter((movie) => {
    // Gộp tiêu đề, đạo diễn, diễn viên và thể loại thành nội dung tìm kiếm.
    const searchableText = normalizeSearchText([movie.title, movie.director, ...movie.cast, movie.genre].join(" "));
    // Giữ phim nếu tất cả bộ lọc đều khớp.
    return (!normalizedQuery || searchableText.includes(normalizedQuery))
      && (!selectedGenre || movie.genre === selectedGenre)
      && (!selectedYear || movie.year === Number(selectedYear))
      && (!selectedType || movie.type === selectedType);
  });
  // Ẩn các danh mục trang chủ và hiện vùng kết quả lọc.
  showListView("results");
  // Đưa từ khóa và bộ lọc vào tiêu đề kết quả.
  document.getElementById("results-title").textContent = query ? `Kết quả cho “${query}”` : "Phim phù hợp với bộ lọc";
  // Hiển thị số lượng phim phù hợp.
  document.getElementById("result-count").textContent = `${matchedMovies.length} phim`;
  // Dựng các thẻ phim phù hợp.
  document.getElementById("results-grid").innerHTML = matchedMovies.map((movie) => createMovieCard(movie)).join("");
  // Hiện thông báo rỗng khi không có phim nào phù hợp.
  document.getElementById("no-results-message").hidden = matchedMovies.length > 0;
  // Cuộn nhẹ tới kết quả để người dùng nhìn thấy thay đổi.
  document.getElementById("results-section").scrollIntoView({ behavior: "smooth", block: "start" });
}
// Ẩn các danh sách không liên quan và chỉ hiện đúng trang người dùng chọn.
function showListView(viewName) {
  // Xác định xem người dùng có muốn trở lại trang chủ không.
  const isHome = viewName === "home";
  // Ẩn banner khi đang xem danh sách kết quả hoặc trang cá nhân.
  document.querySelector(".hero").hidden = !isHome;
  // Ẩn khu vực bộ lọc khi mở trang cá nhân.
  document.querySelector(".discovery-tools").hidden = !(isHome || viewName === "results");
  // Ẩn các danh mục trang chủ khi đang xem một danh sách riêng.
  document.getElementById("catalog-sections").hidden = !isHome;
  // Chỉ hiện kết quả tìm kiếm nếu đây là màn kết quả.
  document.getElementById("results-section").hidden = viewName !== "results";
  // Chỉ hiện danh sách yêu thích nếu đây là màn yêu thích.
  document.getElementById("watchlist-view").hidden = viewName !== "watchlist";
  // Chỉ hiện lịch sử xem nếu đây là màn xem tiếp.
  document.getElementById("history-view").hidden = viewName !== "history";
  // Chuyển trạng thái đang chọn ở thanh điều hướng.
  document.querySelectorAll(".nav-link").forEach((navigationButton) => {
    // Đánh dấu nút danh sách của tôi khi mở watchlist.
    navigationButton.classList.toggle("is-active", (viewName === "watchlist" && navigationButton.dataset.action === "show-watchlist")
      // Đánh dấu nút đang xem khi mở lịch sử.
      || (viewName === "history" && navigationButton.dataset.action === "show-history")
      // Đánh dấu nút khám phá ở trang chủ hoặc kết quả tìm kiếm.
      || ((isHome || viewName === "results") && navigationButton.dataset.action === "show-home"));
  });
}
// Hiển thị danh sách phim đã lưu trong bộ nhớ của trình duyệt.
function renderWatchlist() {
  // Tìm các phim yêu thích còn tồn tại trong danh mục.
  const savedMovies = watchlistIds.map(findMovieById).filter(Boolean);
  // Cập nhật số lượng phim trong danh sách.
  document.getElementById("watchlist-count").textContent = `${savedMovies.length} phim`;
  // Tạo các thẻ phim đã lưu.
  document.getElementById("watchlist-grid").innerHTML = savedMovies.map((movie) => createMovieCard(movie)).join("");
  // Hiện thông báo nếu danh sách chưa có phim.
  document.getElementById("watchlist-empty").hidden = savedMovies.length > 0;
}
// Hiển thị các phim có tiến trình xem được lưu trên trình duyệt.
function renderViewingHistory() {
  // Lấy các phim tồn tại và sắp xếp theo thời gian xem gần nhất.
  const historyMovies = Object.entries(viewingHistory)
    // Bỏ qua mục lịch sử không còn phim tương ứng.
    .map(([movieId, progressData]) => ({ movie: findMovieById(movieId), progressData }))
    // Chỉ giữ các phim hợp lệ.
    .filter((entry) => entry.movie && entry.progressData.progress > 0)
    // Xếp lịch sử mới nhất lên đầu.
    .sort((firstEntry, secondEntry) => secondEntry.progressData.updatedAt - firstEntry.progressData.updatedAt);
  // Cập nhật tổng số phim đang xem.
  document.getElementById("history-count").textContent = `${historyMovies.length} phim`;
  // Tạo thẻ phim kèm thanh tiến trình.
  document.getElementById("history-grid").innerHTML = historyMovies.map(({ movie }) => createMovieCard(movie, { showProgress: true })).join("");
  // Hiện lời nhắc nếu chưa bắt đầu xem phim nào.
  document.getElementById("history-empty").hidden = historyMovies.length > 0;
}
// Mở hộp thoại với nội dung đã được tạo sẵn.
function openDialog(contentMarkup) {
  // Dừng video cũ nếu nội dung hộp thoại được thay trong khi hộp thoại đang mở.
  document.querySelectorAll("#dialog-content video").forEach((videoElement) => videoElement.pause());
  // Thu hồi URL tạm của phụ đề trước khi tạo nội dung mới.
  revokeActiveSubtitleUrls();
  // Chèn nội dung đã mã hóa dữ liệu động vào hộp thoại.
  dialogContent.innerHTML = contentMarkup;
  // Mở hộp thoại theo cơ chế trợ năng gốc của trình duyệt.
  if (!appDialog.open) appDialog.showModal();
}
// Thu hồi các URL phụ đề tạm để tránh giữ tài nguyên sau nhiều lần mở trình phát.
function revokeActiveSubtitleUrls() {
  // Giải phóng từng URL Blob được tạo cho các track phụ đề.
  activeSubtitleUrls.forEach((subtitleUrl) => URL.revokeObjectURL(subtitleUrl));
  // Xóa danh sách URL đã được giải phóng.
  activeSubtitleUrls = [];
}
// Đóng hộp thoại đang mở và xóa trạng thái đang phát nếu cần.
function closeDialog() {
  // Dừng video đang chạy để không phát âm thanh phía sau hộp thoại.
  document.querySelectorAll("#dialog-content video").forEach((videoElement) => videoElement.pause());
  // Giải phóng URL Blob của phụ đề nếu có.
  revokeActiveSubtitleUrls();
  // Đóng hộp thoại nếu nó đang được mở.
  if (appDialog.open) appDialog.close();
}
// Hiển thị nhận xét mẫu và nhận xét người dùng đã gửi cho một phim.
function getCommentsForMovie(movieId) {
  // Ghép nhận xét mẫu với nhận xét đã lưu trên trình duyệt.
  return [...(SAMPLE_COMMENTS[movieId] || []), ...(commentsByMovie[movieId] || [])];
}
// Tạo phần bình luận an toàn cho trang chi tiết của phim.
function createCommentsMarkup(movie) {
  // Lấy tất cả nhận xét hiện có của phim.
  const comments = getCommentsForMovie(movie.id);
  // Tạo danh sách nhận xét và mã hóa nội dung người dùng nhập.
  const commentItems = comments.length
    ? comments.map((comment) => `<article class="comment-item"><div class="comment-item__header"><strong>${escapeHtml(comment.name)}</strong><span class="detail-rating">★ ${escapeHtml(comment.rating)}/5</span></div><p>${escapeHtml(comment.text)}</p></article>`).join("")
    : `<p class="prototype-note">Chưa có nhận xét. Hãy là người đầu tiên chia sẻ cảm nhận.</p>`;
  // Hiển thị biểu mẫu nếu người dùng đã đăng nhập demo, nếu không thì gợi ý đăng nhập.
  const commentAction = currentUser
    ? `<form class="comment-form" id="comment-form" data-movie-id="${escapeHtml(movie.id)}"><label class="form-label">Đánh giá của bạn <span class="rating-select" id="rating-select" aria-label="Chọn số sao">${[1, 2, 3, 4, 5].map((rating) => `<button type="button" data-action="choose-rating" data-rating="${rating}" class="${rating <= selectedRating ? "is-selected" : ""}" aria-label="${rating} sao">★</button>`).join("")}</span></label><label class="form-label">Bình luận<textarea class="form-control" name="comment" maxlength="400" placeholder="Chia sẻ cảm nhận của bạn..." required></textarea></label><button class="button button--primary" type="submit">Gửi nhận xét</button></form>`
    : `<div class="detail-actions"><button class="button button--secondary" type="button" data-action="open-account">Đăng nhập để bình luận</button></div>`;
  // Trả về toàn bộ khu vực nhận xét.
  return `<section class="comments-section"><h3 class="dialog-section-title">Cộng đồng đang nói gì? <span class="result-count">(${comments.length})</span></h3>${commentItems}${commentAction}</section>`;
}
// Mở trang chi tiết của một phim với thông tin và nút thao tác.
function openMovieDetails(movieId) {
  // Lấy dữ liệu phim được chọn.
  const movie = findMovieById(movieId);
  // Báo lỗi rõ ràng nếu liên kết trỏ tới phim không tồn tại.
  if (!movie) {
    // Thông báo người dùng về nội dung không còn khả dụng.
    showStatus("Không tìm thấy thông tin phim này. Danh mục có thể đã thay đổi.", true);
    // Dừng mở hộp thoại nếu không có dữ liệu hợp lệ.
    return;
  }
  // Ghi lại phim hiện tại để bình luận có thể dùng đúng mã phim.
  activeMovie = movie;
  // Tạo danh sách tập phim nếu đây là một bộ phim nhiều tập.
  const episodesMarkup = movie.type === "series"
    ? `<section class="episode-list"><h3 class="dialog-section-title">Chọn tập · ${escapeHtml(movie.episodes)} tập</h3><div class="episode-grid">${Array.from({ length: movie.episodes }, (_, index) => `<button class="episode-button is-available" type="button" data-action="play-episode" data-movie-id="${escapeHtml(movie.id)}" data-episode="${index + 1}">Tập ${index + 1}</button>`).join("")}</div></section>`
    : "";
  // Mở hộp thoại chi tiết phim và phần nhận xét cộng đồng.
  openDialog(`
    <div class="detail-layout">
      <img class="detail-poster" src="${escapeHtml(movie.poster)}" alt="Poster minh họa ${escapeHtml(movie.title)}">
      <div class="detail-copy">
        <p class="eyebrow">${escapeHtml(movie.genre)} · ${movie.type === "series" ? "PHIM BỘ" : "PHIM LẺ"}</p>
        <h2 class="detail-title" id="dialog-title">${escapeHtml(movie.title)}</h2>
        <div class="detail-meta"><span>${escapeHtml(movie.year)}</span><span>${escapeHtml(movie.duration)}</span><span>${escapeHtml(movie.quality)}</span><span class="detail-rating">★ ${escapeHtml(movie.rating)}/10</span></div>
        <p class="detail-description">${escapeHtml(movie.description)}</p>
        <p class="muted-copy"><strong>Đạo diễn:</strong> ${escapeHtml(movie.director)}<br><strong>Diễn viên:</strong> ${movie.cast.map(escapeHtml).join(", ")}</p>
        <div class="detail-actions"><button class="button button--primary" type="button" data-action="play-movie" data-movie-id="${escapeHtml(movie.id)}"><span aria-hidden="true">▶</span> Xem ngay</button><button class="button button--secondary" type="button" data-action="toggle-watchlist" data-movie-id="${escapeHtml(movie.id)}">${watchlistIds.includes(movie.id) ? "♥ Đã lưu" : "♡ Thêm vào danh sách"}</button></div>
        ${episodesMarkup}
      </div>
    </div>
    ${createCommentsMarkup(movie)}`);
}
// Mở trình phát video mẫu cho phim và tập đã chọn.
function openMoviePlayer(movieId, episodeNumber = 1) {
  // Tìm dữ liệu phim mà người dùng muốn xem.
  const movie = findMovieById(movieId);
  // Hiển thị lỗi nếu phim hoặc đường dẫn mẫu không tồn tại.
  if (!movie || !movie.videoUrl) {
    // Báo lỗi tải nội dung thay vì hiển thị trình phát trống.
    showStatus("Chưa có nguồn video mẫu cho phim này.", true);
    // Dừng mở trình phát khi thiếu nguồn.
    return;
  }
  // Giữ thông tin phim đang phát cho sự kiện tiến trình và lỗi.
  activeMovie = movie;
  // Đặt lại mốc lưu tiến trình khi bắt đầu nội dung khác.
  lastProgressSaveSecond = 0;
  // Lấy tiến trình cũ để khôi phục thời gian xem trong cùng trình duyệt.
  const previousProgress = viewingHistory[movie.id]?.seconds ?? 0;
  // Tạo nội dung hộp thoại trình phát với video mẫu công khai.
  openDialog(`
    <p class="eyebrow">ĐANG PHÁT · ${movie.type === "series" ? `TẬP ${episodeNumber}` : "PHIM LẺ"}</p>
    <h2 class="dialog-heading" id="dialog-title">${escapeHtml(movie.title)}</h2>
    <div class="player-frame"><video id="movie-video" controls playsinline preload="metadata" src="${escapeHtml(movie.videoUrl)}" aria-label="Trình phát video mẫu cho ${escapeHtml(movie.title)}"><track id="subtitle-vi-track" kind="subtitles" srclang="vi" label="Tiếng Việt"><track id="subtitle-en-track" kind="subtitles" srclang="en" label="English"></video></div>
    <div class="player-options"><label>Chất lượng <select id="quality-select" aria-label="Chọn chất lượng video"><option value="720p">720p · Mẫu</option><option value="1080p">1080p · Mẫu</option></select></label><label>Tốc độ <select id="speed-select" aria-label="Chọn tốc độ phát"><option value="0.5">0.5×</option><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label><label>Phụ đề <select id="subtitle-select" aria-label="Bật hoặc tắt phụ đề"><option value="off">Tắt</option><option value="vi">Tiếng Việt · mẫu</option><option value="en">English · sample</option></select></label></div>
    <p class="prototype-note" id="player-message">Video hoa mẫu từ MDN dùng để thử điều khiển. Nguồn video và chất lượng thật cần được cung cấp từ backend hợp pháp.</p>
    ${previousProgress > 5 ? `<button class="button button--secondary" id="resume-button" type="button" data-action="resume-video" data-seconds="${Math.floor(previousProgress)}">Tiếp tục từ ${formatVideoTime(previousProgress)}</button>` : ""}
    <button class="button button--secondary" type="button" data-action="retry-video">Tải lại video mẫu</button>`);
  // Lấy phần tử video mới tạo trong hộp thoại.
  const videoElement = document.getElementById("movie-video");
  // Khôi phục tiến trình nếu video có thời lượng và đã từng được xem.
  videoElement.addEventListener("loadedmetadata", () => {
    // Chỉ đặt thời gian khi điểm dừng hợp lệ và còn trong thời lượng video.
    if (previousProgress > 0 && previousProgress < videoElement.duration - 1) videoElement.currentTime = previousProgress;
  }, { once: true });
  // Tạo phụ đề demo bằng Blob để không cần thêm tệp thứ tư vào thư mục.
  attachSampleSubtitles();
  // Hiển thị lỗi tải video nếu tệp mẫu không sẵn sàng.
  videoElement.addEventListener("error", showPlayerError);
  // Tự lưu tiến trình định kỳ 15 giây theo đặc tả bản mẫu.
  videoElement.addEventListener("timeupdate", saveVideoProgressIfNeeded);
  // Lưu tiến trình gần nhất ngay khi người dùng tạm dừng.
  videoElement.addEventListener("pause", saveVideoProgress);
  // Cập nhật tốc độ phát khi người dùng đổi menu tốc độ.
  document.getElementById("speed-select").addEventListener("change", (event) => {
    // Áp dụng tốc độ được chọn cho video.
    videoElement.playbackRate = Number(event.target.value);
  });
  // Thông báo rõ ràng việc đổi chất lượng chỉ là minh họa giao diện.
  document.getElementById("quality-select").addEventListener("change", () => {
    // Không giả vờ đổi luồng video khi prototype chỉ có một nguồn.
    document.getElementById("player-message").textContent = "Lựa chọn chất lượng chỉ minh họa giao diện; cần các luồng 720p/1080p thật từ backend để đổi độ phân giải.";
  });
  // Đổi chế độ phụ đề của các track mẫu trong trình phát.
  document.getElementById("subtitle-select").addEventListener("change", (event) => {
    // Bật track ngôn ngữ được chọn và tắt các track khác.
    [...videoElement.textTracks].forEach((track) => { track.mode = track.language === event.target.value ? "showing" : "disabled"; });
  });
}
// Định dạng số giây thành thời gian phút:giây để hiển thị tiến trình.
function formatVideoTime(totalSeconds) {
  // Tính tổng phút đã xem.
  const minutes = Math.floor(totalSeconds / 60);
  // Tính số giây còn lại sau khi trừ phút.
  const seconds = Math.floor(totalSeconds % 60);
  // Trả về định dạng dễ đọc như 02:15.
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
// Ghi tiến trình xem nếu đã qua ít nhất 15 giây kể từ lần lưu gần nhất.
function saveVideoProgressIfNeeded(event) {
  // Lấy đối tượng video phát sinh sự kiện.
  const videoElement = event.currentTarget;
  // Bỏ qua lần cập nhật nếu chưa đủ 15 giây.
  if (videoElement.currentTime - lastProgressSaveSecond < 15) return;
  // Cập nhật mốc lưu mới trước khi ghi dữ liệu.
  lastProgressSaveSecond = videoElement.currentTime;
  // Ghi tiến trình hiện tại vào bộ nhớ trình duyệt.
  saveVideoProgress();
}
// Lưu thời gian xem hiện tại và phần trăm hoàn thành của phim.
function saveVideoProgress() {
  // Dừng nếu hộp thoại không còn video hoặc phim hiện tại không hợp lệ.
  const videoElement = document.getElementById("movie-video");
  if (!videoElement || !activeMovie || !Number.isFinite(videoElement.currentTime)) return;
  // Chỉ lưu khi video đã có thời lượng hợp lệ.
  if (!Number.isFinite(videoElement.duration) || videoElement.duration <= 0) return;
  // Tính phần trăm video đã xem.
  const progressPercent = Math.min(100, (videoElement.currentTime / videoElement.duration) * 100);
  // Nếu đã xem gần hết nội dung thì bắt đầu lại từ đầu trong lần sau.
  const reachedEnd = progressPercent >= 95;
  // Cập nhật dữ liệu tiến trình của phim hiện tại.
  viewingHistory[activeMovie.id] = {
    // Lưu thời gian dừng hoặc đưa về đầu nếu phim đã xem gần xong.
    seconds: reachedEnd ? 0 : videoElement.currentTime,
    // Lưu phần trăm đã xem.
    progress: reachedEnd ? 0 : progressPercent,
    // Lưu thời điểm cập nhật để xếp lịch sử gần đây.
    updatedAt: Date.now()
  };
  // Ghi toàn bộ lịch sử xem vào localStorage.
  writeStoredData(STORAGE_KEYS.history, viewingHistory);
}
// Tạo hai bản phụ đề mẫu cho video minh họa hiện tại.
function attachSampleSubtitles() {
  // Tạo nội dung phụ đề tiếng Việt ở định dạng WebVTT.
  const vietnameseCaptions = "WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nVideo minh họa — phụ đề mẫu tiếng Việt.\n\n00:00:05.000 --> 00:00:10.000\nNguồn phim thật cần được cấp phép và cấu hình riêng.\n";
  // Tạo nội dung phụ đề tiếng Anh ở định dạng WebVTT.
  const englishCaptions = "WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nSample video — English sample captions.\n\n00:00:05.000 --> 00:00:10.000\nA licensed video source must be configured separately.\n";
  // Tạo URL tạm cho phụ đề tiếng Việt.
  const vietnameseTrackUrl = URL.createObjectURL(new Blob([vietnameseCaptions], { type: "text/vtt" }));
  // Tạo URL tạm cho phụ đề tiếng Anh.
  const englishTrackUrl = URL.createObjectURL(new Blob([englishCaptions], { type: "text/vtt" }));
  // Theo dõi các URL tạm để giải phóng khi hộp thoại đóng.
  activeSubtitleUrls = [vietnameseTrackUrl, englishTrackUrl];
  // Gắn URL vừa tạo vào track tiếng Việt.
  document.getElementById("subtitle-vi-track").src = vietnameseTrackUrl;
  // Gắn URL vừa tạo vào track tiếng Anh.
  document.getElementById("subtitle-en-track").src = englishTrackUrl;
}
// Hiện thông báo lỗi và gợi ý tải lại khi video mẫu không thể phát.
function showPlayerError() {
  // Lấy vùng thông báo trình phát nếu hộp thoại còn mở.
  const playerMessage = document.getElementById("player-message");
  // Bỏ qua sự kiện nếu người dùng đã đóng trình phát.
  if (!playerMessage) return;
  // Giải thích lỗi và cung cấp cách thử lại.
  playerMessage.textContent = "Không tải được video mẫu. Hãy kiểm tra kết nối hoặc dùng nút “Tải lại video mẫu”.";
  // Đánh dấu thông báo lỗi bằng màu đỏ dễ nhận biết.
  playerMessage.classList.add("is-error");
}
// Hiển thị hộp thoại đăng nhập hoặc trạng thái tài khoản demo.
function openAccountDialog() {
  // Nếu đã có phiên demo thì hiển thị thông tin và nút đăng xuất.
  if (currentUser) {
    // Tạo hộp thoại tài khoản với vai trò minh họa hiện tại.
    openDialog(`<p class="eyebrow">TÀI KHOẢN TRÊN THIẾT BỊ NÀY</p><h2 class="dialog-heading" id="dialog-title">Chào ${escapeHtml(currentUser.displayName)}</h2><p class="dialog-intro">${escapeHtml(currentUser.email)} · ${currentUser.isAdmin ? "Admin demo" : "Thành viên demo"}</p><div class="demo-callout">Đây chỉ là phiên mô phỏng trong localStorage. Không có mật khẩu, JWT, xác thực máy chủ hoặc bảo vệ quyền truy cập thật.</div><div class="detail-actions"><button class="button button--secondary" type="button" data-action="logout">Đăng xuất khỏi demo</button></div>`);
    // Dừng ở đây vì người dùng không cần xem biểu mẫu đăng nhập nữa.
    return;
  }
  // Hiện biểu mẫu tạo phiên demo và giải thích rõ không có xác thực thật.
  openDialog(`<p class="eyebrow">CÁ NHÂN HÓA TRẢI NGHIỆM</p><h2 class="dialog-heading" id="dialog-title">Đăng nhập demo</h2><p class="dialog-intro">Tạo phiên mô phỏng trên trình duyệt này để thử danh sách yêu thích và bình luận.</p><div class="demo-callout">Không nhập mật khẩu thật. Mật khẩu demo không được gửi hoặc lưu; đây không phải hệ thống đăng nhập bảo mật.</div><form class="account-form" id="account-form"><label class="form-label">Tên hiển thị<input class="form-control" name="displayName" maxlength="40" autocomplete="nickname" required></label><label class="form-label">Email minh họa<input class="form-control" name="email" type="email" autocomplete="email" required></label><label class="form-label">Mật khẩu demo (không lưu)<input class="form-control" name="password" type="password" minlength="4" autocomplete="off" required></label><label class="form-label"><span><input name="adminDemo" type="checkbox"> Bật giao diện Admin demo</span></label><button class="button button--primary" type="submit">Bắt đầu phiên demo</button></form>`);
}
// Cập nhật nhãn nút tài khoản và quyền truy cập menu demo.
function renderAccountState() {
  // Đặt tên hiển thị trên nút tài khoản hoặc dùng nhãn mặc định.
  document.getElementById("account-button-label").textContent = currentUser ? currentUser.displayName : "Đăng nhập";
  // Chỉ hiển thị mục quản trị minh họa khi phiên demo có quyền Admin.
  document.getElementById("admin-menu-button").hidden = !currentUser?.isAdmin;
  // Hiện nút quản trị trực tiếp trên màn hình lớn khi tài khoản là Admin demo.
  document.getElementById("admin-header-button").hidden = !currentUser?.isAdmin;
}
// Chuyển sang danh sách phim đã lưu và cập nhật trạng thái hiển thị.
function showWatchlist() {
  // Tạo lại dữ liệu danh sách yêu thích trước khi hiển thị.
  renderWatchlist();
  // Chuyển sang màn hình danh sách cá nhân.
  showListView("watchlist");
  // Đóng menu di động nếu menu đang mở.
  document.getElementById("mobile-menu").hidden = true;
}
// Chuyển sang lịch sử xem tiếp tục.
function showViewingHistory() {
  // Tạo lại danh sách lịch sử mới nhất.
  renderViewingHistory();
  // Chuyển sang màn hình lịch sử xem.
  showListView("history");
  // Đóng menu di động sau khi đã chọn mục.
  document.getElementById("mobile-menu").hidden = true;
}
// Thêm hoặc bỏ một phim khỏi danh sách yêu thích cục bộ.
function toggleMovieInWatchlist(movieId) {
  // Tìm hiểu phim có đang được lưu hay chưa.
  const isAlreadySaved = watchlistIds.includes(movieId);
  // Bỏ phim khỏi danh sách nếu đã lưu trước đó.
  watchlistIds = isAlreadySaved ? watchlistIds.filter((savedId) => savedId !== movieId) : [...watchlistIds, movieId];
  // Lưu thay đổi vào bộ nhớ trình duyệt.
  writeStoredData(STORAGE_KEYS.watchlist, watchlistIds);
  // Làm mới toàn bộ các thẻ để biểu tượng trái tim đồng nhất.
  renderHomeCatalog();
  // Làm mới nội dung danh sách cá nhân nếu đang mở.
  renderWatchlist();
  // Làm mới thẻ kết quả nếu thao tác lưu được thực hiện trong trang tìm kiếm.
  if (!document.getElementById("results-section").hidden) searchAndFilterMovies();
  // Thông báo kết quả thao tác.
  showStatus(isAlreadySaved ? "Đã xóa phim khỏi danh sách của bạn." : "Đã thêm phim vào danh sách của bạn.");
  // Cập nhật trang chi tiết nếu người dùng vừa thao tác ở trong hộp thoại.
  if (activeMovie && appDialog.open) openMovieDetails(activeMovie.id);
}
// Mở giao diện quản trị nội dung mô phỏng.
function openAdminDashboard() {
  // Chặn người dùng chưa bật vai trò Admin demo.
  if (!currentUser?.isAdmin) {
    // Hiển thị lời giải thích về quyền quản trị mô phỏng.
    showStatus("Mục này chỉ khả dụng khi bật Admin demo trong biểu mẫu tài khoản.", true);
    // Không mở bảng quản trị khi chưa chọn chế độ demo.
    return;
  }
  // Lấy các phim do người dùng thêm để hiện trong bảng quản trị.
  const addedMovies = movies.filter((movie) => movie.isUserAdded);
  // Tạo danh sách phim có thể xóa trong bảng demo.
  const movieRows = addedMovies.length
    ? addedMovies.map((movie) => `<div class="admin-movie-item"><span>${escapeHtml(movie.title)} · ${escapeHtml(movie.year)}</span><button class="danger-button" type="button" data-action="delete-demo-movie" data-movie-id="${escapeHtml(movie.id)}">Xóa</button></div>`).join("")
    : `<p class="muted-copy">Chưa có phim do bạn thêm.</p>`;
  // Hiển thị biểu mẫu thêm phim cùng danh sách nội dung cục bộ.
  openDialog(`<p class="eyebrow">QUẢN TRỊ NỘI DUNG · DEMO</p><h2 class="dialog-heading" id="dialog-title">Thư viện phim</h2><div class="demo-callout">Không có API hoặc quyền Admin thật. Mọi thay đổi chỉ nằm trong trình duyệt này và có thể bị xóa bởi người dùng.</div><form class="admin-form" id="admin-form"><label class="form-label">Tên phim<input class="form-control" name="title" maxlength="80" required></label><label class="form-label">Năm phát hành<input class="form-control" name="year" type="number" min="1900" max="2100" value="2026" required></label><label class="form-label">Thể loại<input class="form-control" name="genre" maxlength="30" placeholder="Ví dụ: Phiêu lưu" required></label><label class="form-label">URL ảnh poster<input class="form-control" name="poster" type="url" placeholder="https://..." required></label><label class="form-label">Đạo diễn<input class="form-control" name="director" maxlength="50" required></label><label class="form-label">Diễn viên<input class="form-control" name="cast" maxlength="100" placeholder="Tên diễn viên, ngăn cách bằng dấu phẩy"></label><label class="form-label">Mô tả<textarea class="form-control" name="description" maxlength="400" required></textarea></label><button class="button button--primary" type="submit">Thêm phim vào demo</button></form><h3 class="dialog-section-title">Phim được thêm trong demo</h3><div class="admin-movie-list">${movieRows}</div>`);
}
// Gửi biểu mẫu tạo nhận xét mới cho phim đang mở.
function handleCommentSubmission(event) {
  // Ngăn trình duyệt tải lại trang khi biểu mẫu được gửi.
  event.preventDefault();
  // Lấy mã phim từ biểu mẫu vừa gửi.
  const movieId = event.currentTarget.dataset.movieId;
  // Đọc và loại khoảng trắng khỏi nhận xét.
  const commentText = new FormData(event.currentTarget).get("comment").toString().trim();
  // Bỏ nhận xét trống để tránh tạo dữ liệu vô nghĩa.
  if (!commentText) {
    // Nhắc người dùng nhập nội dung trước khi gửi.
    showStatus("Hãy viết vài dòng trước khi gửi nhận xét.", true);
    // Không tiếp tục khi nội dung trống.
    return;
  }
  // Thêm nhận xét mới vào danh sách của phim hiện tại.
  commentsByMovie[movieId] = [...(commentsByMovie[movieId] || []), { name: currentUser.displayName, rating: selectedRating, text: commentText }];
  // Chỉ lưu phần nhận xét người dùng thêm, không ghi đè nhận xét mẫu.
  writeStoredData(STORAGE_KEYS.comments, commentsByMovie);
  // Đặt số sao về mặc định cho lần nhận xét kế tiếp.
  selectedRating = 5;
  // Báo nhận xét đã được lưu cục bộ.
  showStatus("Nhận xét đã được lưu trong trình duyệt này.");
  // Tải lại chi tiết để hiển thị nhận xét mới.
  openMovieDetails(movieId);
}
// Thêm phim mới vào thư viện cục bộ trong chế độ Admin demo.
function handleAdminMovieSubmission(event) {
  // Ngăn trình duyệt tải lại trang khi gửi biểu mẫu.
  event.preventDefault();
  // Đọc tất cả trường biểu mẫu dưới dạng cặp tên và giá trị.
  const formValues = new FormData(event.currentTarget);
  // Lấy URL poster đã nhập.
  const posterUrl = formValues.get("poster").toString().trim();
  // Chỉ chấp nhận URL HTTP hoặc HTTPS.
  if (!/^https?:\/\//i.test(posterUrl)) {
    // Báo lỗi cụ thể khi URL ảnh không hợp lệ.
    showStatus("URL poster cần bắt đầu bằng http:// hoặc https://.", true);
    // Không lưu phim nếu ảnh không phải đường dẫn web hợp lệ.
    return;
  }
  // Tạo phim mới với mã định danh duy nhất cho bản demo.
  const newMovie = {
    // Tạo mã duy nhất từ thời gian hiện tại.
    id: `demo-${Date.now()}`,
    // Lưu tên phim đã nhập.
    title: formValues.get("title").toString().trim(),
    // Chuyển năm thành số nguyên.
    year: Number(formValues.get("year")),
    // Lưu thể loại đã nhập.
    genre: formValues.get("genre").toString().trim(),
    // Chỉ tạo phim lẻ trong biểu mẫu demo gọn.
    type: "movie",
    // Đặt thời lượng mẫu cho nội dung mới.
    duration: "Chưa cập nhật",
    // Đặt điểm ban đầu trung tính cho phim mới.
    rating: 0,
    // Dùng nhãn chất lượng mẫu, không phải stream thật.
    quality: "MẪU",
    // Đặt số tập bằng không vì đây là phim lẻ.
    episodes: 0,
    // Lưu đạo diễn.
    director: formValues.get("director").toString().trim(),
    // Chuyển chuỗi diễn viên thành danh sách đã bỏ khoảng trắng.
    cast: formValues.get("cast").toString().split(",").map((actorName) => actorName.trim()).filter(Boolean),
    // Lưu mô tả phim.
    description: formValues.get("description").toString().trim(),
    // Lưu poster do Admin demo cung cấp.
    poster: posterUrl,
    // Dùng video mẫu công khai thay cho đường dẫn phim thật.
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    // Đánh dấu để phân biệt với danh mục phim dựng sẵn.
    isUserAdded: true
  };
  // Thêm phim mới vào danh sách phim đang dùng.
  movies = [...movies, newMovie];
  // Lấy lại các phim do người dùng thêm.
  const userAddedMovies = movies.filter((movie) => movie.isUserAdded);
  // Lưu danh sách phim mới vào bộ nhớ trình duyệt.
  writeStoredData(STORAGE_KEYS.addedMovies, userAddedMovies);
  // Cập nhật các danh mục để phim mới xuất hiện ngay.
  renderHomeCatalog();
  // Báo kết quả thêm phim.
  showStatus("Đã thêm phim vào thư viện demo trên trình duyệt này.");
  // Làm mới trang quản trị để hiển thị phim mới.
  openAdminDashboard();
}
// Xử lý thao tác xóa phim do Admin demo thêm.
function deleteDemoMovie(movieId) {
  // Chỉ cho phép xóa phim được thêm trong bản demo.
  const movie = findMovieById(movieId);
  // Bỏ qua thao tác nếu mã không hợp lệ hoặc trỏ tới phim mẫu.
  if (!movie?.isUserAdded) {
    // Báo lỗi để người dùng biết phim này không thể bị xóa từ demo.
    showStatus("Chỉ có thể xóa phim do bạn thêm trong bảng demo.", true);
    // Không thay đổi danh mục.
    return;
  }
  // Xóa phim khỏi danh mục đang hiển thị.
  movies = movies.filter((existingMovie) => existingMovie.id !== movieId);
  // Xóa phim khỏi yêu thích nếu đã lưu.
  watchlistIds = watchlistIds.filter((savedId) => savedId !== movieId);
  // Xóa phim khỏi lịch sử xem.
  delete viewingHistory[movieId];
  // Lấy danh sách phim demo còn lại.
  const userAddedMovies = movies.filter((existingMovie) => existingMovie.isUserAdded);
  // Lưu danh mục phim cập nhật.
  writeStoredData(STORAGE_KEYS.addedMovies, userAddedMovies);
  // Lưu danh sách yêu thích cập nhật.
  writeStoredData(STORAGE_KEYS.watchlist, watchlistIds);
  // Lưu lịch sử xem cập nhật.
  writeStoredData(STORAGE_KEYS.history, viewingHistory);
  // Cập nhật nội dung danh mục trên trang.
  renderHomeCatalog();
  // Thông báo phim đã được xóa.
  showStatus(`Đã xóa “${movie.title}” khỏi thư viện demo.`);
  // Làm mới bảng quản trị.
  openAdminDashboard();
}
// Xử lý toàn bộ thao tác gửi biểu mẫu trong trang.
function handleFormSubmission(event) {
  // Tìm biểu mẫu chứa sự kiện gửi.
  const submittedForm = event.target;
  // Chuyển bộ lọc thành danh sách kết quả.
  if (submittedForm.id === "filter-form") {
    // Chạy tìm kiếm với các giá trị đã chọn.
    searchAndFilterMovies();
    // Dừng sau khi xử lý biểu mẫu bộ lọc.
    return;
  }
  // Xử lý tìm kiếm nhanh ở thanh đầu trang.
  if (submittedForm.id === "header-search-form") {
    // Đồng bộ từ khóa nhanh vào bộ lọc chính.
    document.getElementById("filter-search-input").value = document.getElementById("header-search-input").value;
    // Chạy tìm kiếm với từ khóa được nhập.
    searchAndFilterMovies();
    // Dừng sau khi chuyển từ khóa.
    return;
  }
  // Xử lý tạo phiên đăng nhập mô phỏng.
  if (submittedForm.id === "account-form") {
    // Ngăn trình duyệt tải lại trang.
    event.preventDefault();
    // Đọc giá trị người dùng vừa nhập.
    const formValues = new FormData(submittedForm);
    // Kiểm tra mật khẩu demo chỉ trong thời gian biểu mẫu mở.
    const demoPassword = formValues.get("password").toString();
    // Yêu cầu mật khẩu có tối thiểu bốn ký tự nhưng tuyệt đối không lưu lại.
    if (demoPassword.length < 4) {
      // Báo lỗi độ dài trực tiếp cho người dùng.
      showStatus("Mật khẩu demo cần có ít nhất 4 ký tự.", true);
      // Không tạo phiên nếu giá trị chưa đạt yêu cầu giao diện.
      return;
    }
    // Tạo người dùng demo mà không giữ mật khẩu hoặc tạo JWT.
    currentUser = { displayName: formValues.get("displayName").toString().trim(), email: formValues.get("email").toString().trim(), isAdmin: formValues.get("adminDemo") === "on" };
    // Lưu thông tin phiên không chứa mật khẩu.
    writeStoredData(STORAGE_KEYS.user, currentUser);
    // Làm mới nút tài khoản và menu quản trị.
    renderAccountState();
    // Báo rằng người dùng đang ở chế độ mô phỏng.
    showStatus("Đã bắt đầu phiên demo trên thiết bị này; đây không phải đăng nhập thật.");
    // Đóng hộp thoại sau khi tạo phiên thành công.
    closeDialog();
    // Dừng xử lý biểu mẫu hiện tại.
    return;
  }
  // Xử lý gửi bình luận và đánh giá.
  if (submittedForm.id === "comment-form") {
    // Gọi trình xử lý nhận xét chuyên biệt.
    handleCommentSubmission(event);
    // Dừng sau khi lưu bình luận.
    return;
  }
  // Xử lý thêm nội dung từ giao diện Admin demo.
  if (submittedForm.id === "admin-form") {
    // Gọi trình xử lý thêm phim.
    handleAdminMovieSubmission(event);
  }
}
// Xử lý thao tác bấm nút bằng một bộ lắng nghe sự kiện chung.
function handleActionClick(event) {
  // Tìm nút có hành động tương ứng với phần tử được bấm.
  const actionButton = event.target.closest("[data-action]");
  // Bỏ qua thao tác nếu người dùng bấm vào phần tử không có hành động.
  if (!actionButton) return;
  // Đọc tên hành động từ thuộc tính dữ liệu.
  const actionName = actionButton.dataset.action;
  // Đọc mã phim nếu nút có gắn một phim cụ thể.
  const movieId = actionButton.dataset.movieId;
  // Thực hiện hành động đã chọn.
  switch (actionName) {
    // Trở về màn hình khám phá phim.
    case "show-home":
      // Hiện lại trang chủ và đóng menu di động.
      showListView("home");
      document.getElementById("mobile-menu").hidden = true;
      break;
    // Mở trang danh sách yêu thích.
    case "show-watchlist":
      // Cập nhật và hiện watchlist.
      showWatchlist();
      break;
    // Mở lịch sử xem tiếp tục.
    case "show-history":
      // Cập nhật và hiện lịch sử.
      showViewingHistory();
      break;
    // Bắt đầu tìm kiếm không kèm điều kiện lọc.
    case "show-all":
      // Xóa các bộ lọc để hiển thị toàn bộ phim.
      resetSearchFilters(false);
      searchAndFilterMovies();
      break;
    // Điền sẵn thể loại được chọn và chạy bộ lọc.
    case "filter-genre":
      // Chuyển trang chủ về trạng thái tìm kiếm.
      showListView("home");
      document.getElementById("genre-filter").value = actionButton.dataset.genre;
      searchAndFilterMovies();
      break;
    // Mở chi tiết phim được chọn.
    case "open-details":
      // Hiển thị thông tin phim trong hộp thoại.
      openMovieDetails(movieId);
      break;
    // Mở chi tiết phim nổi bật từ banner.
    case "details-featured":
      // Chuyển từ banner đến trang chi tiết nội dung nổi bật.
      openMovieDetails(FEATURED_MOVIE_ID);
      break;
    // Mở trình phát từ phim nổi bật.
    case "play-featured":
      // Phát phim nổi bật ở tập đầu tiên.
      openMoviePlayer(FEATURED_MOVIE_ID);
      break;
    // Mở trình phát của một phim cụ thể.
    case "play-movie":
      // Bắt đầu phát phim đã chọn.
      openMoviePlayer(movieId);
      break;
    // Mở trình phát của tập phim bộ.
    case "play-episode":
      // Phát tập có số thứ tự người dùng chọn.
      openMoviePlayer(movieId, Number(actionButton.dataset.episode));
      break;
    // Thêm hoặc bỏ phim trong danh sách yêu thích.
    case "toggle-watchlist":
      // Thay đổi trạng thái lưu của phim.
      toggleMovieInWatchlist(movieId);
      break;
    // Mở tài khoản demo hoặc biểu mẫu đăng nhập.
    case "open-account":
      // Hiển thị thông tin tài khoản hoặc biểu mẫu mô phỏng.
      openAccountDialog();
      break;
    // Bật hoặc tắt menu trên thiết bị di động.
    case "toggle-mobile-menu":
      // Đảo trạng thái hiển thị menu.
      document.getElementById("mobile-menu").hidden = !document.getElementById("mobile-menu").hidden;
      break;
    // Đóng hộp thoại hiện tại.
    case "close-dialog":
      // Dừng video và đóng hộp thoại.
      closeDialog();
      break;
    // Kết thúc phiên đăng nhập demo.
    case "logout":
      // Xóa phiên tài khoản hiện tại.
      currentUser = null;
      // Xóa phiên khỏi bộ nhớ trình duyệt.
      writeStoredData(STORAGE_KEYS.user, null);
      // Cập nhật giao diện tài khoản.
      renderAccountState();
      // Đóng hộp thoại tài khoản.
      closeDialog();
      // Báo phiên demo đã kết thúc.
      showStatus("Đã đăng xuất khỏi phiên demo.");
      break;
    // Mở bảng quản trị demo.
    case "open-admin":
      // Hiện công cụ quản lý danh mục cục bộ.
      openAdminDashboard();
      // Đóng menu di động sau khi mở quản trị.
      document.getElementById("mobile-menu").hidden = true;
      break;
    // Chọn số sao trong biểu mẫu nhận xét.
    case "choose-rating":
      // Cập nhật số sao được chọn.
      selectedRating = Number(actionButton.dataset.rating);
      // Tô màu số sao đã chọn và các sao thấp hơn.
      document.querySelectorAll("#rating-select button").forEach((ratingButton) => ratingButton.classList.toggle("is-selected", Number(ratingButton.dataset.rating) <= selectedRating));
      break;
    // Tải lại video mẫu nếu phát sinh lỗi.
    case "retry-video": {
      // Lấy trình phát video hiện tại.
      const videoElement = document.getElementById("movie-video");
      // Đặt lại nguồn và yêu cầu tải lại.
      if (videoElement && activeMovie) {
        videoElement.src = activeMovie.videoUrl;
        videoElement.load();
      }
      break;
    }
    // Khôi phục thời gian dừng đã lưu trước đó.
    case "resume-video": {
      // Lấy phần tử video trong hộp thoại hiện tại.
      const videoElement = document.getElementById("movie-video");
      // Đọc thời gian khôi phục từ thuộc tính dữ liệu.
      const resumeSecond = Number(actionButton.dataset.seconds);
      // Chờ video có metadata trước khi đặt thời gian.
      if (videoElement) videoElement.addEventListener("loadedmetadata", () => { videoElement.currentTime = resumeSecond; videoElement.play().catch(() => showStatus("Trình duyệt cần thao tác Play trực tiếp để phát video.", true)); }, { once: true });
      break;
    }
    // Xóa phim đã thêm từ trang quản trị demo.
    case "delete-demo-movie":
      // Cập nhật danh mục và các danh sách cục bộ liên quan.
      deleteDemoMovie(movieId);
      break;
    // Xử lý nút xóa lọc bằng hàm riêng.
    case "reset-filters":
      // Đưa bộ lọc về trạng thái mặc định.
      resetSearchFilters(true);
      break;
    // Bỏ qua mọi hành động không được hỗ trợ để tránh lỗi ngoài ý muốn.
    default:
      // Ghi lại tên hành động không xác định để dễ sửa khi phát triển.
      console.warn(`Hành động giao diện chưa được xử lý: ${actionName}`);
  }
}
// Đưa từ khóa, thể loại, năm và định dạng về trạng thái ban đầu.
function resetSearchFilters(showHomeAfterReset) {
  // Xóa từ khóa tìm kiếm chính.
  document.getElementById("filter-search-input").value = "";
  // Xóa thể loại đang lọc.
  document.getElementById("genre-filter").value = "";
  // Xóa năm đang lọc.
  document.getElementById("year-filter").value = "";
  // Xóa định dạng phim đang lọc.
  document.getElementById("type-filter").value = "";
  // Xóa từ khóa trong thanh tìm kiếm header.
  document.getElementById("header-search-input").value = "";
  // Trở về trang chủ nếu người dùng bấm rõ ràng nút xóa lọc.
  if (showHomeAfterReset) showListView("home");
}
// Cập nhật ô kết quả sau 500 mili giây khi người dùng ngừng nhập từ khóa.
function debounceSearchInput() {
  // Lưu bộ định thời để hủy lần tìm cũ khi người dùng gõ tiếp.
  let searchTimer;
  // Trả về trình lắng nghe sự kiện nhập.
  return () => {
    // Hủy bộ định thời đang chờ.
    window.clearTimeout(searchTimer);
    // Tạo bộ định thời mới theo yêu cầu debounce 500ms.
    searchTimer = window.setTimeout(() => {
      // Chạy tìm kiếm tự động khi có từ khóa hoặc bộ lọc đã chọn.
      if (document.getElementById("filter-search-input").value.trim()) searchAndFilterMovies();
    }, 500);
  };
}
// Đăng ký các sự kiện giao diện và khởi tạo trang.
function initializeMovieWebsite() {
  // Dựng danh sách phim ban đầu.
  renderHomeCatalog();
  // Cập nhật trạng thái tài khoản demo.
  renderAccountState();
  // Gắn một bộ xử lý chung cho các nút có data-action.
  document.addEventListener("click", handleActionClick);
  // Gắn bộ xử lý gửi biểu mẫu cho các biểu mẫu được tạo tĩnh và động.
  document.addEventListener("submit", handleFormSubmission);
  // Tìm kiếm nhanh khi người dùng ngừng gõ từ khóa chi tiết.
  document.getElementById("filter-search-input").addEventListener("input", debounceSearchInput());
  // Cập nhật kết quả ngay khi người dùng đổi bộ lọc dạng menu.
  ["genre-filter", "year-filter", "type-filter"].forEach((filterId) => {
    // Gắn sự kiện thay đổi cho từng menu lọc.
    document.getElementById(filterId).addEventListener("change", () => {
      // Chạy tìm kiếm nếu người dùng đã chọn ít nhất một điều kiện.
      if (document.getElementById(filterId).value) searchAndFilterMovies();
    });
  });
  // Đóng hộp thoại nếu người dùng bấm vùng nền bên ngoài.
  appDialog.addEventListener("click", (event) => {
    // Chỉ đóng nếu vị trí bấm nằm ngoài hình chữ nhật của hộp thoại.
    if (event.target === appDialog) closeDialog();
  });
  // Dừng phát và lưu tiến trình trước khi người dùng rời trang.
  window.addEventListener("pagehide", saveVideoProgress);
}
// Khởi chạy ứng dụng sau khi tài liệu HTML được tải xong.
initializeMovieWebsite();
