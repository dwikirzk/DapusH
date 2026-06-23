# DapusH (Daftar Pustaka Helper)

**DapusH** adalah alat bantu berbasis web (Generator Daftar Pustaka) yang dirancang untuk membantu mahasiswa atau akademisi dalam menyusun daftar pustaka secara otomatis, rapi, dan sesuai dengan standar format penulisan akademik.

## Identitas Pengembang

- **Nama:** Mohamad Dwiki Rozak
- **Program Studi:** Informatika

## Maksud dan Tujuan

Aplikasi ini dibuat untuk membantu menyelesaikan kendala klasik mahasiswa dalam menyusun daftar rujukan karya ilmiah. Tujuannya adalah mengotomatisasi penyusunan data mentah referensi menjadi format standar akademik secara presisi, sehingga mahasiswa bisa lebih fokus pada isi tulisan daripada pusing memikirkan tata letak tanda baca daftar pustaka.

## Komparasi: DapusH vs Mendeley

Banyak yang mungkin bertanya, _"Mengapa menggunakan DapusH jika sudah ada aplikasi raksasa seperti Mendeley?"_

Mendeley adalah perangkat lunak _Reference Manager_ bertaraf internasional yang luar biasa untuk riset jangka panjang. Namun, **DapusH hadir untuk mengisi celah spesifik** yang sering kali membuat pengguna aplikasi raksasa tersebut merasa kesulitan atau frustrasi.

### 1. Analisis Perbedaan Utama

- **Fokus Fungsionalitas:** Mendeley adalah ekosistem perpustakaan digital (untuk membaca PDF, penandaan, dan _cloud storage_). Sedangkan DapusH murni sebagai **Quick Citation Generator** yang fokus pada satu hal: mengubah data referensimu menjadi teks daftar pustaka berformat rapi dalam hitungan detik.
- **Sistem Input Data:** Mendeley menggunakan ekstraksi otomatis dari file PDF (yang terkadang bisa keliru jika metadata PDF tidak standar). DapusH menggunakan sistem **input manual** yang memberikan kendali penuh pada pengguna atas data yang dimasukkan.
- **Privasi & Penyimpanan:** Mendeley mewajibkan pembuatan akun dan sinkronisasi ke _server cloud_. DapusH beroperasi 100% di sisi klien (_browser_). Tidak ada login, dan tidak ada data yang dikirim ke server luar, menjamin **privasi mutlak**.

### 2. Keunggulan Tingkat Kemudahan DapusH

Untuk tugas-tugas harian, DapusH menawarkan tingkat kemudahan yang jauh lebih tinggi:

- **Tanpa Instalasi & Bebas Login (_Plug-and-Play_):** Tidak perlu mengunduh aplikasi berukuran besar, menginstal _plugin_, atau membuat akun. Cukup buka web, ketik, dan daftar pustaka siap disalin. Kurva belajarnya nyaris nol.
- **Bebas dari _Bug Plugin_ Word yang Berat:** Keluhan umum pengguna aplikasi sitasi besar adalah _plugin_ Word yang sering membuat aplikasi Microsoft Word menjadi lambat, _hang_, atau _crash_ pada laptop spesifikasi rendah. DapusH menghindari hal ini karena komputasi terjadi murni di _browser_.
- **Kendali Visual Mutlak:** DapusH menyelesaikan masalah klasik format yang berantakan saat dipindahkan ke Word. Melalui fitur ekspor **.RTF**, _hanging indent_ (paragraf gantung) dan spasi ganda (2.0) sudah dikunci secara _hardcoded_.

### 3. Tabel Perbandingan

| Indikator             | Mendeley                              | DapusH                                      |
| :-------------------- | :------------------------------------ | :------------------------------------------ |
| **Sifat Aplikasi**    | Aplikasi Desktop & Web (Cukup Berat)  | Website Ringkas (_Client-Side_)             |
| **Kebutuhan Akses**   | Wajib Login / Buat Akun               | Tidak Perlu Akun sama sekali                |
| **Integrasi MS Word** | _Plugin_ Bawaan (Memakan memori Word) | Independen via File `.RTF` / Salin Cepat    |
| **Penyimpanan Data**  | Jangka Panjang (_Cloud Storage_)      | Sementara (Hilang saat tab ditutup/refresh) |
| **Target Penggunaan** | Skripsi, Tesis, Riset Jangka Panjang  | Makalah Harian, Tugas Praktikum singkat     |

> **Kesimpulan:**
> Gunakan **Mendeley** sebagai "Gudang Arsip" utama saat kamu menyusun skripsi dengan puluhan referensi. Namun, gunakan **DapusH** sebagai "Peralatan Taktis" untuk tugas makalah harian (Sistem Kebut Semalam) yang membutuhkan daftar pustaka rapi secara instan tanpa perlu pusing memikirkan _error plugin_ atau instalasi aplikasi.

## Apa Bedanya DapusH dengan Web Sitasi Lain?

Berbeda dengan platform sitasi terkemuka lainnya yang seringkali hanya memberikan _output_ berupa teks biasa, **DapusH sangat berfokus pada hasil visual (_output formatting_)**.
DapusH memiliki fitur unggulan berupa **Download .RTF**, di mana hasil daftar pustaka yang diunduh sudah otomatis memiliki pengaturan **paragraf gantung (hanging indent)** dan **spasi ganda (2.0)**. Ini berarti hasilnya siap langsung disalin ke Microsoft Word tanpa merusak tatanan dokumen dan tanpa perlu disetel ulang secara manual.

## Fitur Utama

- **Multi-Format Akademik**: Mendukung format APA, IEEE, MLA, Chicago, Harvard, dan Vancouver.
- **Hanging Indent Otomatis**: Mendukung ekspor ke format `.RTF` yang mempertahankan _hanging indent_ (baris kedua menjorok ke dalam) saat dibuka di Microsoft Word.
- **Antarmuka Klasik**: Desain minimalis dan _user-friendly_ untuk kenyamanan penggunaan.
- **Responsif**: Layout yang menyesuaikan di berbagai ukuran layar (Desktop & Mobile).
- **Fitur Salin Cepat**: Sekali klik untuk menyalin seluruh daftar pustaka ke clipboard.

## Fungsi Utama JavaScript

Sistem DapusH berjalan sepenuhnya di sisi klien (_client-side_) menggunakan logika JavaScript seperti berikut :

- **`getNama()`**: Fungsi pembantu (_helper_) untuk memecah dan memanipulasi _string_ nama penulis menjadi berbagai format (seperti inisial untuk APA, nama utuh dibalik untuk MLA, atau penulisan ringkas untuk Vancouver).
- **`generateStringSitasi()`**: Fungsi inti (generator) yang membaca nilai dari form input, lalu merakitnya menggunakan _Template Literals_ sesuai dengan struktur dan aturan tanda baca dari masing-masing gaya sitasi (APA, IEEE, MLA, Chicago, Harvard, Vancouver).
- **`updateLivePreview()`**: Fungsi yang memanfaatkan _Event Listener_ (`input` dan `change`) untuk memanipulasi DOM, sehingga pratinjau sitasi berubah secara _real-time_ setiap kali pengguna mengetik di form.
- **`renderList()`**: Sistem manajemen _array_ yang bertugas mengumpulkan, menyimpan, menyortir daftar pustaka secara otomatis (berdasarkan abjad atau urutan angka), dan menampilkannya ke layar.
- **Logika Ekspor & Salin**: Menggunakan antarmuka API web seperti `document.execCommand('copy')` untuk menyalin elemen HTML, serta pembuatan objek `Blob` untuk merakit dan mengunduh file berekstensi `.rtf` langsung dari browser.

## Cara Penggunaan

1. Pilih **Tipe Sumber** referensi pada form di sebelah kiri (Buku, Jurnal Ilmiah, atau Website).
2. Isi kelengkapan data referensi seperti Nama Penulis, Tahun Terbit, Judul, dan lainnya.
3. Pilih **Format Sitasi** yang dibutuhkan oleh tugas atau kampusmu.
4. Cek hasil sementara di kotak **Pratinjau Saat Ini**.
5. Klik tombol **TAMBAH KE DAFTAR PUSTAKA** untuk memindahkannya ke daftar koleksi.
6. Ulangi langkah 1-5 untuk referensi lainnya.
7. Setelah semua terkumpul, klik **DOWNLOAD .RTF** untuk mengunduh file yang siap masuk ke Microsoft Word, atau klik **SALIN SEMUA** untuk _copy-paste_ langsung.

## Catatan

Website DapusH ini **masih berada dalam masa pengembangan aktif**. Oleh karena itu, sangat wajar jika masih ditemukan kesalahan tata letak, _bug_ visual, atau ada sedikit ketidaktepatan logika pemrosesan program pada format sitasi tertentu. Kritik dan masukan sangat terbuka untuk penyempurnaan aplikasi ini ke depannya.
