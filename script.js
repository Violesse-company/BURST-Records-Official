let allRecords = [];
let currentLift = "all";
let currentBW = "all";
let currentKategori = "all";

fetch("records.json")
  .then(res => res.json())
  .then(data => {
    allRecords = data;
    render();
  });

function render() {
  const area = document.getElementById("records");
  area.innerHTML = "";

  // フィルター
  let filtered = allRecords.filter(r => {
    return (currentLift === "all" || r.lift === currentLift) &&
           (currentKategori === "all" || r.kategori === currentKategori) &&
           (currentBW === "all" || String(r.bw) === currentBW);
           
  });

  // 種目×階級ごとに順位計算
  const groups = {};
  filtered.forEach(r => {
    const key = `${r.lift}_${r.bw}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });

  Object.values(groups).forEach(group => {
    group.sort((a, b) => b.weight - a.weight);

    group.forEach((r, index) => {
      const card = document.createElement("div");
      card.className = "record";

      card.innerHTML = `
        <h4>${r.lift} ${r.weight}kg</h4>
        <p>順位：${index + 1}位</p>
        <p>選手名：${r.name}</p>
        <p>体重区分：${r.bw}kg級</p>
        <p>カテゴリー：${r.kategori}</p>
        <p>性別：${r.gender}</p>
        <p>認定日：${r.date}</p>
      `;

      area.appendChild(card);
    });
  });
}

/* 種目ボタン */
document.querySelectorAll(".lift-filter button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lift-filter button")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentLift = btn.dataset.lift;
    render();
  });
});

/* カテゴリー */
document.querySelectorAll(".kategori button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".kategori button")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentKategori = btn.dataset.kategori;
    render();
  });
});

/* 階級ボタン */
document.querySelectorAll(".weight-filter button").forEach(btn => {
  btn.addEventListener("click", () => {

    document
      .querySelectorAll(".weight-filter button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    currentBW = btn.dataset.bw;
    render();
  });
});