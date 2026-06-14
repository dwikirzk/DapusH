/*DEKLARASI ELEMEN DOM*/
const tipeSumber = document.getElementById("tipe-sumber");
const formatSitasi = document.getElementById("format-sitasi");

const inputPenulis = document.getElementById("input-penulis");
const inputTahun = document.getElementById("input-tahun");
const inputJudul = document.getElementById("input-judul");
const inputKota = document.getElementById("input-kota");
const inputPenerbit = document.getElementById("input-penerbit");
const inputVol = document.getElementById("input-vol");
const inputNo = document.getElementById("input-no");
const groupJurnal = document.getElementById("group-jurnal");

const livePreview = document.getElementById("live-preview");
const listDapus = document.getElementById("list-dapus");
const kumpulanArea = document.getElementById("kumpulan-dapus-area");
const countDapus = document.getElementById("count-dapus");

let daftarPustaka = [];

/*FUNGSI PEMBANTU NAMA*/
function getNama(n, type) {
  if (!n) return "Penulis";
  const k = n.trim().split(/\s+/);
  if (k.length === 1) return k[0];
  const bel = k.pop();
  const depan = k.join(" ");

  if (type === "utuh") return `${bel}, ${depan}`;
  if (type === "inisial")
    return `${bel}, ${k.map((i) => i[0] + ".").join(" ")}`;
  if (type === "ieee") return `${k.map((i) => i[0] + ".").join(" ")} ${bel}`;
  if (type === "vancouver") return `${bel} ${k.map((i) => i[0]).join("")}`;
  return n;
}

/*GENERATOR*/
function generateStringSitasi() {
  const p = inputPenulis.value;
  const t = inputTahun.value || "Tahun";
  const j = inputJudul.value || "Judul";
  const k = inputKota.value || "Kota";
  const pen = inputPenerbit.value || "Penerbit";
  const vol = inputVol.value || "X";
  const no = inputNo.value || "X";

  const fmt = formatSitasi.value;
  const src = tipeSumber.value;

  if (!p && !t && !j)
    return "Isi form parameter referensi di kiri untuk melihat pratinjau...";

  const nInisial = getNama(p, "inisial");
  const nUtuh = getNama(p, "utuh");
  const nIEEE = getNama(p, "ieee");
  const nVan = getNama(p, "vancouver");

  let h = "";

  if (fmt === "APA Style") {
    h =
      src === "Buku"
        ? `${nInisial} (${t}). *${j}*. ${pen}.`
        : src === "Jurnal Ilmiah"
          ? `${nInisial} (${t}). ${j}. *${pen}*, ${vol}(${no}).`
          : `${nInisial} (${t}). *${j}*. Diakses dari ${pen}.`;
  } else if (fmt === "IEEE Style") {
    h =
      src === "Buku"
        ? `[NUM] ${nIEEE}, *${j}*. ${k}: ${pen}, ${t}.`
        : src === "Jurnal Ilmiah"
          ? `[NUM] ${nIEEE}, "${j}," *${pen}*, vol. ${vol}, no. ${no}, ${t}.`
          : `[NUM] ${nIEEE}, "*${j}*," ${t}. [Online]. Available: ${pen}.`;
  } else if (fmt === "MLA Style") {
    h =
      src === "Buku"
        ? `${nUtuh}. *${j}*. ${pen}, ${t}.`
        : src === "Jurnal Ilmiah"
          ? `${nUtuh}. "${j}." *${pen}*, vol. ${vol}, no. ${no}, ${t}.`
          : `${nUtuh}. *${j}*. ${pen}, ${t}.`;
  } else if (fmt === "Chicago Style") {
    h =
      src === "Buku"
        ? `${nUtuh}. *${j}*. ${k}: ${pen}, ${t}.`
        : src === "Jurnal Ilmiah"
          ? `${nUtuh}. "${j}." *${pen}* ${vol}, no. ${no} (${t}).`
          : `${nUtuh}. *${j}*. ${pen}, ${t}.`;
  } else if (fmt === "Harvard Style") {
    h =
      src === "Buku"
        ? `${nInisial} ${t}, *${j}*, ${pen}, ${k}.`
        : src === "Jurnal Ilmiah"
          ? `${nInisial} ${t}, '${j}', *${pen}*, vol. ${vol}, no. ${no}.`
          : `${nInisial} ${t}, *${j}*, ${pen}, ${k}.`;
  } else if (fmt === "Vancouver Style") {
    h =
      src === "Buku"
        ? `NUM. ${nVan}. ${j}. ${k}: ${pen}; ${t}.`
        : src === "Jurnal Ilmiah"
          ? `NUM. ${nVan}. ${j}. *${pen}*. ${t}; ${vol}(${no}).`
          : `NUM. ${nVan}. ${j}. ${k}: ${pen}; ${t}.`;
  }

  let previewStr = h.replace(/NUM/g, "1");
  return previewStr.replace(/\*(.*?)\*/g, "<em>$1</em>");
}

function updateLivePreview() {
  livePreview.innerHTML = generateStringSitasi();
}

/*SISTEM MANAJEMEN DAFTAR PUSTAKA */
function renderList() {
  listDapus.innerHTML = "";
  if (daftarPustaka.length === 0) {
    kumpulanArea.style.display = "none";
    return;
  }
  kumpulanArea.style.display = "block";
  countDapus.innerText = `(${daftarPustaka.length})`;

  const fmt = formatSitasi.value;
  if (!fmt.includes("IEEE") && !fmt.includes("Vancouver")) daftarPustaka.sort();

  daftarPustaka.forEach((item, index) => {
    let displayStr = item;
    if (fmt.includes("IEEE"))
      displayStr = displayStr.replace(/\[1\]/g, `[${index + 1}]`);
    if (fmt.includes("Vancouver"))
      displayStr = displayStr.replace(/1\./g, `${index + 1}.`);
    listDapus.innerHTML += `<div class="dapus-item dapus-preview">${displayStr}</div>`;
  });
}

// Event Listeners Tombol
document.getElementById("btn-tambah").addEventListener("click", () => {
  if (!inputPenulis.value) return alert("Silakan isi nama penulis!");
  daftarPustaka.push(generateStringSitasi());
  renderList();
  document.getElementById("btn-reset").click();
});

document.getElementById("btn-clear-list").addEventListener("click", () => {
  if (confirm("Hapus semua daftar?")) {
    daftarPustaka = [];
    renderList();
  }
});

// Salin Semua
document.getElementById("btn-copy-all").addEventListener("click", function () {
  if (daftarPustaka.length === 0) return;
  const temp = document.createElement("div");
  temp.innerHTML = `<div style="font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 2.0;">${listDapus.innerHTML}</div>`;
  document.body.appendChild(temp);
  const range = document.createRange();
  range.selectNodeContents(temp);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  document.body.removeChild(temp);
  alert("Disalin! Jika gantung belum muncul, tekan Ctrl+T di Word.");
});

// Download RTF
document
  .getElementById("btn-export-rtf")
  .addEventListener("click", function () {
    if (daftarPustaka.length === 0) return alert("Daftar kosong!");
    let rtf = "{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Times New Roman;}}\n";
    const items = listDapus.querySelectorAll(".dapus-item");
    items.forEach((item) => {
      let text = item.innerHTML
        .replace(/<em>/g, "{\\i ")
        .replace(/<\/em>/g, "}");
      rtf +=
        "\\pard\\fi-720\\li720\\sl480\\slmult1\\f0\\fs24 " + text + "\\par\n";
    });
    rtf += "}";
    const blob = new Blob([rtf], { type: "application/rtf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Daftar_Pustaka.rtf";
    a.click();
  });

tipeSumber.addEventListener("change", () => {
  groupJurnal.style.display =
    tipeSumber.value === "Jurnal Ilmiah" ? "block" : "none";
  updateLivePreview();
});

formatSitasi.addEventListener("change", () => {
  updateLivePreview();
  renderList();
});

[
  inputPenulis,
  inputTahun,
  inputJudul,
  inputKota,
  inputPenerbit,
  inputVol,
  inputNo,
  formatSitasi,
  tipeSumber,
].forEach((el) => el.addEventListener("input", updateLivePreview));

document.getElementById("btn-reset").addEventListener("click", () => {
  [
    inputPenulis,
    inputTahun,
    inputJudul,
    inputKota,
    inputPenerbit,
    inputVol,
    inputNo,
  ].forEach((i) => (i.value = ""));
  updateLivePreview();
});

updateLivePreview();
