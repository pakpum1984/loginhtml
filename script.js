<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <title>Login Page2</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }

    .container {
      max-width: 400px;
      margin: auto;
      /* กำหนดให้ margin ของ container เป็น auto เพื่อให้อยู่กลางตามแกนแนวนอน */
      margin-top: 20vh;
      /* กำหนดค่า margin-top เป็นค่าของความสูงของหน้าจอที่ 20% */
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }


    h2 {
      margin-bottom: 20px;
      text-align: center;
    }

    .input-group {
      margin-bottom: 20px;
    }

    .input-group label {
      display: block;
      margin-bottom: 5px;
    }

    .input-group input {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #45a049;
    }

    #page2 {
      text-align: center;
    }

    button#logoutBtn {
      margin-top: 20px;
      background-color: #f44336;
    }

    button#logoutBtn:hover {
      background-color: #d32f2f;
    }
  </style>
</head>

<body onload="clearForm(); ">
  <!-- The Modal -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">ลงทะเบียน</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">

          <form id="registerForm" method="POST" onsubmit="registerUser(); return false;">

            <div class="input-group">
              <label for="regUsername">Username</label>
              <input type="text" id="regUsername" name="regUsername" required>
            </div>
            <div class="input-group">
              <label for="regPassword">Password</label>
              <input type="password" id="regPassword" name="regPassword" required>
            </div>
            <div class="input-group">
              <label for="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" required>
            </div>
            <div class="input-group">
              <label for="department">Department</label>
              <input type="text" id="department" name="department" required>
            </div>

            <input type="text" id="regstatus" name="regstatus" value="user" hidden>

            <button type="submit">Register</button>
          </form>

        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>
  <div class="container">
    <section id="page1">
      <form id="loginForm" method="POST" onsubmit="submitForm(); return false;">
        <h2>Login</h2>
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Login</button>
        <br> <br> <br>
        <center>
          <p>ยังไม่ได้ลงทะเบียน <a href="##" data-bs-toggle="modal" data-bs-target="#myModal">ลงทะบียนที่นี่</a></p>
        </center>
      </form>

    </section>

    <section id="page2" style="display: none;">
      <h1>หน้า2</h1>
      <div class="input-group">
        <label for="username">ชื่อสกุล</label>
        <input type="text" id="namebook" name="namebook" required>
      </div>
      <div class="input-group">
        <label for="username">แผนก</label>
        <input type="text" id="namedep" name="namedep" required>
      </div>

      <button id="logoutBtn" onclick="logout()">ออกจากระบบ</button>


    </section>
  </div>

  <script>


    function fetchData(formData, successCallback, errorCallback) {
      fetch('https://script.google.com/macros/s/AKfycbypjGKYQbbGFJqla3TosdHghZZ1uZIEiQDUPT3hSQBABAT1ryb2PNF9GNoRcsGVZW_X/exec', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('An error occurred while sending the data');
          }
        })
        .then(data => {
          successCallback(data);
        })
        .catch(error => {
          errorCallback(error);
        });
    }

    // ใน registerUser()
    function registerUser() {
      // Fetch data from the form
      var regUsername = document.getElementById('regUsername').value;
      var regPassword = document.getElementById('regPassword').value;
      var fullName = document.getElementById('fullName').value;
      var department = document.getElementById('department').value;
      var regstatus = document.getElementById('regstatus').value;

      // Create a FormData object to send the data
      var formData = new FormData();
      formData.append('regUsername', regUsername);
      formData.append('regPassword', regPassword);
      formData.append('fullName', fullName);
      formData.append('department', department);
      formData.append('regstatus', regstatus);

      // Call the fetchData function to send the data to the server
      fetchData(formData,
        function (data) {
          // Handle the successful response
          console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: '<h4>ลงทะเบียนสำเร็จ</h4>',
            showConfirmButton: true,
            confirmButtonText: 'ปิด',
          });
        },
        function (error) {
          // Handle the error
          console.error('Error:', error);
        }
      );
    }

    // ใน submitForm()
    // ใน submitForm()
    function submitForm() {
      event.preventDefault();
      Swal.fire({
        position: 'center',
        title: '<h4>กำลังตรวจสอบข้อมูล...</h4>',
        showConfirmButton: false,
      });
      Swal.showLoading();

      // Fetch data from the form
      var formData = new FormData();
      formData.append('username', document.getElementById('username').value);
      formData.append('password', document.getElementById('password').value);

      // Call the fetchData function to send the data to the server
      fetchData(formData,
        function (data) {
          // Handle the successful response
          console.log(data);  // เช็คข้อมูลที่ได้รับ
          if (data !== false) { // ตรวจสอบว่ามีข้อมูลที่ถูกส่งกลับมาหรือไม่
            var username = data.username;
            var password = data.password;
            var fname = data.name;
            var dep = data.dep;
            var status = data.status;

            if (status === 'user') { // ตรวจสอบว่าสถานะเป็น admin หรือไม่
              localStorage.setItem('status', status);
              localStorage.setItem('fname', fname);
              localStorage.setItem('dep', dep);

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '<h4>ยินดีต้อนรับ<br>คุณ ' + fname + '</h4>',
                showConfirmButton: true,
                confirmButtonText: 'กดปิด',
              });

              $('#page1').hide();
              $('#page2').show();
              $('#namebook').val(fname);
              $('#namedep').val(dep);
            }
          } else {
            // แสดงข้อความเมื่อไม่พบข้อมูล
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '<h4>ไม่พบข้อมูลที่ท่านกรอกในระบบ</h4>',
              showConfirmButton: true,
              confirmButtonText: 'กดปิด',
            });
          }
        },
        function (error) {
          // Handle the error
          console.error('Error:', error);
        }
      );
    }


    function logout() {
      Swal.fire({
        title: 'คุณต้องการออกจากระบบหรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ต้องการ!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById('page2').style.display = 'none';
          document.getElementById('page1').style.display = 'block';
          localStorage.clear();
        }
      });
    }
  </script>
  <script>
      document.addEventListener('DOMContentLoaded', function() {
          var storedStatus = localStorage.getItem('status');
          var storedFname = localStorage.getItem('fname');
          var storedDep = localStorage.getItem('dep');

          if (storedStatus === 'admin' && storedFname && storedDep) {
              // ตรวจสอบว่าข้อมูลถูกเก็บไว้ใน Local Storage แล้ว
              Swal.fire({
                  position: 'center',
                  icon: 'info',
                  title: '<h4>ยินดีต้อนรับกลับ<br>คุณ ' + storedFname +'</h4>',
                  showConfirmButton: true,
                  confirmButtonText: 'ปิด',
              });

              $('#page1').hide();
              $('#page2').show();
              $('#namebook').val(storedFname);
              $('#namedep').val(storedDep);
          }
      });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
</body>

</html>
