// Gom các đường dẫn dịch vụ vào một chỗ để dễ thay nhà cung cấp dữ liệu sau này.
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
// Dùng dịch vụ mã địa lý để đổi tên địa điểm thành tọa độ.
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
// Dùng dịch vụ mã địa lý ngược để đổi tọa độ hiện tại thành tên địa điểm gần nhất.
const REVERSE_GEOCODING_API_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
// Giới hạn thời gian chờ để người dùng không phải đợi một yêu cầu bị treo vô hạn.
const REQUEST_TIMEOUT_MS = 12000;

// Lưu các phần tử giao diện dùng nhiều lần thay vì tìm lại chúng sau mỗi thao tác.
const pageElements = {
  // Lấy biểu mẫu để xử lý cả gửi bằng nút lẫn nhấn phím Enter.
  searchForm: document.querySelector("#search-form"),
  // Lấy trường nhập để đọc từ khóa và đưa con trỏ trở lại khi cần.
  cityInput: document.querySelector("#city-input"),
  // Lấy vùng thông báo danh sách kết quả tìm địa điểm.
  searchResults: document.querySelector("#search-results"),
  // Lấy nút yêu cầu vị trí hiện tại của trình duyệt.
  locationButton: document.querySelector("#location-button"),
  // Lấy vùng thông báo trạng thái và lỗi có hỗ trợ trình đọc màn hình.
  statusMessage: document.querySelector("#status-message"),
  // Lấy thẻ để chỉ hiển thị khi có dữ liệu thời tiết hợp lệ.
  weatherCard: document.querySelector("#weather-card"),
  // Lấy chỗ hiển thị tên địa điểm được tra cứu.
  weatherPlace: document.querySelector("#weather-place"),
  // Lấy chỗ hiển thị thời điểm cập nhật từ dịch vụ dữ liệu.
  weatherTime: document.querySelector("#weather-time"),
  // Lấy chỗ hiển thị biểu tượng trạng thái thời tiết.
  weatherIcon: document.querySelector("#weather-icon"),
  // Lấy chỗ hiển thị nhiệt độ sau khi kiểm tra dữ liệu hợp lệ.
  weatherTemperature: document.querySelector("#weather-temperature"),
  // Lấy chỗ hiển thị trạng thái thời tiết bằng văn bản.
  weatherCondition: document.querySelector("#weather-condition"),
};

// Giữ mục tiêu yêu cầu gần nhất để kết quả cũ không ghi đè địa điểm vừa chọn.
let currentWeatherTarget = null;
// Đếm mỗi yêu cầu thời tiết để phát hiện và bỏ qua phản hồi đến sai thứ tự.
let weatherRequestNumber = 0;
// Đếm mỗi lượt tìm kiếm để bỏ qua phản hồi cũ khi người dùng tìm liên tiếp.
let searchRequestNumber = 0;
// Ghi nhận thao tác lấy vị trí đang diễn ra để ngăn yêu cầu lặp.
let isFindingLocation = false;
// Ghi nhận thao tác thời tiết đang diễn ra để ngăn bấm thử lại liên tục.
let isLoadingWeather = false;

// Quy đổi mã thời tiết WMO từ Open-Meteo thành mô tả tiếng Việt và biểu tượng.
const weatherDescriptions = {
  // Mã 0 biểu thị bầu trời quang đãng.
  0: { label: "맑음", icon: "☀️" },
  // Mã 1 biểu thị trời chủ yếu quang đãng.
  1: { label: "대체로 맑음", icon: "🌤️" },
  // Mã 2 biểu thị trời có mây rải rác.
  2: { label: "구름 조금", icon: "⛅" },
  // Mã 3 biểu thị trời nhiều mây.
  3: { label: "흐림", icon: "☁️" },
  // Mã 45 biểu thị có sương mù.
  45: { label: "안개", icon: "🌫️" },
  // Mã 48 biểu thị sương mù đóng băng.
  48: { label: "짙은 안개", icon: "🌫️" },
  // Mã 51 biểu thị mưa phùn nhẹ.
  51: { label: "약한 이슬비", icon: "🌦️" },
  // Mã 53 biểu thị mưa phùn vừa.
  53: { label: "이슬비", icon: "🌦️" },
  // Mã 55 biểu thị mưa phùn dày.
  55: { label: "강한 이슬비", icon: "🌧️" },
  // Mã 56 biểu thị mưa phùn đóng băng nhẹ.
  56: { label: "어는 이슬비", icon: "🌧️" },
  // Mã 57 biểu thị mưa phùn đóng băng dày.
  57: { label: "강한 어는 이슬비", icon: "🌧️" },
  // Mã 61 biểu thị mưa nhẹ.
  61: { label: "약한 비", icon: "🌦️" },
  // Mã 63 biểu thị mưa vừa.
  63: { label: "비", icon: "🌧️" },
  // Mã 65 biểu thị mưa to.
  65: { label: "강한 비", icon: "🌧️" },
  // Mã 66 biểu thị mưa đóng băng nhẹ.
  66: { label: "어는 비", icon: "🌧️" },
  // Mã 67 biểu thị mưa đóng băng to.
  67: { label: "강한 어는 비", icon: "🌧️" },
  // Mã 71 biểu thị tuyết rơi nhẹ.
  71: { label: "약한 눈", icon: "🌨️" },
  // Mã 73 biểu thị tuyết rơi vừa.
  73: { label: "눈", icon: "🌨️" },
  // Mã 75 biểu thị tuyết rơi dày.
  75: { label: "많은 눈", icon: "❄️" },
  // Mã 77 biểu thị hạt tuyết.
  77: { label: "싸락눈", icon: "❄️" },
  // Mã 80 biểu thị mưa rào nhẹ.
  80: { label: "약한 소나기", icon: "🌦️" },
  // Mã 81 biểu thị mưa rào vừa.
  81: { label: "소나기", icon: "🌧️" },
  // Mã 82 biểu thị mưa rào dữ dội.
  82: { label: "강한 소나기", icon: "⛈️" },
  // Mã 85 biểu thị tuyết rào nhẹ.
  85: { label: "눈 소나기", icon: "🌨️" },
  // Mã 86 biểu thị tuyết rào dày.
  86: { label: "강한 눈 소나기", icon: "❄️" },
  // Mã 95 biểu thị dông.
  95: { label: "뇌우", icon: "⛈️" },
  // Mã 96 biểu thị dông kèm mưa đá nhẹ.
  96: { label: "우박을 동반한 뇌우", icon: "⛈️" },
  // Mã 99 biểu thị dông kèm mưa đá mạnh.
  99: { label: "강한 우박을 동반한 뇌우", icon: "⛈️" },
};

// Chuyển mã thời tiết có thể không nằm trong danh sách thành thông báo rõ ràng.
function getWeatherDescription(weatherCode) {
  // Tra mô tả theo mã WMO nếu dịch vụ trả về một mã đã biết.
  const knownDescription = weatherDescriptions[weatherCode];
  // Trả thông tin đã tra được hoặc biểu tượng trung tính nếu mã mới chưa hỗ trợ.
  return knownDescription ?? { label: "날씨 설명을 확인할 수 없습니다", icon: "🌡️" };
}

// Hiển thị thông báo và phân loại trực quan lỗi hoặc trạng thái bình thường.
function showStatusMessage(message, isError = false) {
  // Đặt nội dung dưới dạng văn bản để dữ liệu ngoài không được diễn giải thành HTML.
  pageElements.statusMessage.textContent = message;
  // Thêm lớp lỗi chỉ khi thông báo đang mô tả một lỗi cần chú ý.
  pageElements.statusMessage.classList.toggle("status-message--error", isError);
  // Bỏ trạng thái ẩn để người dùng và trình đọc màn hình nhận được thông báo.
  pageElements.statusMessage.hidden = false;
}

// Xóa thông báo trước đó khi người dùng bắt đầu một thao tác mới.
function clearStatusMessage() {
  // Ẩn vùng thông báo để trạng thái cũ không bị hiểu nhầm là kết quả mới.
  pageElements.statusMessage.hidden = true;
  // Xóa kiểu lỗi để thông báo tiếp theo bắt đầu với trạng thái trung tính.
  pageElements.statusMessage.classList.remove("status-message--error");
  // Xóa nội dung cũ khỏi cây trợ năng cùng lúc với việc ẩn vùng thông báo.
  pageElements.statusMessage.textContent = "";
}

// Tạo yêu cầu HTTP có thời hạn chờ và kiểm tra lỗi máy chủ rõ ràng.
async function fetchJson(url) {
  // Tạo bộ điều khiển để có thể hủy yêu cầu nếu máy chủ phản hồi quá chậm.
  const requestController = new AbortController();
  // Khởi động đồng hồ hết hạn cho yêu cầu mạng hiện tại.
  const timeoutId = window.setTimeout(() => requestController.abort(), REQUEST_TIMEOUT_MS);

  try {
    // Gửi yêu cầu JSON và đính kèm tín hiệu hủy khi quá thời hạn chờ.
    const response = await fetch(url, { signal: requestController.signal });
    // Báo lỗi cho mọi mã HTTP không thành công để giao diện hiển thị trạng thái phù hợp.
    if (!response.ok) {
      // Dùng mã HTTP cụ thể trong lỗi để thuận tiện chẩn đoán khi phát triển.
      throw new Error(`서비스에서 HTTP ${response.status} 오류를 반환했습니다.`);
    }

    // Phân tích dữ liệu JSON và trả lại cho phần xử lý nghiệp vụ tương ứng.
    return await response.json();
  } finally {
    // Dọn bộ hẹn giờ dù yêu cầu thành công, thất bại hay bị hủy.
    window.clearTimeout(timeoutId);
  }
}

// Tạo URL thời tiết có tọa độ, đơn vị Celsius và múi giờ tại nơi được chọn.
function createWeatherRequestUrl(latitude, longitude) {
  // Tạo URL an toàn bằng URLSearchParams để mã hóa tham số đúng chuẩn.
  const requestUrl = new URL(WEATHER_API_URL);
  // Đặt vĩ độ làm thông tin định vị bắt buộc cho dịch vụ thời tiết.
  requestUrl.searchParams.set("latitude", String(latitude));
  // Đặt kinh độ để xác định chính xác địa điểm cần tra cứu.
  requestUrl.searchParams.set("longitude", String(longitude));
  // Chỉ yêu cầu dữ liệu thời tiết hiện tại trong phạm vi phiên bản đầu tiên.
  requestUrl.searchParams.set("current", "temperature_2m,weather_code,is_day");
  // Yêu cầu dữ liệu thời gian theo múi giờ của địa điểm thay vì UTC.
  requestUrl.searchParams.set("timezone", "auto");
  // Chọn đơn vị Celsius theo yêu cầu sản phẩm.
  requestUrl.searchParams.set("temperature_unit", "celsius");
  // Trả về URL đầy đủ để hàm gọi có thể gửi yêu cầu.
  return requestUrl.toString();
}

// Kiểm tra dữ liệu thời tiết tối thiểu trước khi đưa lên giao diện.
function validateCurrentWeather(weatherResponse) {
  // Lấy nhóm dữ liệu hiện tại được dịch vụ trả về.
  const currentWeather = weatherResponse.current;
  // Lấy thời điểm đo hiện tại để không trình bày một bản tin thiếu thời gian.
  const measuredAt = currentWeather?.time;
  // Lấy nhiệt độ để xác nhận dữ liệu là một con số hợp lệ.
  const temperature = currentWeather?.temperature_2m;
  // Lấy mã WMO để chuyển thành mô tả thời tiết dễ hiểu.
  const weatherCode = currentWeather?.weather_code;
  // Bỏ dữ liệu không đầy đủ thay vì hiển thị giá trị giả hoặc cũ.
  if (!measuredAt || !Number.isFinite(temperature) || !Number.isInteger(weatherCode)) {
    // Nêu rõ dữ liệu nào không đạt mức cần thiết cho giao diện.
    throw new Error("현재 날씨 데이터가 충분하지 않습니다.");
  }

  // Trả dữ liệu đã kiểm tra để phần hiển thị không phải xử lý giá trị thiếu.
  return { measuredAt, temperature, weatherCode };
}

// Biến thời điểm dịch vụ trả về thành chuỗi giờ địa phương dễ đọc.
function formatMeasurementTime(measuredAt) {
  // Tách các thành phần từ thời gian địa phương mà API cung cấp cho địa điểm đó.
  const timeParts = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(measuredAt);
  // Không hiển thị dữ liệu nếu thời điểm không theo định dạng ngày và giờ dự kiến.
  if (!timeParts) {
    // Báo lỗi dữ liệu thời gian để trạng thái chung hướng dẫn người dùng thử lại.
    throw new Error("날씨 데이터의 기준 시각을 확인할 수 없습니다.");
  }

  // Hiển thị ngày giờ theo định dạng tiếng Việt mà không đổi múi giờ địa phương.
  return `${timeParts[1]}년 ${timeParts[2]}월 ${timeParts[3]}일 ${timeParts[4]}:${timeParts[5]}`;
}

// Hiển thị một kết quả thời tiết hợp lệ cho đúng địa điểm người dùng đã chọn.
function displayCurrentWeather(placeName, currentWeather) {
  // Chọn mô tả và biểu tượng phù hợp từ mã WMO đã kiểm tra.
  const weatherDescription = getWeatherDescription(currentWeather.weatherCode);
  // Đặt tên địa điểm để người dùng không nhầm kết quả với một nơi trước đó.
  pageElements.weatherPlace.textContent = placeName;
  // Định dạng và đưa thời gian đo vào phần tử time có ngữ nghĩa HTML.
  pageElements.weatherTime.textContent = `기준 시각 ${formatMeasurementTime(currentWeather.measuredAt)}`;
  // Đặt thuộc tính datetime theo dữ liệu ISO đã chuẩn hóa để máy có thể đọc.
  pageElements.weatherTime.dateTime = currentWeather.measuredAt.replace(" ", "T");
  // Đưa biểu tượng minh họa vào phần tử trang trí đã ẩn khỏi trình đọc màn hình.
  pageElements.weatherIcon.textContent = weatherDescription.icon;
  // Làm tròn về một chữ số thập phân để hiển thị gọn mà vẫn giữ thông tin hữu ích.
  pageElements.weatherTemperature.textContent = `${currentWeather.temperature.toFixed(1)}°`;
  // Hiển thị mô tả bằng văn bản để trạng thái không phụ thuộc vào biểu tượng.
  pageElements.weatherCondition.textContent = weatherDescription.label;
  // Bỏ ẩn thẻ sau khi mọi trường cần thiết đã được cập nhật.
  pageElements.weatherCard.hidden = false;
}

// Tải và trình bày thời tiết cho tọa độ của địa điểm đang được chọn.
async function loadWeatherForPlace(place) {
  // Không gửi yêu cầu nếu ứng dụng không nhận đủ tên và tọa độ hợp lệ.
  if (!place || !place.name || !Number.isFinite(place.latitude) || !Number.isFinite(place.longitude)) {
    // Nêu cách khắc phục thay vì gửi yêu cầu thiếu dữ liệu.
    showStatusMessage("장소를 확인할 수 없습니다. 먼저 장소를 검색하고 선택해 주세요.", true);
    // Dừng sớm vì không thể truy vấn thời tiết nếu thiếu tọa độ.
    return;
  }

  // Lưu địa điểm để nút thử lại có thể yêu cầu lại đúng nơi đang xem.
  currentWeatherTarget = place;
  // Tăng mã yêu cầu để nhận diện phản hồi thời tiết mới nhất.
  weatherRequestNumber += 1;
  // Ghi lại mã của yêu cầu này để phát hiện kết quả cũ khi có lựa chọn mới.
  const thisRequestNumber = weatherRequestNumber;
  // Đánh dấu đang tải để chặn thao tác thử lại lặp lại.
  isLoadingWeather = true;
  // Xóa kết quả cũ để không khiến người dùng nhầm dữ liệu địa điểm khác.
  pageElements.weatherCard.hidden = true;
  // Xóa thông báo tìm kiếm cũ trước khi báo đang tải thời tiết mới.
  clearStatusMessage();
  // Hiển thị trạng thái chờ rõ ràng trong lúc dịch vụ phản hồi.
  showStatusMessage(`${place.name}의 날씨를 불러오는 중입니다...`);

  try {
    // Gửi yêu cầu thời tiết với tọa độ của địa điểm vừa được chọn.
    const response = await fetchJson(createWeatherRequestUrl(place.latitude, place.longitude));
    // Bỏ qua phản hồi thuộc yêu cầu cũ nếu người dùng đã chọn nơi khác.
    if (thisRequestNumber !== weatherRequestNumber) {
      // Không thay đổi giao diện vì một yêu cầu mới hơn đã được gửi.
      return;
    }

    // Kiểm tra dữ liệu trước khi trình bày để không hiển thị kết quả thiếu thời gian.
    const currentWeather = validateCurrentWeather(response);
    // Cập nhật thẻ thời tiết bằng dữ liệu đã được kiểm tra.
    displayCurrentWeather(place.name, currentWeather);
    // Thông báo rõ khi mã trạng thái chưa được ứng dụng diễn giải.
    if (!weatherDescriptions[currentWeather.weatherCode]) {
      // Cho người dùng biết nhiệt độ vẫn có nhưng mô tả trạng thái chưa được nhận diện.
      showStatusMessage("기온을 불러왔습니다. 이 날씨 상태에 대한 설명은 아직 지원되지 않습니다.");
    } else {
      // Ẩn trạng thái tải khi dữ liệu thời tiết hiển thị đầy đủ.
      clearStatusMessage();
    }
  } catch (error) {
    // Chỉ xử lý lỗi của yêu cầu mới nhất để không ghi đè trạng thái địa điểm khác.
    if (thisRequestNumber === weatherRequestNumber) {
      // Thông báo lỗi nêu cả địa điểm và cách thử lại.
      showStatusMessage(`${place.name}의 날씨를 불러오지 못했습니다. 인터넷 연결을 확인한 후 다시 시도해 주세요.`, true);
      // Ghi lỗi vào bảng điều khiển giúp người phát triển chẩn đoán nguyên nhân cụ thể.
      console.error("Không thể tải dữ liệu thời tiết:", error);
    }
  } finally {
    // Chỉ mở lại thao tác nếu đây vẫn là lần yêu cầu hiện hành.
    if (thisRequestNumber === weatherRequestNumber) {
      // Cho phép người dùng thử lại sau khi yêu cầu này đã kết thúc.
      isLoadingWeather = false;
      // Hiển thị nút thử lại bên trong thông báo lỗi nếu thông báo đang báo lỗi.
      addRetryButtonWhenNeeded();
    }
  }
}

// Thêm nút thử lại vào thông báo lỗi mà không đổi địa điểm đang được tra cứu.
function addRetryButtonWhenNeeded() {
  // Chỉ tạo thao tác thử lại khi yêu cầu thất bại và có địa điểm hợp lệ để dùng lại.
  if (!pageElements.statusMessage.classList.contains("status-message--error") || !currentWeatherTarget) {
    // Giữ nguyên thông báo khi không có mục tiêu hợp lệ để yêu cầu lại.
    return;
  }

  // Tránh tạo nhiều nút nếu trình duyệt gọi cập nhật trạng thái hơn một lần.
  if (pageElements.statusMessage.querySelector("button")) {
    // Bảo đảm giao diện chỉ có một điều khiển thử lại.
    return;
  }

  // Tạo nút thật thay vì đưa HTML động vào thông báo.
  const retryButton = document.createElement("button");
  // Đặt loại button để nút không gửi biểu mẫu tìm kiếm ngoài ý muốn.
  retryButton.type = "button";
  // Đặt tên lớp để tái sử dụng kiểu nút cơ bản.
  retryButton.className = "button button--search";
  // Viết nhãn nút nêu rõ hành động thử lại.
  retryButton.textContent = "다시 시도";
  // Tạo dòng mới để tách nút khỏi phần mô tả lỗi.
  pageElements.statusMessage.append(document.createElement("br"));
  // Thêm nút dưới lỗi để người dùng có thể khôi phục bằng bàn phím hoặc chạm.
  pageElements.statusMessage.append(retryButton);
  // Gắn hành động tải lại cùng địa điểm đang gặp lỗi.
  retryButton.addEventListener("click", () => {
    // Bỏ qua lần bấm mới nếu yêu cầu trước đó vẫn đang được xử lý.
    if (!isLoadingWeather) {
      // Gọi lại cùng hàm nghiệp vụ với địa điểm được lưu gần nhất.
      loadWeatherForPlace(currentWeatherTarget);
    }
  });
}

// Tìm tên thành phố và chuẩn hóa kết quả thành danh sách có thể lựa chọn.
async function searchForPlaces(searchTerm) {
  // Tăng mã tìm kiếm để phản hồi cũ không làm thay đổi kết quả mới.
  searchRequestNumber += 1;
  // Lưu mã lượt tìm này để so sánh sau khi dịch vụ phản hồi.
  const thisSearchNumber = searchRequestNumber;
  // Xóa danh sách lựa chọn trước đó để tránh chọn nhầm địa điểm cũ.
  pageElements.searchResults.replaceChildren();
  // Báo rõ trạng thái tìm kiếm trước khi gửi yêu cầu.
  showStatusMessage(`"${searchTerm}" 검색 중...`);

  try {
    // Tạo URL mã địa lý và mã hóa từ khóa người dùng một cách an toàn.
    const geocodingUrl = new URL(GEOCODING_API_URL);
    // Đặt tên địa điểm do người dùng cung cấp làm truy vấn tìm kiếm.
    geocodingUrl.searchParams.set("name", searchTerm);
    // Yêu cầu tối đa sáu kết quả để danh sách ngắn và dễ sử dụng.
    geocodingUrl.searchParams.set("count", "6");
    // Ưu tiên tên hiển thị bằng tiếng Việt khi nhà cung cấp hỗ trợ.
    geocodingUrl.searchParams.set("language", "ko");
    // Đặt định dạng rõ ràng để dịch vụ trả về dữ liệu JSON.
    geocodingUrl.searchParams.set("format", "json");
    // Gửi truy vấn tới dịch vụ tìm kiếm địa điểm.
    const response = await fetchJson(geocodingUrl.toString());
    // Bỏ qua phản hồi nếu người dùng đã bắt đầu một truy vấn mới hơn.
    if (thisSearchNumber !== searchRequestNumber) {
      // Giữ nguyên kết quả thuộc lượt tìm mới nhất.
      return;
    }

    // Chỉ giữ các ứng viên có tên và tọa độ số hợp lệ.
    const places = (response.results ?? []).filter((place) =>
      // Kiểm tra tên, vĩ độ và kinh độ trước khi cho phép lựa chọn địa điểm.
      typeof place.name === "string" && Number.isFinite(place.latitude) && Number.isFinite(place.longitude)
    );
    // Thông báo khi truy vấn thành công nhưng không tìm được địa điểm hợp lệ.
    if (places.length === 0) {
      // Đưa con trỏ lại trường tìm kiếm để người dùng có thể sửa từ khóa ngay.
      pageElements.cityInput.focus();
      // Giải thích kết quả rỗng và đưa ra cách khắc phục.
      showStatusMessage(`"${searchTerm}" 검색 결과가 없습니다. 다른 도시나 지역 이름을 입력해 주세요.`);
      // Dừng vì không có kết quả để dựng thành lựa chọn.
      return;
    }

    // Tạo nút lựa chọn cho từng địa điểm tìm được.
    renderPlaceResults(places);
    // Thông báo số kết quả để người dùng biết truy vấn đã hoàn tất.
    showStatusMessage(`${places.length}개의 장소를 찾았습니다. 날씨를 확인할 장소를 선택해 주세요.`);
  } catch (error) {
    // Chỉ hiển thị lỗi nếu lỗi thuộc truy vấn tìm kiếm hiện hành.
    if (thisSearchNumber === searchRequestNumber) {
      // Nêu rõ khả năng thử lại bằng từ khóa khác hoặc kiểm tra mạng.
      showStatusMessage("장소를 검색하지 못했습니다. 인터넷 연결을 확인한 후 다시 시도해 주세요.", true);
      // Ghi lỗi kỹ thuật để việc phát triển và kiểm thử có thêm thông tin.
      console.error("Không thể tìm địa điểm:", error);
    }
  }
}

// Vẽ các lựa chọn địa điểm dưới dạng nút có nhãn rõ ràng và an toàn.
function renderPlaceResults(places) {
  // Tạo nhóm phần tử trong bộ nhớ để chỉ cập nhật giao diện một lần.
  const resultFragment = document.createDocumentFragment();
  // Duyệt qua mỗi địa điểm hợp lệ do dịch vụ mã địa lý trả về.
  places.forEach((place) => {
    // Tạo nút cho toàn bộ hàng để hỗ trợ chuột, chạm và bàn phím.
    const resultButton = document.createElement("button");
    // Đặt loại nút để không gửi biểu mẫu tìm kiếm khi chọn địa điểm.
    resultButton.type = "button";
    // Gắn lớp hiển thị được định nghĩa trong tệp CSS.
    resultButton.className = "search-result";
    // Tạo phần hiển thị tên chính của địa điểm.
    const nameElement = document.createElement("span");
    // Đặt lớp tên giúp nhấn mạnh thành phố được tìm thấy.
    nameElement.className = "search-result__name";
    // Dùng textContent để tránh diễn giải tên từ API thành mã HTML.
    nameElement.textContent = place.name;
    // Tạo phần mô tả vùng, quốc gia để phân biệt các tên trùng nhau.
    const detailElement = document.createElement("span");
    // Gắn lớp thông tin phụ giúp giảm mức nhấn thị giác.
    detailElement.className = "search-result__detail";
    // Ghép vùng và quốc gia nếu có, đồng thời bỏ giá trị rỗng.
    detailElement.textContent = [place.admin1, place.country].filter(Boolean).join(", ");
    // Đặt các phần hiển thị tên và vùng bên trong nút lựa chọn.
    resultButton.append(nameElement, detailElement);
    // Bắt đầu tải thời tiết khi người dùng chọn đúng địa điểm này.
    resultButton.addEventListener("click", () => {
      // Gộp tên và tọa độ để yêu cầu lại đúng kết quả đã chọn.
      loadWeatherForPlace({
        // Giữ tên địa điểm làm nhãn của thẻ thời tiết.
        name: [place.name, place.admin1, place.country].filter(Boolean).join(", "),
        // Giữ vĩ độ từ dịch vụ mã địa lý cho yêu cầu dự báo.
        latitude: place.latitude,
        // Giữ kinh độ từ dịch vụ mã địa lý cho yêu cầu dự báo.
        longitude: place.longitude,
      });
      // Xóa danh sách sau khi chọn để không lẫn với kết quả kế tiếp.
      pageElements.searchResults.replaceChildren();
    });
    // Gom nút vào nhóm tạm trước khi cập nhật vùng kết quả.
    resultFragment.append(resultButton);
  });
  // Đưa toàn bộ kết quả lên giao diện trong một lần cập nhật.
  pageElements.searchResults.replaceChildren(resultFragment);
}

// Đổi vị trí trình duyệt trả về thành tên địa điểm dễ hiểu khi có thể.
async function findReadablePlaceName(latitude, longitude) {
  // Tạo URL mã địa lý ngược từ tọa độ đã được trình duyệt cho phép sử dụng.
  const reverseGeocodingUrl = new URL(REVERSE_GEOCODING_API_URL);
  // Đặt vĩ độ để tìm địa danh gần vị trí hiện tại.
  reverseGeocodingUrl.searchParams.set("latitude", String(latitude));
  // Đặt kinh độ để tìm địa danh gần vị trí hiện tại.
  reverseGeocodingUrl.searchParams.set("longitude", String(longitude));
  // Yêu cầu tên địa điểm bằng tiếng Việt nếu dịch vụ hỗ trợ.
  reverseGeocodingUrl.searchParams.set("localityLanguage", "ko");
  // Gửi yêu cầu và kiểm tra phản hồi qua cùng lớp xử lý mạng.
  const response = await fetchJson(reverseGeocodingUrl.toString());
  // Chọn tên đô thị trước, rồi đến địa phương, khu vực hoặc quận.
  const localityName = response.city || response.locality || response.localityInfo?.administrative?.[2]?.name || response.localityInfo?.administrative?.[1]?.name;
  // Chọn quốc gia để giúp người dùng phân biệt địa danh trùng tên.
  const countryName = response.countryName;
  // Ghép các phần hiện có, không đưa giá trị thiếu vào tên hiển thị.
  const readableName = [localityName, countryName].filter(Boolean).join(", ");
  // Báo lỗi nếu dịch vụ không cung cấp bất kỳ tên địa điểm hữu ích nào.
  if (!readableName) {
    // Cho hàm gọi biết kết quả ngược không đủ thông tin để hiển thị.
    throw new Error("현재 좌표에 해당하는 장소 이름을 찾을 수 없습니다.");
  }

  // Trả tên đã được tạo để dùng làm nhãn của thẻ thời tiết.
  return readableName;
}

// Xin quyền trình duyệt và tra cứu thời tiết tại vị trí người dùng đã đồng ý.
function loadWeatherForCurrentLocation() {
  // Tránh gửi nhiều yêu cầu quyền cùng lúc khi người dùng bấm liên tục.
  if (isFindingLocation) {
    // Dừng thao tác trùng trong khi trình duyệt đang xác định vị trí.
    return;
  }

  // Kiểm tra API trước khi gọi vì một số trình duyệt hoặc ngữ cảnh không hỗ trợ.
  if (!navigator.geolocation) {
    // Giải thích vì sao không thể lấy vị trí và hướng dẫn dùng tìm kiếm.
    showStatusMessage("이 브라우저는 위치 정보를 지원하지 않습니다. 도시를 검색해 날씨를 확인해 주세요.", true);
    // Dừng vì không thể lấy tọa độ bằng trình duyệt hiện tại.
    return;
  }

  // Đánh dấu đang chờ quyền hoặc dữ liệu vị trí để ngăn yêu cầu trùng.
  isFindingLocation = true;
  // Xóa kết quả tìm trước đó nhằm phân biệt luồng định vị hiện tại.
  pageElements.searchResults.replaceChildren();
  // Xóa lỗi hoặc hướng dẫn cũ khỏi vùng trạng thái.
  clearStatusMessage();
  // Nêu lý do trình duyệt sắp hiển thị hộp thoại xin quyền vị trí.
  showStatusMessage("현재 위치를 확인하고 있습니다. 브라우저에서 위치 정보 사용을 허용해 주세요.");

  // Yêu cầu tọa độ một lần và giới hạn thời gian chờ để xử lý trạng thái thất bại.
  navigator.geolocation.getCurrentPosition(
    // Xử lý tọa độ chỉ sau khi người dùng cho phép và trình duyệt xác định thành công.
    async (position) => {
      // Lưu chính xác vĩ độ do trình duyệt cung cấp sau khi được người dùng đồng ý.
      const latitude = position.coords.latitude;
      // Lưu chính xác kinh độ để tra cứu thời tiết tại vị trí hiện tại.
      const longitude = position.coords.longitude;
      // Tạo nhãn dự phòng nếu dịch vụ tên địa điểm không sẵn sàng.
      let placeName = "현재 위치";

      try {
        // Cố gắng đổi tọa độ thành thành phố để đáp ứng yêu cầu hiển thị địa điểm.
        placeName = await findReadablePlaceName(latitude, longitude);
      } catch (error) {
        // Báo rõ việc không lấy được tên thành phố nhưng vẫn có thể tra cứu thời tiết.
        console.warn("좌표를 장소 이름으로 변환할 수 없습니다:", error);
      }

      // Mở lại nút vị trí sau khi tìm được tên địa điểm hoặc nhãn dự phòng.
      isFindingLocation = false;
      // Tải thời tiết theo tọa độ đã được xác định và nhãn địa điểm phù hợp.
      loadWeatherForPlace({ name: placeName, latitude, longitude });
    },
    // Xử lý lỗi từ chối quyền, không lấy được tọa độ hoặc chờ quá lâu.
    (error) => {
      // Cho phép người dùng yêu cầu vị trí lại sau khi yêu cầu hiện tại thất bại.
      isFindingLocation = false;
      // Chọn lời giải thích cụ thể theo loại lỗi do trình duyệt cung cấp.
      const locationErrorMessages = {
        // Mã 1 nghĩa là người dùng hoặc trình duyệt đã từ chối quyền vị trí.
        1: "위치 정보 사용이 거부되었습니다. 도시를 검색해 날씨를 확인할 수 있습니다.",
        // Mã 2 nghĩa là thiết bị hoặc trình duyệt không xác định được tọa độ.
        2: "현재 위치를 확인할 수 없습니다. 다시 시도하거나 도시를 검색해 주세요.",
        // Mã 3 nghĩa là trình duyệt không nhận được vị trí trong thời gian cho phép.
        3: "위치 확인 시간이 초과되었습니다. 다시 시도하거나 도시를 검색해 주세요.",
      };
      // Hiển thị hướng dẫn dự phòng nếu mã lỗi không thuộc các trường hợp đã biết.
      showStatusMessage(locationErrorMessages[error.code] ?? "현재 위치를 가져올 수 없습니다. 도시를 검색해 날씨를 확인해 주세요.", true);
    },
    // Đặt giới hạn chờ và yêu cầu tọa độ chính xác hơn khi thiết bị có thể cung cấp.
    { enableHighAccuracy: false, timeout: REQUEST_TIMEOUT_MS, maximumAge: 300000 }
  );
}

// Kiểm tra tìm kiếm, chặn dữ liệu quá ngắn và bắt đầu truy vấn địa điểm.
function handleSearchFormSubmit(event) {
  // Ngăn trình duyệt tải lại trang khi người dùng gửi biểu mẫu.
  event.preventDefault();
  // Loại bỏ khoảng trắng thừa để từ khóa trống không được gửi đi.
  const searchTerm = pageElements.cityInput.value.trim();
  // Yêu cầu tối thiểu hai ký tự để tránh truy vấn mơ hồ và vô ích.
  if (searchTerm.length < 2) {
    // Hướng dẫn nhập lại một từ khóa có ý nghĩa.
    showStatusMessage("장소를 검색하려면 두 글자 이상 입력해 주세요.", true);
    // Đặt con trỏ vào trường nhập để người dùng sửa ngay.
    pageElements.cityInput.focus();
    // Không gửi yêu cầu khi dữ liệu đầu vào không hợp lệ.
    return;
  }

  // Bắt đầu tìm các địa điểm khớp với nội dung vừa nhập.
  searchForPlaces(searchTerm);
}

// Gắn tương tác vào các phần tử giao diện sau khi trang đã sẵn sàng.
function initializeWeatherApp() {
  // Xử lý biểu mẫu bằng một hàm có tên rõ nghĩa, hỗ trợ Enter và nút gửi.
  pageElements.searchForm.addEventListener("submit", handleSearchFormSubmit);
  // Chỉ yêu cầu vị trí khi người dùng chủ động bấm nút tương ứng.
  pageElements.locationButton.addEventListener("click", loadWeatherForCurrentLocation);
  // Giải thích quyền vị trí và tìm kiếm thay thế khi trang vừa được mở.
  showStatusMessage("위치 정보를 허용해 주변 날씨를 확인하거나, 위에서 도시를 검색해 보세요.");
  // Hỏi quyền vị trí ngay lần mở đầu để đáp ứng luồng sử dụng chính trong PRD.
  loadWeatherForCurrentLocation();
}

// Khởi tạo hành vi của ứng dụng sau khi các thành phần HTML đã được phân tích.
initializeWeatherApp();
