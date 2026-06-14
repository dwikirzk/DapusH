/* ==========================================================================
   1. DEKLARASI ELEMEN DOM
   ========================================================================== */
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

// Array penyimpan daftar sitasi
let daftarPustaka = [];

/* ==========================================================================
   2. FUNGSI PEMBANTU NAMA
   ========================================================================== */
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

/* ==========================================================================
   3. MESIN GENERATOR (DINAMIS UNTUK SEMUA FORMAT & SUMBER)
   ========================================================================== */
function generateStringSitasi() {
  const p = inputPenulis.value;
  const t = inputTahun.value;
  const j = inputJudul.value;
  const k = inputKota.value;
  const pen = inputPenerbit.value;
  const vol = inputVol.value || "X";
  const no = inputNo.value || "X";

  const fmt = formatSitasi.value;
  const src = tipeSumber.value;

  if (!p && !t && !j) return "Isi form di kiri untuk mulai...";

  const nInisial = getNama(p, "inisial");
  const nUtuh = getNama(p, "utuh");
  const nIEEE = getNama(p, "ieee");
  const nVan = getNama(p, "vancouver");

  let h = "";

  // LOGIKA PERAKITAN SUPER LENGKAP (Sudah diperbaiki: mengambil variabel pen untuk nama jurnal)
  if (fmt === "APA Style") {
    h =
      src === "Buku"
        ? `${nInisial} (${t}). *${j}*. ${pen}.`
        : src === "Jurnal Ilmiah"
          ? `${nInisial} (${t}). ${j}. *${pen}*, ${vol}(${no}).`
          : `${nInisial} (${t}). *${j}*. Diakses dari ${pen}.`;
  } else if (fmt === "IEEE Style (Informatika)") {
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

  // Untuk pratinjau tunggal, kita ganti NUM dengan 1
  let previewStr = h.replace(/NUM/g, "1");
  return previewStr.replace(/\*(.*?)\*/g, "<em>$1</em>");
}

function updateLivePreview() {
  livePreview.innerHTML = generateStringSitasi();
}

/* ==========================================================================
   4. SISTEM MANAJEMEN DAFTAR PUSTAKA
   ========================================================================== */
function renderList() {
  listDapus.innerHTML = "";
  if (daftarPustaka.length === 0) {
    kumpulanArea.style.display = "none";
    return;
  }

  kumpulanArea.style.display = "block";
  countDapus.innerText = `(${daftarPustaka.length})`;

  // Sortir secara Abjad (Kecuali IEEE & Vancouver yang pakai penomoran berurut)
  const fmt = formatSitasi.value;
  if (!fmt.includes("IEEE") && !fmt.includes("Vancouver")) {
    daftarPustaka.sort();
  }

  daftarPustaka.forEach((item, index) => {
    let displayStr = item;
    // Ganti penomoran dinamis untuk IEEE dan Vancouver
    if (fmt.includes("IEEE"))
      displayStr = displayStr.replace(/\[1\]/g, `[${index + 1}]`);
    if (fmt.includes("Vancouver"))
      displayStr = displayStr.replace(/1\./g, `${index + 1}.`);

    // Membungkus list dengan class hanging indent
    listDapus.innerHTML += `<div class="dapus-item dapus-preview">${displayStr}</div>`;
  });
}

document.getElementById("btn-tambah").addEventListener("click", () => {
  const p = inputPenulis.value;
  if (!p)
    return alert(
      "Silakan isi nama penulis terlebih dahulu untuk dimasukkan ke daftar!",
    );

  const currentHTML = generateStringSitasi();
  daftarPustaka.push(currentHTML);
  renderList();

  // Otomatis bersihkan form setelah ditambahkan
  document.getElementById("btn-reset").click();
});

document.getElementById("btn-clear-list").addEventListener("click", () => {
  if (
    confirm(
      "Apakah Anda yakin ingin menghapus seluruh daftar pustaka yang telah dibuat?",
    )
  ) {
    daftarPustaka = [];
    renderList();
  }
});

/* ==========================================================================
   5. EKSPOR KE RTF DAN SALIN (HANGING INDENT & DOUBLE SPACE KUNCIAN)
   ========================================================================== */

// 1. Ekspor ke File Word (.RTF)
document.getElementById("btn-export-rtf").addEventListener("click", () => {
  if (daftarPustaka.length === 0) return alert("Daftar Pustaka kosong!");

  // Header struktur file Word RTF
  let rtf =
    "{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}}\n";

  const listItems = listDapus.querySelectorAll(".dapus-item");
  listItems.forEach((item) => {
    let text = item.innerHTML;
    // Ubah format HTML Miring ke format RTF Miring (\i ... \i0)
    text = text.replace(/<em>/g, "{\\i ").replace(/<\/em>/g, "}");

    // Logika Paragraf RTF:
    // \pard = Paragraf baru
    // \fi-720 \li720 = Hanging Indent (Baris pertama mundur, baris kedua dst menjorok)
    // \sl480 \slmult1 = Spasi Ganda 2.0
    rtf +=
      "\\pard\\fi-720\\li720\\sl480\\slmult1\\f0\\fs24 " + text + "\\par\n";
  });

  rtf += "}";

  // Memicu pengunduhan file
  const blob = new Blob([rtf], { type: "application/rtf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Daftar_Pustaka_DapusH.rtf";
  a.click();
  URL.revokeObjectURL(url);
});

// 2. Salin Semua ke Clipboard Word
document.getElementById("btn-copy-all").addEventListener("click", () => {
  if (daftarPustaka.length === 0) return;

  const temp = document.createElement("div");
  // Suntikan CSS inline ini adalah senjata utama agar Word mengenali format web
  temp.innerHTML = `<div style="font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 2.0;">${listDapus.innerHTML}</div>`;

  document.body.appendChild(temp);
  const range = document.createRange();
  range.selectNodeContents(temp);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  document.body.removeChild(temp);

  alert(
    "Daftar berhasil disalin! Silakan Paste (Ctrl+V) di Word. Jika baris kedua belum menjorok, tekan Ctrl+T.",
  );
});

/* ==========================================================================
   6. EVENT LISTENERS FORM AKTIF
   ========================================================================== */
tipeSumber.addEventListener("change", () => {
  groupJurnal.style.display =
    tipeSumber.value === "Jurnal Ilmiah" ? "block" : "none";
  // Sesuaikan placeholder pada kolom "Nama Penerbit"
  if (tipeSumber.value === "Jurnal Ilmiah") {
    inputPenerbit.placeholder = "Contoh: Jurnal Teknik Informatika";
  } else if (tipeSumber.value === "Website / URL") {
    inputPenerbit.placeholder = "Contoh: https://dapush.com/artikel";
  } else {
    inputPenerbit.placeholder = "Contoh: Informatika Press";
  }
  updateLivePreview();
});

// Update otomatis tampilan list jika user mengganti format
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

// Inisiasi pemuatan pertama
updateLivePreview();
