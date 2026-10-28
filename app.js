const foods = [
  {id:1,name:"Cơm gà nướng mật ong",restaurant:"Bếp Nhà Mình",price:59000,rating:4.9,category:"savory",badge:"Bán chạy",img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",description:"Cơm nóng ăn cùng gà nướng thơm lừng."},
  {id:2,name:"Cơm chay thanh đạm",restaurant:"An Lạc Vegetarian",price:45000,rating:4.8,category:"vegetarian",badge:"Món chay",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",description:"Rau củ tươi, đậu hũ và sốt mè."},
  {id:3,name:"Pizza rau củ phô mai",restaurant:"Pizza Corner",price:89000,rating:4.7,category:"snack",badge:"Được yêu thích",img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",description:"Đế bánh giòn, phô mai béo và rau củ."},
  {id:4,name:"Bún bò Huế đặc biệt",restaurant:"Quán Bún Huế",price:55000,rating:4.8,category:"noodle",badge:"Đậm vị",img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",description:"Nước dùng thơm, topping đầy đặn."},
  {id:5,name:"Salad xanh sốt mè",restaurant:"An Lạc Vegetarian",price:39000,rating:4.6,category:"vegetarian",badge:"Món chay",img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",description:"Rau xanh tươi mát cùng sốt mè rang."},
  {id:6,name:"Mì Ý sốt cà chua",restaurant:"Pasta House",price:69000,rating:4.7,category:"noodle",badge:"Phổ biến",img:"https://images.unsplash.com/photo- pasta-placeholder?auto=format&fit=crop&w=800&q=80",description:"Mì Ý sốt cà chua thơm ngon."},
  {id:7,name:"Đậu hũ sốt nấm",restaurant:"Bếp Chay An Nhiên",price:42000,rating:4.9,category:"vegetarian",badge:"Món chay",img:"https://images.unsplash.com/photo-1515543904379-3d7579f8e7a8?auto=format&fit=crop&w=800&q=80",description:"Đậu hũ mềm cùng nấm và rau củ."},
  {id:8,name:"Cơm tấm sườn nướng",restaurant:"Cơm Tấm Sài Gòn",price:52000,rating:4.8,category:"rice",badge:"Bán chạy",img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",description:"Sườn nướng thơm, cơm tấm dẻo."},
  {id:9,name:"Gỏi cuốn rau củ",restaurant:"Bếp Chay An Nhiên",price:35000,rating:4.7,category:"vegetarian",badge:"Món chay",img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",description:"Cuốn rau củ thanh mát, nước chấm đậm đà."},
  {id:10,name:"Trà đào cam sả",restaurant:"Tea Garden",price:29000,rating:4.6,category:"drink",badge:"Tươi mát",img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",description:"Trà trái cây thơm dịu, giải khát."},
  {id:11,name:"Bánh mì nấm nướng",restaurant:"An Lạc Vegetarian",price:32000,rating:4.5,category:"vegetarian",badge:"Món chay",img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",description:"Bánh mì giòn kẹp nấm và rau tươi."},
  {id:12,name:"Khoai tây chiên giòn",restaurant:"Snack Station",price:30000,rating:4.5,category:"snack",badge:"Ăn vặt",img:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",description:"Khoai tây vàng giòn, ăn kèm sốt."}
];
// Replace any unavailable sample image with a valid, general food photo.
foods[5].img = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const formatMoney = (value) => new Intl.NumberFormat("vi-VN").format(value) + "đ";
let currentCategory = "all";
let currentSearch = "";
let cart = JSON.parse(localStorage.getItem("foodflow_cart") || "[]");
let favorites = JSON.parse(localStorage.getItem("foodflow_favorites") || "[]");
let currentUser = JSON.parse(sessionStorage.getItem("foodflow_user") || localStorage.getItem("foodflow_user") || "null");
let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function saveCart() {
  localStorage.setItem("foodflow_cart", JSON.stringify(cart));
  renderCartCount();
}
function renderCartCount() {
  $("#cartCount").textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}
function setAuthHeader() {
  $("#headerUser").textContent = currentUser ? currentUser.name.split(" ")[0] : "Đăng nhập";
  $("#openAuth").title = currentUser ? "Tài khoản: " + currentUser.email : "Đăng nhập";
}
function openAuth(tab = "login") {
  $("#authModal").classList.remove("hidden");
  setAuthTab(tab);
  document.body.style.overflow = "hidden";
}
function closeAuth() {
  $("#authModal").classList.add("hidden");
  document.body.style.overflow = "";
}
function setAuthTab(tab) {
  $$(".auth-tab").forEach(btn => btn.classList.toggle("active", btn.dataset.authTab === tab));
  $("#loginForm").classList.toggle("hidden", tab !== "login");
  $("#registerForm").classList.toggle("hidden", tab !== "register");
  $("#authTitle").textContent = tab === "login" ? "Đăng nhập để đặt món" : "Tạo tài khoản FoodFlow";
}
function requireLogin(actionMessage = "Đăng nhập để tiếp tục đặt món nhé!") {
  if (currentUser) return true;
  openAuth("login");
  showToast(actionMessage);
  return false;
}
function renderFoods() {
  let filtered = foods.filter(food => {
    const categoryMatch = currentCategory === "all" ||
      (currentCategory === "savory" ? !["vegetarian","drink","snack"].includes(food.category) :
       currentCategory === "vegetarian" ? food.category === "vegetarian" :
       currentCategory === "rice" ? food.category === "rice" :
       currentCategory === "noodle" ? food.category === "noodle" :
       currentCategory === "snack" ? food.category === "snack" :
       currentCategory === "drink" ? food.category === "drink" : true);
    const query = currentSearch.trim().toLocaleLowerCase("vi");
    const searchMatch = !query || [food.name, food.restaurant, food.description].join(" ").toLocaleLowerCase("vi").includes(query);
    return categoryMatch && searchMatch;
  });
  const sort = $("#sortSelect").value;
  if (sort === "low") filtered.sort((a,b) => a.price - b.price);
  if (sort === "high") filtered.sort((a,b) => b.price - a.price);
  $("#menuTitle").innerHTML = currentCategory === "vegetarian" ? 'Món chay thanh lành <span>🌿</span>' :
    currentCategory === "all" ? 'Món ngon được yêu thích <span>✦</span>' :
    'Khám phá thực đơn <span>✦</span>';
  $("#menuSubtitle").textContent = currentCategory === "vegetarian" ? "Nhiều lựa chọn từ rau củ, nấm và đạm thực vật" : "Món ngon chọn lọc, sẵn sàng đến với bạn";
  $("#filterNote").classList.toggle("hidden", !(currentSearch || currentCategory !== "all"));
  $("#filterNote").textContent = `Đang hiển thị ${filtered.length} món${currentSearch ? ` phù hợp với “${currentSearch}”` : ""}.`;
  $("#foodGrid").innerHTML = filtered.map(food => `
    <article class="food-card">
      <div class="food-image">
        <img src="${food.img}" alt="${food.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'">
        <span class="food-badge ${food.category === "vegetarian" ? "veg" : ""}">${food.category === "vegetarian" ? "🌿 " : ""}${food.badge}</span>
        <button class="favorite-btn ${favorites.includes(food.id) ? "favorited" : ""}" data-favorite="${food.id}" aria-label="Lưu yêu thích">${favorites.includes(food.id) ? "♥" : "♡"}</button>
      </div>
      <div class="food-info">
        <h3 class="food-title">${food.name}</h3>
        <p class="food-restaurant">${food.restaurant}</p>
        <div class="food-meta"><span class="food-rating"><span>★</span> ${food.rating.toFixed(1)} <span style="color:#9ba39d">(${food.category === "vegetarian" ? "Món chay" : "Được thích"})</span></span><span class="food-price">${formatMoney(food.price)}</span></div>
        <div class="food-actions"><button class="add-btn" data-add="${food.id}"><span>＋</span> Thêm vào giỏ</button></div>
      </div>
    </article>`).join("");
  $("#emptyState").classList.toggle("hidden", filtered.length !== 0);
  $("#foodGrid").classList.toggle("hidden", filtered.length === 0);
}
function chooseCategory(category) {
  currentCategory = category;
  $$(".category-chip").forEach(btn => btn.classList.toggle("selected", btn.dataset.category === category));
  renderFoods();
  $("#menu").scrollIntoView({behavior:"smooth", block:"start"});
}
function addToCart(id) {
  if (!requireLogin("Bạn cần đăng nhập trước khi thêm món vào giỏ hàng.")) return;
  const food = foods.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({id:food.id,qty:1});
  saveCart();
  showToast(`Đã thêm "${food.name}" vào giỏ hàng!`);
}
function renderCart() {
  const totalItems = cart.reduce((sum,item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum,item) => sum + foods.find(food => food.id === item.id).price * item.qty, 0);
  $("#cartTitleCount").textContent = `(${totalItems} món)`;
  $("#cartSubtotal").textContent = formatMoney(subtotal);
  $("#deliveryFee").textContent = formatMoney(subtotal ? 15000 : 0);
  $("#cartTotal").textContent = formatMoney(subtotal ? subtotal + 15000 : 0);
  if (!cart.length) {
    $("#cartItems").innerHTML = '<div class="cart-empty"><span>🛍️</span>Giỏ hàng đang trống.<br>Chọn món ngon để bắt đầu nhé!</div>';
  } else {
    $("#cartItems").innerHTML = cart.map(item => {
      const food = foods.find(f => f.id === item.id);
      return `<div class="cart-item"><img src="${food.img}" alt="${food.name}"><div><strong>${food.name}</strong><small>${formatMoney(food.price)} / phần</small><div class="quantity-controls"><button data-qty="${food.id}" data-change="-1" aria-label="Giảm số lượng">−</button><span>${item.qty}</span><button data-qty="${food.id}" data-change="1" aria-label="Tăng số lượng">＋</button></div></div><span class="cart-item-price">${formatMoney(food.price * item.qty)}</span></div>`;
    }).join("");
  }
}
function openCart() {
  $("#cartModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  renderCart();
}
function closeCart() {
  $("#cartModal").classList.add("hidden");
  document.body.style.overflow = "";
}
function persistUser(user, remember) {
  currentUser = user;
  sessionStorage.removeItem("foodflow_user");
  localStorage.removeItem("foodflow_user");
  (remember ? localStorage : sessionStorage).setItem("foodflow_user", JSON.stringify(user));
  setAuthHeader();
}
function getAccounts() {
  return JSON.parse(localStorage.getItem("foodflow_accounts") || "[]");
}

$("#categoryList").addEventListener("click", e => {
  const button = e.target.closest("[data-category]");
  if (button) chooseCategory(button.dataset.category);
});
$("#foodGrid").addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  const fav = e.target.closest("[data-favorite]");
  if (add) addToCart(Number(add.dataset.add));
  if (fav) {
    const id = Number(fav.dataset.favorite);
    if (!requireLogin("Đăng nhập để lưu danh sách món yêu thích.")) return;
    favorites = favorites.includes(id) ? favorites.filter(value => value !== id) : [...favorites,id];
    localStorage.setItem("foodflow_favorites", JSON.stringify(favorites));
    renderFoods();
    showToast(favorites.includes(id) ? "Đã lưu món yêu thích ❤️" : "Đã bỏ khỏi danh sách yêu thích.");
  }
});
$("#sortSelect").addEventListener("change", renderFoods);
$("#resetFilters").addEventListener("click", () => {currentCategory="all";currentSearch="";$("#headerSearch").value="";$("#heroSearch").value="";$$(".category-chip").forEach(b=>b.classList.toggle("selected",b.dataset.category==="all"));renderFoods();});
$("#heroSearchForm").addEventListener("submit", e => {e.preventDefault();currentSearch=$("#heroSearch").value;$("#headerSearch").value=currentSearch;renderFoods();$("#menu").scrollIntoView({behavior:"smooth"});});
$("#headerSearch").addEventListener("input", e => {currentSearch=e.target.value;$("#heroSearch").value=currentSearch;renderFoods();});
$$("[data-category-link]").forEach(link => link.addEventListener("click", () => chooseCategory(link.dataset.categoryLink)));
$("#exploreVeg").addEventListener("click", () => chooseCategory("vegetarian"));
$("#openAuth").addEventListener("click", () => currentUser ? showToast(`Bạn đang đăng nhập: ${currentUser.email}`) : openAuth("login"));
$("#closeAuth").addEventListener("click", closeAuth);
$("#authModal").addEventListener("click", e => {if(e.target.id==="authModal")closeAuth();});
$$("[data-auth-tab]").forEach(btn => btn.addEventListener("click", () => setAuthTab(btn.dataset.authTab)));
$$("[data-switch-auth]").forEach(btn => btn.addEventListener("click", () => setAuthTab(btn.dataset.switchAuth)));
$("#loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const email = String(data.get("email")).trim().toLowerCase();
  const password = String(data.get("password"));
  const account = getAccounts().find(a => a.email === email && a.password === password);
  if (!account) {showToast("Email hoặc mật khẩu chưa đúng. Nếu chưa có tài khoản, hãy đăng ký nhé.");return;}
  persistUser({name:account.name,email:account.email}, data.get("remember")==="on");
  closeAuth(); e.currentTarget.reset(); showToast(`Xin chào ${account.name}! Bạn đã đăng nhập.`);
});
$("#registerForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const name = String(data.get("name")).trim();
  const email = String(data.get("email")).trim().toLowerCase();
  const password = String(data.get("password"));
  const confirmPassword = String(data.get("confirmPassword"));
  if (password !== confirmPassword) {showToast("Mật khẩu nhập lại chưa khớp.");return;}
  const accounts = getAccounts();
  if (accounts.some(a => a.email === email)) {showToast("Email này đã có tài khoản. Hãy đăng nhập nhé.");return;}
  // Demo only: do not use client-side password storage for a real service.
  accounts.push({name,email,password});
  localStorage.setItem("foodflow_accounts", JSON.stringify(accounts));
  persistUser({name,email}, true);
  closeAuth(); e.currentTarget.reset(); showToast("Tạo tài khoản thành công. Chào mừng bạn đến FoodFlow!");
});
$("#forgotPassword").addEventListener("click", () => showToast("Bản demo chưa gửi email khôi phục. Hãy tạo tài khoản mới hoặc tích hợp dịch vụ xác thực."));
$("#cartButton").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#cartModal").addEventListener("click", e => {if(e.target.id==="cartModal")closeCart();});
$("#cartItems").addEventListener("click", e => {
  const btn = e.target.closest("[data-qty]");
  if (!btn) return;
  const id = Number(btn.dataset.qty), change = Number(btn.dataset.change);
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
});
$("#checkoutButton").addEventListener("click", () => {
  if (!cart.length) {showToast("Giỏ hàng đang trống.");return;}
  if (!requireLogin("Bạn cần đăng nhập để xác nhận đơn hàng.")) {closeCart();return;}
  showToast("Demo giao diện: bước xác nhận đơn hàng sẽ được bổ sung khi kết nối backend.");
});
$("#mobileMenu").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
$("#navLinks").addEventListener("click", e => {if(e.target.closest("a"))$("#navLinks").classList.remove("open");});
document.addEventListener("keydown", e => {if(e.key==="Escape"){closeAuth();closeCart();}});
renderFoods(); renderCartCount(); setAuthHeader();
