document.addEventListener("DOMContentLoaded", async () => {
  await loadCart();

  // 전체 비우기 버튼
  document.getElementById("clearCartBtn")?.addEventListener("click", async () => {
    if (confirm("정말로 장바구니를 비우시겠습니까?")) {
      await fetch("/api/cart/clear", { method: "DELETE" });
      await loadCart();
    }
  });

  // 그룹 삭제 버튼 (이벤트 위임)
  document.querySelector(".cart-list")?.addEventListener("click", async (e) => {
    if (e.target.classList.contains("group-delete-button")) {
      const groupId = e.target.dataset.groupid;
      if (confirm("이 경로 묶음을 삭제하시겠습니까?")) {
        try {
          await fetch(`/api/cart/group/${groupId}`, { method: "DELETE" });
          await loadCart();
        } catch (err) {
          alert("삭제 실패: " + err.message);
        }
      }
    }
  });
});

// 장바구니 불러오기
async function loadCart() {
  const container = document.querySelector(".cart-list");
  const actionButtons = document.querySelector(".cart-actions");
  container.innerHTML = "";

  try {
    const res = await fetch("/api/cart/list");
    if (!res.ok) throw new Error("서버 오류");

    const grouped = await res.json();
    const groupIds = Object.keys(grouped);

    if (groupIds.length === 0) {
      // 비어 있을 때
      container.innerHTML = `
        <div class="cart-empty">
          <img src="https://img.icons8.com/ios/100/empty-box.png" alt="empty">
          <p>장바구니가 비어 있습니다</p>
          <button class="find-route-button" onclick="location.href='/home'">경로 찾기</button>
        </div>`;
      actionButtons.style.display = "none";  // 버튼 숨김
      return;
    }

    actionButtons.style.display = "flex";  // 버튼 보임

    groupIds.forEach(groupId => {
      const items = grouped[groupId];
      let total = 0;

      const groupEl = document.createElement("div");
      groupEl.className = "cart-group";
      groupEl.innerHTML = `
        <h3>
          🛍️ 경로 묶음
          <button class="group-delete-button" data-groupid="${groupId}">삭제</button>
        </h3>
      `;

      items.forEach(item => {
        total += item.routePayment;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <div><strong>${item.startName} → ${item.endName}</strong></div>
          <div>${item.mode} / ${item.route}</div>
          <div>￦${item.routePayment.toLocaleString()}원</div>
        `;
        groupEl.appendChild(div);
      });

      const totalEl = document.createElement("div");
      totalEl.className = "total-fare";
      totalEl.innerHTML = `<strong>합계: ￦${total.toLocaleString()}원</strong>`;
      groupEl.appendChild(totalEl);

      container.appendChild(groupEl);
    });
  } catch (e) {
    console.error("장바구니 불러오기 실패", e);
    container.innerHTML = "<p>장바구니 정보를 불러올 수 없습니다.</p>";
    actionButtons.style.display = "none";
  }
}

// 결제 버튼
function goToPayment() {
  alert("결제 기능은 추후 구현 예정입니다.");
}
