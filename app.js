//tampilan awal di form saat memilih jumlah player dan menginputkan nama
const selectHtml = `
      <form id="mengisiNama" action="submit" class="d-flex flex-column align-items-center row container-fluid mx-0">
        <label for="jumlah-player" class="form-label">Jumlah player:</label>
        <select id="jumlah-player" class="form-select mb-3">
          <option value="2" selected>2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <ul id="list-player" class="list-group ">
        </ul>
      <button type="submit" class="btn btn-primary" id="tampilkanNilai">Simpan</button>
      </form>
        `;

///function untuk meupdate input nama player saat jumlah player dipilih
function generatePlayerInputs(jumlahPlayerSelect) {
  const listPlayer = $("#list-player");
  listPlayer.empty(); // hapus semua input sebelumnya
  for (let i = 0; i < jumlahPlayerSelect; i++) {
    const inputNama = $(`<input  type="text" class="form-control mb-2 " placeholder="Masukan Nama player ${i + 1}" id="player${i + 1}"  required/>`);

    listPlayer.append(inputNama);
  }
}

function tampilkanNilai(nilaiUrut) {
  const nilaiBaruUrut = nilaiUrut;

  // buat element table
  const table = $(`<table class="table">`);

  // buat element thead
  const thead = $("<thead>");
  const trHead = $("<tr>");
  thead.append(trHead);

  // buat element th untuk Nomor Urut, Nama dan Nilai
  const thNoUrut = $(`<th scope="col">`).text("No");
  const thNama = $(`<th> scope="col"`).text("Nama");
  const thNilai = $(`<th> scope="col"`).text("Nilai");
  trHead.append(thNoUrut, thNama, thNilai);

  // buat element tbody
  const tbody = $("<tbody>");

  // loop setiap key dan value dari objek nilaiBaruUrut
  let noUrut = 1; // inisialisasi variabel noUrut
  $.each(nilaiBaruUrut, function (key, value) {
    // buat element tr untuk setiap data
    const tr = $("<tr>");

    // buat element td untuk no urut, nama dan nilai
    const tdNoUrut = $(`<td class="display-6">`).text(noUrut++);
    const tdNama = $(`<td class="display-6">`).text(key);
    const tdNilai = $(`<td class="display-6">`).text(value);

    // tambahkan td ke dalam tr
    tr.append(tdNoUrut, tdNama, tdNilai);

    // tambahkan tr ke dalam tbody
    tbody.append(tr);
  });

  // tambahkan thead dan tbody ke dalam table
  table.append(thead, tbody);
  //membuat tombol Simpan Nilai
  const simpanNilai = $(`
  <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Masukan Nilai
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Masukan Nilai</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary"  id="simpan" onClick="simpan()" data-bs-dismiss="modal" >Simpan Nilai</button>
      </div>
    </div>
  </div>
</div>
  `);
  //membuat tombol Reset
  const reset = $('<button type="button" class="btn btn-danger mx-1" onClick="reset()" id="simpanNilai">Reset</button></button>');

  // tambahkan table ke dalam elemen dengan id "formIsi"
  $("#formIsi").append(table);
  $("#formIsi").append(simpanNilai);
  $("#formIsi").append(reset);

  //menambahkan form input nilai didalam modal
  $.each(nilaiBaruUrut, function (nama, nilai) {
    const label = $("<label>").text(nama.toUpperCase());
    const input = $("<input>").attr({
      type: "number",
      class: "form-control mb-2",
      placeholder: `Masukkan Nilai ${nama}`,
      id: `player${nama}`,
      required: true,
    });

    $(".modal-body").append(label, input);
  });
}

//function tombol simpan di modal
function simpan() {
  const values = {};
  $(".modal-body input").each(function () {
    const inputId = $(this).attr("id");
    const inputName = inputId.substring(6); // Mengambil nama dari ID input
    const inputValue = $(this).val();
    values[inputName] = [inputValue];
  });

  console.log(values);
  // Lakukan operasi lain sesuai kebutuhan dengan nilai-nilai yang disimpan

  let nilaiPlayer = JSON.parse(localStorage.getItem("nilaiPlayer"));
  console.log(nilaiPlayer);

  let mergedNilai = {};
  Object.keys(values).forEach(function (key) {
    mergedNilai[key] = values[key].concat(nilaiPlayer[key]);
  });
  localStorage.setItem("nilaiPlayer", JSON.stringify(mergedNilai));

  const hasilJumlah = {};
  Object.keys(mergedNilai).forEach(function (key) {
    const sum = mergedNilai[key].reduce(function (total, value) {
      return total + parseInt(value);
    }, 0);
    hasilJumlah[key] = sum;
  });
  let nilaiDiurutkan = Object.fromEntries(Object.entries(hasilJumlah).sort(([, a], [, b]) => b - a));
  $(".modal-body input").val("");
  $("#formIsi").empty();
  tampilkanNilai(nilaiDiurutkan);
}

//function tombol reset
function reset() {
  if (confirm("Apakah Anda yakin ingin mereset data?")) {
    localStorage.clear("jumlahPlayer");
    localStorage.clear("nilaiPlayer");
    localStorage.clear("tampilanNilai");
    location.reload();
  }
}
